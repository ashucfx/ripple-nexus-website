import nodemailer from 'nodemailer';
import crypto from 'crypto';

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
      summary:     `Ripple Nexus Strategy Session — ${attendeeName}`,
      description: 'Priority Strategy Session with Ripple Nexus Enterprise.',
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

    if (!evRes.ok) return null;
    
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

export default async function handler(req, res) {
  // CORS Headers for Vercel Serverless
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { leadId, slotId, timezone } = req.body;
    
    if (!leadId || !slotId) {
      return res.status(400).json({ error: 'Missing leadId or slotId' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
    
    // 1. Get Slot Details
    const slotRes = await fetch(`${supabaseUrl}/rest/v1/rns_slots?id=eq.${slotId}`, {
      headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
    });
    const slots = await slotRes.json();
    if (!slots || slots.length === 0) throw new Error("Slot not found");
    const slot = slots[0];

    // 2. Get Lead Details
    const leadRes = await fetch(`${supabaseUrl}/rest/v1/rns_leads?id=eq.${leadId}`, {
      headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
    });
    const leads = await leadRes.json();
    if (!leads || leads.length === 0) throw new Error("Lead not found");
    const lead = leads[0];

    // 3. Claim Slot (Atomic)
    const patchRes = await fetch(`${supabaseUrl}/rest/v1/rns_slots?id=eq.${slotId}&is_available=eq.true`, {
      method: 'PATCH',
      headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}`, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
      body: JSON.stringify({ is_available: false })
    });
    const claimedSlots = await patchRes.json();
    if (!claimedSlots || claimedSlots.length === 0) {
      return res.status(409).json({ error: 'This slot was just taken.' });
    }

    // 4. Google Calendar (non-blocking)
    const gcal = await createGoogleMeetLink({
      slotDate: slot.slot_date,
      startTime: slot.start_time,
      endTime: slot.end_time || '10:00', // fallback if null
      attendeeEmail: lead.email,
      attendeeName: lead.full_name,
    });

    // 5. Create Booking
    const bookingId = crypto.randomUUID();
    await fetch(`${supabaseUrl}/rest/v1/rns_bookings`, {
      method: 'POST',
      headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: bookingId,
        applicant_id: null, 
        lead_id: leadId || null,
        slot_id: slotId,
        slot_date: slot.slot_date,
        slot_start_time: slot.start_time,
        client_timezone: timezone || 'UTC',
        google_event_id: gcal?.eventId || null,
        meet_link: gcal?.meetLink || null,
        status: 'confirmed',
        admin_notes: `Lead ID: ${leadId}`
      })
    });

    // 6. Send Email Confirmation
    if (!gcal?.eventId) {
      // Only send if GCal didn't already send an invite
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'mail.privateemail.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: true,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });

      const htmlTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #7c5cff;">Strategy Session Confirmed</h2>
          <p>Hi ${lead.full_name},</p>
          <p>Your Strategy Session with Ripple Nexus has been confirmed.</p>
          <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Date:</strong> ${slot.slot_date}</p>
            <p><strong>Time:</strong> ${slot.start_time}</p>
            <p><strong>Timezone:</strong> ${timezone}</p>
          </div>
          <p>We will send you a calendar invitation with the meeting link shortly.</p>
          <p>Best regards,<br>The Ripple Nexus Team</p>
        </div>
      `;

      await transporter.sendMail({
        from: `"Ripple Nexus" <${process.env.SMTP_USER}>`,
        to: lead.email,
        subject: `Confirmed: Ripple Nexus Strategy Session - ${slot.slot_date}`,
        html: htmlTemplate,
      });
    }

    res.status(200).json({ success: true, message: 'Booking successful' });
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
