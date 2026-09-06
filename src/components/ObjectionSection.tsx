import React from "react";
import { OBJECTIONS } from "../data/behavioralData";
import { HelpCircle } from "lucide-react";

export const ObjectionSection: React.FC = () => {
  return (
    <section id="objections" className="py-24 border-b border-[#1E2028] bg-[#08090C]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest mb-3">
            [STATE 09 // OBJECTION RESOLUTION]
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-[1.05]">
            Common Hesitations.
            <br />
            <span className="text-[#8E93A4]">Direct Answers.</span>
          </h2>
          <p className="font-body text-base text-[#8E93A4] mt-3">
            Most technology engagements fail because assumptions remain unspoken. We address the most common hesitations transparently before you even reach out.
          </p>
        </div>

        {/* 2x2 Grid of Direct Answers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1E2028] border border-[#1E2028]">
          {OBJECTIONS.map((item, idx) => (
            <div
              key={item.id}
              className="bg-[#0D0F16] p-8 space-y-4 hover:bg-[#12141F] transition-colors duration-150"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-[#00F0FF] inline-block" />
                <span>UNCERTAINTY // 0{idx + 1}</span>
              </div>

              <h3 className="font-display font-bold text-xl text-white">
                {item.question}
              </h3>

              <p className="font-body text-sm text-[#B4B9C8] leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ObjectionSection;
