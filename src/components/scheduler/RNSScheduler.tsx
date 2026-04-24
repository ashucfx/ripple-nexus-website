/**
 * Ripple Nexus Scheduler (RNS)
 * Fully embedded multi-step paid consultation booking funnel.
 *
 * Flow: Landing → Qualification → [Rejection | Pricing] → Payment → Booking → Confirmation
 *
 * Session recovery: if user refreshes after payment but before booking,
 * sessionStorage preserves the paid state so they can still book.
 */
import { useEffect, useReducer, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { buildCountryInfo } from '@/lib/rns-country';
import type {
  SchedulerState,
  SchedulerStep,
  CountryInfo,
  QualificationFormData,
  PaymentData,
  BookingData,
} from '@/lib/scheduler-types';

import LandingStep       from './LandingStep';
import QualificationStep from './QualificationStep';
import RejectionStep     from './RejectionStep';
import PricingStep       from './PricingStep';
import PaymentStep       from './PaymentStep';
import BookingStep       from './BookingStep';
import ConfirmationStep  from './ConfirmationStep';

const SESSION_KEY = 'rns_booking_session';

interface SessionPayload {
  applicantId: string;
  applicantData: QualificationFormData;
  paymentData: PaymentData;
}

function saveSession(payload: SessionPayload) {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload)); } catch {}
}

function loadSession(): SessionPayload | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SessionPayload;
    if (
      parsed?.paymentData?.status === 'completed' &&
      parsed?.paymentData?.dbPaymentId &&
      parsed?.applicantId
    ) return parsed;
  } catch {}
  return null;
}

function clearSession() {
  try { sessionStorage.removeItem(SESSION_KEY); } catch {}
}

const STEPS: { key: SchedulerStep; label: string }[] = [
  { key: 'qualification', label: 'Apply' },
  { key: 'pricing',       label: 'Review' },
  { key: 'payment',       label: 'Pay' },
  { key: 'booking',       label: 'Book' },
  { key: 'confirmation',  label: 'Confirmed' },
];

const PROGRESS_STEPS: SchedulerStep[] = ['qualification', 'pricing', 'payment', 'booking', 'confirmation'];

