import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ── Existing routes ───────────────────────────────────────────────────────
const { default: contactHandler } = await import('./api/contact.js');
app.post('/api/contact', (req, res) => contactHandler(req, res));

// ── RNS Scheduler routes ──────────────────────────────────────────────────
const { default: detectCountry }  = await import('./api/scheduler/detect-country.js');
const { default: qualify }        = await import('./api/scheduler/qualify.js');
const { default: createOrder }    = await import('./api/scheduler/create-order.js');
const { default: verifyPayment }  = await import('./api/scheduler/verify-payment.js');
const { default: slots }          = await import('./api/scheduler/slots.js');
const { default: book }           = await import('./api/scheduler/book.js');
const { default: admin }          = await import('./api/scheduler/admin.js');

function route(handler) {
  return async (req, res) => {
    try { await handler(req, res); }
    catch (err) { console.error(err); res.status(500).json({ error: 'Local server error' }); }
  };
}

app.all('/api/scheduler/detect-country', route(detectCountry));
app.all('/api/scheduler/qualify',        route(qualify));
app.all('/api/scheduler/create-order',   route(createOrder));
app.all('/api/scheduler/verify-payment', route(verifyPayment));
app.all('/api/scheduler/slots',          route(slots));
app.all('/api/scheduler/book',           route(book));
app.all('/api/scheduler/admin',          route(admin));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`[RNS Dev Server] Running on http://localhost:${PORT}`);
  console.log(`[RNS Dev Server] Scheduler API: http://localhost:${PORT}/api/scheduler/*`);
});
