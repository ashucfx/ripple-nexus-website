import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, ExternalLink } from 'lucide-react';

interface Props {
  reason: string;
  score: number;
  onBack: () => void;
}

export default function RejectionStep({ reason, score, onBack }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-lg mx-auto px-4 py-20 text-center"
    >
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
          <XCircle className="w-10 h-10 text-amber-400" />
        </div>
      </div>

      {/* Headline */}
      <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 tracking-tight">
        Not the Right Fit — Yet
      </h2>

      {/* Message */}
      <p className="text-muted-foreground text-base leading-relaxed mb-4">
        Thank you for applying. Based on your submission, we don't believe we can
        deliver the ROI you'd expect from a premium engagement at this stage.
      </p>

      {/* Specific reason */}
      <div className="bg-amber-500/8 border border-amber-500/25 rounded-2xl p-5 mb-8 text-left">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Reason</p>
        <p className="text-sm text-foreground/80 leading-relaxed">{reason}</p>
      </div>

      {/* Alternative actions */}
      <div className="space-y-3 mb-10">
        <p className="text-sm font-semibold text-foreground/70">In the meantime, explore:</p>
        <a
          href="/case-studies"
          className="flex items-center justify-between bg-card border border-border hover:border-[#1f56d4]/50 rounded-xl px-5 py-4 text-sm text-foreground transition-colors group"
        >
          <span>Read our case studies</span>
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-[#1f56d4]" />
        </a>
        <a
          href="/services"
          className="flex items-center justify-between bg-card border border-border hover:border-[#1f56d4]/50 rounded-xl px-5 py-4 text-sm text-foreground transition-colors group"
        >
          <span>Explore our service offerings</span>
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-[#1f56d4]" />
        </a>
        <a
          href="/contact"
          className="flex items-center justify-between bg-card border border-border hover:border-[#1f56d4]/50 rounded-xl px-5 py-4 text-sm text-foreground transition-colors group"
        >
          <span>Send us a message</span>
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-[#1f56d4]" />
        </a>
      </div>

      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Go back and revise my application
      </button>
    </motion.div>
  );
}
