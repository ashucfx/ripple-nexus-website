import { setCors, handleOptions } from './_cors.js';

// Simple in-process cache: one entry per IP, 1-hour TTL.
// Avoids burning the 1000 req/day ipapi.co free-tier limit on repeated loads.
const _ipCache = new Map(); // ip → { countryCode, countryName, expiresAt }
const IP_CACHE_TTL_MS = 3_600_000; // 1 hour

/**
 * GET /api/scheduler/detect-country
 * Detects visitor country from IP via ipapi.co (free, no API key needed).
 * Returns { country, countryCode, isIndia }
 */
export default async function handler(req, res) {
  setCors(res);
  if (handleOptions(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract real IP from Vercel headers
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.headers['x-real-ip'] ||
      req.socket?.remoteAddress ||
      '';

    // Strip IPv6 loopback / localhost
    const cleanIp = ip === '::1' || ip === '127.0.0.1' || ip === '' ? '' : ip;

    let countryCode = 'US';
    let countryName = 'United States';

    if (cleanIp) {
      // Check cache first (avoids burning the 1000 req/day ipapi.co free tier)
      const cached = _ipCache.get(cleanIp);
      if (cached && cached.expiresAt > Date.now()) {
        countryCode = cached.countryCode;
        countryName = cached.countryName;
      } else {
        // ipapi.co — 1000 free req/day, no key required
        const ipRes = await fetch(`https://ipapi.co/${cleanIp}/json/`, {
          headers: { 'User-Agent': 'RippleNexusScheduler/1.0' },
        });

        if (ipRes.ok) {
          const data = await ipRes.json();
          if (data.country_code && !data.error) {
            countryCode = data.country_code;
            countryName = data.country_name || data.country_code;
            _ipCache.set(cleanIp, {
              countryCode,
              countryName,
              expiresAt: Date.now() + IP_CACHE_TTL_MS,
            });
          }
        }
      }
    }

    return res.status(200).json({
      countryCode,
      country: countryName,
      isIndia: countryCode === 'IN',
    });
  } catch (err) {
    console.error('[detect-country]', err);
    // Graceful fallback — assume international
    return res.status(200).json({
      countryCode: 'US',
      country: 'United States',
      isIndia: false,
    });
  }
}
