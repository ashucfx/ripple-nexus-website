import React from "react";
import { ArrowUpRight, ShieldCheck, CheckCircle2, GitBranch, Cpu, Terminal } from "lucide-react";
import { telemetry } from "../analytics/telemetry";

export const FounderSection: React.FC = () => {
  const handleLinkedInClick = () => {
    telemetry.track("founder_link_click", { channel: "linkedin" });
  };

  return (
    <section id="founder" className="py-24 border-b border-[#1E2028] bg-[#08090C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Tag */}
        <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest mb-3">
          [STATE 08 // TECHNICAL LEADERSHIP & ACCOUNTABILITY]
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Leadership & Delivery Philosophy */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-[1.05]">
                Engineering Rigor.
                <br />
                <span className="text-[#8E93A4]">Direct Accountability.</span>
              </h2>
              <p className="font-body text-sm sm:text-base text-[#B4B9C8] mt-4 leading-relaxed">
                Mission-critical systems require clear technical ownership. At Ripple Nexus, every architecture is directed by senior engineering leadership who remain actively involved in system design, code quality, and production cutover.
              </p>
            </div>

            {/* Leadership Profile Card */}
            <div className="border border-[#1E2028] bg-[#0D0F16] p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-lg bg-[#14161F] border border-[#2A2E44] flex items-center justify-center font-mono font-bold text-base text-white shrink-0">
                  AS
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white leading-snug">
                    Ashutosh Shukla
                  </h3>
                  <p className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider">
                    Founder
                  </p>
                </div>
              </div>

              <p className="font-body text-xs text-[#8E93A4] leading-relaxed">
                Guiding architecture across distributed cloud infrastructure, RAG vector retrieval, and autonomous workflow engineering with an emphasis on production resilience.
              </p>

              <div className="pt-2 border-t border-[#1E2028]">
                <a
                  href="https://www.linkedin.com/in/ashutosh-shuklaa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkedInClick}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-white hover:text-[#00F0FF] transition-colors duration-150 uppercase tracking-wider"
                >
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            {/* Delivery Benchmarks */}
            <div className="space-y-2.5 font-mono text-xs text-[#8E93A4]">
              <div className="flex items-start gap-3 p-3 border border-[#14161F] bg-[#08090C]">
                <CheckCircle2 size={16} className="text-[#00E599] shrink-0 mt-0.5" />
                <span>100% IP, source code & infrastructure transferred to client</span>
              </div>
              <div className="flex items-start gap-3 p-3 border border-[#14161F] bg-[#08090C]">
                <GitBranch size={16} className="text-[#00F0FF] shrink-0 mt-0.5" />
                <span>Iterative staging deployments with automated test verification</span>
              </div>
              <div className="flex items-start gap-3 p-3 border border-[#14161F] bg-[#08090C]">
                <Cpu size={16} className="text-[#7C5CFF] shrink-0 mt-0.5" />
                <span>Open standards (Python, TypeScript, PostgreSQL) — zero proprietary lock-in</span>
              </div>
            </div>
          </div>

          {/* Right Column: Production Philosophy & Information Gain */}
          <div className="lg:col-span-7 border border-[#1E2028] bg-[#0D0F16] p-6 sm:p-10 lg:p-12 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1E2028]">
              <span className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest">
                DELIVERY PHILOSOPHY
              </span>
              <span className="font-mono text-xs text-[#8E93A4]">
                PRODUCTION-FIRST ENGINEERING
              </span>
            </div>

            <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white leading-tight">
              Building Systems That Stand Up Under Real Production Load.
            </h3>

            <div className="space-y-4 font-body text-sm sm:text-base text-[#B4B9C8] leading-relaxed">
              <p>
                In an ecosystem saturated with ephemeral demos and generic API wrappers, lasting competitive advantage belongs to businesses that anchor software directly to their private operational telemetry.
              </p>
              <p>
                We approach every engagement with a simple principle: <strong className="text-white">software should compound in value over time.</strong> That means designing modular architectures, establishing deterministic data boundaries, and prioritizing reliability over cosmetic novelty.
              </p>
              <p>
                Whether modernizing a fragile core system or deploying autonomous operational workflows, we partner closely with your team to deliver transparent, thoroughly tested software that your organization can comfortably operate and scale.
              </p>
            </div>

            <div className="pt-6 border-t border-[#1E2028] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="font-mono text-xs text-[#8E93A4]">
                MAIL US:
                <br />
                <a
                  href="mailto:info@theripplenexus.com"
                  onClick={() => telemetry.track("email_click", { location: "founder_section" })}
                  className="text-white hover:text-[#00F0FF] transition-colors underline"
                >
                  info@theripplenexus.com
                </a>
              </div>

              <button
                onClick={() => {
                  telemetry.track("hero_cta_click", { location: "founder_thesis" });
                  const el = document.getElementById("intake");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#00F0FF] transition-colors border border-white"
              >
                Discuss Your System Architecture →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
