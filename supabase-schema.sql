-- ══════════════════════════════════════════════════════════════════════
--  Ripple Nexus Scheduler (RNS) — Supabase PostgreSQL Schema
--  Run this in Supabase SQL Editor: https://app.supabase.com → SQL Editor
-- ══════════════════════════════════════════════════════════════════════

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ──────────────────────────────────────────────────────────────────────
-- 1. Applicants
-- ──────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rns_applicants (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name           TEXT        NOT NULL,
  email               TEXT        NOT NULL,
  linkedin_url        TEXT,
  applicant_role      TEXT,
  problem             TEXT        NOT NULL,
  budget_range        TEXT        NOT NULL,
  budget_numeric      NUMERIC(12,2) DEFAULT 0,
  urgency             TEXT        NOT NULL,
  country             TEXT,
  country_code        TEXT,
  currency            TEXT        DEFAULT 'USD',
  is_qualified        BOOLEAN     DEFAULT false,
  rejection_reason    TEXT,
  qualification_score INTEGER     DEFAULT 0,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rns_applicants_email       ON rns_applicants(email);
CREATE INDEX IF NOT EXISTS idx_rns_applicants_qualified   ON rns_applicants(is_qualified);
CREATE INDEX IF NOT EXISTS idx_rns_applicants_created     ON rns_applicants(created_at DESC);

-- ──────────────────────────────────────────────────────────────────────
-- 2. Payments
-- ──────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rns_payments (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_id        UUID        REFERENCES rns_applicants(id) ON DELETE SET NULL,
  payment_provider    TEXT        NOT NULL CHECK (payment_provider IN ('razorpay', 'paypal')),
  payment_id          TEXT,               -- provider's payment/transaction ID
  order_id            TEXT,               -- provider's order ID
  amount              NUMERIC(10,2) NOT NULL,
  currency            TEXT        NOT NULL,
  status              TEXT        DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  raw_data            JSONB,              -- full webhook/capture payload for audit
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rns_payments_applicant ON rns_payments(applicant_id);
CREATE INDEX IF NOT EXISTS idx_rns_payments_status    ON rns_payments(status);

-- ──────────────────────────────────────────────────────────────────────
-- 3. Time Slots  (admin-managed availability)
-- ──────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rns_slots (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_date           DATE        NOT NULL,
  start_time          TIME        NOT NULL,
  end_time            TIME        NOT NULL,
  duration_minutes    INTEGER     DEFAULT 60,
  is_available        BOOLEAN     DEFAULT true,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(slot_date, start_time)
);

CREATE INDEX IF NOT EXISTS idx_rns_slots_date      ON rns_slots(slot_date);
CREATE INDEX IF NOT EXISTS idx_rns_slots_available ON rns_slots(is_available, slot_date);

-- ──────────────────────────────────────────────────────────────────────
-- 4. Bookings
-- ──────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rns_bookings (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_id        UUID        REFERENCES rns_applicants(id) ON DELETE SET NULL,
  payment_id          UUID        REFERENCES rns_payments(id) ON DELETE SET NULL,
  slot_id             UUID        REFERENCES rns_slots(id) ON DELETE SET NULL,
  slot_date           DATE        NOT NULL,     -- denormalized for fast queries
  slot_start_time     TIME        NOT NULL,
  client_timezone     TEXT        NOT NULL DEFAULT 'Asia/Kolkata',
  google_event_id     TEXT,
  meet_link           TEXT,
  status              TEXT        DEFAULT 'confirmed'
                                  CHECK (status IN ('confirmed', 'cancelled', 'rescheduled', 'completed', 'no_show')),
  admin_notes         TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rns_bookings_applicant ON rns_bookings(applicant_id);
CREATE INDEX IF NOT EXISTS idx_rns_bookings_date      ON rns_bookings(slot_date);
CREATE INDEX IF NOT EXISTS idx_rns_bookings_status    ON rns_bookings(status);

-- ──────────────────────────────────────────────────────────────────────
-- 5. Admin Settings (key-value store)
-- ──────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rns_settings (
  key         TEXT    PRIMARY KEY,
  value       JSONB   NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default settings
INSERT INTO rns_settings (key, value) VALUES
  ('budget_threshold_usd',      '1000'),
  ('budget_threshold_inr',      '75000'),
  ('consultation_fee_usd',      '199'),
  ('consultation_fee_inr',      '1999'),
  ('min_description_length',    '60'),
  ('session_duration_minutes',  '60')
ON CONFLICT (key) DO NOTHING;

-- ──────────────────────────────────────────────────────────────────────
-- 6. Seed sample time slots for the next 30 days
--    (Run this to bootstrap the calendar — adjust as needed)
-- ──────────────────────────────────────────────────────────────────────
DO $$
DECLARE
  v_slot_date DATE;
  v_day_offset INTEGER;
BEGIN
  FOR v_day_offset IN 0..29 LOOP
    v_slot_date := CURRENT_DATE + v_day_offset;
    -- Skip weekends (0 = Sunday, 6 = Saturday)
    IF EXTRACT(DOW FROM v_slot_date) NOT IN (0, 6) THEN
      INSERT INTO rns_slots (slot_date, start_time, end_time, duration_minutes)
      VALUES
        (v_slot_date, '09:00', '10:00', 60),
        (v_slot_date, '11:00', '12:00', 60),
        (v_slot_date, '14:00', '15:00', 60),
        (v_slot_date, '16:00', '17:00', 60)
      ON CONFLICT (slot_date, start_time) DO NOTHING;
    END IF;
  END LOOP;
END;
$$;

-- ──────────────────────────────────────────────────────────────────────
-- 7. Row Level Security — disable for service role (server-side only)
--    Enable if you ever expose these tables to the frontend directly
-- ──────────────────────────────────────────────────────────────────────
ALTER TABLE rns_applicants DISABLE ROW LEVEL SECURITY;
ALTER TABLE rns_payments   DISABLE ROW LEVEL SECURITY;
ALTER TABLE rns_slots      DISABLE ROW LEVEL SECURITY;
ALTER TABLE rns_bookings   DISABLE ROW LEVEL SECURITY;
ALTER TABLE rns_settings   DISABLE ROW LEVEL SECURITY;

-- ──────────────────────────────────────────────────────────────────────
-- 8. Helper views for the admin panel
-- ──────────────────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW rns_admin_overview AS
SELECT
  a.id,
  a.full_name,
  a.email,
  a.country,
  a.budget_range,
  a.urgency,
  a.is_qualified,
  a.qualification_score,
  a.rejection_reason,
  a.created_at,
  p.id            AS payment_row_id,
  p.payment_provider,
  p.amount        AS payment_amount,
  p.currency      AS payment_currency,
  p.status        AS payment_status,
  b.id            AS booking_id,
  b.slot_date,
  b.slot_start_time,
  b.client_timezone,
  b.meet_link,
  b.status        AS booking_status
FROM  rns_applicants a
LEFT JOIN rns_payments p ON p.applicant_id = a.id AND p.status = 'completed'
LEFT JOIN rns_bookings b ON b.applicant_id = a.id AND b.status <> 'cancelled'
ORDER BY a.created_at DESC;
