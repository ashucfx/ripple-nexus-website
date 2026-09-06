import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { CAPABILITY_GROUPS } from "../data/behavioralData";
import { CapabilityGroup } from "../models/behavioral";
import { telemetry } from "../analytics/telemetry";

interface CapabilitySectionProps {
  onSelectCapability: (cap: string) => void;
}

export const CapabilitySection: React.FC<CapabilitySectionProps> = ({ onSelectCapability }) => {
  const [activeGroupIndex, setActiveGroupIndex] = useState<number>(0);
  const activeGroup = CAPABILITY_GROUPS[activeGroupIndex];

  const handleGroupSelect = (idx: number) => {
    setActiveGroupIndex(idx);
    telemetry.track("capability_open", { capabilityId: CAPABILITY_GROUPS[idx].id });
  };

  return (
    <section id="capabilities" className="py-24 border-b border-[#1E2028] bg-[#08090C]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#1E2028]">
          <div>
            <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest mb-3">
              [STATE 07 // TECHNICAL COMPETENCE]
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-[1.05]">
              Core Capabilities.
              <br />
              <span className="text-[#8E93A4]">Disciplined Engineering.</span>
            </h2>
          </div>
          <p className="font-body text-sm text-[#8E93A4] max-w-md">
            We don’t sell a menu of generic digital agency services. We engineer four interdependent systems domains designed to eliminate operational friction and scale commercial revenue.
          </p>
        </div>

        {/* 4 Pillar Selection Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1E2028] my-8 border border-[#1E2028]">
          {CAPABILITY_GROUPS.map((group, idx) => {
            const isActive = activeGroupIndex === idx;
            return (
              <button
                key={group.id}
                onClick={() => handleGroupSelect(idx)}
                className={`p-5 text-left transition-all duration-150 relative ${
                  isActive
                    ? "bg-[#14161F] text-white"
                    : "bg-[#08090C] text-[#8E93A4] hover:bg-[#0E1017] hover:text-white"
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#00F0FF]" />
                )}
                <div className="font-mono text-[10px] text-[#00F0FF] uppercase tracking-wider mb-1">
                  DOMAIN // 0{idx + 1}
                </div>
                <div className="font-display font-bold text-sm sm:text-base uppercase tracking-tight">
                  {group.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Capability Deep-Dive View */}
        <div className="border border-[#1E2028] bg-[#0D0F16] p-6 lg:p-10">
          <div className="pb-8 border-b border-[#1E2028]">
            <span className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider">
              DOMAIN MANDATE
            </span>
            <p className="font-body text-lg sm:text-xl text-[#B4B9C8] mt-2 max-w-3xl leading-relaxed">
              {activeGroup.description}
            </p>
          </div>

          {/* Sub-capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1E2028] mt-8 border border-[#1E2028]">
            {activeGroup.subCapabilities.map((sub, i) => (
              <div key={i} className="bg-[#08090C] p-6 sm:p-8 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-[#00F0FF] inline-block" />
                    <h3 className="font-display font-bold text-lg text-white">
                      {sub.name}
                    </h3>
                  </div>
                  <p className="font-body text-xs sm:text-sm text-[#8E93A4] leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#14161F] flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#00E599]">
                    ✓ {sub.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-[#1E2028]">
            <span className="font-mono text-xs text-[#8E93A4]">
              ALL ARCHITECTURES DELIVERED WITH 100% INTELLECTUAL PROPERTY TRANSFER.
            </span>
            <button
              onClick={() => onSelectCapability(activeGroup.title)}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#00F0FF] transition-all duration-150 border border-white"
            >
              <span>Explore {activeGroup.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitySection;
