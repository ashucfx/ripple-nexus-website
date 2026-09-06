import nodemailer from 'nodemailer';
import crypto from 'crypto';

export default async function handler(req, res) {
  // CORS Headers for Vercel Serverless
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      full_name, 
      email,
      phone,
      company_name, 
      business_website, 
      business_stage, 
      primary_challenge, 
      budget_range, 
      timeline, 
      project_description,
      is_decision_maker
    } = req.body;

    // --- Priority Scoring Algorithm ---
    let priority_score = 0;
    
    if (business_stage === '$10M+ (>₹80Cr)') priority_score += 50;
    else if (business_stage === '$1M-$10M (₹8Cr-₹80Cr)') priority_score += 30;
    else if (business_stage === '<$1M (<₹8Cr)') priority_score += 10;
    
    if (timeline === 'Immediate') priority_score += 20;
    else if (timeline === '1-3 months') priority_score += 10;
    
    if (is_decision_maker) priority_score += 10;
    
    const budgetStr = (budget_range || '').toLowerCase();
    if (budgetStr.includes('500k') || budgetStr.includes('150k') || budgetStr.includes('15,00,000') || budgetStr.includes('above_50k')) priority_score += 40;
    else if (budgetStr.includes('20k') || budgetStr.includes('5k')) priority_score += 20;

    const is_qualified = priority_score >= 60;
    // ----------------------------------

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.privateemail.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const leadId = crypto.randomUUID();
    const shortLeadId = `L-${leadId.substring(0, 8).toUpperCase()}`;

    // Save lead to Supabase database
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
    let dbSaved = false;
    let dbError = null;

    if (supabaseUrl && supabaseKey) {
      try {
        const dbRes = await fetch(`${supabaseUrl}/rest/v1/rns_leads`, {
          method: 'POST',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            id: leadId,
            full_name,
            email,
            phone: phone || null,
            company_name: company_name || null,
            business_website: business_website || null,
            business_stage: business_stage || null,
            primary_challenge: primary_challenge || null,
            budget_range: budget_range || null,
            timeline: timeline || null,
            project_description: project_description || null,
            priority_score,
            is_qualified,
            is_decision_maker: !!is_decision_maker
          })
        });

        if (!dbRes.ok) {
          const errText = await dbRes.text();
          dbError = `Supabase HTTP ${dbRes.status}: ${errText}`;
          console.error('[contact] Supabase lead save failed:', dbError);
        } else {
          dbSaved = true;
          console.log('[contact] Lead successfully inserted into Supabase rns_leads:', leadId);
        }
      } catch (err) {
        dbError = err.message;
        console.error('[contact] Supabase network/exec error:', err);
      }
    } else {
      dbError = 'SUPABASE_URL or SUPABASE_SERVICE_KEY is missing from environment variables';
      console.warn('[contact]', dbError);
    }

    const cleanDescription = (project_description || 'No description provided.')
      .replace(/\n/g, '<br/>');

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Client Intake Dossier</title>
      </head>
      <body style="margin: 0; padding: 30px 15px; background-color: #060709; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; margin: 0 auto; background-color: #0D0F16; border: 1px solid #1E2028; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
          
          <!-- Top Neon Edge -->
          <tr>
            <td height="3" style="background: linear-gradient(90deg, #00F0FF, #7C5CFF); line-height: 3px; font-size: 3px;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 32px 36px 24px 36px; border-bottom: 1px solid #1E2028;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 11px; font-weight: 700; color: #00F0FF; letter-spacing: 2px; text-transform: uppercase;">
                      [INTAKE DOSSIER // NEW INQUIRY]
                    </div>
                    <div style="font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px; margin-top: 6px; text-transform: uppercase;">
                      Ripple Nexus Control Plane
                    </div>
                  </td>
                  <td align="right" valign="top">
                    <span style="display: inline-block; padding: 4px 12px; background-color: #12141F; border: 1px solid #2A2E44; border-radius: 20px; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11px; color: #00F0FF; font-weight: 600;">
                      ${shortLeadId}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client Spotlight Card -->
          <tr>
            <td style="padding: 28px 36px; background-color: #10121D; border-bottom: 1px solid #1E2028;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 10px; color: #8E93A4; text-transform: uppercase; letter-spacing: 1.5px;">
                      Prospective Client
                    </div>
                    <div style="font-size: 20px; font-weight: 800; color: #FFFFFF; margin-top: 4px;">
                      ${full_name || 'Direct Inquiry'}
                    </div>
                    <div style="font-size: 13px; color: #00F0FF; margin-top: 2px; font-weight: 500;">
                      ${company_name || 'Organization Not Specified'}
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <a href="mailto:${email}?subject=Re:%20Ripple%20Nexus%20Technical%20Evaluation%20[${shortLeadId}]" style="display: inline-block; padding: 10px 18px; background-color: #FFFFFF; color: #000000; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11px; font-weight: 800; text-transform: uppercase; text-decoration: none; border-radius: 10px; letter-spacing: 1px;">
                      Reply Direct &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Key Metrics / Dossier Specs -->
          <tr>
            <td style="padding: 28px 36px 16px 36px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <!-- Email -->
                  <td width="50%" valign="top" style="padding-bottom: 20px; padding-right: 15px;">
                    <div style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 10px; color: #8E93A4; text-transform: uppercase; letter-spacing: 1px;">
                      Direct Email
                    </div>
                    <div style="font-size: 14px; font-weight: 600; color: #FFFFFF; margin-top: 4px;">
                      <a href="mailto:${email}" style="color: #00F0FF; text-decoration: none;">${email || 'None provided'}</a>
                    </div>
                  </td>
                  <!-- Phone / Contact -->
                  <td width="50%" valign="top" style="padding-bottom: 20px; padding-left: 15px;">
                    <div style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 10px; color: #8E93A4; text-transform: uppercase; letter-spacing: 1px;">
                      Contact Phone
                    </div>
                    <div style="font-size: 14px; font-weight: 600; color: #FFFFFF; margin-top: 4px;">
                      ${phone ? `<a href="tel:${phone}" style="color: #FFFFFF; text-decoration: none;">${phone}</a>` : '<span style="color: #555D75;">Not provided</span>'}
                    </div>
                  </td>
                </tr>
                <tr>
                  <!-- Objective -->
                  <td width="50%" valign="top" style="padding-bottom: 20px; padding-right: 15px;">
                    <div style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 10px; color: #8E93A4; text-transform: uppercase; letter-spacing: 1px;">
                      Primary Objective
                    </div>
                    <div style="font-size: 13px; font-weight: 600; color: #FFFFFF; margin-top: 4px; line-height: 1.4;">
                      ${primary_challenge || 'Custom Development'}
                    </div>
                  </td>
                  <!-- Timeline & Score -->
                  <td width="50%" valign="top" style="padding-bottom: 20px; padding-left: 15px;">
                    <div style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 10px; color: #8E93A4; text-transform: uppercase; letter-spacing: 1px;">
                      Timeline &amp; Priority
                    </div>
                    <div style="font-size: 13px; font-weight: 600; color: #FFFFFF; margin-top: 4px;">
                      ${timeline || 'Standard'} &nbsp;&bull;&nbsp; 
                      <span style="color: ${is_qualified ? '#00E599' : '#00F0FF'}; font-family: 'SFMono-Regular', Consolas, monospace;">
                        ${is_qualified ? 'HIGH INTENT' : 'STANDARD'}
                      </span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Technical Context & Scope -->
          <tr>
            <td style="padding: 0 36px 32px 36px;">
              <div style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 10px; color: #00F0FF; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px;">
                [CLIENT CONTEXT &amp; TECHNICAL REQUIREMENTS]
              </div>
              <div style="background-color: #08090C; border: 1px solid #1E2028; border-radius: 12px; padding: 20px; font-size: 13px; color: #D0D4E0; line-height: 1.7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                ${cleanDescription}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 36px; background-color: #07080D; border-top: 1px solid #1E2028; text-align: center;">
              <div style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 10px; color: #555D75; text-transform: uppercase; letter-spacing: 1px;">
                Ripple Nexus Systems &bull; Dispatched to info@theripplenexus.com &bull; Confidential
              </div>
            </td>
          </tr>

        </table>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Ripple Nexus Intake" <${process.env.SMTP_USER}>`,
      to: 'info@theripplenexus.com',
      replyTo: email,
      subject: `⚡ New Project Dossier: ${full_name} (${company_name || 'Direct Inquiry'}) — [${shortLeadId}]`,
      html: htmlTemplate,
    });

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!',
      leadId,
      is_qualified,
      dbSaved,
      dbError
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
