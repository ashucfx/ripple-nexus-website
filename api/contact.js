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

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Inter', -apple-system, sans-serif; background-color: #f4f4f5; margin: 0; padding: 40px 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); overflow: hidden; }
          .header { background: #000000; padding: 30px 40px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px; }
          .body { padding: 40px; }
          .intro { font-size: 16px; color: #52525b; line-height: 1.6; margin-bottom: 30px; }
          .data-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
          .data-item { border-bottom: 1px solid #e4e4e7; padding-bottom: 15px; }
          .data-item:last-child { border-bottom: none; }
          .label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #a1a1aa; font-weight: 600; margin-bottom: 5px; }
          .value { font-size: 15px; color: #18181b; font-weight: 500; }
          .description-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; font-size: 14px; color: #334155; line-height: 1.6; margin-top: 5px; }
          .footer { background: #fafafa; border-top: 1px solid #e4e4e7; padding: 20px; text-align: center; font-size: 13px; color: #71717a; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Lead Alert: Ripple Nexus</h1>
          </div>
          <div class="body">
            <p class="intro">A new project consultation request has been submitted via the website.</p>
            <div class="data-grid">
              <div class="data-item"><div class="label">Client Name</div><div class="value">${full_name || 'N/A'}</div></div>
              <div class="data-item"><div class="label">Company Details</div><div class="value">${company_name || 'N/A'} — Stage: ${business_stage || 'N/A'}</div></div>
              <div class="data-item"><div class="label">Website / LinkedIn</div><div class="value">${business_website ? `<a href="${business_website}">${business_website}</a>` : 'N/A'}</div></div>
              <div class="data-item"><div class="label">Primary Challenge / Service Needed</div><div class="value">${primary_challenge || 'N/A'}</div></div>
              <div class="data-item"><div class="label">Budget & Timeline</div><div class="value">Budget: ${budget_range || 'N/A'} | Timeline: ${timeline || 'N/A'}</div></div>
              <div class="data-item"><div class="label">Project / Goals Description</div><div class="description-box">${project_description || 'N/A'}</div></div>
            </div>
          </div>
          <div class="footer">Automated via Vercel Serverless Architecture.</div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: '"Ripple Nexus Notifier" <no-reply@theripplenexus.com>',
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
