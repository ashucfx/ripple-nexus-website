import { motion } from "framer-motion";
import { Search, Layers, Rocket, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Architectural Audit",
    headline: "We identify the technical debt capping your current revenue.",
    desc: "Every engagement begins with a deep-dive analysis of your stack and operational bottlenecks. We define a precise gap-closure roadmap and deliver a System Audit Report that shows exactly what is holding your business back.",
    duration: "Week 1",
    deliverable: "System Audit Report",
  },
  {
    num: "02",
    icon: Layers,
    title: "Bespoke Design",
    headline: "A solution blueprint built for your scale target, not just today.",
    desc: "We design the architecture with your growth in mind: tech stack selection, data flow design, integration architecture, and a phased delivery roadmap. No guesswork. No generic templates.",
    duration: "Week 2",
    deliverable: "Solution Blueprint",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Iterative Deployment",
    headline: "Weekly sprints. Full visibility. Production-ready code.",
    desc: "Our engineering team builds in transparent weekly sprints. With a live Kanban board and weekly demos you have full visibility into every delivery. Code is tested before it ever touches your server.",
    duration: "Weeks 3–10",
    deliverable: "Production-Ready System",
  },
  {
    num: "04",
    icon: TrendingUp,
    title: "Continuous Partnership",
    headline: "We monitor, optimize, and evolve your system as you grow.",
    desc: "Post-launch, we track performance metrics, reduce infrastructure costs, and extend the system as your business enters new markets. Your success metrics become our KPIs.",
    duration: "Ongoing",
    deliverable: "Growth Partnership",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-28 relative z-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(124,92,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-semibold text-xs tracking-widest uppercase mb-5"
          >
            How We Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl md:text-[52px] font-display font-bold text-white tracking-tight leading-[1.05] mb-5"
          >
            From First Call to
            <br />
            <span className="text-gradient">Running System.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--graphite-300)" }}
          >
            A repeatable, transparent process that has delivered 200+ systems across 18 countries.
            No agency chaos. No scope creep. No surprises.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative flex flex-col p-6 rounded-2xl transition-all duration-300"
                style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(124,92,255,0.3)";
                  e.currentTarget.style.boxShadow = "0 12px 40px -12px rgba(124,92,255,0.25)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--graphite-600)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Step icon */}
                <div className="relative mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ background: "rgba(124,92,255,0.06)", border: "1px solid rgba(124,92,255,0.15)" }}
                  >
                    <step.icon size={20} style={{ color: "var(--nexus-violet)" }} />
                  </div>
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold font-mono"
                    style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)", color: "var(--graphite-400)" }}
                  >
                    {i + 1}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono tracking-widest" style={{ color: "var(--graphite-400)" }}>{step.num}</span>
                  <span className="text-xs" style={{ color: "var(--graphite-600)" }}>·</span>
                  <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--graphite-400)" }}>{step.duration}</span>
                </div>

                <h3 className="font-display font-bold text-white text-xl mb-2 group-hover:text-gradient transition-all duration-300">
                  {step.title}
                </h3>
                <p className="text-xs font-semibold mb-3 leading-snug" style={{ color: "rgba(124,92,255,0.85)" }}>{step.headline}</p>
                <p className="text-[13px] leading-relaxed mb-6 flex-1" style={{ color: "var(--graphite-300)" }}>{step.desc}</p>

                {/* Deliverable */}
                <div className="mt-auto pt-4 flex items-center gap-2" style={{ borderTop: "1px solid var(--graphite-600)" }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--nexus-violet)" }} />
                  <span className="text-[11px] font-medium" style={{ color: "var(--graphite-400)" }}>{step.deliverable}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom trust line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="text-xs" style={{ color: "var(--graphite-400)" }}>No retainer lock-in · Written brief within 48h · Senior architects, not sales</p>
        </motion.div>

      </div>
    </section>
  );
};

export default ProcessSection;
