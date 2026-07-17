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
    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/rns_leads`, {
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
            phone,
            company_name,
            business_website,
            business_stage,
            primary_challenge,
            budget_range,
            timeline,
            project_description,
            priority_score,
            is_qualified,
            is_decision_maker: !!is_decision_maker
          })
        });
      } catch (err) {
        console.error("Failed to save lead to database:", err);
        // Continue to send email even if DB insert fails
      }
    }

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #06070a; margin: 0; padding: 40px 20px; color: #fdfdfd; }
          .wrapper { max-width: 640px; margin: 0 auto; background: #0a0b14; border-radius: 12px; box-shadow: 0 16px 40px rgba(0,0,0,0.4); overflow: hidden; border: 1px solid #1a1c29; }
          .header { background: #0a0b14; padding: 40px; text-align: center; border-bottom: 2px solid #1a1c29; position: relative; }
          .header::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, #7c5cff, #22d3ee, transparent); }
          .header h1 { color: #fdfdfd; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
          .header p { color: #7c5cff; font-size: 11px; margin: 8px 0 0 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600; }
          
          .content { padding: 45px 40px; background: #0a0b14; }
          .greeting { font-size: 16px; color: #e2e8f0; line-height: 1.6; margin-bottom: 35px; border-bottom: 1px solid #1a1c29; padding-bottom: 20px; }
          .greeting strong { color: #fdfdfd; }
          
          .grid { display: grid; gap: 20px; }
          .row { background: #12141c; padding: 20px; border-radius: 8px; border: 1px solid #1a1c29; border-left: 3px solid #7c5cff; }
          .row.highlight { background: #12141c; border-left: 3px solid #22d3ee; }
          
          .label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #828a9f; font-weight: 700; margin-bottom: 8px; }
          .value { font-size: 15px; color: #fdfdfd; font-weight: 500; word-break: break-word; }
          .value a { color: #7c5cff; text-decoration: none; font-weight: 600; }
          
          .box { margin-top: 30px; background: #12141c; border: 1px solid #1a1c29; padding: 25px; border-radius: 8px; }
          .box-label { font-size: 11px; font-weight: 700; color: #fdfdfd; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
          .box-text { font-size: 14px; color: #a1a8c2; line-height: 1.7; }
          
          .footer { background: #06070a; padding: 25px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #1a1c29; font-weight: 400; line-height: 1.6; }
          .footer strong { color: #fdfdfd; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header">
            <h1>Architecture Strategy Session</h1>
            <p>Lead ID: ${shortLeadId} &nbsp;•&nbsp; Ripple Nexus Enterprise</p>
          </div>
          
          <div class="content">
            <div class="greeting">
              <strong>${full_name || 'A prospective client'}</strong> has requested an Architecture Strategy Session.
            </div>
            
            <div class="grid">
              <div class="row">
                <div class="label">Client Identity</div>
                <div class="value">
                  <a href="mailto:${email || ''}">${email || 'No email provided'}</a><br/>
                  <span style="color: #a1a8c2; font-size: 14px; display: inline-block; margin-top: 4px;">${phone || 'No phone provided'}</span>
                </div>
              </div>
              
              <div class="row">
                <div class="label">Organization Details</div>
                <div class="value">${company_name || 'N/A'} &nbsp;<span style="color: #64748b;">•</span>&nbsp; ${business_stage || 'N/A'}</div>
              </div>
              
              <div class="row">
                <div class="label">Digital Footprint</div>
                <div class="value">${business_website && business_website !== 'N/A' ? `<a href="${business_website}">${business_website}</a>` : 'No URL Provided'}</div>
              </div>
              
              <div class="row highlight">
                <div class="label" style="color: #22d3ee;">Primary Objective</div>
                <div class="value" style="color: #fdfdfd; font-size: 16px; font-weight: 600;">${primary_challenge || 'N/A'}</div>
              </div>
              
              <div class="row highlight" style="border-left-color: #3fbd8b;">
                <div class="label" style="color: #3fbd8b;">Budget & Timeline</div>
                <div class="value" style="color: #fdfdfd; font-size: 16px; font-weight: 600;">${budget_range || 'N/A'} &nbsp;<span style="color: #64748b;">|</span>&nbsp; ${timeline || 'N/A'}</div>
              </div>
            </div>
            
            <div class="box">
              <div class="box-label">Technical Scope & Project Description</div>
              <div class="box-text">${project_description ? project_description.replace(/\\n/g, '<br/>') : 'No description provided by the client.'}</div>
            </div>
          </div>
          
          <div class="footer">
            This lead was securely processed by <strong>Ripple Nexus Systems (RNS)</strong>.<br/>
            To manage this lead, map data, or update access passwords, please log in to the <strong>RNS Admin Dashboard</strong>.
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Ripple Nexus Notifier" <${process.env.SMTP_USER}>`,
      to: 'info@theripplenexus.com',
      subject: `New Lead [${shortLeadId}]: ${full_name} - ${company_name || 'Consultation'}`,
      html: htmlTemplate,
    });

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!',
      leadId,
      is_qualified 
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
