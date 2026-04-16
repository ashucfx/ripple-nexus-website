// ─── Ripple Nexus Scheduler (RNS) — Shared Types ───────────────────────────

export type SchedulerStep =
  | 'landing'
  | 'qualification'
  | 'rejection'
  | 'pricing'
  | 'payment'
  | 'booking'
  | 'confirmation';

// ── Country / Pricing ─────────────────────────────────────────────────────

export interface BudgetOption {
  label: string;
  value: string;
  numericValue: number; // always in USD equivalent for threshold logic
}

export interface CountryInfo {
  country: string;
  countryCode: string;
  isIndia: boolean;
  currency: 'INR' | 'USD';
  symbol: string;
  consultationFee: number;   // INR or USD depending on country
  budgetOptions: BudgetOption[];
  minBudgetUsdEquivalent: number; // minimum qualifying budget in USD
}

// ── Qualification ─────────────────────────────────────────────────────────

export type UrgencyLevel = 'immediate' | '1-3months' | '3-6months' | 'exploring';

export interface QualificationFormData {
  fullName: string;
  email: string;
  linkedinUrl: string;
  currentRole: string;
  problem: string;
  budgetRange: string;
  budgetNumericValue: number;
  urgency: UrgencyLevel;
}

export interface QualificationResult {
  qualified: boolean;
  score: number;           // 0-100
  reason?: string;         // rejection reason if not qualified
  applicantId?: string;    // Supabase row UUID
}

// ── Payment ───────────────────────────────────────────────────────────────

export type PaymentProvider = 'razorpay' | 'paypal';
export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface RazorpayOrderData {
  orderId: string;
  amount: number;   // in paise (INR)
  currency: 'INR';
  key: string;
}

export interface PayPalOrderData {
  orderId: string;
  amount: number;   // in USD cents
  currency: 'USD';
}

export interface PaymentData {
  provider: PaymentProvider;
  orderId: string;
  paymentId?: string;       // set after capture
  signature?: string;       // Razorpay only
  amount: number;
  currency: string;
  status: PaymentStatus;
  dbPaymentId?: string;     // Supabase payment row UUID
}

// ── Booking ───────────────────────────────────────────────────────────────

export interface TimeSlot {
  id: string;
  date: string;        // 'YYYY-MM-DD'
  startTime: string;   // 'HH:MM' in IST/admin timezone
  endTime: string;
  isAvailable: boolean;
}

export interface BookingData {
  slotId: string;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  meetLink?: string;
  bookingId?: string;  // Supabase booking row UUID
}

// ── Scheduler State Machine ────────────────────────────────────────────────

export interface SchedulerState {
  step: SchedulerStep;
  country?: CountryInfo;
  applicantData?: QualificationFormData;
  applicantId?: string;
  rejectionReason?: string;
  qualificationScore?: number;
  paymentData?: PaymentData;
  bookingData?: BookingData;
}

// ── Admin ─────────────────────────────────────────────────────────────────

export interface AdminSettings {
  budget_threshold_usd: number;
  budget_threshold_inr: number;
  consultation_fee_usd: number;
  consultation_fee_inr: number;
  min_description_length: number;
  session_duration_minutes: number;
}

// Flat shape matching the rns_admin_overview Supabase view
export interface AdminApplicant {
  id: string;
  full_name: string;
  email: string;
  linkedin_url: string;
  applicant_role: string;
  problem: string;
  budget_range: string;
  urgency: string;
  country: string;
  is_qualified: boolean;
  rejection_reason: string | null;
  qualification_score: number;
  created_at: string;
  // Payment fields (null if no payment yet)
  payment_status: string | null;
  payment_provider: string | null;
  payment_amount: number | null;
  payment_currency: string | null;
  // Booking fields (null if no booking yet)
  booking_status: string | null;
  slot_date: string | null;
  slot_start_time: string | null;
  client_timezone: string | null;
  meet_link: string | null;
}
