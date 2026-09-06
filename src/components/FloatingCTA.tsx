import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import logoMark from "../assets/logo-icon-mark.svg";
import { telemetry } from "../analytics/telemetry";

const FloatingCTA = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show after scrolling down 500px, but hide if dismissed
    if (latest > 500 && !isDismissed) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  if (isDismissed) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    telemetry.track("hero_cta_click", { location: "floating_pill" });
    const el = document.getElementById("intake");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-[calc(100vw-2rem)] pointer-events-${isVisible ? "auto" : "none"}`}
    >
      <div className="relative group">
        <div
          className="relative flex items-center backdrop-blur-2xl p-2 rounded-xl pr-3.5 border border-white/15 bg-[#08090E]/95 shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.12)]"
        >
          {/* Micro Corner Edge Accents */}
          <span className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t border-l border-[#00F0FF]/70 rounded-tl-lg pointer-events-none" />
          <span className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t border-r border-[#00F0FF]/70 rounded-tr-lg pointer-events-none" />
          <span className="absolute -bottom-[1px] -left-[1px] w-2.5 h-2.5 border-b border-l border-[#00F0FF]/70 rounded-bl-lg pointer-events-none" />
          <span className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b border-r border-[#00F0FF]/70 rounded-br-lg pointer-events-none" />
          <a
            href="#intake"
            onClick={handleClick}
            className="flex items-center gap-2.5 sm:gap-3 group/btn"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#14161F] border border-[#2A2E44] flex items-center justify-center p-1.5 sm:p-2 group-hover/btn:scale-105 transition-transform duration-200 shrink-0">
              <img src={logoMark} alt="Ripple Nexus" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-xs sm:text-sm text-white uppercase tracking-wider leading-tight">
                Ripple Nexus
              </span>
              <span className="font-mono text-[10px] text-[#00F0FF] leading-tight mt-0.5 flex items-center gap-1">
                <span>Start a Project</span>
                <span className="font-sans">→</span>
              </span>
            </div>
          </a>
          
          <div className="w-px h-6 sm:h-7 mx-2.5 sm:mx-3 bg-[#1E2028] shrink-0" />
          
          <button 
            onClick={() => {
              setIsDismissed(true);
              setIsVisible(false);
            }} 
            className="text-[#8E93A4] hover:text-white transition-colors p-1 shrink-0"
            aria-label="Dismiss"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingCTA;
