import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft, Shield, Clock, Video, FileText } from 'lucide-react';
import type { CountryInfo } from '@/lib/scheduler-types';

interface Props {
  country: CountryInfo;
  applicantName: string;
  onProceed: () => void;
  onBack: () => void;
}

const INCLUDED = [
  { icon: <Clock className="w-4 h-4" />,       text: '60-minute strategy session' },
  { icon: <Video className="w-4 h-4" />,        text: 'Google Meet with recording' },
  { icon: <FileText className="w-4 h-4" />,    text: 'Written strategy summary within 48h' },
  { icon: <CheckCircle className="w-4 h-4" />, text: 'Priority follow-up for 7 days' },
];

export default function PricingStep({ country, applicantName, onProceed, onBack }: Props) {
  const { symbol, consultationFee, currency } = country;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="max-w-lg mx-auto px-4 py-16"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5"
          style={{
            background: 'rgba(163,230,53,0.1)',
            border: '1px solid rgba(163,230,53,0.3)',
            color: 'var(--quantum-lime)',
          }}
        >
          Step 2 of 3 · Application Approved
        </div>
        <h2
          className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
          style={{ color: 'var(--pearl)', letterSpacing: '-0.025em' }}
        >
          You&apos;re Qualified, {applicantName.split(' ')[0]}
        </h2>
        <p className="text-base leading-relaxed" style={{ color: 'var(--graphite-300)' }}>
          Secure your strategy session with a one-time consultation fee.
          This confirms your seriousness and dedicates our senior team&apos;s time to your problem.
        </p>
      </div>

      {/* Pricing card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-3xl p-8 mb-6 overflow-hidden"
        style={{
          background: 'var(--ink)',
          border: '1px solid rgba(124,92,255,0.35)',
          boxShadow: '0 0 0 1px rgba(124,92,255,0.1), 0 16px 40px -8px rgba(124,92,255,0.2)',
        }}
      >
        {/* Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 pointer-events-none"
          style={{ background: 'rgba(124,92,255,0.08)', filter: 'blur(32px)' }}
        />

        {/* Price */}
        <div className="text-center mb-8">
          <div className="text-6xl font-black tracking-tight" style={{ color: 'var(--pearl)' }}>
            <span className="text-3xl font-bold mr-1" style={{ color: 'var(--graphite-400)' }}>{symbol}</span>
            {consultationFee.toLocaleString('en-IN')}
          </div>
          <div className="text-sm mt-1" style={{ color: 'var(--graphite-400)' }}>{currency} · One-time · Non-refundable</div>
        </div>

        {/* What's included */}
        <div className="space-y-3.5 mb-8">
          {INCLUDED.map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <span style={{ color: 'var(--quantum-lime)' }}>{item.icon}</span>
              <span className="text-sm" style={{ color: 'var(--pearl)' }}>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <div
          className="flex items-start gap-3 rounded-xl p-4"
          style={{ background: 'rgba(124,92,255,0.06)', border: '1px solid rgba(124,92,255,0.2)' }}
        >
          <Shield className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--nexus-violet)' }} />
          <p className="text-xs leading-relaxed" style={{ color: 'var(--graphite-300)' }}>
            Payment is processed securely via {country.isIndia ? 'Razorpay' : 'PayPal'}.
            We don&apos;t store your card details. The fee is non-refundable — it filters for commitment.
          </p>
        </div>
      </motion.div>

      {/* Country note */}
      <p className="text-center text-xs mb-8" style={{ color: 'var(--graphite-400)' }}>
        Pricing shown for <span className="font-medium" style={{ color: 'var(--pearl)' }}>{country.country}</span>.
        {country.isIndia ? ' Payment via Razorpay (UPI, cards, net banking).' : ' Payment via PayPal.'}
      </p>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-colors"
          style={{ border: '1px solid var(--graphite-600)', color: 'var(--graphite-400)' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--graphite-300)'; e.currentTarget.style.color = 'var(--pearl)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--graphite-600)'; e.currentTarget.style.color = 'var(--graphite-400)'; }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={onProceed}
          className="flex-1 flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-xl transition-all duration-200 text-base"
          style={{
            background: 'var(--nexus-violet)',
            color: '#fff',
            boxShadow: '0 8px 32px -4px rgba(124,92,255,0.45)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--violet-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--nexus-violet)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          Proceed to Payment
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
