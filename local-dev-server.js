import express from 'express';
import cors from 'cors';
import handler from './api/contact.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Proxy the Vercel Serverless Function locally for Vite
app.post('/api/contact', async (req, res) => {
  try {
    await handler(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Local Test Error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`[TEST HARNESS] Local Vercel Simulator running on http://localhost:${PORT}`);
});
