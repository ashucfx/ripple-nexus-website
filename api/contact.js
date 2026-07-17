import nodemailer from 'nodemailer';

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
      project_description 
    } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.privateemail.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5fa; margin: 0; padding: 40px 20px; color: #0a0b14; }
          .wrapper { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.06); overflow: hidden; border: 1px solid #e2e8f0; }
          .header { background: #0a0b14; padding: 40px; text-align: center; border-bottom: 4px solid #7c5cff; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px; text-transform: uppercase; }
          .header p { color: #9ba2be; font-size: 13px; margin: 8px 0 0 0; text-transform: uppercase; letter-spacing: 1px; }
          
          .content { padding: 45px 40px; }
          .greeting { font-size: 17px; color: #2a2e44; line-height: 1.6; margin-bottom: 35px; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; font-weight: 500; }
          
          .grid { display: grid; gap: 20px; }
          .row { background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; border-left: 4px solid #7c5cff; }
          .row.highlight { background: #f0fdf4; border-left: 4px solid #10b981; border-color: #bbf7d0; }
          
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #64748b; font-weight: 700; margin-bottom: 6px; }
          .value { font-size: 16px; color: #0f172a; font-weight: 500; word-break: break-word; }
          .value a { color: #7c5cff; text-decoration: none; font-weight: 600; }
          
          .box { margin-top: 30px; background: #ffffff; border: 1px solid #e2e8f0; padding: 25px; border-radius: 8px; }
          .box-label { font-size: 12px; font-weight: 700; color: #0a0b14; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          .box-text { font-size: 15px; color: #475569; line-height: 1.6; }
          
          .footer { background: #f8fafc; padding: 25px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; font-weight: 400; line-height: 1.6; }
          .footer strong { color: #0a0b14; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header">
            <h1>Architecture Strategy Session</h1>
            <p>Ripple Nexus Enterprise Systems</p>
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
                  <a href="tel:${phone ? phone.replace(/\s+/g, '') : ''}" style="color: #475569; font-weight: 500;">${phone || 'No phone provided'}</a>
                </div>
              </div>
              
              <div class="row">
                <div class="label">Organization Details</div>
                <div class="value">${company_name || 'N/A'} &nbsp;•&nbsp; ${business_stage || 'N/A'}</div>
              </div>
              
              <div class="row">
                <div class="label">Digital Footprint</div>
                <div class="value">${business_website && business_website !== 'N/A' ? `<a href="${business_website}">${business_website}</a>` : 'No URL Provided'}</div>
              </div>
              
              <!-- Core Intent Highlights -->
              <div class="row highlight">
                <div class="label" style="color: #059669;">Primary Objective</div>
                <div class="value" style="color: #065f46; font-size: 17px; font-weight: 600;">${primary_challenge || 'N/A'}</div>
              </div>
              
              <div class="row highlight" style="border-left-color: #6366f1; background: #eef2ff; border-color: #c7d2fe;">
                <div class="label" style="color: #4f46e5;">Budget & Timeline</div>
                <div class="value" style="color: #3730a3; font-size: 17px; font-weight: 600;">${budget_range || 'N/A'} &nbsp;|&nbsp; ${timeline || 'N/A'}</div>
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
      subject: `New Project Lead: ${full_name} - ${company_name || 'Consultation'}`,
      html: htmlTemplate,
    });

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
