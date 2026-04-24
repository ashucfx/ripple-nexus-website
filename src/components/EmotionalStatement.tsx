import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

const EmotionalStatement = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section
      ref={ref}
      className="py-32 relative overflow-hidden"
      style={{ borderTop: "1px solid var(--graphite-600)" }}
    >
      {/* Centered radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(50% 50% at 50% 50%, rgba(124,92,255,0.12) 0%, rgba(10,11,20,0) 100%)",
        }}
      />

      <motion.div
        style={{ scale, opacity }}
        className="max-w-5xl mx-auto px-6 text-center relative z-10"
      >
        <p className="eyebrow mb-8">The Ripple Nexus Principle</p>

        <div
          className="w-12 h-px mx-auto mb-12"
          style={{ background: "linear-gradient(90deg, #7C5CFF 0%, #22D3EE 100%)" }}
        />

        <h2
          className="font-display font-bold leading-none tracking-tight mb-8"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-0.035em", color: "var(--pearl)" }}
        >
          We don&apos;t build projects.
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #7C5CFF 0%, #B794FF 55%, #22D3EE 100%)" }}
          >
            We install autonomous growth systems.
          </span>
        </h2>

        <p className="font-body text-xl leading-relaxed max-w-2xl mx-auto mb-4" style={{ color: "var(--graphite-300)" }}>
          Most agencies deliver a product and disappear. We embed the infrastructure
          that compounds — every quarter, every workflow, every agent deployed.
        </p>

        <p className="font-mono text-xs tracking-widest uppercase mb-12" style={{ color: "var(--graphite-400)" }}>
          Show, don&apos;t tell — we run our own business on the same AI systems we build for you.
        </p>

        <a
          href="/#rns-scheduler"
          className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm px-8 py-4 transition-all duration-200 rounded-xl"
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
          Start Building Your Revenue Engine
          <ArrowRight size={16} />
        </a>
      </motion.div>
    </section>
  );
};

export default EmotionalStatement;
