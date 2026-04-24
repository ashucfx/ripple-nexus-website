import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, ExternalLink } from 'lucide-react';

interface Props {
  reason: string;
  score: number;
  onBack: () => void;
}

export default function RejectionStep({ reason, onBack }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-lg mx-auto px-4 py-20 text-center"
    >
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(251,191,36,0.1)',
            border: '1px solid rgba(251,191,36,0.3)',
          }}
        >
          <XCircle className="w-10 h-10" style={{ color: '#FBBF24' }} />
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight" style={{ color: 'var(--pearl)', letterSpacing: '-0.02em' }}>
        Not the Right Fit — Yet
      </h2>

      <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--graphite-300)' }}>
        Thank you for applying. Based on your submission, we don&apos;t believe we can
        deliver the ROI you&apos;d expect from a premium engagement at this stage.
      </p>

      {/* Specific reason */}
      <div
        className="rounded-2xl p-5 mb-8 text-left"
        style={{
          background: 'rgba(251,191,36,0.05)',
          border: '1px solid rgba(251,191,36,0.2)',
        }}
      >
        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#FBBF24' }}>Reason</p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--graphite-300)' }}>{reason}</p>
      </div>

      {/* Alternative actions */}
      <div className="space-y-3 mb-10">
        <p className="text-sm font-semibold" style={{ color: 'var(--graphite-400)' }}>In the meantime, explore:</p>
        {[
          { href: '/case-studies', label: 'Read our case studies' },
          { href: '/services',     label: 'Explore our service offerings' },
          { href: '/contact',      label: 'Send us a message' },
        ].map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="flex items-center justify-between rounded-xl px-5 py-4 text-sm transition-all duration-150 group"
            style={{ background: 'var(--ink)', border: '1px solid var(--graphite-600)', color: 'var(--pearl)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,92,255,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--graphite-600)'; }}
          >
            <span>{label}</span>
            <ExternalLink className="w-4 h-4 transition-colors" style={{ color: 'var(--graphite-400)' }} />
          </a>
        ))}
      </div>

      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm transition-colors"
        style={{ color: 'var(--graphite-400)' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--pearl)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--graphite-400)')}
      >
        <ArrowLeft className="w-4 h-4" />
        Go back and revise my application
      </button>
    </motion.div>
  );
}
