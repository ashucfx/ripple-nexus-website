// Shared CORS + JSON helpers for all scheduler serverless functions
import crypto from 'crypto';

export function setCors(res) {
  // Use specific origin instead of wildcard — wildcard + credentials is rejected by browsers
  const origin = process.env.SITE_URL || 'https://www.theripplenexus.com';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT,PATCH,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Accept, Content-Type, Authorization'
  );
}

export function handleOptions(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}

// ── Supabase REST helpers (no extra package required) ─────────────────────

const SB_URL  = () => process.env.SUPABASE_URL;
const SB_KEY  = () => process.env.SUPABASE_SERVICE_KEY;

function sbHeaders(extra = {}) {
  return {
    apikey: SB_KEY(),
    Authorization: `Bearer ${SB_KEY()}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
    ...extra,
  };
}

/** SELECT rows: returns array */
export async function sbSelect(table, params = {}) {
  const url = new URL(`${SB_URL()}/rest/v1/${table}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
  const r = await fetch(url.toString(), { headers: sbHeaders({ Prefer: '' }) });
  if (!r.ok) throw new Error(`sbSelect(${table}): ${await r.text()}`);
  return r.json();
}

/** INSERT one row: returns inserted row */
export async function sbInsert(table, body) {
  const r = await fetch(`${SB_URL()}/rest/v1/${table}`, {
    method: 'POST',
    headers: sbHeaders(),
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`sbInsert(${table}): ${await r.text()}`);
  const rows = await r.json();
  const row = Array.isArray(rows) ? rows[0] : rows;
  if (!row?.id) throw new Error(`sbInsert(${table}): no row returned`);
  return row;
}

/** PATCH rows matching filter: returns array of updated rows */
export async function sbUpdate(table, filter, body) {
  const url = new URL(`${SB_URL()}/rest/v1/${table}`);
  Object.entries(filter).forEach(([k, v]) => url.searchParams.append(k, `eq.${v}`));
  const r = await fetch(url.toString(), {
    method: 'PATCH',
    headers: sbHeaders(),
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`sbUpdate(${table}): ${await r.text()}`);
  return r.json();
}

/** Get a single setting value */
export async function getSetting(key, fallback = null) {
  try {
    const rows = await sbSelect('rns_settings', { key: `eq.${key}`, select: 'value' });
    if (!rows.length) return fallback;
    const val = rows[0].value;
    return typeof val === 'string' ? JSON.parse(val) : val;
  } catch {
    return fallback;
  }
}

// ── Secure admin token (HMAC-SHA256, no password in token) ───────────────

const TOKEN_SECRET = () => process.env.RNS_ADMIN_PASSWORD + '_rns_secret_2025';

export function generateAdminToken() {
  const payload = { iat: Date.now(), exp: Date.now() + 86_400_000 }; // 24h
  const data     = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig      = crypto.createHmac('sha256', TOKEN_SECRET()).update(data).digest('base64url');
  return `${data}.${sig}`;
}

export function verifyAdminToken(token) {
  try {
    const [data, sig] = token.split('.');
    if (!data || !sig) return false;
    const expected = crypto.createHmac('sha256', TOKEN_SECRET()).update(data).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return false;
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

// ── Simple in-memory rate limiter (per IP, resets on cold start) ──────────
const _rateLimitMap = new Map();

export function checkRateLimit(ip, action, maxAttempts = 5, windowMs = 60_000) {
  const key   = `${ip}:${action}`;
  const now   = Date.now();
  const entry = _rateLimitMap.get(key) || { count: 0, resetAt: now + windowMs };

  if (now > entry.resetAt) {
    entry.count   = 0;
    entry.resetAt = now + windowMs;
  }

  entry.count++;
  _rateLimitMap.set(key, entry);

  return {
    allowed:    entry.count <= maxAttempts,
    remaining:  Math.max(0, maxAttempts - entry.count),
    resetIn:    Math.ceil((entry.resetAt - now) / 1000),
  };
}

// ── Simple HTML escaping for user-controlled strings in emails ────────────
export function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ── Date format validator (YYYY-MM-DD) ────────────────────────────────────
export function isValidDate(str) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) return false;
  const d = new Date(str);
  return d instanceof Date && !isNaN(d.getTime());
}
