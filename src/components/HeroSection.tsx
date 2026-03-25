import { motion } from "framer-motion";
import { ArrowRight, Code2, Cpu, Globe, Zap, Calendar } from "lucide-react";
import FloatingElement from "./FloatingElement";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020610] pt-20">
      {/* Absolute minimalist grid background with deep brand blue radial fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(31,86,212,0.15)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-white/80 tracking-wide">Enterprise Digital Infrastructure</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-[80px] font-display font-medium text-white tracking-tight leading-[1.05] mb-8"
        >
          Build for scale.<br />
          <span className="text-white/40">Architect for growth.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10 font-light"
        >
          We engineer high-performance software, intelligent automation, and scalable platforms for companies that demand perfection.
        </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-md font-medium text-[15px] hover:bg-white/90 transition-all duration-300 w-full sm:w-auto"
            >
              Start Your Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://calendly.com/ripplenexus/book-a-consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/10 text-white px-8 py-4 rounded-md font-medium text-[15px] hover:bg-white/5 transition-all duration-300 w-full sm:w-auto"
            >
              <Calendar size={18} /> Direct Booking
            </a>
          </motion.div>

        {/* Minimalist Dashboard Preview Placeholder */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
           className="mt-20 relative mx-auto max-w-4xl"
        >
           <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent blur-2xl opacity-50" />
           <div className="relative rounded-xl border border-white/10 bg-black/50 backdrop-blur-xl overflow-hidden aspect-video shadow-2xl flex items-center justify-center">
             <div className="absolute top-0 left-0 right-0 h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
             </div>
             {/* Simple code or dashboard visualization */}
             <div className="text-white/20 font-mono text-sm p-10 w-full h-full pt-20 flex flex-col gap-4">
                <div className="h-4 w-1/3 bg-white/5 rounded" />
                <div className="h-4 w-1/2 bg-white/5 rounded" />
                <div className="h-4 w-1/4 bg-white/5 rounded" />
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="h-24 bg-white/5 rounded border border-white/5" />
                  <div className="h-24 bg-white/5 rounded border border-white/5" />
                  <div className="h-24 bg-white/5 rounded border border-white/5" />
                </div>
             </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
