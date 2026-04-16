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
  { icon: <Clock className="w-4 h-4" />,     text: '60-minute strategy session' },
  { icon: <Video className="w-4 h-4" />,      text: 'Google Meet with recording' },
  { icon: <FileText className="w-4 h-4" />,  text: 'Written strategy summary within 48h' },
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
        <div className="inline-flex items-center gap-2 bg-[#3FBD8B]/10 border border-[#3FBD8B]/30 text-[#3FBD8B] rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
          Step 2 of 3 · Application Approved
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-3">
          You're Qualified, {applicantName.split(' ')[0]}
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Secure your strategy session with a one-time consultation fee.
          This confirms your seriousness and dedicates our senior team's time to your problem.
        </p>
      </div>

      {/* Pricing card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative bg-card border border-[#1f56d4]/40 rounded-3xl p-8 mb-6 overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#1f56d4]/10 blur-3xl pointer-events-none" />

        {/* Price */}
        <div className="text-center mb-8">
          <div className="text-6xl font-black text-foreground tracking-tight">
            <span className="text-3xl font-bold text-muted-foreground mr-1">{symbol}</span>
            {consultationFee.toLocaleString('en-IN')}
          </div>
          <div className="text-muted-foreground text-sm mt-1">{currency} · One-time · Non-refundable</div>
        </div>

        {/* What's included */}
        <div className="space-y-3.5 mb-8">
          {INCLUDED.map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <span className="text-[#3FBD8B]">{item.icon}</span>
              <span className="text-sm text-foreground/90">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <div className="flex items-start gap-3 bg-[#1f56d4]/8 border border-[#1f56d4]/20 rounded-xl p-4">
          <Shield className="w-4 h-4 text-[#1f56d4] shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Payment is processed securely via {country.isIndia ? 'Razorpay' : 'PayPal'}.
            We don't store your card details. The fee is non-refundable — it filters for commitment.
          </p>
        </div>
      </motion.div>

      {/* Country note */}
      <p className="text-center text-xs text-muted-foreground mb-8">
        Pricing shown for <span className="text-foreground font-medium">{country.country}</span>.
        {country.isIndia ? ' Payment via Razorpay (UPI, cards, net banking).' : ' Payment via PayPal.'}
      </p>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={onProceed}
          className="flex-1 flex items-center justify-center gap-2 bg-[#1f56d4] hover:bg-[#1a47b8] text-white font-bold py-4 px-6 rounded-xl transition-colors text-base"
        >
          Proceed to Payment
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