function ProgressBar({ step }: { step: SchedulerStep }) {
  const idx = PROGRESS_STEPS.indexOf(step);
  if (idx < 0) return null;
  const pct = ((idx + 1) / PROGRESS_STEPS.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 pt-8">
      <div className="flex justify-between mb-2">
        {STEPS.map((s, i) => (
          <span
            key={s.key}
            className="text-xs font-semibold"
            style={{ color: i <= idx ? 'var(--nexus-violet)' : 'var(--graphite-500)' }}
          >
            {s.label}
          </span>
        ))}
      </div>
      <div
        className="h-1 rounded-full overflow-hidden"
        style={{ background: 'var(--graphite-600)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #7C5CFF 0%, #22D3EE 100%)' }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

type Action =
  | { type: 'SET_COUNTRY';      country: CountryInfo }
  | { type: 'GOTO_QUALIFY' }
  | { type: 'QUALIFIED';        data: QualificationFormData; applicantId: string }
  | { type: 'REJECTED';         reason: string; score: number; data: QualificationFormData }
  | { type: 'GOTO_PAYMENT' }
  | { type: 'PAYMENT_SUCCESS';  payment: PaymentData }
  | { type: 'BOOKED';           booking: BookingData }
  | { type: 'BACK' };

function reducer(state: SchedulerState, action: Action): SchedulerState {
  switch (action.type) {
    case 'SET_COUNTRY':
      return { ...state, country: action.country };
    case 'GOTO_QUALIFY':
      return { ...state, step: 'qualification' };
    case 'QUALIFIED':
      return { ...state, step: 'pricing', applicantData: action.data, applicantId: action.applicantId };
    case 'REJECTED':
      return { ...state, step: 'rejection', applicantData: action.data, rejectionReason: action.reason, qualificationScore: action.score };
    case 'GOTO_PAYMENT':
      return { ...state, step: 'payment' };
    case 'PAYMENT_SUCCESS':
      return { ...state, step: 'booking', paymentData: action.payment };
    case 'BOOKED':
      return { ...state, step: 'confirmation', bookingData: action.booking };
    case 'BACK':
      if (state.step === 'qualification') return { ...state, step: 'landing' };
      if (state.step === 'pricing')       return { ...state, step: 'qualification' };
      if (state.step === 'payment')       return { ...state, step: 'pricing' };
      if (state.step === 'rejection')     return { ...state, step: 'qualification' };
      return state;
    default:
      return state;
  }
}

function buildInitialState(): SchedulerState {
  const saved = loadSession();
  if (saved) {
    return {
      step: 'booking',
      applicantId: saved.applicantId,
      applicantData: saved.applicantData,
      paymentData: saved.paymentData,
    };
  }
  return { step: 'landing' };
}

export default function RNSScheduler() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialState);

  useEffect(() => {
    fetch('/api/scheduler/detect-country')
      .then((r) => r.json())
      .then((d) => {
        const info = buildCountryInfo(d.countryCode, d.country, d.fees);
        dispatch({ type: 'SET_COUNTRY', country: info });
      })
      .catch(() => {
        dispatch({ type: 'SET_COUNTRY', country: buildCountryInfo('US', 'United States') });
      });
  }, []);

  useEffect(() => {
    if (
      state.step === 'booking' &&
      state.paymentData?.status === 'completed' &&
      state.paymentData?.dbPaymentId &&
      state.applicantId &&
      state.applicantData
    ) {
      saveSession({
        applicantId: state.applicantId,
        applicantData: state.applicantData,
        paymentData: state.paymentData,
      });
    }
    if (state.step === 'confirmation') clearSession();
  }, [state.step, state.paymentData, state.applicantId, state.applicantData]);

  useEffect(() => {
    if (state.step !== 'landing' && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [state.step]);

  const country = state.country ?? buildCountryInfo('US', 'United States');

  return (
    <section
      ref={sectionRef}
      id="rns-scheduler"
      className="relative min-h-screen"
      style={{
        background: 'var(--obsidian)',
        borderTop: '1px solid var(--graphite-600)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(60% 40% at 50% 0%, rgba(124,92,255,0.07) 0%, transparent 100%)',
        }}
      />

      {/* Session recovery banner */}
      {state.step === 'booking' && (() => {
        const saved = loadSession();
        return saved ? (
          <div className="max-w-2xl mx-auto px-4 pt-6">
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm"
              style={{
                background: 'rgba(163,230,53,0.08)',
                border: '1px solid rgba(163,230,53,0.25)',
                color: 'var(--quantum-lime)',
              }}
            >
              <span className="font-semibold">Payment confirmed.</span>
              <span style={{ color: 'var(--graphite-300)' }}>Your session was recovered — please select a booking slot below.</span>
            </div>
          </div>
        ) : null;
      })()}

      {state.step !== 'landing' && state.step !== 'rejection' && (
        <ProgressBar step={state.step} />
      )}

      <AnimatePresence mode="wait">
        {state.step === 'landing' && (
          <motion.div key="landing">
            <LandingStep onApply={() => dispatch({ type: 'GOTO_QUALIFY' })} />
          </motion.div>
        )}
        {state.step === 'qualification' && (
          <motion.div key="qualification">
            <QualificationStep
              country={country}
              onQualified={(data, id) => dispatch({ type: 'QUALIFIED', data, applicantId: id })}
              onRejected={(reason, score, data) => dispatch({ type: 'REJECTED', reason, score, data })}
              onBack={() => dispatch({ type: 'BACK' })}
            />
          </motion.div>
        )}
        {state.step === 'rejection' && (
          <motion.div key="rejection">
            <RejectionStep
              reason={state.rejectionReason ?? ''}
              score={state.qualificationScore ?? 0}
              onBack={() => dispatch({ type: 'BACK' })}
            />
          </motion.div>
        )}
        {state.step === 'pricing' && (
          <motion.div key="pricing">
            <PricingStep
              country={country}
              applicantName={state.applicantData?.fullName ?? 'there'}
              onProceed={() => dispatch({ type: 'GOTO_PAYMENT' })}
              onBack={() => dispatch({ type: 'BACK' })}
            />
          </motion.div>
        )}
        {state.step === 'payment' && (
          <motion.div key="payment">
            <PaymentStep
              country={country}
              applicantId={state.applicantId ?? ''}
              fullName={state.applicantData?.fullName ?? ''}
              email={state.applicantData?.email ?? ''}
              onSuccess={(payment) => dispatch({ type: 'PAYMENT_SUCCESS', payment })}
              onBack={() => dispatch({ type: 'BACK' })}
            />
          </motion.div>
        )}
        {state.step === 'booking' && state.paymentData && state.applicantId && (
          <motion.div key="booking">
            <BookingStep
              applicantId={state.applicantId}
              payment={state.paymentData}
              fullName={state.applicantData?.fullName ?? ''}
              email={state.applicantData?.email ?? ''}
              onBooked={(booking) => dispatch({ type: 'BOOKED', booking })}
            />
          </motion.div>
        )}
        {state.step === 'confirmation' && state.bookingData && state.applicantData && (
          <motion.div key="confirmation">
            <ConfirmationStep
              booking={state.bookingData}
              applicant={state.applicantData}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
