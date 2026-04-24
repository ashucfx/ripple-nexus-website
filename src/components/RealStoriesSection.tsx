import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";

const RealStoriesSection = () => {
  const topStories = caseStudies.slice(0, 3);

  return (
    <section
      className="py-32 relative z-10"
      style={{ background: "var(--obsidian)", borderTop: "1px solid var(--graphite-600)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="font-display font-medium text-4xl md:text-5xl text-white tracking-tight mb-4">
              Proven Architecture.
            </h2>
            <p className="text-xl" style={{ color: "var(--graphite-300)" }}>Real metrics from real deployments.</p>
          </div>
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: "var(--graphite-300)" }}>
            Read all Engineering Cases <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topStories.map((story, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex flex-col h-full p-8 rounded-2xl transition-all duration-300"
              style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(124,92,255,0.3)";
                e.currentTarget.style.boxShadow = "0 8px 40px -12px rgba(124,92,255,0.25)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--graphite-600)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
               <div className="flex justify-between items-start mb-10">
                 <div
                   className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                   style={{ background: "rgba(124,92,255,0.08)", border: "1px solid rgba(124,92,255,0.2)" }}
                 >
                   <story.icon size={16} style={{ color: "var(--nexus-violet)" }} />
                 </div>
                 <span
                   className="text-[10px] uppercase tracking-widest font-mono px-2 py-1 rounded-full"
                   style={{ background: "rgba(124,92,255,0.06)", border: "1px solid rgba(124,92,255,0.15)", color: "var(--graphite-300)" }}
                 >{story.industry}</span>
               </div>

               <h3 className="text-xl font-semibold text-white mb-2 leading-snug">{story.title}</h3>
               <p className="text-xs mb-8" style={{ color: "var(--graphite-400)" }}>{story.client}</p>

               <div className="flex-1 mt-auto">
                 <div className="space-y-3 pt-5" style={{ borderTop: "1px solid var(--graphite-600)" }}>
                   {story.outcomes.slice(0, 2).map((outcome, idx) => (
                     <div key={idx} className="flex gap-2.5 items-start">
                       <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: "var(--quantum-lime)" }} />
                       <span className="text-sm leading-relaxed font-medium" style={{ color: "var(--graphite-200, var(--pearl))" }}>{outcome}</span>
                     </div>
                   ))}
                 </div>
               </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RealStoriesSection;
