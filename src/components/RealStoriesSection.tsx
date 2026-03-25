import { motion } from "framer-motion";
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
            <p className="text-white/50 text-xl font-light">Real metrics from real deployments.</p>
          </div>
          <a href="/case-studies" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium">
            Read all Engineering Cases <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topStories.map((story, i) => (
            <div key={i} className="group flex flex-col h-full bg-[#0a0a0a] border border-white/10 p-8 hover:border-white/20 transition-colors">
               <div className="flex justify-between items-start mb-10">
                 <story.icon size={20} className="text-white/40 group-hover:text-white transition-colors" />
                 <span className="text-[10px] uppercase tracking-widest font-mono text-white/30">{story.industry}</span>
               </div>
               
               <h3 className="text-xl font-medium text-white mb-2 leading-snug">{story.title}</h3>
               <p className="text-xs text-white/50 mb-8 font-mono">{story.client}</p>
               
               <div className="flex-1 mt-auto">
                 <div className="space-y-4 pt-6 border-t border-white/10">
                   {story.outcomes.slice(0, 2).map((outcome, idx) => (
                     <div key={idx} className="flex gap-3 items-start">
                       <span className="text-white/50 mt-0.5 text-xs">―</span>
                       <span className="text-sm font-light text-white/70 leading-relaxed">{outcome}</span>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RealStoriesSection;
