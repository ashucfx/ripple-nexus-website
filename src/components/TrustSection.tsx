import { motion } from "framer-motion";
import { Shield, FileText, Lock } from "lucide-react";

const trustStats = [
  { value: "200+", label: "Systems Deployed" },
  { value: "18+",  label: "Countries" },
  { value: "4.9",  label: "Client Rating" },
  { value: "48h",  label: "Written Brief" },
];

const industries = [
  "FinTech", "HealthTech", "EdTech", "Insurance Tech",
  "PropTech", "Logistics", "Manufacturing", "Retail",
  "Enterprise SaaS", "Banking", "Government", "E-Commerce",
];

const differentiators = [
  { metric: "100%", label: "IP ownership — all code, all workflows, all data transferred to you" },
  { metric: "0",    label: "Vendor lock-in — built on open standards only, never proprietary platforms" },
  { metric: "48h",  label: "Written architecture brief delivered after every intake call" },
];

const compliance = [
  { icon: Lock,   label: "GDPR Compliant",    sub: "Data handling practices" },
  { icon: FileText, label: "Indian IT Act",   sub: "Jurisdiction compliance" },
];

const TrustSection = () => {
  return (
    <section
      className="relative z-10 overflow-hidden"
      style={{ borderTop: "1px solid var(--graphite-600)", borderBottom: "1px solid var(--graphite-600)" }}
    >
      {/* Row 1: Stats */}
      <div className="max-w-6xl mx-auto px-6 py-12" style={{ borderBottom: "1px solid var(--graphite-600)" }}>
        <div className="flex flex-wrap items-center justify-between gap-8">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="eyebrow"
          >
            By the numbers
          </motion.p>
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            {trustStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="flex items-baseline gap-2.5"
              >
                <span className="font-mono text-2xl font-bold" style={{ color: "var(--ion-cyan)" }}>{s.value}</span>
                <span className="font-mono text-[0.6rem] tracking-widest uppercase" style={{ color: "var(--graphite-400)" }}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Differentiators */}
      <div className="max-w-6xl mx-auto px-6 py-10" style={{ borderBottom: "1px solid var(--graphite-600)" }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: "var(--graphite-600)" }}>
          {differentiators.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4 items-start p-6"
              style={{ background: "var(--obsidian)" }}
            >
              <span
                className="font-mono text-xl font-bold shrink-0"
                style={{ color: "var(--nexus-violet)" }}
              >
                {d.metric}
              </span>
              <p className="font-body text-xs leading-relaxed" style={{ color: "var(--graphite-400)" }}>{d.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Row 3: Compliance signals */}
      <div className="max-w-6xl mx-auto px-6 py-8" style={{ borderBottom: "1px solid var(--graphite-600)" }}>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="eyebrow">Security & Compliance</p>
          <div className="flex flex-wrap gap-8">
            {compliance.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-2"
              >
                <c.icon size={13} style={{ color: "var(--nexus-violet)" }} />
                <div>
                  <p className="font-body text-xs font-semibold" style={{ color: "var(--graphite-300)" }}>{c.label}</p>
                  <p className="font-mono text-[0.55rem] tracking-wide" style={{ color: "var(--graphite-400)" }}>{c.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Industry ticker */}
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-6 mb-5">
          <p className="eyebrow text-center">Industries we&apos;ve deployed across</p>
        </div>
        <div className="overflow-hidden flex items-center [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <motion.div
            className="flex gap-14 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
          >
            {[...industries, ...industries].map((industry, i) => (
              <div
                key={i}
                className="font-mono text-xs tracking-[0.15em] uppercase flex items-center gap-4 shrink-0 transition-colors duration-300"
                style={{ color: "var(--graphite-400)" }}
              >
                <span
                  className="w-1 h-1 inline-block rounded-full"
                  style={{ background: "var(--nexus-violet)", opacity: 0.6 }}
                />
                {industry}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
