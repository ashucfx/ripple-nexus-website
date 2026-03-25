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

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { 
      full_name, 
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

    const htmlTemplate = \`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 40px 20px; color: #0f172a; }
          .wrapper { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid #e2e8f0; }
          .header { background: #020610; padding: 40px; text-align: center; border-bottom: 4px solid #3b82f6; }
          .header h1 { color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px; text-transform: uppercase; }
          .header p { color: #94a3b8; font-size: 14px; margin: 8px 0 0 0; text-transform: uppercase; letter-spacing: 1px; }
          
          .content { padding: 45px 40px; }
          .greeting { font-size: 18px; color: #334155; line-height: 1.6; margin-bottom: 35px; border-bottom: 2px dashed #f1f5f9; padding-bottom: 20px; font-weight: 500; }
          
          .grid { display: grid; gap: 25px; }
          .row { background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; border-left: 4px solid #3b82f6; }
          .row.highlight { background: #eff6ff; border-left: 4px solid #10b981; border-color: #bfdbfe; }
          
          .label { font-size: 12px; text-transform: uppercase; letter-spacing: 1.2px; color: #64748b; font-weight: 700; margin-bottom: 8px; }
          .value { font-size: 16px; color: #0f172a; font-weight: 600; word-break: break-word; }
          .value a { color: #2563eb; text-decoration: none; }
          
          .box { margin-top: 30px; background: #ffffff; border: 1px solid #e2e8f0; padding: 25px; border-radius: 12px; }
          .box-label { font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          .box-text { font-size: 15px; color: #475569; line-height: 1.7; }
          
          .footer { background: #f1f5f9; padding: 25px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; font-weight: 500; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header">
            <h1>New Project Lead</h1>
            <p>Ripple Nexus Routing Architecture</p>
          </div>
          
          <div class="content">
            <div class="greeting">
              \${full_name || 'A prospective client'} has requested a technical consultation.
            </div>
            
            <div class="grid">
              <div class="row">
                <div class="label">Company / Stage</div>
                <div class="value">\${company_name || 'N/A'} &nbsp;•&nbsp; \${business_stage || 'N/A'}</div>
              </div>
              
              <div class="row">
                <div class="label">Digital Footprint</div>
                <div class="value">\${business_website && business_website !== 'N/A' ? \`<a href="\${business_website}">\${business_website}</a>\` : 'No URL Provided'}</div>
              </div>
              
              <!-- Core Intent Highlights -->
              <div class="row highlight">
                <div class="label" style="color: #059669;">Primary Objective</div>
                <div class="value" style="color: #065f46; font-size: 18px;">\${primary_challenge || 'N/A'}</div>
              </div>
              
              <div class="row highlight" style="border-left-color: #6366f1; background: #eef2ff;">
                <div class="label" style="color: #4f46e5;">Budget & Timeline</div>
                <div class="value" style="color: #3730a3; font-size: 18px;">\${budget_range || 'N/A'} &nbsp;|&nbsp; \${timeline || 'N/A'}</div>
              </div>
            </div>
            
            <div class="box">
              <div class="box-label">Technical Scope & Project Description</div>
              <div class="box-text">\${project_description || 'No description provided by the client.'}</div>
            </div>
          </div>
          
          <div class="footer">
            This lead was securely captured and aggressively routed by Navik AI.
          </div>
        </div>
      </body>
      </html>
    \`;

    await transporter.sendMail({
      from: `"Ripple Nexus Notifier" <${process.env.SMTP_USER}>`,
      to: 'info@theripplenexus.com',
      subject: `New Project Lead: ${full_name} - ${company_name || 'Consultation'}`,
      html: htmlTemplate,
    });

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
}
