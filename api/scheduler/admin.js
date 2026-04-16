import {
  setCors, handleOptions, sbSelect, sbInsert, sbUpdate,
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
      const [applicants, payments, bookings] = await Promise.all([
        sbSelect('rns_applicants', { select: 'id,is_qualified,created_at' }),
        sbSelect('rns_payments',   { select: 'id,status,amount,currency' }),
        sbSelect('rns_bookings',   { select: 'id,status' }),
      ]);

      const totalApplicants   = applicants.length;
      const qualified         = applicants.filter((a) => a.is_qualified).length;
      const completedPayments = payments.filter((p) => p.status === 'completed');
      const revenue           = completedPayments.reduce((s, p) => s + Number(p.amount), 0);
      const confirmedBookings = bookings.filter((b) => b.status === 'confirmed').length;

      return res.status(200).json({
        totalApplicants,
        qualified,
        rejected:          totalApplicants - qualified,
        qualificationRate: totalApplicants ? Math.round((qualified / totalApplicants) * 100) : 0,
        completedPayments: completedPayments.length,
        revenue,
        confirmedBookings,
        conversionRate:    totalApplicants ? Math.round((confirmedBookings / totalApplicants) * 100) : 0,
      });
    }

    // ── Applicants list (from flat view) ───────────────────────────
    if (action === 'applicants') {
      const rows = await sbSelect('rns_admin_overview', {
        order: 'created_at.desc',
        limit: '200',
      });
      return res.status(200).json({ applicants: rows || [] });
    }

    // ── Settings ───────────────────────────────────────────────────
    if (action === 'settings') {
      const rows = await sbSelect('rns_settings', { select: 'key,value' });
      const settings = {};
      rows.forEach((r) => { settings[r.key] = r.value; });
      return res.status(200).json({ settings });
    }

    if (action === 'update-setting') {
      const { key, value } = body;
      if (!key || typeof key !== 'string') {
        return res.status(400).json({ error: 'key required' });
      }
      const numVal = Number(value);
      if (isNaN(numVal) || numVal < 0) {
        return res.status(400).json({ error: 'value must be a positive number' });
      }
      await sbUpdate('rns_settings', { key }, {
        value: String(numVal),
        updated_at: new Date().toISOString(),
      });
      return res.status(200).json({ success: true });
    }

    // ── Slot management ────────────────────────────────────────────
    if (action === 'slots') {
      const from = body.from || new Date().toISOString().slice(0, 10);
      const rows = await sbSelect('rns_slots', {
        slot_date: `gte.${from}`,
        order: 'slot_date.asc,start_time.asc',
      });
      return res.status(200).json({ slots: rows || [] });
    }

    if (action === 'add-slot') {
      const { date, startTime, endTime } = body;
      if (!date || !startTime || !endTime) {
        return res.status(400).json({ error: 'date, startTime, endTime required' });
      }
      // Validate date is today or future
      if (date < new Date().toISOString().slice(0, 10)) {
        return res.status(400).json({ error: 'Cannot add slots in the past' });
      }
      // Validate time ordering
      if (endTime <= startTime) {
        return res.status(400).json({ error: 'endTime must be after startTime' });
      }
      const slot = await sbInsert('rns_slots', {
        slot_date:        date,
        start_time:       startTime,
        end_time:         endTime,
        duration_minutes: 60,
        is_available:     true,
      });
      return res.status(200).json({ success: true, slot });
    }

    if (action === 'toggle-slot') {
      const { slotId, isAvailable } = body;
      if (!slotId) return res.status(400).json({ error: 'slotId required' });
      await sbUpdate('rns_slots', { id: slotId }, { is_available: Boolean(isAvailable) });
      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: `Unknown action: ${action}` });
  } catch (err) {
    console.error('[admin]', err);
    return res.status(500).json({ error: err.message || 'Admin error' });
  }
}
