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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(31,86,212,0.06)_0%,transparent_70%)] pointer-events-none" />

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
            className="text-white/55 text-lg max-w-xl mx-auto leading-relaxed"
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
                className="group relative flex flex-col p-6 rounded-2xl bg-[#080810] border border-white/[0.08]
                  hover:border-primary/25 hover:bg-[#0d0d18]
                  hover:shadow-[0_12px_40px_-12px_hsl(222_74%_48%/0.25)]
                  transition-all duration-300"
              >
                {/* Step icon */}
                <div className="relative mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:bg-primary/15 group-hover:border-primary/25 transition-all duration-300">
                    <step.icon size={20} className="text-white/50 group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#080810] border border-white/10 flex items-center justify-center text-[9px] font-bold text-white/30 font-mono group-hover:border-primary/25 group-hover:text-primary/60 transition-all duration-300">
                    {i + 1}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono text-white/25 tracking-widest">{step.num}</span>
                  <span className="text-xs text-white/20">·</span>
                  <span className="text-[10px] text-white/30 uppercase tracking-wider">{step.duration}</span>
                </div>

                <h3 className="font-display font-bold text-white text-xl mb-2 group-hover:text-gradient transition-all duration-300">
                  {step.title}
                </h3>
                <p className="text-primary/80 text-xs font-semibold mb-3 leading-snug">{step.headline}</p>
                <p className="text-white/50 text-[13px] leading-relaxed mb-6 flex-1">{step.desc}</p>

                {/* Deliverable */}
                <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                  <span className="text-[11px] text-white/45 font-medium">{step.deliverable}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 text-center"
        >
          <a
            href="#lead-form"
            className="group inline-flex items-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 text-white/80 hover:text-white px-8 py-4 rounded-xl font-semibold text-[15px] transition-all duration-200"
          >
            Request an Infrastructure Audit
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <p className="text-white/25 text-xs mt-4">No retainer lock-in · Written brief within 48h · Senior engineers, not sales</p>
        </motion.div>

      </div>
    </section>
  );
};

export default ProcessSection;
