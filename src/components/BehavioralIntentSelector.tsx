import React from "react";
import { ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { BehavioralIntentId, IntentProfile } from "../models/behavioral";
import { INTENT_PROFILES } from "../data/behavioralData";
import { telemetry } from "../analytics/telemetry";

interface BehavioralIntentSelectorProps {
  currentIntent: BehavioralIntentId;
  onIntentChange: (intent: BehavioralIntentId) => void;
  onIntentAction: (intent: BehavioralIntentId) => void;
}

export const BehavioralIntentSelector: React.FC<BehavioralIntentSelectorProps> = ({
  currentIntent,
  onIntentChange,
  onIntentAction,
}) => {
  const activeProfile = INTENT_PROFILES[currentIntent];

  const handleSelect = (id: BehavioralIntentId) => {
    onIntentChange(id);
    telemetry.track(`intent_${id}_select` as any, { intent: id });
  };

  return (
    <section id="intent" className="py-24 border-b border-[#1E2028] bg-[#08090C]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest mb-3">
            [STATE 04 // SELF-IDENTIFICATION & RELEVANCE]
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-[1.05]">
            What are you trying to change?
          </h2>
          <p className="font-body text-base text-[#8E93A4] mt-3">
            Select the operational reality you are navigating today. We adapt our technical approach directly around the problem you need to resolve.
          </p>
        </div>

        {/* 4 Human Problem State Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1E2028] border border-[#1E2028]">
          {(Object.keys(INTENT_PROFILES) as BehavioralIntentId[]).map((key) => {
            const profile = INTENT_PROFILES[key];
            const isSelected = currentIntent === key;
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`text-left p-4 sm:p-6 transition-all duration-150 relative ${
                  isSelected
                    ? "bg-[#14161F] text-white"
                    : "bg-[#08090C] text-[#8E93A4] hover:bg-[#0E1017] hover:text-white"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#00F0FF]" />
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#00F0FF]">
                    // 0{key === "build" ? "1" : key === "automate" ? "2" : key === "modernize" ? "3" : "4"}
                  </span>
                  {isSelected && (
                    <span className="font-mono text-[10px] bg-[#00F0FF]/10 text-[#00F0FF] px-2 py-0.5 border border-[#00F0FF]/20 uppercase">
                      ACTIVE STATE
                    </span>
                  )}
                </div>

                <div className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-tight mb-2">
                  {profile.label}
                </div>
                <div className="font-body text-xs sm:text-sm text-[#B4B9C8] font-medium leading-snug">
                  “{profile.tagline}”
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Context Card for Selected Intent */}
        <div className="mt-8 border border-[#1E2028] bg-[#0D0F16] p-4 sm:p-6 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Statement & Focus Areas */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="inline-block font-mono text-[11px] sm:text-xs text-[#8E93A4] uppercase tracking-wider">
                If this is the problem you’re dealing with:
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white leading-snug">
                {activeProfile.statement}
              </h3>

              <div className="space-y-3 pt-2">
                <div className="font-mono text-[10px] sm:text-[11px] text-[#8E93A4] uppercase tracking-wider">
                  Core Engineering Capabilities Applied:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProfile.focusAreas.map((focus, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#B4B9C8] font-mono">
                      <span className="w-1.5 h-1.5 bg-[#00F0FF] inline-block" />
                      <span>{focus}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contextual Action Button */}
              <div className="pt-2 sm:pt-4">
                <button
                  onClick={() => onIntentAction(currentIntent)}
                  className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-3 px-6 py-3.5 sm:py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#00F0FF] transition-all duration-150 border border-white group"
                >
                  <span>{activeProfile.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
                </button>
              </div>
            </div>

            {/* Right: Architectural Deliverable Breakdown */}
            <div className="lg:col-span-5 bg-[#08090C] border border-[#1E2028] p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2028]">
                <span className="font-mono text-[10px] text-[#00F0FF] uppercase tracking-widest">
                  TYPICAL ARCHITECTURE OUTCOME
                </span>
                <span className="font-mono text-[10px] text-[#8E93A4] uppercase">
                  VERIFIED CADENCE
                </span>
              </div>

              <h4 className="font-display font-bold text-lg text-white">
                {activeProfile.architecturePreview.title}
              </h4>
              <p className="font-body text-xs text-[#8E93A4] leading-relaxed">
                {activeProfile.architecturePreview.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-1 gap-2 pt-2">
                {activeProfile.architecturePreview.metrics.map((metric, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-[#14161F] text-xs">
                    <span className="text-[#8E93A4] font-mono">{metric.label}</span>
                    <span className="text-white font-mono font-bold">{metric.value}</span>
                  </div>
                ))}
              </div>

              {/* Technology Tags */}
              <div className="pt-2">
                <div className="font-mono text-[10px] text-[#8E93A4] uppercase tracking-wider mb-2">
                  Stack Primitives:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeProfile.architecturePreview.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="font-mono text-[11px] bg-[#12141F] text-[#B4B9C8] px-2 py-0.5 border border-[#1E2028]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BehavioralIntentSelector;
