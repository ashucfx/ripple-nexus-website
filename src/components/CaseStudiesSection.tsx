import React, { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, Layers, CheckCircle2 } from "lucide-react";
import { CASE_STUDIES } from "../data/behavioralData";
import { CaseStudyItem, BehavioralIntentId } from "../models/behavioral";
import { telemetry } from "../analytics/telemetry";

interface CaseStudiesSectionProps {
  onDiscussSimilar: (caseStudy: CaseStudyItem) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onDiscussSimilar }) => {
  const [expandedId, setExpandedId] = useState<string | null>(CASE_STUDIES[0].id);
  const [filterIntent, setFilterIntent] = useState<BehavioralIntentId | "all">("all");

  const toggleExpand = (id: string) => {
    const next = expandedId === id ? null : id;
    setExpandedId(next);
    if (next) {
      telemetry.track("case_study_open", { caseStudyId: id });
    }
  };

  const handleFilter = (intent: BehavioralIntentId | "all") => {
    setFilterIntent(intent);
    telemetry.track("solution_content_view", { filter: intent });
  };

  const filteredStudies = filterIntent === "all"
    ? CASE_STUDIES
    : CASE_STUDIES.filter((cs) => cs.intentCategory === filterIntent);

  return (
    <section id="case-studies" className="py-24 border-b border-[#1E2028] bg-[#08090C]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#1E2028]">
          <div>
            <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest mb-3">
              [STATE 06 // CREDIBILITY & REASONING]
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-[1.05]">
              Real systems. Verified outcomes.
            </h2>
          </div>
          <p className="font-body text-sm text-[#8E93A4] max-w-md">
            Every case study details what broke, the decision made, what was built, how the system operates, and the audited results. No inflated vanity claims.
          </p>
        </div>

        {/* Intent Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 my-8 font-mono text-xs">
          <span className="text-[#8E93A4] uppercase mr-2">[FILTER BY REALITY]:</span>
          {(["all", "build", "automate", "modernize", "scale"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`px-3 py-1.5 uppercase transition-colors duration-150 border ${
                filterIntent === cat
                  ? "bg-white text-black font-bold border-white"
                  : "bg-[#0E1017] text-[#8E93A4] border-[#1E2028] hover:text-white hover:border-[#2A2E44]"
              }`}
            >
              {cat === "all" ? "All Projects" : cat}
            </button>
          ))}
        </div>

        {/* Case Studies List */}
        <div className="space-y-4">
          {filteredStudies.map((study) => {
            const isExpanded = expandedId === study.id;
            return (
              <div
                key={study.id}
                className="border border-[#1E2028] bg-[#0D0F16] transition-all duration-150"
              >
                {/* Collapsed Header / Executive Card */}
                <div
                  onClick={() => toggleExpand(study.id)}
                  className="p-6 cursor-pointer hover:bg-[#12141F] transition-colors duration-150 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[10px] text-[#00F0FF] uppercase tracking-wider bg-[#00F0FF]/10 px-2 py-0.5 border border-[#00F0FF]/20">
                        {study.industry}
                      </span>
                      <span className="font-mono text-[11px] text-[#8E93A4]">
                        CLIENT: {study.client}
                      </span>
                      <span className="font-mono text-[11px] text-[#8E93A4]">
                        DURATION: {study.duration}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      {study.title}
                    </h3>
                    <p className="font-body text-sm text-[#B4B9C8]">
                      {study.summary}
                    </p>
                  </div>

                  {/* Highlights & Toggle */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 shrink-0 border-t lg:border-t-0 border-[#1E2028] pt-4 lg:pt-0">
                    <div className="grid grid-cols-2 gap-4 text-right">
                      {study.metrics.slice(0, 2).map((m, i) => (
                        <div key={i} className="text-left lg:text-right">
                          <div className="font-display font-bold text-base text-white">
                            {m.value}
                          </div>
                          <div className="font-mono text-[10px] text-[#8E93A4] uppercase">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      className="p-2 text-[#8E93A4] hover:text-white border border-[#1E2028] bg-[#08090C]"
                      aria-label="Expand case study details"
                    >
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                </div>

                {/* Progressive Disclosure: Full 6-Stage Psychology Anatomy */}
                {isExpanded && (
                  <div className="border-t border-[#1E2028] bg-[#08090C] p-6 lg:p-10 space-y-8 animate-in fade-in duration-200">
                    {/* The 6 Stages Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* 01 PROBLEM */}
                      <div className="p-5 border border-[#1E2028] bg-[#0D0F16] space-y-2">
                        <div className="font-mono text-[10px] text-[#FF4D4D] uppercase tracking-widest font-bold">
                          [01 // PROBLEM] What was broken?
                        </div>
                        <p className="font-body text-xs text-[#B4B9C8] leading-relaxed">
                          {study.problem}
                        </p>
                      </div>

                      {/* 02 CONTEXT */}
                      <div className="p-5 border border-[#1E2028] bg-[#0D0F16] space-y-2">
                        <div className="font-mono text-[10px] text-[#FFB020] uppercase tracking-widest font-bold">
                          [02 // CONTEXT] Why did it matter?
                        </div>
                        <p className="font-body text-xs text-[#B4B9C8] leading-relaxed">
                          {study.context}
                        </p>
                      </div>

                      {/* 03 DECISION */}
                      <div className="p-5 border border-[#1E2028] bg-[#0D0F16] space-y-2">
                        <div className="font-mono text-[10px] text-[#00F0FF] uppercase tracking-widest font-bold">
                          [03 // DECISION] What needed to change?
                        </div>
                        <p className="font-body text-xs text-[#B4B9C8] leading-relaxed">
                          {study.decision}
                        </p>
                      </div>

                      {/* 04 BUILD */}
                      <div className="p-5 border border-[#1E2028] bg-[#0D0F16] space-y-2">
                        <div className="font-mono text-[10px] text-[#7C5CFF] uppercase tracking-widest font-bold">
                          [04 // BUILD] What was actually created?
                        </div>
                        <p className="font-body text-xs text-[#B4B9C8] leading-relaxed">
                          {study.build}
                        </p>
                      </div>

                      {/* 05 SYSTEM */}
                      <div className="p-5 border border-[#1E2028] bg-[#0D0F16] space-y-2">
                        <div className="font-mono text-[10px] text-[#22D3EE] uppercase tracking-widest font-bold">
                          [05 // SYSTEM] How does it work?
                        </div>
                        <p className="font-body text-xs text-[#B4B9C8] leading-relaxed">
                          {study.system}
                        </p>
                      </div>

                      {/* 06 RESULT */}
                      <div className="p-5 border border-[#1E2028] bg-[#0D0F16] space-y-2">
                        <div className="font-mono text-[10px] text-[#00E599] uppercase tracking-widest font-bold">
                          [06 // RESULT] Verified outcomes
                        </div>
                        <p className="font-body text-xs text-white leading-relaxed font-medium">
                          {study.result}
                        </p>
                      </div>
                    </div>

                    {/* Metrics Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#1E2028] border border-[#1E2028]">
                      {study.metrics.map((m, idx) => (
                        <div key={idx} className="bg-[#08090C] p-4 text-center">
                          <div className="font-display font-bold text-2xl text-white">
                            {m.value}
                          </div>
                          <div className="font-mono text-[10px] text-[#8E93A4] uppercase mt-1">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tags & Contextual CTA */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1E2028]">
                      <div className="flex flex-wrap gap-2">
                        {study.tags.map((t, i) => (
                          <span
                            key={i}
                            className="font-mono text-[11px] bg-[#12141F] text-[#8E93A4] px-2.5 py-1 border border-[#1E2028]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          telemetry.track("case_study_cta_click", { caseStudyId: study.id });
                          onDiscussSimilar(study);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#00F0FF] transition-all duration-150 border border-white group"
                      >
                        <span>Discuss Something Similar</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
