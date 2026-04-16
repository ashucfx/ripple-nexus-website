import { setCors, handleOptions, sbInsert, sbSelect, escapeHtml, checkRateLimit } from './_cors.js';
import nodemailer from 'nodemailer';

// ── Per-applicant in-process lock (prevents concurrent double-booking) ────
// Same pattern as the rate limiter: in-memory, per cold-start instance.
// The slot claim is already atomic via DB PATCH; this lock eliminates the
// window between the duplicate-check SELECT and the PATCH itself.
const _bookingInProgress = new Set();

/**
 * POST /api/scheduler/book
 * Body: { applicantId, paymentDbId, slotId, timezone, fullName, email }
 *
 * Security:
 *  - Verifies payment belongs to applicant (ownership check)
 *  - Prevents duplicate bookings per applicant
 *  - Marks slot unavailable atomically via conditional PATCH
 *  - HTML-escapes user input in all email/calendar strings
 */

// ── Google Calendar / Meet ─────────────────────────────────────────────────

async function createGoogleMeetLink({ slotDate, startTime, endTime, attendeeEmail, attendeeName }) {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey  = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  const calendarId  = process.env.GOOGLE_CALENDAR_ID || 'primary';

  if (!clientEmail || !privateKey) return null;

  try {
    const { createSign } = await import('crypto');
    const now   = Math.floor(Date.now() / 1000);
    const claim = {
      iss:   clientEmail,
      scope: 'https://www.googleapis.com/auth/calendar',
      aud:   'https://oauth2.googleapis.com/token',
      iat:   now,
      exp:   now + 3600,
    };

    const header  = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
    const payload = Buffer.from(JSON.stringify(claim)).toString('base64url');
    const signer  = createSign('RSA-SHA256');
    signer.update(`${header}.${payload}`);
    const sig = signer.sign(privateKey, 'base64url');
    const jwt = `${header}.${payload}.${sig}`;

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
    });
    const { access_token } = await tokenRes.json();
    if (!access_token) return null;

    const dateTimeStart = `${slotDate}T${startTime}:00+05:30`;
    const dateTimeEnd   = `${slotDate}T${endTime}:00+05:30`;

    const event = {
      summary:     `Ripple Nexus Consultation — ${attendeeName}`,
      description: 'Premium strategy consultation booked via Ripple Nexus Scheduler.',
      start:       { dateTime: dateTimeStart, timeZone: 'Asia/Kolkata' },
      end:         { dateTime: dateTimeEnd,   timeZone: 'Asia/Kolkata' },
      attendees:   [
        { email: 'info@theripplenexus.com' },
        { email: attendeeEmail, displayName: attendeeName },
      ],
      conferenceData: {
        createRequest: {
          requestId:             `rns-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      reminders: {
        useDefault: false,
        overrides:  [
          { method: 'email', minutes: 1440 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    const evRes = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?conferenceDataVersion=1&sendUpdates=all`,
      {
        method:  'POST',
        headers: { Authorization: `Bearer ${access_token}`, 'Content-Type': 'application/json' },
        body:    JSON.stringify(event),
      }
    );

    if (!evRes.ok) {
      console.error('[google-calendar] event creation failed:', await evRes.text());
      return null;
    }
    const created = await evRes.json();
    return {
      eventId:  created.id,
      meetLink: created.hangoutLink || created.conferenceData?.entryPoints?.[0]?.uri || null,
    };
  } catch (e) {
    console.error('[google-calendar]', e.message);
    return null;
  }
}

// ── Confirmation Email ────────────────────────────────────────────────────

