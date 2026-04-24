import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const marketProblems = [
  {
    label: "ChatGPT Wrappers",
    desc: "Generic AI tools that work identically for every client — no proprietary data, no custom logic, no competitive advantage.",
  },
  {
    label: "Vendor Lock-in",
    desc: "Agencies that build on proprietary black-box platforms. When you leave, you lose everything. Your IP, your workflows, your data.",
  },
  {
    label: "Time-Billed Projects",
    desc: "Hours billed, not outcomes delivered. Scope creep, cost overruns, and deliverables that don't move your revenue metrics.",
  },
  {
    label: '"AI-Ready" Roadmaps',
    desc: "Consultancies that sell 6-month strategy decks instead of deployed systems. Recommendations, not results.",
  },
];

const ourApproach = [
  {
    label: "Information Gain Engines",
    desc: "Systems built on your proprietary data — customer behaviour, operational history, and domain context that no generic AI can replicate.",
  },
  {
    label: "Open-Standard Architecture",
    desc: "Built on Make, n8n, Python, and open APIs. You own 100% of the code and workflow logic. Walk away with everything, any time.",
  },
  {
    label: "Outcome-Based Pricing",
    desc: "Project Price = Annual Value Created × Value Capture Rate. If the automation doesn't deliver ROI, the pricing doesn't hold.",
  },
  {
    label: "Production in 60–90 Days",
    desc: "Not a roadmap. Not a prototype. A deployed, production-grade AI system that your team operates from day one.",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const ProblemSolutionSection = () => {
  return (
    <section
      className="py-28 relative z-10 overflow-hidden"
      style={{ borderTop: "1px solid var(--graphite-600)" }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="max-w-2xl mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow mb-6"
          >
            The Market Reality
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-display font-bold leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", color: "var(--pearl)" }}
          >
            The AI market is flooded<br />
            with{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #7C5CFF 0%, #B794FF 55%, #22D3EE 100%)" }}
            >
              Grey Goo.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="font-body text-lg leading-relaxed"
            style={{ color: "var(--graphite-300)" }}
          >
            Generic AI outputs. Identical workflows. No proprietary data advantage.
            If your competitor can buy the same tool and get the same result,
            you haven't built a moat — you've paid for commoditised automation.
          </motion.p>
        </div>

        {/* Two-column panel comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px mb-12" style={{ background: "var(--graphite-600)" }}>

          {/* Problem column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="p-8 flex flex-col"
            style={{ background: "var(--obsidian)" }}
          >
            <div className="flex items-center gap-3 mb-8" style={{ borderBottom: "1px solid var(--graphite-600)", paddingBottom: "1.5rem" }}>
              <span className="font-mono text-[0.55rem] tracking-widest uppercase" style={{ color: "rgba(244,63,94,0.8)" }}>
                What the market delivers
              </span>
            </div>
            <div className="space-y-7">
              {marketProblems.map((p, i) => (
                <motion.div key={i} variants={itemVariants} className="flex gap-4">
                  <span className="font-mono text-[0.65rem] mt-0.5 shrink-0" style={{ color: "rgba(244,63,94,0.6)" }}>—</span>
                  <div>
                    <p className="font-body text-sm font-semibold mb-1" style={{ color: "var(--pearl)" }}>{p.label}</p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-400)" }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solution column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="p-8 flex flex-col"
            style={{ background: "var(--ink)" }}
          >
            <div className="flex items-center gap-3 mb-8" style={{ borderBottom: "1px solid var(--graphite-600)", paddingBottom: "1.5rem" }}>
              <span className="eyebrow">What Ripple Nexus delivers</span>
            </div>
            <div className="space-y-7">
              {ourApproach.map((s, i) => (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } } }}
                  className="flex gap-4"
                >
                  <span className="font-mono text-sm mt-0.5 shrink-0" style={{ color: "var(--nexus-violet)" }}>—</span>
                  <div>
                    <p className="font-body text-sm font-semibold mb-1" style={{ color: "var(--pearl)" }}>{s.label}</p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-400)" }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Positioning formula */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6 rounded-xl"
          style={{ border: "1px solid var(--graphite-600)", background: "var(--ink)" }}
        >
          <div>
            <p className="font-mono text-[0.6rem] tracking-widest uppercase mb-2" style={{ color: "var(--nexus-violet)" }}>
              Value-Based Pricing Formula
            </p>
            <p className="font-body text-base italic" style={{ color: "var(--pearl)" }}>
              Project Price = Annual Value Created × Value Capture Rate (10–25%)
            </p>
          </div>
          <a
            href="#lead-form"
            className="group inline-flex items-center gap-2 font-body font-semibold text-sm px-6 py-3 shrink-0 transition-all duration-200 rounded-xl"
            style={{
              background: "var(--nexus-violet)",
              color: "#fff",
              boxShadow: "0 8px 32px -4px rgba(124,92,255,0.4)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "var(--violet-hover)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "var(--nexus-violet)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Map My ROI Opportunity
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default ProblemSolutionSection;
