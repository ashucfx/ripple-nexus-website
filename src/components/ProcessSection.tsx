import React from "react";
import { PROCESS_STEPS } from "../data/behavioralData";

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 border-b border-[#1E2028] bg-[#08090C]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest mb-3">
            [STATE 10 // RISK REDUCTION]
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-[1.05]">
            What happens after
            <br />
            <span className="text-[#8E93A4]">you reach out?</span>
          </h2>
          <p className="font-body text-base text-[#8E93A4] mt-3">
            We don’t trap you in endless qualification loops or high-pressure sales scripts. Here is the exact, repeatable sequence from intake to architecture brief.
          </p>
        </div>

        {/* 5-Step Linear Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-[#1E2028] border border-[#1E2028]">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-[#0D0F16] p-6 space-y-4 hover:bg-[#12141F] transition-colors duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="font-mono font-bold text-2xl text-[#00F0FF] mb-2">
                  {step.step}
                </div>
                <h3 className="font-display font-bold text-base text-white leading-snug mb-2">
                  {step.title}
                </h3>
              </div>
              <p className="font-body text-xs text-[#8E93A4] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Reassurance Callout */}
        <div className="mt-8 p-4 bg-[#08090C] border border-[#1E2028] font-mono text-xs text-[#8E93A4] flex items-center justify-between">
          <span>// PROTOCOL: ZERO HIGH-PRESSURE SALES SCRIPTS. STRICTLY TECHNICAL DIAGNOSIS.</span>
          <span className="text-[#00E599]">NO COMMITMENT REQUIRED</span>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
