import {
  setCors, handleOptions, sbSelect, sbInsert, sbUpdate, sbDelete, sbTruncate,
  generateAdminToken, verifyAdminToken, checkRateLimit,
} from './_cors.js';

/**
 * Multi-action admin API
 * POST /api/scheduler/admin  { action, token, ...payload }
 */

export default async function handler(req, res) {
  setCors(res);
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const { action, token } = body;

    if (typeof action !== 'string') {
      return res.status(400).json({ error: 'action must be a string' });
    }

    // ── Login (no auth required, but rate-limited) ─────────────────
    if (action === 'login') {
      const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
      const limit = checkRateLimit(ip, 'admin-login', 5, 60_000); // 5 per minute
      if (!limit.allowed) {
        return res.status(429).json({
          error: `Too many login attempts. Try again in ${limit.resetIn}s.`,
        });
      }

      const adminPass = process.env.RNS_ADMIN_PASSWORD;
      if (!adminPass) {
        return res.status(500).json({ error: 'RNS_ADMIN_PASSWORD env var not set' });
      }
      if (body.password !== adminPass) {
        return res.status(401).json({
          error: 'Invalid password',
          attemptsLeft: limit.remaining,
        });
      }
      return res.status(200).json({ token: generateAdminToken() });
    }

    // ── All other actions require valid HMAC token ─────────────────
    if (!token || typeof token !== 'string' || !verifyAdminToken(token)) {
      return res.status(401).json({ error: 'Unauthorized or session expired' });
    }

    // ── Stats ──────────────────────────────────────────────────────
    if (action === 'stats') {
      const leads = await sbSelect('rns_leads', { select: 'id,budget_range,created_at,is_decision_maker' });
      
      const totalLeads = leads.length;
      
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const oneWeekAgoStr = oneWeekAgo.toISOString();
      const leadsThisWeek = leads.filter(l => l.created_at >= oneWeekAgoStr).length;
      
      const highBudgetLeads = leads.filter(l => 
        l.budget_range && 
        (l.budget_range.includes('150k') || l.budget_range.includes('500k') || l.budget_range.includes('15,00,000') ||
         l.budget_range.includes('5k_20k') || l.budget_range.includes('20k_50k') || l.budget_range.includes('above_50k'))
      ).length;
      
      const decisionMakers = leads.filter(l => l.is_decision_maker === true || l.is_decision_maker === 'true').length;

      return res.status(200).json({
        totalLeads,
        leadsThisWeek,
        highBudgetLeads,
        decisionMakers,
      });
    }

    // ── Leads list ─────────────────────────────────────────────────
    if (action === 'leads') {
      const rows = await sbSelect('rns_leads', {
        order: 'created_at.desc',
        limit: '500',
      });
      return res.status(200).json({ leads: rows || [] });
    }

    if (action === 'delete-lead') {
      const { leadId } = body;
      if (!leadId) return res.status(400).json({ error: 'leadId required' });
      await sbDelete('rns_leads', { id: leadId });
      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: `Unknown action: ${action}` });
  } catch (err) {
    console.error('[admin]', err);
    return res.status(500).json({ error: err.message || 'Admin error' });
  }
}
