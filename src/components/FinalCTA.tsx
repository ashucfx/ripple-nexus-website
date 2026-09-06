import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { telemetry } from "../analytics/telemetry";

export const FinalCTA: React.FC = () => {
  const handleStartProject = () => {
    telemetry.track("hero_cta_click", { location: "final_cta" });
    const el = document.getElementById("intake");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSeeWork = () => {
    telemetry.track("hero_work_click", { location: "final_cta" });
    const el = document.getElementById("proof");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 border-b border-[#1E2028] bg-[#08090C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="border border-[#1E2028] bg-[#0D0F16] p-8 sm:p-14 lg:p-20">
          <div className="max-w-4xl space-y-6">
            <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest">
              [STATE 12 // DIRECT ACTION]
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[0.95]">
              Have a system
              <br />
              worth building?
            </h2>

            <p className="font-body text-base sm:text-lg text-[#B4B9C8] max-w-2xl leading-relaxed">
              Tell us what you’re trying to change. You don’t need a perfect brief or complete wireframes. Start with the operational problem.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={handleStartProject}
                className="inline-flex items-center justify-between gap-3 px-8 py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#00F0FF] transition-all duration-150 border border-white group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleSeeWork}
                className="inline-flex items-center justify-between gap-3 px-8 py-4 bg-transparent text-white font-mono text-xs font-bold uppercase tracking-wider border border-[#2A2E44] hover:border-white transition-all duration-150 group"
              >
                <span>See Our Work</span>
                <ArrowUpRight className="w-4 h-4 text-[#8E93A4] group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
