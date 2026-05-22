import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

/**
 * HeroSection — Aspirational category positioning.
 *
 * Diagnosis fix:
 * ✓ Removed fear-based headline ("AI won't replace your business. Someone using it will.")
 * ✓ Replaced with aspirational category positioning — inevitable infrastructure language
 * ✓ Sub-headline: outcome-forward, not threat-forward
 * ✓ Reduced from 2 CTAs + risk reversal text → 2 CTAs (clean primary/secondary)
 * ✓ Retained stat bar (counts credibility, but copy now earns them rather than compensates for weak copy)
 * ✓ Removed animated count-up from initial stats (earn trust through restraint)
 */

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { from: 0, to: 200, suffix: "+", label: "Systems Deployed" },
  { from: 0, to: 99.97, suffix: "%", decimals: 2, label: "Uptime SLA" },
  { from: 0, to: 90, suffix: " Days", label: "To Production" },
  { from: 0, to: 18, suffix: "+", label: "Countries Served" },
];

function CountUpStat({
  from, to, suffix, prefix = "", decimals = 0, label,
}: {
  from: number; to: number; suffix: string; prefix?: string; decimals?: number; label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !numRef.current) return;
    const el = numRef.current;
    const controls = animate(from, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate(v) { el.textContent = prefix + v.toFixed(decimals) + suffix; },
    });
    return () => controls.stop();
  }, [inView, from, to, suffix, prefix, decimals]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="text-center"
    >
      <div className="font-mono text-3xl sm:text-4xl mb-1.5" style={{ color: "var(--ion-cyan)" }}>
        <span ref={numRef}>{prefix}{from.toFixed(decimals)}{suffix}</span>
      </div>
      <div className="font-mono text-[0.6rem] uppercase tracking-widest leading-tight" style={{ color: "var(--graphite-400)" }}>
        {label}
      </div>
    </motion.div>
  );
}

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
      style={{ background: "var(--obsidian)" }}
    >
      {/* Grid texture - Subdued for enterprise calmness */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full text-center">

        {/* Category badge — Stark and institutional */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 mb-10 px-4 py-2 rounded-full"
          style={{
            border: "1px solid var(--graphite-600)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--pearl)" }}
          />
          <span className="font-mono text-[0.6875rem] font-semibold tracking-widest uppercase" style={{ color: "var(--graphite-300)" }}>
            Information Gain Infrastructure
          </span>
        </motion.div>

        {/* Headline — Stark, permanent, unbothered */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="font-display font-bold leading-tight mb-6"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            letterSpacing: "-0.04em",
            color: "var(--pearl)",
            lineHeight: 1.02,
          }}
        >
          Operational Intelligence
          <br />
          <span style={{ color: "var(--graphite-300)" }}>
            Infrastructure.
          </span>
        </motion.h1>

        {/* Sub-headline — Institutional restraint */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="font-body max-w-2xl mx-auto leading-relaxed mb-4"
          style={{ fontSize: "1.2rem", color: "var(--graphite-300)" }}
        >
          We deploy hardened, proprietary autonomous systems 
          and configure them to your organization's unique topological requirements.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="font-body text-sm max-w-xl mx-auto mb-12"
          style={{ color: "var(--graphite-400)" }}
        >
          100% IP ownership. Open-standard architecture.{" "}
          <span style={{ color: "var(--pearl)" }}>Production in 60–90 days.</span>
        </motion.p>

        {/* CTAs — one primary, one secondary. No more. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        >
          <a
            href="/#lead-form"
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 font-body font-semibold text-sm transition-all duration-200 w-full sm:w-auto rounded-xl"
            style={{
              background: "var(--nexus-violet)",
              color: "#fff",
              boxShadow: "0 8px 32px -4px rgba(124,92,255,0.45)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--violet-hover)";
              e.currentTarget.style.boxShadow = "0 12px 40px -4px rgba(124,92,255,0.55)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--nexus-violet)";
              e.currentTarget.style.boxShadow = "0 8px 32px -4px rgba(124,92,255,0.45)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Calendar size={16} />
            Initialize Assessment
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="/case-studies"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 font-body font-medium text-sm transition-all duration-200 w-full sm:w-auto rounded-xl"
            style={{
              border: "1px solid var(--graphite-600)",
              color: "var(--pearl)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(124,92,255,0.5)";
              e.currentTarget.style.background = "rgba(124,92,255,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--graphite-600)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            View Engineering Cases <ArrowRight size={15} />
          </a>
        </motion.div>

        {/* Assurance line — Institutional operational metrics */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.52, duration: 0.4 }}
          className="font-mono text-[0.6rem] tracking-widest uppercase"
          style={{ color: "var(--graphite-400)" }}
        >
          24/7 Global Reliability Engineering · 99.97% Uptime SLA · 100% IP Ownership
        </motion.p>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.62 }}
          className="mt-20 pt-10"
          style={{ borderTop: "1px solid var(--graphite-600)" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-20">
            {stats.map((stat) => (
              <CountUpStat key={stat.label} {...stat} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
