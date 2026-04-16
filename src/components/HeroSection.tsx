import { motion, useInView, animate } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle2, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const stats = [
  { from: 150, to: 200, suffix: "+", label: "Companies Scaled" },
  { from: 99, to: 99.97, suffix: "%", decimals: 2, label: "Uptime SLA" },
  { from: 60, to: 90, suffix: " Days", label: "Avg. Launch Time" },
  { from: 5, to: 10, prefix: "$", suffix: "M+", label: "Client Revenue Unlocked" },
];

const proofPills = [
  "FinTech Infrastructure",
  "AI & LLM Automation",
  "Enterprise SaaS",
  "RPA Workflows",
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
      onUpdate(v) {
        el.textContent = prefix + v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, from, to, suffix, prefix, decimals]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="text-center group"
    >
      <div className="text-3xl sm:text-4xl font-display font-bold text-white group-hover:text-gradient transition-all duration-300">
        <span ref={numRef}>{prefix}{from.toFixed(decimals)}{suffix}</span>
      </div>
      <div className="text-[11px] text-white/40 uppercase tracking-widest mt-1.5 font-medium leading-tight">
        {label}
      </div>
    </motion.div>
  );
}

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020610] pt-24 pb-16"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(31,86,212,0.18)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />
      {/* Secondary subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(63,189,139,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full text-center">

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/[0.07] backdrop-blur-md mb-10"
        >
          <Zap size={12} className="text-primary fill-primary" />
          <span className="text-xs font-semibold text-white/85 tracking-wide">
            Automation-First Growth Systems
          </span>
          <span className="w-px h-3.5 bg-white/15" />
          <span className="text-xs text-primary font-medium">Trusted by 200+ Companies</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-[72px] lg:text-[88px] font-display font-bold text-white tracking-tight leading-[1.02] mb-6"
        >
          Your Systems Are
          <br />
          <span className="text-gradient">the Bottleneck.</span>
          <br />
          <span className="text-white/90">We Remove It.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/65 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Ripple Nexus architects automation-first platforms for founders and enterprises
          who refuse to operate below their potential. From AI pipelines to enterprise SaaS —
          we build systems that compound.
        </motion.p>

        {/* Social proof pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {proofPills.map((pill) => (
            <span
              key={pill}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white/60 font-medium"
            >
              <CheckCircle2 size={10} className="text-secondary" />
              {pill}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/#rns-scheduler"
            className="group relative inline-flex items-center justify-center gap-2.5 bg-primary text-white px-8 py-4 rounded-lg font-semibold text-[15px] hover:bg-primary/90 hover:shadow-[0_0_40px_hsl(222_74%_48%/0.4)] hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
          >
            <Calendar size={17} />
            Get Your Growth Diagnosis
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <Link
            to="/case-studies"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white/80 px-8 py-4 rounded-lg font-medium text-[15px] hover:bg-white/[0.05] hover:border-white/35 hover:text-white transition-all duration-200 w-full sm:w-auto"
          >
            See Real Results <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Risk reversal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-white/30 text-xs mt-5 tracking-wide"
        >
          No commitment required · Free 30-min diagnostic · Response within 4 hours
        </motion.p>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mt-20 border-t border-white/[0.07] pt-10"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-16">
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