function formatDate(slotDate, startTime) {
  try {
    return new Date(`${slotDate}T${startTime}:00+05:30`).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch {
    return slotDate;
  }
}

async function sendConfirmationEmail({ fullName, email, slotDate, startTime, endTime, timezone, meetLink }) {
  const dateLabel   = formatDate(slotDate, startTime);
  const safeName    = escapeHtml(fullName);
  const safeMeet    = meetLink && /^https:\/\//.test(meetLink) ? meetLink : null;
  const safeTimezone = escapeHtml(timezone);

  const transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST || 'mail.privateemail.com',
    port:   parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth:   { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;margin:0;padding:40px 20px;color:#0f172a}
  .wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0}
  .hdr{background:#020610;padding:36px;text-align:center;border-bottom:4px solid #1f56d4}
  .hdr h1{color:#fff;margin:0;font-size:22px;font-weight:700}
  .hdr p{color:#94a3b8;margin:6px 0 0;font-size:13px;letter-spacing:1px;text-transform:uppercase}
  .body{padding:40px}
  .hi{font-size:18px;font-weight:600;color:#1e293b;margin-bottom:8px}
  .sub{color:#64748b;margin-bottom:32px;line-height:1.6}
  .card{background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #1f56d4;border-radius:12px;padding:20px;margin-bottom:14px}
  .label{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;font-weight:700;margin-bottom:6px}
  .value{font-size:15px;font-weight:600;color:#0f172a}
  .meet-btn{display:inline-block;background:#1f56d4;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:700;font-size:15px;margin:20px 0}
  .footer{background:#f1f5f9;padding:20px;text-align:center;font-size:12px;color:#64748b;border-top:1px solid #e2e8f0}
</style></head>
<body><div class="wrap">
  <div class="hdr"><h1>Consultation Confirmed</h1><p>Ripple Nexus Scheduler</p></div>
  <div class="body">
    <div class="hi">Hi ${safeName},</div>
    <div class="sub">Your premium strategy consultation is confirmed. We've reserved this time exclusively for your problem.</div>
    <div class="card"><div class="label">Date</div><div class="value">${escapeHtml(dateLabel)}</div></div>
    <div class="card"><div class="label">Time (IST)</div><div class="value">${escapeHtml(startTime)} – ${escapeHtml(endTime)} IST &nbsp;·&nbsp; Your timezone: ${safeTimezone}</div></div>
    ${safeMeet
      ? `<div class="card" style="border-left-color:#3FBD8B"><div class="label">Google Meet</div><div class="value"><a href="${safeMeet}" style="color:#1f56d4">${safeMeet}</a></div></div><a href="${safeMeet}" class="meet-btn">Join Google Meet</a>`
      : `<div class="card" style="border-left-color:#f59e0b"><div class="label">Meeting Link</div><div class="value">Will be emailed 24 hours before the session</div></div>`}
    <p style="color:#64748b;font-size:13px;margin-top:28px">Need to reschedule? Reply to this email at least 24 hours in advance.</p>
  </div>
  <div class="footer">Ripple Nexus &nbsp;·&nbsp; info@theripplenexus.com</div>
</div></body></html>`;

  await transporter.sendMail({
    from:    `"Ripple Nexus" <${process.env.SMTP_USER}>`,
    to:      email,
    cc:      'info@theripplenexus.com',
    subject: `Confirmed: Your Consultation on ${dateLabel}`,
    html,
  });
}

// ── Main handler ──────────────────────────────────────────────────────────

export default async function handler(req, res) {
  setCors(res);
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { applicantId, paymentDbId, slotId, timezone, fullName, email } = req.body || {};

    // ── Input validation ──────────────────────────────────────────
    if (!applicantId || !paymentDbId || !slotId || !timezone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (typeof applicantId !== 'string' || applicantId.length > 100) {
      return res.status(400).json({ error: 'Invalid applicantId' });
    }
    if (typeof paymentDbId !== 'string' || paymentDbId.length > 100) {
      return res.status(400).json({ error: 'Invalid paymentDbId' });
    }
    if (typeof slotId !== 'string' || slotId.length > 100) {
      return res.status(400).json({ error: 'Invalid slotId' });
    }
    if (typeof timezone !== 'string' || timezone.length > 100) {
      return res.status(400).json({ error: 'Invalid timezone' });
    }
    const emailOk = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // ── Per-applicant lock: reject concurrent booking attempts ────
    // Guards the window between the duplicate-check SELECT and the slot PATCH.
    // try/finally guarantees the lock is always released.
    if (_bookingInProgress.has(applicantId)) {
      return res.status(429).json({ error: 'A booking is already being processed for this account. Please wait a moment.' });
    }
    _bookingInProgress.add(applicantId);

    try {
      // ── Ownership check: payment must belong to this applicant ──
      const paymentRows = await sbSelect('rns_payments', {
        id:     `eq.${paymentDbId}`,
        select: 'id,applicant_id,status',
      });
      if (!paymentRows.length) {
        return res.status(404).json({ error: 'Payment record not found' });
      }
      const payment = paymentRows[0];
      if (payment.applicant_id !== applicantId) {
        return res.status(403).json({ error: 'Payment does not belong to this applicant' });
      }
      if (payment.status !== 'completed') {
        return res.status(402).json({ error: 'Payment not completed. Please complete payment first.' });
      }

      // ── Duplicate booking check ─────────────────────────────────
      const existing = await sbSelect('rns_bookings', {
        applicant_id: `eq.${applicantId}`,
        status:       'neq.cancelled',
        select:       'id',
      });
      if (existing.length > 0) {
        return res.status(409).json({ error: 'You already have a confirmed booking. Check your email for details.' });
      }

      // ── Atomic slot claim via conditional PATCH ─────────────────
      // Supabase: PATCH with filter is atomic at row level; only updates if is_available=true
      const SB_URL  = process.env.SUPABASE_URL;
      const SB_KEY  = process.env.SUPABASE_SERVICE_KEY;
      const patchUrl = new URL(`${SB_URL}/rest/v1/rns_slots`);
      patchUrl.searchParams.set('id',           `eq.${slotId}`);
      patchUrl.searchParams.set('is_available', 'eq.true');

      const patchRes = await fetch(patchUrl.toString(), {
        method:  'PATCH',
        headers: {
          apikey:         SB_KEY,
          Authorization:  `Bearer ${SB_KEY}`,
          'Content-Type': 'application/json',
          'Prefer':       'return=representation',
        },
        body: JSON.stringify({ is_available: false }),
      });

      if (!patchRes.ok) {
        return res.status(500).json({ error: 'Could not claim slot' });
      }
      const claimedSlots = await patchRes.json();
      if (!claimedSlots || claimedSlots.length === 0) {
        return res.status(409).json({ error: 'This slot was just taken. Please choose another time.' });
      }
      const slot = claimedSlots[0];

      // ── Google Calendar (non-blocking) ──────────────────────────
      const gcal = fullName && emailOk
        ? await createGoogleMeetLink({
            slotDate:      slot.slot_date,
            startTime:     slot.start_time,
            endTime:       slot.end_time,
            attendeeEmail: email,
            attendeeName:  fullName,
          })
        : null;

      // ── Create booking row ──────────────────────────────────────
      const booking = await sbInsert('rns_bookings', {
        applicant_id:    applicantId,
        payment_id:      paymentDbId,
        slot_id:         slotId,
        slot_date:       slot.slot_date,
        slot_start_time: slot.start_time,
        client_timezone: timezone,
        google_event_id: gcal?.eventId  || null,
        meet_link:       gcal?.meetLink || null,
        status:          'confirmed',
      });

      // ── Send confirmation email ─────────────────────────────────
      // Only send nodemailer if Google Calendar did NOT create an event —
      // when Calendar is configured, sendUpdates=all already emails attendees.
      const shouldSendEmail = emailOk && fullName && !gcal?.eventId;
      if (shouldSendEmail) {
        sendConfirmationEmail({
          fullName,
          email,
          slotDate:  slot.slot_date,
          startTime: slot.start_time,
          endTime:   slot.end_time,
          timezone,
          meetLink:  gcal?.meetLink || null,
        }).catch((e) => console.error('[book] email error:', e.message));
      }

      return res.status(200).json({
        success:      true,
        bookingId:    booking.id,
        slotDate:     slot.slot_date,
        startTime:    slot.start_time,
        endTime:      slot.end_time,
        meetLink:     gcal?.meetLink || null,
        calendarSync: !!gcal?.eventId,
      });
    } finally {
      // Always release the lock — on success, error, or any early return
      _bookingInProgress.delete(applicantId);
    }
  } catch (err) {
    console.error('[book]', err);
    return res.status(500).json({ error: err.message || 'Booking failed' });
  }
}
