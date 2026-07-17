import { motion } from "framer-motion";
import { ArrowRight, Calendar, Star, CheckCircle2, Activity, Zap, Shield, BarChart3, Database } from "lucide-react";
import ClientLogoStrip from "./ClientLogoStrip";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-16 gradient-mesh-hero bg-[#030305]"
    >
      {/* Abstract particle overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />
      {/* Glow orb */}
      <div className="absolute top-1/4 -right-[20%] w-[800px] h-[800px] bg-[#1f56d4]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1250px] mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <div className="flex flex-col items-start text-left lg:col-span-7">
            {/* Social Proof Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <div className="flex items-center gap-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </div>
              <span className="text-xs font-medium text-white/80">
                Trusted by 50+ enterprise leaders
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="font-display font-bold leading-tight mb-6 tracking-tight text-white"
              style={{
                fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)",
                lineHeight: 1.05,
              }}
            >
              Turn Complexity Into<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3FBD8B] via-[#4fd1c5] to-[#1f56d4]">
                Competitive Advantage.
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="font-body max-w-xl leading-relaxed mb-8 text-white/70 text-lg sm:text-xl"
            >
              We engineer proprietary AI agents, bespoke software, and workflow automations that scale your operations without scaling headcount. Stop paying for generic wrappers. Start building your moat.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="flex flex-col w-full sm:w-auto mb-10"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                <a
                  href="/#lead-form"
                  className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 font-body font-bold text-sm transition-all duration-300 w-full sm:w-auto rounded-xl overflow-hidden bg-[#1f56d4] text-white hover:bg-[#1a47b8] hover:-translate-y-1 shadow-[0_0_20px_rgba(31,86,212,0.4)]"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  <Calendar size={18} className="relative z-10" />
                  <span className="relative z-10">Book Strategy Session</span>
                </a>
                <a
                  href="#services"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 font-body font-semibold text-sm transition-all duration-300 w-full sm:w-auto rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
                >
                  Explore Capabilities <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium text-white/50 px-2">
                <div className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#3FBD8B]" /> Free 30-min consultation</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#3FBD8B]" /> No commitment required</div>
              </div>
            </motion.div>

            {/* Client Logo Strip (Integrated into Hero) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="w-full max-w-xl border-t border-white/10 pt-6"
            >
              <p className="font-mono text-[0.65rem] tracking-widest uppercase mb-4 text-white/40">
                Engineering teams powered by us
              </p>
              <div className="opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                <ClientLogoStrip />
              </div>
            </motion.div>
          </div>

          {/* Right Visual Column — Advanced Dashboard UI */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.3 }}
            className="hidden lg:block lg:col-span-5 relative"
          >
            {/* Dashboard Container */}
            <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0e]/80 backdrop-blur-xl shadow-2xl p-6 overflow-hidden">
              {/* Internal Glow */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#3FBD8B]/20 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#1f56d4]/20 blur-[80px] rounded-full pointer-events-none" />

              {/* Header */}
              <div className="flex justify-between items-center mb-6 relative z-10 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1f56d4] to-[#3FBD8B] flex items-center justify-center shadow-lg shadow-[#1f56d4]/20">
                    <Zap size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Nexus Agent Mesh</div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#3FBD8B] font-mono mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3FBD8B] animate-pulse" />
                      System Online
                    </div>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/60">
                  v2.4.0-prod
                </div>
              </div>

              {/* Animated Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                  className="p-4 rounded-xl border border-white/5 bg-white/[0.02]"
                >
                  <div className="flex items-center gap-2 text-[11px] text-white/50 mb-2 uppercase tracking-wider font-semibold">
                    <Activity size={12} className="text-[#1f56d4]" /> Automation Rate
                  </div>
                  <div className="text-3xl font-black text-white mb-1 tracking-tight">94.2<span className="text-lg text-white/50">%</span></div>
                  <div className="text-[10px] text-[#3FBD8B] font-medium">+12.4% this quarter</div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                  className="p-4 rounded-xl border border-white/5 bg-white/[0.02]"
                >
                  <div className="flex items-center gap-2 text-[11px] text-white/50 mb-2 uppercase tracking-wider font-semibold">
                    <Shield size={12} className="text-[#a855f7]" /> Threat Blocks
                  </div>
                  <div className="text-3xl font-black text-white mb-1 tracking-tight">1.2<span className="text-lg text-white/50">m</span></div>
                  <div className="text-[10px] text-[#3FBD8B] font-medium">Zero breaches detected</div>
                </motion.div>
              </div>

              {/* Processing Pipeline UI */}
              <div className="relative z-10 border-t border-white/10 pt-5">
                <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-4">Active Workflows</div>
                
                <div className="space-y-3">
                  {[
                    { icon: <Database size={14}/>, label: "Data Pipeline ETL", status: "Optimal", progress: "100%", color: "#3FBD8B" },
                    { icon: <BarChart3 size={14}/>, label: "Predictive Analytics", status: "Syncing", progress: "65%", color: "#1f56d4" },
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 + (i * 0.1) }}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-md bg-white/10 text-white">{item.icon}</div>
                        <div>
                          <div className="text-xs font-bold text-white/90">{item.label}</div>
                          <div className="text-[10px] font-mono mt-0.5" style={{ color: item.color }}>{item.status}</div>
                        </div>
                      </div>
                      {item.progress !== "100%" ? (
                        <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} animate={{ width: item.progress }} transition={{ duration: 1.5, delay: 1 }}
                            className="h-full rounded-full" style={{ backgroundColor: item.color }}
                          />
                        </div>
                      ) : (
                        <CheckCircle2 size={16} className="text-[#3FBD8B]" />
                      )}
                    </motion.div>
                  ))}
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
