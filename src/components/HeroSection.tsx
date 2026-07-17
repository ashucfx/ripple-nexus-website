import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import ClientLogoStrip from "./ClientLogoStrip";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-16 gradient-mesh-hero"
    >
      {/* Abstract particle overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content Column */}
          <div className="flex flex-col items-start text-left">
            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full glass-panel"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(163,230,53,0.8)]"
                style={{ background: "var(--quantum-lime)" }}
              />
              <span className="font-mono text-[0.6875rem] font-semibold tracking-widest uppercase" style={{ color: "var(--pearl)" }}>
                AI-First Digital Transformation
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="font-display font-bold leading-tight mb-6"
              style={{
                fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
                letterSpacing: "-0.04em",
                color: "var(--pearl)",
                lineHeight: 1.05,
              }}
            >
              Solve Complex Problems<br />
              <span className="gradient-text-vibrant">
                Using AI.
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="font-body max-w-xl leading-relaxed mb-10"
              style={{ fontSize: "1.125rem", color: "var(--graphite-300)" }}
            >
              We help organizations modernize, automate, optimize and scale. 
              Deploy autonomous AI agents, enterprise software, and workflow automations that deliver measurable ROI.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto"
            >
              <a
                href="/#lead-form"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 font-body font-semibold text-sm transition-all duration-200 w-full sm:w-auto rounded-xl overflow-hidden"
                style={{
                  background: "var(--nexus-violet)",
                  color: "#fff",
                  boxShadow: "var(--shadow-glow-violet)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--violet-hover)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--nexus-violet)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                <Calendar size={16} className="relative z-10" />
                <span className="relative z-10">Schedule Consultation</span>
              </a>
              <a
                href="/case-studies"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 font-body font-medium text-sm transition-all duration-200 w-full sm:w-auto rounded-xl glass-panel"
                style={{ color: "var(--pearl)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(124,92,255,0.4)";
                  e.currentTarget.style.background = "rgba(124,92,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(124,92,255,0.12)";
                  e.currentTarget.style.background = "rgba(18,20,31,0.6)";
                }}
              >
                View Case Studies <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </motion.div>

            {/* Client Logo Strip (Integrated into Hero) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="w-full max-w-xl border-t border-white/5 pt-6"
            >
              <p className="font-mono text-[0.6rem] tracking-widest uppercase mb-4 opacity-70" style={{ color: "var(--graphite-400)" }}>
                Trusted by engineering teams at
              </p>
              <ClientLogoStrip />
            </motion.div>
          </div>

          {/* Right Visual Column — Grounded Terminal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="rounded-xl border border-white/10 bg-[#0c0d12] shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#12141c]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                </div>
                <div className="mx-auto font-mono text-[0.65rem] text-white/40">deploy_system.sh</div>
              </div>
              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm text-white/70 leading-relaxed overflow-hidden">
                <div className="text-white/40 mb-3"># Initializing deployment...</div>
                <div className="flex gap-3 mb-2">
                  <span style={{ color: "var(--nexus-violet)" }}>➜</span>
                  <span>Connecting to client infrastructure... <span className="text-white/40">[OK]</span></span>
                </div>
                <div className="flex gap-3 mb-2">
                  <span style={{ color: "var(--nexus-violet)" }}>➜</span>
                  <span>Provisioning isolated VPC... <span className="text-white/40">[OK]</span></span>
                </div>
                <div className="flex gap-3 mb-5">
                  <span style={{ color: "var(--nexus-violet)" }}>➜</span>
                  <span>Deploying autonomous agent mesh... <span className="text-white/40">[OK]</span></span>
                </div>
                <div className="text-white mb-2">Configuring API integrations:</div>
                <div className="pl-6 mb-2 border-l-2 border-white/10 text-white/50">
                  <div className="mb-1">Salesforce CRM.... <span className="text-white/80">Connected</span></div>
                  <div className="mb-1">Stripe Billing.... <span className="text-white/80">Connected</span></div>
                  <div className="mb-1">Datadog Telemetry. <span className="text-white/80">Connected</span></div>
                </div>
                <div className="flex gap-3 mt-6">
                  <span style={{ color: "var(--nexus-violet)" }}>➜</span>
                  <span className="text-white">System live. Production handover complete.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Required shimmer keyframes added via Tailwind arbitrary values in className above */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
