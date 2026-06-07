import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

/**
 * DeliverySection — Replaces the fake "Control Plane" with an honest,
 * credible explanation of how we actually deliver systems to clients.
 */

const deliverables = [
  {
    title: "Full source code repository",
    detail: "Every line pushed to your private GitHub / GitLab. You control the codebase from day one.",
  },
  {
    title: "Architecture decision records",
    detail: "Written rationale for every major technical choice. Your team can extend the system without us.",
  },
  {
    title: "Production monitoring setup",
    detail: "We configure Datadog, Sentry, or your preferred observability stack — alerts go to your team.",
  },
  {
    title: "Runbooks & handover documentation",
    detail: "Step-by-step operational procedures. A junior engineer can manage the system post-handover.",
  },
  {
    title: "Security & QA Certification",
    detail: "CI/CD security pipelines (SAST) and optional third-party penetration testing prior to handover.",
  },
  {
    title: "Day 61 & Beyond (Optional SLA)",
    detail: "Transition maintenance fully to your internal team, or retain our Level-3 engineering pod for ongoing SLA support.",
  },
];

const DeliverySection = () => {
  return (
    <section className="py-28 relative z-10" style={{ borderTop: "1px solid var(--graphite-600)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="eyebrow mb-6">What You Receive</p>
            <h2
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", color: "var(--pearl)" }}
            >
              You own it.{" "}
              <span style={{ color: "var(--graphite-300)" }}>
                Completely.
              </span>
            </h2>
            <p className="font-body text-lg leading-relaxed mb-8" style={{ color: "var(--graphite-300)" }}>
              At handover, you receive everything — not a login to our platform, not a monthly subscription, not a vendor dependency. Every system we build becomes 100% your asset on delivery.
            </p>
            <div
              className="p-5 rounded-xl"
              style={{ border: "1px solid rgba(124,92,255,0.25)", background: "rgba(124,92,255,0.04)" }}
            >
              <p className="font-mono text-[0.65rem] tracking-widest uppercase mb-2" style={{ color: "var(--nexus-violet)" }}>
                Our commitment
              </p>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-300)" }}>
                "We do not build systems you can't operate without us. The measure of a good engagement is that you never need to call us again — but you always want to."
              </p>
              <p className="font-display font-semibold text-sm mt-3" style={{ color: "var(--pearl)" }}>
                Ashutosh Shukla
              </p>
              <p className="font-mono text-[0.6rem] tracking-wide" style={{ color: "var(--graphite-400)" }}>
                Founder & Lead Architect
              </p>
            </div>
          </motion.div>

          {/* Right: Deliverables checklist */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-px"
            style={{ border: "1px solid var(--graphite-600)", borderRadius: "1rem", overflow: "hidden" }}
          >
            {/* Header */}
            <div
              className="px-6 py-4 flex items-center gap-3"
              style={{ background: "var(--obsidian)", borderBottom: "1px solid var(--graphite-600)" }}
            >
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--graphite-500)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--graphite-500)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--graphite-500)" }} />
              </div>
              <span className="font-mono text-[0.6rem] tracking-widest uppercase" style={{ color: "var(--graphite-400)" }}>
                Handover Checklist
              </span>
            </div>

            {deliverables.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-5 group transition-colors duration-200"
                style={{ background: "var(--ink)", borderBottom: i < deliverables.length - 1 ? "1px solid var(--graphite-600)" : "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,92,255,0.04)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--ink)")}
              >
                <CheckCircle2
                  size={16}
                  className="shrink-0 mt-0.5"
                  style={{ color: "var(--quantum-lime)" }}
                />
                <div>
                  <p className="font-body text-sm font-semibold mb-1" style={{ color: "var(--pearl)" }}>
                    {item.title}
                  </p>
                  <p className="font-body text-xs leading-relaxed" style={{ color: "var(--graphite-400)" }}>
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Visual Timeline Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-16 border-t border-white/5"
        >
          <div className="mb-10 text-center">
            <p className="font-mono text-[0.65rem] tracking-widest uppercase text-white/40 mb-2">Delivery Methodology</p>
            <h3 className="font-display text-2xl font-bold text-white">90 Days to Production</h3>
          </div>
          
          <div className="relative">
            {/* The horizontal connecting line */}
            <div className="hidden md:block absolute top-[28px] left-0 w-full h-px bg-white/5" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { week: "Weeks 1-2", phase: "Architecture & Audit", desc: "System mapping, data flow design, and initial ADR creation." },
                { week: "Weeks 3-8", phase: "Core Primitives", desc: "Building the custom backend, APIs, and data infrastructure." },
                { week: "Weeks 9-10", phase: "Staging & InfoSec", desc: "Rigorous SAST testing, edge-case handling, and penetration testing readiness." },
                { week: "Weeks 11-12", phase: "Production Handover", desc: "Live deployment, training, and 100% IP transfer." }
              ].map((step, i) => (
                <div key={i} className="relative z-10">
                  {/* Timeline node */}
                  <div className="w-14 h-14 rounded-full border border-white/10 bg-[#0c0d12] flex items-center justify-center mb-6 shadow-xl hidden md:flex">
                    <div className="w-2 h-2 rounded-full" style={{ background: "var(--nexus-violet)" }} />
                  </div>
                  {/* Mobile timeline node */}
                  <div className="w-2 h-2 rounded-full mb-3 md:hidden" style={{ background: "var(--nexus-violet)" }} />
                  
                  <p className="font-mono text-[0.65rem] tracking-widest uppercase mb-2" style={{ color: "var(--ion-cyan)" }}>{step.week}</p>
                  <p className="font-body font-semibold text-white mb-2">{step.phase}</p>
                  <p className="font-body text-xs leading-relaxed text-white/60">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DeliverySection;
