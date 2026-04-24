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
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(124,92,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,92,255,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Violet glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'rgba(124,92,255,0.07)', filter: 'blur(100px)' }}
      />

      <div className="relative max-w-5xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold tracking-wide uppercase"
            style={{
              background: 'rgba(124,92,255,0.1)',
              border: '1px solid rgba(124,92,255,0.3)',
              color: 'var(--nexus-violet)',
            }}
          >
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
          className="text-center font-display font-bold tracking-tight leading-[1.06] mb-6"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.035em', color: 'var(--pearl)' }}
        >
          You Don&apos;t Need Another Call.<br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #7C5CFF 0%, #B794FF 55%, #22D3EE 100%)' }}
          >
            You Need a Diagnosis.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed"
          style={{ color: 'var(--graphite-300)' }}
        >
          Most founders waste months talking to agencies who pitch before they understand.
          We qualify first. We charge to confirm you&apos;re serious. Then we spend 60 minutes
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
              className="relative rounded-2xl p-6 group transition-all duration-200"
              style={{
                background: 'var(--ink)',
                border: '1px solid var(--graphite-600)',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(124,92,255,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--graphite-600)')}
            >
              <div
                className="text-4xl font-black mb-1"
                style={{ color: 'var(--nexus-violet)' }}
              >
                {o.metric}
              </div>
              <div
                className="text-sm font-semibold uppercase tracking-wider mb-3"
                style={{ color: 'var(--quantum-lime)' }}
              >
                {o.label}
              </div>
              <div className="text-sm leading-relaxed" style={{ color: 'var(--graphite-400)' }}>{o.detail}</div>
            </motion.div>
          ))}
        </div>

        {/* Who this is for */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-8 mb-12"
          style={{ background: 'var(--ink)', border: '1px solid var(--graphite-600)' }}
        >
          <h3
            className="text-lg font-bold mb-5 flex items-center gap-2"
            style={{ color: 'var(--pearl)' }}
          >
            <Users className="w-5 h-5" style={{ color: 'var(--nexus-violet)' }} />
            Who This Consultation Is For
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WHO_ITS_FOR.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--quantum-lime)' }} />
                <span className="text-sm" style={{ color: 'var(--graphite-400)' }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 text-sm mb-14"
          style={{ color: 'var(--graphite-400)' }}
        >
          {[
            { icon: <Globe2 className="w-4 h-4" />, label: '18+ countries served' },
            { icon: <Users className="w-4 h-4" />, label: '200+ clients' },
            { icon: <Star className="w-4 h-4" />, label: '4.9 / 5 rating' },
            { icon: <TrendingUp className="w-4 h-4" />, label: '$50M+ outcomes generated' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span style={{ color: 'var(--nexus-violet)' }}>{icon}</span>
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
            className="group flex items-center gap-3 font-bold text-lg px-10 py-5 rounded-2xl transition-all duration-200"
            style={{
              background: 'var(--nexus-violet)',
              color: '#fff',
              boxShadow: '0 8px 32px -4px rgba(124,92,255,0.45)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--violet-hover)';
              e.currentTarget.style.boxShadow = '0 12px 40px -4px rgba(124,92,255,0.55)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--nexus-violet)';
              e.currentTarget.style.boxShadow = '0 8px 32px -4px rgba(124,92,255,0.45)';
            }}
          >
            Show Me If I Qualify
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <p className="text-xs text-center max-w-sm" style={{ color: 'var(--graphite-400)' }}>
            2 minutes · Instant decision · Only qualified operators proceed to booking
          </p>
        </div>

      </div>
    </section>
  );
}
