import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";

const RealStoriesSection = () => {
  const topStories = caseStudies.slice(0, 3);

  return (
    <section className="py-32 bg-black border-t border-white/5 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="font-display font-medium text-4xl md:text-5xl text-white tracking-tight mb-4">
              Proven Architecture.
            </h2>
            <p className="text-white/65 text-xl">Real metrics from real deployments.</p>
          </div>
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium">
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
              className="group flex flex-col h-full bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl
                hover:border-primary/30 hover:bg-[#0d0d16]
                hover:shadow-[0_8px_40px_-12px_hsl(222_74%_48%/0.25)]
                transition-colors duration-300"
            >
               <div className="flex justify-between items-start mb-10">
                 <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-primary/15 group-hover:border-primary/20 transition-all duration-300">
                   <story.icon size={16} className="text-white/50 group-hover:text-primary transition-colors duration-300" />
                 </div>
                 <span className="text-[10px] uppercase tracking-widest font-mono text-white/50 bg-white/5 px-2 py-1 rounded-full">{story.industry}</span>
               </div>

               <h3 className="text-xl font-semibold text-white mb-2 leading-snug">{story.title}</h3>
               <p className="text-xs text-white/60 mb-8">{story.client}</p>

               <div className="flex-1 mt-auto">
                 <div className="space-y-3 pt-5 border-t border-white/10">
                   {story.outcomes.slice(0, 2).map((outcome, idx) => (
                     <div key={idx} className="flex gap-2.5 items-start">
                       <span className="text-secondary mt-0.5 text-sm leading-none">✓</span>
                       <span className="text-sm text-white/80 leading-relaxed">{outcome}</span>
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
