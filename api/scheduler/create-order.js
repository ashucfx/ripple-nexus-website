import { setCors, handleOptions, sbInsert, getSetting, checkRateLimit } from './_cors.js';

/**
 * POST /api/scheduler/create-order
 * Body: { provider: 'razorpay' | 'paypal', applicantId, currency, countryCode }
 *
 * Razorpay: creates an order and returns { orderId, amount, currency, key }
 * PayPal:   creates an order and returns { orderId, approveUrl }
 */

// ── Razorpay ─────────────────────────────────────────────────────────────

async function createRazorpayOrder(amountInr) {
  const keyId     = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) throw new Error('Razorpay credentials not configured');

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: Math.round(amountInr * 100), // paise
      currency: 'INR',
      receipt: `rns_${Date.now()}`,
      payment_capture: 1,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.description || 'Razorpay order creation failed');
  }

  const order = await res.json();
  return { orderId: order.id, amount: order.amount, currency: 'INR', key: keyId };
}

// ── PayPal ────────────────────────────────────────────────────────────────

async function getPayPalToken() {
  const clientId     = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const baseUrl      = process.env.PAYPAL_MODE === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com';

  if (!clientId || !clientSecret) throw new Error('PayPal credentials not configured');

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) throw new Error('PayPal auth failed');
  const data = await res.json();
  return { token: data.access_token, baseUrl };
}

async function createPayPalOrder(amountUsd) {
  const { token, baseUrl } = await getPayPalToken();

  const res = await fetch(`${baseUrl}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amountUsd.toFixed(2),
          },
          description: 'Ripple Nexus Premium Consultation',
        },
      ],
      application_context: {
        brand_name: 'Ripple Nexus',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: `${process.env.SITE_URL || 'https://www.theripplenexus.com'}/#scheduler`,
        cancel_url: `${process.env.SITE_URL || 'https://www.theripplenexus.com'}/#scheduler`,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.message || 'PayPal order creation failed');
  }

  const order = await res.json();
  const approveUrl = order.links?.find((l) => l.rel === 'approve')?.href;
  return { orderId: order.id, approveUrl, amount: amountUsd, currency: 'USD' };
}

// ── Handler ───────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  setCors(res);
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Rate limiting: 5 orders per IP per 10 minutes ────────────────────────
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
  const rateCheck = checkRateLimit(ip, 'create-order', 5, 600_000);
  if (!rateCheck.allowed) {
    return res.status(429).json({ error: `Too many requests. Try again in ${rateCheck.resetIn}s.` });
  }

  try {
    const { provider, applicantId, countryCode } = req.body || {};

    if (!provider || !applicantId) {
      return res.status(400).json({ error: 'provider and applicantId required' });
    }
    if (typeof applicantId !== 'string' || applicantId.length > 100) {
      return res.status(400).json({ error: 'Invalid applicantId' });
    }
    if (provider !== 'razorpay' && provider !== 'paypal') {
      return res.status(400).json({ error: 'Invalid provider' });
    }

    // Fetch fee from settings
    const feeUsd = Number(await getSetting('consultation_fee_usd', 199));
    const feeInr = Number(await getSetting('consultation_fee_inr', 4999));

    let orderData;

    if (provider === 'razorpay') {
      orderData = await createRazorpayOrder(feeInr);
    } else if (provider === 'paypal') {
      orderData = await createPayPalOrder(feeUsd);
    } else {
      // Should not reach here due to validation above, but belt-and-suspenders
      return res.status(400).json({ error: 'Invalid provider' });
    }

    // Create a pending payment record
    const payment = await sbInsert('rns_payments', {
      applicant_id: applicantId,
      payment_provider: provider,
      order_id: orderData.orderId,
      amount: provider === 'razorpay' ? feeInr : feeUsd,
      currency: provider === 'razorpay' ? 'INR' : 'USD',
      status: 'pending',
    });

    return res.status(200).json({
      ...orderData,
      dbPaymentId: payment?.id,
    });
  } catch (err) {
    console.error('[create-order]', err);
    return res.status(500).json({ error: err.message || 'Order creation failed' });
  }
}
