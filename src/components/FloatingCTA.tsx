import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { MessageSquareText, X } from "lucide-react";
import { useState } from "react";

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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
      className={`fixed bottom-6 right-6 z-50 pointer-events-${isVisible ? "auto" : "none"}`}
    >
      <div className="relative group">
        {/* Glow behind */}
        <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div
          className="flex items-center backdrop-blur-xl p-1.5 rounded-full pr-4"
          style={{
            background: "rgba(18,20,31,0.9)",
            border: "1px solid rgba(124,92,255,0.25)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          }}
        >
          <a
            href="/#lead-form"
            className="flex items-center gap-3 group/btn"
          >
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-inner group-hover/btn:scale-105 transition-transform duration-300">
              <MessageSquareText size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider leading-tight">Architecture Audit</span>
              <span className="text-sm font-semibold text-white leading-none">Begin Assessment</span>
            </div>
          </a>
          
          <div className="w-px h-8 mx-3" style={{ background: "var(--graphite-600)" }} />
          
          <button 
            onClick={() => {
              setIsDismissed(true);
              setIsVisible(false);
            }} 
            className="text-muted-foreground hover:text-white transition-colors p-1"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingCTA;
