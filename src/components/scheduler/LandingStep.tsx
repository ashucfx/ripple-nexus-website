import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Globe2, TrendingUp, Lock, Star } from 'lucide-react';

interface Props {
  onApply: () => void;
}

const OUTCOMES = [
  {
    metric: '2.3×',
    label: 'Revenue Growth',
    detail: 'SaaS founder scaled MRR from $18k → $42k in 4 months post-engagement',
  },
  {
    metric: '60 days',
    label: 'MVP to Production',
    detail: 'FinTech startup launched their core platform in under 60 days',
  },
  {
    metric: '$2.1M',
    label: 'Capital Raised',
    detail: 'Post-systems audit, client closed a $2.1M seed round within 6 weeks',
  },
];

const WHO_ITS_FOR = [
  'Founders operating $500K–$10M+ businesses with system bottlenecks',
  'Operators rebuilding internal infrastructure for scale',
  'Enterprises evaluating AI automation or SaaS platform builds',
  'CTOs solving data pipeline, integration, or workflow failures',
];

export default function LandingStep({ onApply }: Props) {
  return (
    <section id="rns-scheduler" className="relative py-24 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#1f56d4]/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 bg-[#1f56d4]/10 border border-[#1f56d4]/30 text-[#1f56d4] rounded-full px-5 py-2 text-sm font-semibold tracking-wide uppercase">
            <Lock className="w-3.5 h-3.5" />
            Qualification Required · Not Free · Not for Everyone
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-center text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6"
        >
          You Don't Need Another Call.<br />
          <span className="text-[#1f56d4]">You Need a Diagnosis.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          Most founders waste months talking to agencies who pitch before they understand.
          We qualify first. We charge to confirm you're serious. Then we spend 60 minutes
          finding exactly where your business is leaking — and what to build to stop it.
        </motion.p>

        {/* Outcome cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {OUTCOMES.map((o, i) => (
            <motion.div
              key={o.metric}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="relative bg-card/60 border border-border rounded-2xl p-6 hover:border-[#1f56d4]/50 transition-colors group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1f56d4]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-4xl font-black text-[#1f56d4] mb-1">{o.metric}</div>
              <div className="text-sm font-semibold text-[#3FBD8B] uppercase tracking-wider mb-3">{o.label}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{o.detail}</div>
            </motion.div>
          ))}
        </div>

        {/* Who this is for */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/40 border border-border rounded-2xl p-8 mb-12"
        >
          <h3 className="text-lg font-bold text-foreground mb-5 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#1f56d4]" />
            Who This Consultation Is For
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WHO_ITS_FOR.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#3FBD8B] mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 text-muted-foreground text-sm mb-14"
        >
          {[
            { icon: <Globe2 className="w-4 h-4" />, label: '18+ countries served' },
            { icon: <Users className="w-4 h-4" />, label: '200+ clients' },
            { icon: <Star className="w-4 h-4" />, label: '4.9 / 5 rating' },
            { icon: <TrendingUp className="w-4 h-4" />, label: '$50M+ outcomes generated' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-[#1f56d4]">{icon}</span>
              {label}
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">
          <motion.button
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onApply}
            className="group flex items-center gap-3 bg-[#1f56d4] hover:bg-[#1a47b8] text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all duration-200 shadow-lg shadow-[#1f56d4]/20"
          >
            Show Me If I Qualify
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <p className="text-xs text-muted-foreground text-center max-w-sm">
            2 minutes · Instant decision · Only qualified operators proceed to booking
          </p>
        </div>

      </div>
    </section>
  );
}
