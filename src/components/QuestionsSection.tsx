import { motion } from "framer-motion";
import { Search, Compass, Target, Lightbulb, Rocket } from "lucide-react";

const steps = [
  { icon: Search, question: "What is slowing your growth?", step: "01" },
  { icon: Compass, question: "Where is the system friction?", step: "02" },
  { icon: Target, question: "What does scale look like?", step: "03" },
  { icon: Lightbulb, question: "How to serve users better?", step: "04" },
  { icon: Rocket, question: "What makes the next 6 months easier?", step: "05" },
];

const QuestionsSection = () => {
  return (
    <section id="questions" className="py-32 bg-black border-t border-white/5 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white mb-6 tracking-tight leading-tight">
              Questions <br className="hidden md:block" />
              <span className="text-white/40">Before code.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed font-light mb-10 max-w-md">
              True digital transformation begins by uncovering the systemic bottlenecks, not just treating the symptoms.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-center gap-6 p-6 border-b border-white/10 group hover:bg-white/[0.02] transition-colors rounded-xl"
              >
                <div className="text-xs font-mono text-white/30">{s.step}</div>
                <p className="text-white text-lg font-medium tracking-tight group-hover:text-primary transition-colors">{s.question}</p>
                <s.icon size={16} className="ml-auto text-white/20 group-hover:text-primary transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionsSection;
