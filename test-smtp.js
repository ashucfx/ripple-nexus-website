import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

console.log("Testing connection with:", process.env.SMTP_USER, process.env.SMTP_HOST);

transporter.verify(function (error, success) {
  if (error) {
    console.error("SMTP AUTH ERROR:", error);
    process.exit(1);
  } else {
    console.log("SUCCESS: Server is ready to take our messages!");
    process.exit(0);
  }
});
