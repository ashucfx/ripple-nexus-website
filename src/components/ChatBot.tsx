import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Mail, Phone, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Floating Contact Widget
 * 
 * Diagnosis Wave II Fix:
 * ✓ Replaced automated chatbot with direct human access mechanism.
 * ✓ Enterprise buyers want to speak to senior architects, not bots.
 * ✓ Provides immediate email/phone routing and direct booking link.
 */
const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleAction = (path: string) => {
    setOpen(false);
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 transition-all duration-300"
            style={{
              background: "var(--nexus-violet)",
              color: "#fff",
              boxShadow: "0 0 30px rgba(124,92,255,0.4)",
            }}
            aria-label="Contact Ripple Nexus"
          >
            <MessageSquare size={22} className="fill-white" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid var(--graphite-600)", background: "var(--obsidian)" }}>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-[15px] font-semibold text-white tracking-wide">Direct Access</p>
                  <p className="text-[12px] font-medium tracking-wider uppercase mt-0.5" style={{ color: "var(--graphite-400)" }}>Senior Architects</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="hover:text-white transition-colors" style={{ color: "var(--graphite-400)" }}>
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="px-6 py-6 space-y-6" style={{ background: "var(--ink)" }}>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-300)" }}>
                Enterprise architecture requires deep technical context. Speak directly with our lead engineers to map your automation potential.
              </p>
              
              <div className="space-y-3">
                <a 
                  href="mailto:info@theripplenexus.com"
                  className="flex items-center gap-3 p-3 rounded-xl transition-colors duration-200"
                  style={{ background: "rgba(124,92,255,0.06)", border: "1px solid rgba(124,92,255,0.15)" }}
                >
                  <Mail size={16} style={{ color: "var(--nexus-violet)" }} />
                  <span className="font-body text-sm font-medium" style={{ color: "var(--pearl)" }}>info@theripplenexus.com</span>
                </a>
                
                <a 
                  href="tel:+917599756826"
                  className="flex items-center gap-3 p-3 rounded-xl transition-colors duration-200"
                  style={{ background: "rgba(124,92,255,0.06)", border: "1px solid rgba(124,92,255,0.15)" }}
                >
                  <Phone size={16} style={{ color: "var(--nexus-violet)" }} />
                  <span className="font-body text-sm font-medium" style={{ color: "var(--pearl)" }}>+91-7599-756-826</span>
                </a>
              </div>

              <button
                onClick={() => handleAction("/#lead-form")}
                className="group flex items-center justify-between w-full bg-primary text-primary-foreground px-5 py-3.5 rounded-xl transition-all duration-300 shadow-md"
                style={{ background: "var(--nexus-violet)" }}
              >
                <span className="text-sm font-semibold text-white">Begin Architecture Discovery</span>
                <ArrowRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
