import { motion } from "framer-motion";
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const problems = [
  "Your tech stack breaks every time you try to scale",
  "Three different tools that don't talk to each other",
  "Your team manually does what should be automated",
  "Projects ship late, over budget, and under-spec",
  "No real visibility into what's working or why",
  "Competitors ship faster, respond faster, close faster",
];

const solutions = [
  "One integrated system engineered for your scale goal",
  "Automation that eliminates manual handoffs permanently",
  "AI-powered workflows operating 24/7 without headcount",
  "Fixed-scope delivery with weekly transparency checkpoints",
  "Real-time dashboards that expose every business metric",
  "Infrastructure that turns your speed into a competitive moat",
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const ProblemSolutionSection = () => {
  return (
    <section className="py-28 bg-black border-t border-white/[0.06] relative z-10 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(31,86,212,0.04)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_50%,rgba(63,189,139,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="max-w-2xl mb-20">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-semibold text-xs tracking-widest uppercase mb-5"
          >
            Why You're Here
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl md:text-[56px] font-display font-bold text-white tracking-tight leading-[1.05] mb-5"
          >
            Most Agencies Sell Time.
            <br />
            <span className="text-gradient">We Sell Outcomes.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="text-white/60 text-lg leading-relaxed"
          >
            If your technology isn't compounding your growth every quarter, it's costing you.
            Here's the exact gap between where you are and where you need to be.
          </motion.p>
        </div>

        {/* Two-column comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Problem column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="rounded-2xl border border-red-500/25 bg-red-500/[0.07] p-8"
            style={{ boxShadow: "inset 0 1px 0 0 rgba(239,68,68,0.08), 0 0 40px -12px rgba(239,68,68,0.08)" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <XCircle size={20} className="text-red-400" />
              <h3 className="text-white font-bold text-lg">Where most businesses are stuck</h3>
            </div>
            <div className="space-y-4">
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-start gap-3 group"
                >
                  <XCircle size={16} className="text-red-400/80 mt-0.5 shrink-0" />
                  <p className="text-white/70 text-[15px] leading-snug group-hover:text-white/90 transition-colors duration-200">{p}</p>
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
            className="rounded-2xl border border-secondary/40 bg-secondary/[0.09] p-8"
            style={{ boxShadow: "inset 0 1px 0 0 rgba(63,189,139,0.1), 0 0 40px -12px rgba(63,189,139,0.12)" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle2 size={20} className="text-secondary" />
              <h3 className="text-white font-bold text-lg">What Ripple Nexus installs</h3>
            </div>
            <div className="space-y-4">
              {solutions.map((s, i) => (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } } }}
                  className="flex items-start gap-3 group"
                >
                  <CheckCircle2 size={16} className="text-secondary mt-0.5 shrink-0 drop-shadow-[0_0_4px_rgba(63,189,139,0.6)]" />
                  <p className="text-white text-[15px] leading-snug font-medium group-hover:text-white/90 transition-colors duration-200">{s}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-8 py-6"
        >
          <p className="text-white/70 text-base font-medium text-center sm:text-left">
            Ready to close the gap? We'll map your system in a free 30-min call.
          </p>
          <a
            href="/contact#lead-form"
            className="group inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(222_74%_48%/0.35)] transition-all duration-200 shrink-0"
          >
            Get My System Audit
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default ProblemSolutionSection;
