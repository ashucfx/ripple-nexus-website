import { motion, useInView, animate } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const stats = [
  { from: 150, to: 200, suffix: "+", label: "Clients Worldwide" },
  { from: 99, to: 99.97, suffix: "%", decimals: 2, label: "Uptime SLA" },
  { from: 60, to: 90, suffix: " Days", label: "Avg. Time to Launch" },
  { from: 5, to: 10, prefix: "$", suffix: "M+", label: "Revenue Unlocked" },
];

function CountUpStat({ from, to, suffix, prefix = "", decimals = 0, label }: {
  from: number; to: number; suffix: string; prefix?: string; decimals?: number; label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !numRef.current) return;
    const el = numRef.current;
    const controls = animate(from, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate(v) {
        el.textContent = prefix + v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, from, to, suffix, prefix, decimals]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="text-center group"
    >
      <div className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-gradient transition-all duration-300">
        <span ref={numRef}>{prefix}{from.toFixed(decimals)}{suffix}</span>
      </div>
      <div className="text-[11px] text-white/40 uppercase tracking-widest mt-1 font-medium">
        {label}
      </div>
    </motion.div>
  );
}

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
          className="text-5xl md:text-7xl lg:text-[80px] font-display font-bold text-white tracking-tight leading-[1.05] mb-8"
        >
          Build for scale.<br />
          <span className="text-gradient">Architect for growth.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10 font-normal"
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
              className="group relative inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-md font-semibold text-[15px] hover:bg-white/95 hover:shadow-[0_0_28px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
            >
              Start Your Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://calendly.com/ripplenexus/book-a-consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/25 text-white/85 px-8 py-4 rounded-md font-medium text-[15px] hover:bg-white/5 hover:border-white/40 hover:text-white transition-all duration-300 w-full sm:w-auto"
            >
              <Calendar size={18} /> Direct Booking
            </a>
          </motion.div>

        {/* Animated Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          className="mt-16 border-t border-white/[0.07] pt-10"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-16">
            {stats.map((stat) => (
              <CountUpStat key={stat.label} {...stat} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
