import { motion, useInView, animate } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const stats = [
  { from: 150, to: 200, suffix: "+", label: "Companies Automated" },
  { from: 99, to: 99.97, suffix: "%", decimals: 2, label: "Uptime SLA" },
  { from: 60, to: 90, suffix: " Days", label: "Avg. Deployment" },
  { from: 5, to: 10, prefix: "$", suffix: "M+", label: "Client Revenue Unlocked" },
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
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(124,92,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,92,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial violet glow — upper right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          right: "-5%",
          width: "65%",
          height: "65%",
          background: "radial-gradient(60% 60% at 70% 20%, rgba(124,92,255,0.22) 0%, rgba(10,11,20,0) 100%)",
        }}
      />
      {/* Secondary plasma glow — lower left */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-5%",
          left: "-5%",
          width: "40%",
          height: "40%",
          background: "radial-gradient(50% 50% at 30% 70%, rgba(34,211,238,0.08) 0%, rgba(10,11,20,0) 100%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full text-center">

        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 mb-10 px-4 py-2 rounded-full"
          style={{
            border: "1px solid rgba(124,92,255,0.3)",
            background: "rgba(124,92,255,0.06)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--nexus-violet)" }}
          />
          <span className="label-inst" style={{ color: "var(--nexus-violet)" }}>
            AI Systems &amp; Automation Infrastructure
          </span>
          <span className="hidden sm:block" style={{ color: "var(--graphite-600)" }}>·</span>
          <span className="hidden sm:block font-mono text-[0.6rem] tracking-widest uppercase" style={{ color: "var(--graphite-400)" }}>
            200+ Deployments · 18+ Countries
          </span>
        </motion.div>

        {/* Headline — Loss Aversion + Category Positioning */}
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
          AI won&apos;t replace<br />
          your business.{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #7C5CFF 0%, #B794FF 55%, #22D3EE 100%)" }}
          >
            Someone using it will.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="font-body max-w-2xl mx-auto leading-relaxed mb-4"
          style={{ fontSize: "1.2rem", color: "var(--graphite-300)" }}
        >
          We build proprietary AI automation systems on your data — not generic ChatGPT
          wrappers. Autonomous agents that qualify leads, eliminate operational waste,
          and deliver verifiable ROI from day one.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="font-body text-sm max-w-xl mx-auto mb-12"
          style={{ color: "var(--graphite-400)" }}
        >
          You own 100% of the workflow IP.{" "}
          <span style={{ color: "var(--pearl)" }}>No vendor lock-in. No black-box systems.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        >
          <a
            href="/#rns-scheduler"
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 font-body font-semibold text-sm transition-all duration-200 w-full sm:w-auto rounded-xl"
            style={{
              background: "var(--nexus-violet)",
              color: "#fff",
              boxShadow: "0 8px 32px -4px rgba(124,92,255,0.45)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "var(--violet-hover)";
              e.currentTarget.style.boxShadow = "0 12px 40px -4px rgba(124,92,255,0.55)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "var(--nexus-violet)";
              e.currentTarget.style.boxShadow = "0 8px 32px -4px rgba(124,92,255,0.45)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Calendar size={16} />
            Request an AI Systems Audit
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <Link
            to="/case-studies"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 font-body font-medium text-sm transition-all duration-200 w-full sm:w-auto rounded-xl"
            style={{
              border: "1px solid var(--graphite-600)",
              color: "var(--pearl)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(124,92,255,0.5)";
              e.currentTarget.style.background = "rgba(124,92,255,0.06)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--graphite-600)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            See Verified Results <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Risk reversal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.52, duration: 0.4 }}
          className="font-mono text-[0.6rem] tracking-widest uppercase"
          style={{ color: "var(--graphite-400)" }}
        >
          No retainer lock-in · Written architecture brief within 48h · Senior engineers, not sales
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
