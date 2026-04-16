import { setCors, handleOptions, sbInsert, getSetting, checkRateLimit } from './_cors.js';

/**
 * POST /api/scheduler/qualify
 * Body: QualificationFormData + { countryCode }
 *
 * Returns:
 *   { qualified: true,  score, applicantId }
 *   { qualified: false, score, reason }
 */

// Words that indicate vague / low-intent submissions
// Note: greeting patterns only match when the text IS just a greeting (with optional punctuation),
// not when the text begins with a greeting followed by real content.
const VAGUE_PATTERNS = [
  /^not sure[.!?\s]*$/i,
  /^just (want to |)explore[.!?\s]*$/i,
  /^see what you (do|offer|have)[.!?\s]*$/i,
  /^maybe[.!?\s]*$/i,
  /^testing[.!?\s]*$/i,
  /^hello[!.,\s]*$/i,
  /^hi[!.,\s]*$/i,
  /^no specific.*$/i,
  /^nothing specific.*$/i,
  /^general (enquiry|inquiry|question)[.!?\s]*$/i,
];

function scoreSubmission({ problem, budgetNumericValue, urgency, countryCode, thresholdUsd, thresholdInr }) {
  let score = 0;
  const reasons = [];

  // ── 1. Budget (0-50 points) ───────────────────────────────────────
  const isIndia = countryCode === 'IN';
  const threshold = isIndia ? thresholdInr : thresholdUsd;
  const budgetOk = budgetNumericValue >= threshold;

  if (budgetOk) {
    score += 50;
    if (budgetNumericValue >= threshold * 5) score += 10; // premium budget bonus
  } else {
    reasons.push(
      isIndia
        ? `Budget below ₹${threshold.toLocaleString('en-IN')} minimum for a premium engagement`
        : `Budget below $${threshold.toLocaleString()} minimum for a premium engagement`
    );
  }

  // ── 2. Problem description quality (0-30 points) ────────────────
  const minLen = 60;
  const cleanProblem = (problem || '').trim();
  const isVague = VAGUE_PATTERNS.some((p) => p.test(cleanProblem));

  if (cleanProblem.length >= minLen && !isVague) {
    // Give up to 30 points based on depth
    const depthScore = Math.min(30, Math.floor(cleanProblem.length / 20));
    score += depthScore;
  } else {
    if (cleanProblem.length < minLen) {
      reasons.push('Please describe your challenge in more detail (at least 60 characters)');
    } else {
      reasons.push('Your description appears too vague for us to evaluate the fit');
    }
  }

  // ── 3. Urgency (0-20 points) ─────────────────────────────────────
  const urgencyMap = { immediate: 20, '1-3months': 15, '3-6months': 8, exploring: 0 };
  score += urgencyMap[urgency] ?? 0;

  return { score, reasons };
}

export default async function handler(req, res) {
  setCors(res);
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Rate limiting: 10 submissions per IP per 10 minutes ──────────────────
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
  const rateCheck = checkRateLimit(ip, 'qualify', 10, 600_000);
  if (!rateCheck.allowed) {
    return res.status(429).json({ error: `Too many submissions. Try again in ${rateCheck.resetIn}s.` });
  }

  try {
    const {
      fullName,
      email,
      linkedinUrl,
      currentRole,
      problem,
      budgetRange,
      budgetNumericValue,
      urgency,
      countryCode = 'US',
      country = 'United States',
    } = req.body || {};

    // ── Presence validation ───────────────────────────────────────
    if (!fullName || !email || !problem || !budgetRange || !urgency) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    // ── Type / length validation (defence against bypassed frontend) ──
    if (typeof fullName !== 'string' || fullName.trim().length < 2 || fullName.length > 200) {
      return res.status(400).json({ error: 'Invalid name' });
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    if (typeof problem !== 'string' || problem.trim().length < 60 || problem.length > 5000) {
      return res.status(400).json({ error: 'Problem description must be 60–5000 characters' });
    }
    const VALID_URGENCY = ['immediate', '1-3months', '3-6months', 'exploring'];
    if (!VALID_URGENCY.includes(urgency)) {
      return res.status(400).json({ error: 'Invalid urgency value' });
    }
    if (typeof countryCode !== 'string' || countryCode.length > 10) {
      return res.status(400).json({ error: 'Invalid countryCode' });
    }

    // Fetch thresholds from DB settings
    const thresholdUsd = await getSetting('budget_threshold_usd', 1000);
    const thresholdInr = await getSetting('budget_threshold_inr', 75000);

    const { score, reasons } = scoreSubmission({
      problem,
      budgetNumericValue: Number(budgetNumericValue) || 0,
      urgency,
      countryCode,
      thresholdUsd: Number(thresholdUsd),
      thresholdInr: Number(thresholdInr),
    });

    const qualified = score >= 60;
    const rejectionReason = qualified ? null : reasons[0] || 'Not a fit at this time';

    // Persist to DB
    const row = await sbInsert('rns_applicants', {
      full_name: fullName,
      email: email.toLowerCase().trim(),
      linkedin_url: linkedinUrl || null,
      applicant_role: currentRole || null,
      problem,
      budget_range: budgetRange,
      budget_numeric: Number(budgetNumericValue) || 0,
      urgency,
      country,
      country_code: countryCode,
      currency: countryCode === 'IN' ? 'INR' : 'USD',
      is_qualified: qualified,
      rejection_reason: rejectionReason,
      qualification_score: score,
    });

    if (qualified) {
      return res.status(200).json({
        qualified: true,
        score,
        applicantId: row?.id,
      });
    } else {
      return res.status(200).json({
        qualified: false,
        score,
        reason: rejectionReason,
        applicantId: row?.id,
      });
    }
  } catch (err) {
    console.error('[qualify]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
