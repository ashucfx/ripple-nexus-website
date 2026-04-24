import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Home } from "lucide-react";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--obsidian)" }}>
      <Navbar />

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(124,92,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,92,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "60%",
          height: "60%",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(124,92,255,0.12) 0%, rgba(10,11,20,0) 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="eyebrow mb-8"
          >
            Error 404
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div
              className="w-12 h-px mx-auto mb-10"
              style={{ background: "linear-gradient(90deg, #7C5CFF 0%, #22D3EE 100%)" }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-bold leading-none mb-5"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", letterSpacing: "-0.04em", color: "var(--pearl)" }}
          >
            Signal{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #7C5CFF 0%, #B794FF 55%, #22D3EE 100%)" }}
            >
              Lost.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="font-body text-lg leading-relaxed mb-3"
            style={{ color: "var(--graphite-300)" }}
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.26, duration: 0.4 }}
            className="font-mono text-[0.6rem] tracking-widest uppercase mb-12"
            style={{ color: "var(--graphite-400)" }}
          >
            Route: {location.pathname}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.32 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 font-body font-semibold text-sm transition-all duration-200 w-full sm:w-auto rounded-xl"
              style={{
                background: "var(--nexus-violet)",
                color: "#fff",
                boxShadow: "0 8px 32px -4px rgba(124,92,255,0.45)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "var(--violet-hover)";
                e.currentTarget.style.boxShadow = "0 12px 40px -4px rgba(124,92,255,0.55)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "var(--nexus-violet)";
                e.currentTarget.style.boxShadow = "0 8px 32px -4px rgba(124,92,255,0.45)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Home size={15} />
              Back to Home
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="/#rns-scheduler"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-body font-medium text-sm transition-all duration-200 w-full sm:w-auto rounded-xl"
              style={{ border: "1px solid var(--graphite-600)", color: "var(--pearl)" }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(124,92,255,0.5)";
                e.currentTarget.style.background = "rgba(124,92,255,0.06)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--graphite-600)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Request AI Audit
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
