import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { telemetry } from "../analytics/telemetry";

export const HeroSection: React.FC = () => {
  const handleStartProject = () => {
    telemetry.track("hero_cta_click", { destination: "intake" });
    const el = document.getElementById("intake");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSeeWork = () => {
    telemetry.track("hero_work_click", { destination: "proof" });
    const el = document.getElementById("proof");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 border-b border-[#1E2028] bg-[#08090C] overflow-hidden">
      {/* Background Subtle Swiss Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="font-mono text-[11px] tracking-widest uppercase text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-1 border border-[#00F0FF]/20">
            ENGINEERING & AUTOMATION PARTNER
          </span>
          <span className="font-mono text-[11px] tracking-wider uppercase text-[#8E93A4]">
            SAAS · AI · AUTOMATION · DATA · CLOUD
          </span>
        </div>

        {/* Primary Punch Headline */}
        <div className="max-w-5xl mb-8">
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.98] sm:leading-[0.95] text-white uppercase break-words">
            Digital Systems
            <br />
            <span className="text-[#8E93A4]">For Companies</span>
            <br />
            That Refuse
            <br />
            To Operate Manually.
          </h1>
        </div>

        {/* Supporting Message — Direct, Specific, Non-Jargon */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-2 sm:pt-4">
          <div className="lg:col-span-8">
            <p className="font-body text-base sm:text-lg lg:text-xl text-[#B4B9C8] leading-relaxed max-w-2xl">
              We build SaaS platforms, AI workflows, business applications, and digital infrastructure around how your business actually operates. No vanity prototypes. Systems built for production scale and full operational ownership.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              onClick={handleStartProject}
              className="inline-flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#00F0FF] transition-all duration-150 border border-white group w-full"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
            </button>

            <button
              onClick={handleSeeWork}
              className="inline-flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 bg-transparent text-white font-mono text-xs font-bold uppercase tracking-wider border border-[#2A2E44] hover:border-white transition-all duration-150 group w-full"
            >
              <span>See What We’ve Built</span>
              <ArrowUpRight className="w-4 h-4 text-[#8E93A4] group-hover:text-white transition-colors duration-150" />
            </button>
          </div>
        </div>

        {/* Operational Telemetry Indicators Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1E2028] mt-12 sm:mt-16 border border-[#1E2028]">
          <div className="bg-[#08090C] p-3.5 sm:p-5">
            <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#8E93A4] mb-1">
              [TELEMETRY // 01]
            </div>
            <div className="font-display font-bold text-xl sm:text-2xl text-white">200+</div>
            <div className="font-body text-[11px] sm:text-xs text-[#8E93A4] mt-0.5 leading-snug">
              Production Workflows & Systems
            </div>
          </div>

          <div className="bg-[#08090C] p-3.5 sm:p-5">
            <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#8E93A4] mb-1">
              [TELEMETRY // 02]
            </div>
            <div className="font-display font-bold text-xl sm:text-2xl text-white">100%</div>
            <div className="font-body text-[11px] sm:text-xs text-[#8E93A4] mt-0.5 leading-snug">
              IP & Code Ownership Transferred
            </div>
          </div>

          <div className="bg-[#08090C] p-3.5 sm:p-5">
            <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#8E93A4] mb-1">
              [TELEMETRY // 03]
            </div>
            <div className="font-display font-bold text-xl sm:text-2xl text-white">48 Hours</div>
            <div className="font-body text-[11px] sm:text-xs text-[#8E93A4] mt-0.5 leading-snug">
              Written Architectural Brief
            </div>
          </div>

          <div className="bg-[#08090C] p-3.5 sm:p-5">
            <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#8E93A4] mb-1">
              [TELEMETRY // 04]
            </div>
            <div className="font-display font-bold text-xl sm:text-2xl text-white">0 Middlemen</div>
            <div className="font-body text-[11px] sm:text-xs text-[#8E93A4] mt-0.5 leading-snug">
              Direct Senior Architect Access
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
