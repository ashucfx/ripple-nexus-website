import { setCors, handleOptions, sbSelect } from './_cors.js';

/**
 * GET /api/scheduler/slots?from=YYYY-MM-DD&to=YYYY-MM-DD
 * Returns available time slots within the date range.
 */
export default async function handler(req, res) {
  setCors(res);
  if (handleOptions(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const today = new Date().toISOString().slice(0, 10);
    let from  = req.query?.from || today;
    let to    = req.query?.to   || offsetDate(today, 30);

    // Sanitize: must be YYYY-MM-DD, cap range at 90 days
    if (!/^\d{4}-\d{2}-\d{2}$/.test(from)) from = today;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(to))   to   = offsetDate(today, 30);
    if (to < from) to = offsetDate(from, 30);
    if (offsetDate(from, 90) < to) to = offsetDate(from, 90);

    // Fetch available slots in range
    // Supabase REST: for range filters use the 'and' query param
    const SB_URL  = process.env.SUPABASE_URL;
    const SB_KEY  = process.env.SUPABASE_SERVICE_KEY;
    const url = new URL(`${SB_URL}/rest/v1/rns_slots`);
    url.searchParams.set('select', 'id,slot_date,start_time,end_time,duration_minutes');
    url.searchParams.set('slot_date', `gte.${from}`);
    url.searchParams.set('and', `(slot_date.lte.${to},is_available.eq.true)`);
    url.searchParams.set('order', 'slot_date.asc,start_time.asc');

    const r = await fetch(url.toString(), {
      headers: {
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    const slots = r.ok ? await r.json() : [];

    // Remove slots that are already booked (join not possible via REST GET, so check separately)
    const bookedSlotIds = await getBookedSlotIds(from, to);
    const bookedSet = new Set(bookedSlotIds);

    const available = (slots || []).filter(
      (s) => !bookedSet.has(s.id) && s.slot_date >= today
    );

    return res.status(200).json({ slots: available });
  } catch (err) {
    console.error('[slots]', err);
    return res.status(500).json({ error: 'Could not load slots', slots: [] });
  }
}

async function getBookedSlotIds(from, to) {
  try {
    const bookings = await sbSelect('rns_bookings', {
      select: 'slot_id',
      slot_date: `gte.${from}`,
      and: `(slot_date.lte.${to})`,
      status: 'neq.cancelled',
    });
    return (bookings || []).map((b) => b.slot_id).filter(Boolean);
  } catch {
    return [];
  }
}

function offsetDate(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
