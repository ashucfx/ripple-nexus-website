import crypto from 'crypto';
import { setCors, handleOptions, sbUpdate, sbSelect, getSetting } from './_cors.js';

/**
 * POST /api/scheduler/verify-payment
 *
 * Razorpay: { provider, orderId, paymentId, signature, dbPaymentId }
 * PayPal:   { provider, orderId, dbPaymentId }
 *
 * Security: verifies signature/capture AND amount.
 */

// ── Razorpay ──────────────────────────────────────────────────────────────

function verifyRazorpaySignature(orderId, paymentId, signature) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) throw new Error('RAZORPAY_KEY_SECRET not set');
  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

async function fetchRazorpayPayment(paymentId) {
  const keyId     = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const auth      = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  const res = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  if (!res.ok) throw new Error('Could not fetch Razorpay payment details');
  return res.json();
}

// ── PayPal ────────────────────────────────────────────────────────────────

async function getPayPalToken() {
  const clientId     = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const baseUrl      = process.env.PAYPAL_MODE === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com';

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res  = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method:  'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    'grant_type=client_credentials',
  });
  if (!res.ok) throw new Error('PayPal auth failed');
  const { access_token } = await res.json();
  return { token: access_token, baseUrl };
}

async function capturePayPalOrder(orderId) {
  const { token, baseUrl } = await getPayPalToken();
  const res = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}/capture`, {
    method:  'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.message || 'PayPal capture failed');
  }
  return res.json();
}

// ── Handler ───────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  setCors(res);
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { provider, orderId, paymentId, signature, dbPaymentId } = req.body || {};

    if (!provider || !orderId || !dbPaymentId) {
      return res.status(400).json({ error: 'provider, orderId, dbPaymentId required' });
    }

    // Verify the DB payment record exists and belongs to an applicant
    const paymentRows = await sbSelect('rns_payments', {
      id: `eq.${dbPaymentId}`,
      select: 'id,applicant_id,amount,currency,status',
    });
    if (!paymentRows.length) {
      return res.status(404).json({ error: 'Payment record not found' });
    }
    const dbPayment = paymentRows[0];

    // Prevent double-verification
    if (dbPayment.status === 'completed') {
      return res.status(200).json({ verified: true, paymentId: dbPayment.payment_id, alreadyVerified: true });
    }

    // Fetch expected fee from settings for amount validation
    const feeUsd = Number(await getSetting('consultation_fee_usd', 199));
    const feeInr = Number(await getSetting('consultation_fee_inr', 4999));
    const expectedAmount = provider === 'razorpay' ? feeInr : feeUsd;
    const tolerance      = expectedAmount * 0.01; // 1% tolerance for rounding

    let capturedPaymentId = paymentId;
    let rawData = {};

    if (provider === 'razorpay') {
      if (!paymentId || !signature) {
        return res.status(400).json({ error: 'paymentId and signature required for Razorpay' });
      }

      // 1. Verify signature
      const valid = verifyRazorpaySignature(orderId, paymentId, signature);
      if (!valid) {
        return res.status(400).json({ error: 'Invalid payment signature — possible tampering detected' });
      }

      // 2. Fetch actual payment to verify amount
      const rzpPayment = await fetchRazorpayPayment(paymentId);
      const paidAmount = rzpPayment.amount / 100; // paise → INR
      if (Math.abs(paidAmount - expectedAmount) > tolerance) {
        console.error(`[verify] Razorpay amount mismatch: paid=${paidAmount}, expected=${expectedAmount}`);
        return res.status(400).json({ error: 'Payment amount does not match — contact support' });
      }
      if (rzpPayment.status !== 'captured') {
        return res.status(400).json({ error: `Payment not captured (status: ${rzpPayment.status})` });
      }

      rawData = rzpPayment;

    } else if (provider === 'paypal') {
      // Capture order
      const capture = await capturePayPalOrder(orderId);
      if (capture.status !== 'COMPLETED') {
        return res.status(400).json({ error: `PayPal capture incomplete (${capture.status})` });
      }

      // Verify currency and amount
      const unit = capture.purchase_units?.[0];
      if (!unit) {
        return res.status(400).json({ error: 'PayPal response missing purchase_units' });
      }
      if (unit.amount?.currency_code !== 'USD') {
        return res.status(400).json({ error: 'Invalid payment currency' });
      }
      const paidAmount = Number(unit.amount.value);
      if (Math.abs(paidAmount - expectedAmount) > tolerance) {
        console.error(`[verify] PayPal amount mismatch: paid=${paidAmount}, expected=${expectedAmount}`);
        return res.status(400).json({ error: 'Payment amount does not match — contact support' });
      }

      capturedPaymentId = capture.id;
      rawData           = capture;

    } else {
      return res.status(400).json({ error: 'Unknown payment provider' });
    }

    // Mark payment completed in DB
    await sbUpdate('rns_payments', { id: dbPaymentId }, {
      payment_id:  capturedPaymentId,
      status:      'completed',
      raw_data:    rawData,
      updated_at:  new Date().toISOString(),
    });

    return res.status(200).json({ verified: true, paymentId: capturedPaymentId });
  } catch (err) {
    console.error('[verify-payment]', err);
    return res.status(500).json({ error: err.message || 'Verification failed' });
  }
}
