import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const guarantees = [
  "Senior architects on every call — not a sales handoff",
  "Written system brief within 48 hours",
  "Qualification takes under 2 minutes",
];

const CtaSection = () => {
  return (
    <section
      className="py-32 relative z-10 overflow-hidden"
      style={{ borderTop: "1px solid var(--graphite-600)" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(60% 60% at 50% 100%, rgba(124,92,255,0.1) 0%, rgba(10,11,20,0) 100%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow mb-8"
        >
          AI Systems Audit
        </motion.p>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-10 w-12 h-px origin-left"
          style={{ background: "linear-gradient(90deg, #7C5CFF 0%, #22D3EE 100%)" }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-display font-bold leading-none mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em", color: "var(--pearl)" }}
        >
          Every week without<br />
          autonomous infrastructure,
          <span
            className="block bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #7C5CFF 0%, #B794FF 55%, #22D3EE 100%)" }}
          >
            your competitors close the gap.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="font-body text-xl leading-relaxed max-w-2xl mb-6"
          style={{ color: "var(--graphite-300)" }}
        >
          A 45-minute AI Systems Audit surfaces exactly what to automate, in what order,
          and the provable ROI before you commit a rupee to implementation.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.24 }}
          className="font-mono text-sm tracking-wide mb-12"
          style={{ color: "var(--ion-cyan)" }}
        >
          AI Systems Audit — ₹1,999 (India) · $199 (Global).{" "}
          <span style={{ color: "var(--graphite-400)" }}>
            Cost of inaction: ₹10L+/year · $50K+/year in recoverable overhead.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.28 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10"
        >
          <a
            href="/#rns-scheduler"
            className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 font-body font-semibold text-sm transition-all duration-200 w-full sm:w-auto rounded-xl"
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
          <a
            href="#lead-form"
            className="inline-flex items-center justify-center gap-2 px-9 py-4 font-body font-medium text-sm transition-all duration-200 w-full sm:w-auto rounded-xl"
            style={{ border: "1px solid var(--graphite-600)", color: "var(--pearl)" }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(124,92,255,0.5)";
              e.currentTarget.style.background = "rgba(124,92,255,0.06)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--graphite-600)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Send a Message <ArrowRight size={15} />
          </a>
        </motion.div>

        {/* Trust guarantees */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.36 }}
          className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8"
        >
          {guarantees.map((g) => (
            <div key={g} className="flex items-center gap-2 font-mono text-[0.6rem] tracking-widest uppercase" style={{ color: "var(--graphite-400)" }}>
              <span style={{ color: "var(--nexus-violet)" }}>—</span>
              {g}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default CtaSection;
