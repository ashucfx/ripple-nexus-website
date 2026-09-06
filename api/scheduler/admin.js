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

      const adminPass = process.env.ADMIN_PASSWORD || process.env.RNS_ADMIN_PASSWORD;
      if (!adminPass) {
        return res.status(500).json({ error: 'ADMIN_PASSWORD env var not set' });
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
      let leads = [];
      let bookings = [];
      let dbWarning = null;

      try {
        leads = await sbSelect('rns_leads', { select: '*' });
      } catch (err) {
        console.warn('[admin] rns_leads query failed:', err.message);
        dbWarning = `Table 'rns_leads' issue (${err.message}). Run the ALTER TABLE migration in Supabase SQL Editor.`;
      }

      try {
        bookings = await sbSelect('rns_bookings', { select: 'id,status' });
      } catch (err) {
        console.warn('[admin] rns_bookings query failed:', err.message);
      }
      
      const totalLeads = leads?.length || 0;
      const qualifiedLeads = leads?.filter?.(l => l.is_qualified)?.length || 0;
      
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const oneWeekAgoStr = oneWeekAgo.toISOString();
      const leadsThisWeek = leads?.filter?.(l => l.created_at >= oneWeekAgoStr)?.length || 0;
      
      const highBudgetLeads = leads?.filter?.(l => 
        l.budget_range && 
        (l.budget_range.includes('150k') || l.budget_range.includes('500k') || l.budget_range.includes('15,00,000') ||
         l.budget_range.includes('5k_20k') || l.budget_range.includes('20k_50k') || l.budget_range.includes('above_50k'))
      )?.length || 0;
      
      const decisionMakers = leads?.filter?.(l => l.is_decision_maker === true || l.is_decision_maker === 'true')?.length || 0;
      const upcomingBookings = bookings?.filter?.(b => b.status === 'confirmed')?.length || 0;

      return res.status(200).json({
        totalLeads,
        leadsThisWeek,
        highBudgetLeads,
        decisionMakers,
        qualifiedLeads,
        upcomingBookings,
        dbWarning
      });
    }

    // ── Leads list ─────────────────────────────────────────────────
    if (action === 'leads') {
      try {
        const rows = await sbSelect('rns_leads', {
          order: 'created_at.desc',
          limit: '500',
        });
        return res.status(200).json({ leads: rows || [] });
      } catch (err) {
        console.error('[admin] leads fetch error:', err.message);
        return res.status(200).json({
          leads: [],
          dbWarning: `Table 'rns_leads' not detected in database (${err.message}). Run supabase-schema.sql in your Supabase SQL Editor.`
        });
      }
    }

    if (action === 'delete-lead') {
      const { leadId } = body;
      if (!leadId) return res.status(400).json({ error: 'leadId required' });
      await sbDelete('rns_leads', { id: leadId });
      return res.status(200).json({ success: true });
    }

    // ── Slots list ─────────────────────────────────────────────────
    if (action === 'slots') {
      const rows = await sbSelect('rns_slots', {
        order: 'slot_date.asc,start_time.asc',
        limit: '500',
      });
      return res.status(200).json({ slots: rows || [] });
    }

    if (action === 'add-slot') {
      const { slot_date, start_time, end_time } = body;
      if (!slot_date || !start_time || !end_time) return res.status(400).json({ error: 'Missing fields' });
      await sbInsert('rns_slots', { slot_date, start_time, end_time, is_available: true });
      return res.status(200).json({ success: true });
    }

    if (action === 'delete-slot') {
      const { slotId } = body;
      if (!slotId) return res.status(400).json({ error: 'slotId required' });
      await sbDelete('rns_slots', { id: slotId });
      return res.status(200).json({ success: true });
    }

    // ── Bookings list ──────────────────────────────────────────────
    if (action === 'bookings') {
      // Need a custom query if we wanted joins, but sbSelect is basic. 
      // We will just return rns_bookings and let frontend handle it or do a basic fetch.
      const SB_URL = process.env.SUPABASE_URL;
      const SB_KEY = process.env.SUPABASE_SERVICE_KEY;
      const url = `${SB_URL}/rest/v1/rns_bookings?select=*,rns_leads(full_name,email,company_name)&order=slot_date.desc`;
      
      const response = await fetch(url, { headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` } });
      const rows = await response.json();
      return res.status(200).json({ bookings: rows || [] });
    }

    return res.status(400).json({ error: `Unknown action: ${action}` });
  } catch (err) {
    console.error('[admin]', err);
    return res.status(500).json({ error: err.message || 'Admin error' });
  }
}
