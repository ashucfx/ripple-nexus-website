# Ripple Nexus Web Application

The official frontend and API repository for Ripple Nexus. This project is a React-based web application utilizing Vite, Tailwind CSS, and a unified Vercel Serverless architecture.

## Tech Stack
- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Routing**: React Router (v6)
- **Backend Edge**: Vercel Serverless Functions (`/api/*`)
- **Email Delivery**: Node.js `nodemailer`

## Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

## Local Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file in the root directory to connect the local proxy to your email service:
   ```env
   SMTP_HOST=mail.privateemail.com
   SMTP_PORT=465
   SMTP_USER=info@theripplenexus.com
   SMTP_PASS="your-password-here"
   ```

3. **Start the Development Servers**
   To run the Vite frontend and local Node proxy concurrently:
   ```bash
   npm run dev
   # In a second terminal, run the API endpoint simulator:
   node server.js
   ```

## Production Deployment (Vercel)

This repository is configured for a single, unified deployment on Vercel. 
The Vercel build engine will automatically compile the Vite frontend and detect the `api/contact.js` file, converting it into an infinitely scaling Serverless Function.

1. Connect the repository to your Vercel Dashboard.
2. In the Vercel **Project Settings > Environment Variables**, add your four `SMTP_...` keys from your local `.env.local` file.
3. Deploy the `main` branch. 

No separate backend hosting is required.
