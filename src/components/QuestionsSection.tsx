import { motion } from "framer-motion";
import { ArrowRight, Clock, DollarSign, Users2, BarChart3, Layers } from "lucide-react";

const signals = [
  {
    icon: Clock,
    question: "Are you losing 10+ hours a week to tasks that should be automated?",
    cost: "That's $60K+/year in hidden labor cost.",
  },
  {
    icon: Layers,
    question: "Is your current tech stack slowing your team down instead of accelerating it?",
    cost: "Most legacy stacks cost 40% in developer productivity.",
  },
  {
    icon: Users2,
    question: "Are you onboarding new users manually because your platform can't automate it?",
    cost: "Manual onboarding kills 3× your activation rate.",
  },
  {
    icon: DollarSign,
    question: "Did your last tech project run over time, over budget, or under-deliver?",
    cost: "72% of outsourced projects fail delivery expectations.",
  },
  {
    icon: BarChart3,
    question: "Do you lack real-time visibility into what's actually driving your revenue?",
    cost: "Blind operations = decisions based on gut, not data.",
  },
];

const QuestionsSection = () => {
  return (
    <section id="questions" className="py-28 bg-black border-t border-white/[0.06] relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_0%_50%,rgba(31,86,212,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

          {/* Left: Positioning */}
          <div className="lg:sticky lg:top-32">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-primary font-semibold text-xs tracking-widest uppercase mb-5"
            >
              The Growth Diagnostic
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl md:text-[48px] font-display font-bold text-white tracking-tight leading-[1.05] mb-6"
            >
              If You Recognize
              <br />
              <span className="text-gradient">Any of These —</span>
              <br />
              You Need Us.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="text-white/55 text-[15px] leading-relaxed mb-10"
            >
              Every signal below represents a compounding loss to your business. The longer
              you wait, the wider the gap between you and a competitor who already fixed it.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <a
                href="#lead-form"
                className="group inline-flex items-center gap-2.5 bg-primary text-white px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-primary/90 hover:shadow-[0_0_32px_hsl(222_74%_48%/0.35)] transition-all duration-200"
              >
                Get My Free Diagnostic
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </motion.div>
          </div>

          {/* Right: Signal list */}
          <div className="space-y-4">
            {signals.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45, ease: "easeOut" }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="group flex gap-5 p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]
                  hover:border-primary/25 hover:bg-primary/[0.03]
                  transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0 group-hover:bg-primary/15 group-hover:border-primary/25 transition-all duration-300">
                  <s.icon size={18} className="text-white/40 group-hover:text-primary transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-white/80 text-[15px] font-medium leading-snug mb-2 group-hover:text-white transition-colors duration-200">
                    {s.question}
                  </p>
                  <p className="text-white/35 text-xs group-hover:text-primary/70 transition-colors duration-200">
                    {s.cost}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default QuestionsSection;
