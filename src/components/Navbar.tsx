import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { telemetry } from "../analytics/telemetry";
import logoMark from "../assets/logo-icon-mark.svg";

interface NavItem {
  id: string;
  label: string;
  event: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "proof", label: "Proof", event: "hero_work_click" },
  { id: "intent", label: "Problem States", event: "solution_content_view" },
  { id: "case-studies", label: "Case Studies", event: "case_study_open" },
  { id: "capabilities", label: "Capabilities", event: "capability_open" },
  { id: "founder", label: "Leadership", event: "team_section_view" },
  { id: "objections", label: "FAQ", event: "solution_content_view" },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section scroll spy
      const scrollPosition = window.scrollY + 200;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string, eventName?: string) => {
    setMobileMenuOpen(false);
    if (eventName) {
      telemetry.track(eventName as any, { section: id });
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl pointer-events-none transition-all duration-300 flex flex-col items-center">
      {/* 2026 Modern Floating Island Capsule with Precision Corner Edges */}
      <div
        className={`relative w-full pointer-events-auto rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 sm:gap-4 px-3.5 sm:px-5 py-2 sm:py-2.5 ${
          scrolled
            ? "bg-[#07080D]/95 backdrop-blur-2xl border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.92),inset_0_1px_0_0_rgba(255,255,255,0.2)]"
            : "bg-[#07080D]/85 backdrop-blur-xl border-white/12 shadow-[0_12px_36px_rgba(0,0,0,0.75),inset_0_1px_0_0_rgba(255,255,255,0.12)]"
        }`}
      >
        {/* 2026 Modern Precision Corner Edge Accents with Neon Cyan Highlights */}
        <span className="absolute -top-px -left-px w-3.5 h-3.5 border-t-2 border-l-2 border-[#00F0FF] rounded-tl-xl pointer-events-none shadow-[0_0_8px_rgba(0,240,255,0.7)]" />
        <span className="absolute -top-px -right-px w-3.5 h-3.5 border-t-2 border-r-2 border-[#00F0FF] rounded-tr-xl pointer-events-none shadow-[0_0_8px_rgba(0,240,255,0.7)]" />
        <span className="absolute -bottom-px -left-px w-3.5 h-3.5 border-b-2 border-l-2 border-[#00F0FF] rounded-bl-xl pointer-events-none shadow-[0_0_8px_rgba(0,240,255,0.7)]" />
        <span className="absolute -bottom-px -right-px w-3.5 h-3.5 border-b-2 border-r-2 border-[#00F0FF] rounded-br-xl pointer-events-none shadow-[0_0_8px_rgba(0,240,255,0.7)]" />

        {/* Dynamic Specular Highlights */}
        <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/50 to-transparent pointer-events-none" />
        <div className="absolute inset-x-12 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C5CFF]/30 to-transparent pointer-events-none" />

        {/* Brand Lockup */}
        <Link
          to="/"
          className="flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none group shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-8 h-8 rounded-xl bg-[#12141F] border border-white/15 flex items-center justify-center p-1.5 transition-all duration-300 group-hover:scale-105 group-hover:border-[#00F0FF]/60 group-hover:shadow-[0_0_18px_rgba(0,240,255,0.4)] shrink-0">
            <img
              src={logoMark}
              alt="Ripple Nexus"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-display font-bold text-sm sm:text-base tracking-tight text-white uppercase leading-none whitespace-nowrap">
              Ripple Nexus
            </span>
            <span className="font-mono text-[9px] text-[#00F0FF] tracking-widest uppercase leading-none mt-1 hidden sm:block whitespace-nowrap font-semibold">
              Digital Systems Engineering
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Links with Active Spy Pill */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-xs uppercase tracking-wider whitespace-nowrap">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id, item.event)}
                className={`relative px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? "text-white bg-white/[0.12] border border-white/15 shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                    : "text-[#9EA3B5] hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Live Telemetry Badge & Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Subtle Live Engine Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10131E] border border-[#00E599]/30 font-mono text-[10px] text-[#8E93A4] shadow-[0_0_10px_rgba(0,229,153,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse shadow-[0_0_6px_#00E599]" />
            <span className="text-[#D0D4E0] font-medium tracking-wider">SYS LIVE // 99.99%</span>
          </div>

          <button
            onClick={() => {
              telemetry.track("hero_cta_click", { location: "navbar" });
              scrollTo("intake");
            }}
            className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 bg-gradient-to-r from-white via-slate-100 to-[#E2E8F0] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 hover:from-[#00F0FF] hover:via-[#38BDF8] hover:to-[#7C5CFF] hover:text-black shadow-[0_0_18px_rgba(255,255,255,0.2)] hover:shadow-[0_0_28px_rgba(0,240,255,0.5)] whitespace-nowrap group"
          >
            <span>Start a Project</span>
            <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          {/* Mobile / Tablet Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#00F0FF] focus:outline-none shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Modern Floating Mobile Drawer Card with Matching Corner Accents */}
      {mobileMenuOpen && (
        <div className="relative lg:hidden pointer-events-auto w-full max-w-5xl mt-2 bg-[#08090E]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.92)] z-50 flex flex-col gap-4 animate-in fade-in slide-in-from-top-3 duration-200">
          <span className="absolute -top-px -left-px w-3.5 h-3.5 border-t-2 border-l-2 border-[#00F0FF] rounded-tl-xl pointer-events-none shadow-[0_0_8px_rgba(0,240,255,0.7)]" />
          <span className="absolute -top-px -right-px w-3.5 h-3.5 border-t-2 border-r-2 border-[#00F0FF] rounded-tr-xl pointer-events-none shadow-[0_0_8px_rgba(0,240,255,0.7)]" />
          <span className="absolute -bottom-px -left-px w-3.5 h-3.5 border-b-2 border-l-2 border-[#00F0FF] rounded-bl-xl pointer-events-none shadow-[0_0_8px_rgba(0,240,255,0.7)]" />
          <span className="absolute -bottom-px -right-px w-3.5 h-3.5 border-b-2 border-r-2 border-[#00F0FF] rounded-br-xl pointer-events-none shadow-[0_0_8px_rgba(0,240,255,0.7)]" />

          <div className="flex flex-col gap-1.5 font-mono text-xs tracking-wider uppercase">
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id, item.event)}
                  className={`text-left py-2.5 px-3 rounded-lg transition-colors border-b border-[#14161F] flex items-center justify-between ${
                    isActive
                      ? "text-white bg-white/10"
                      : "text-[#8E93A4] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>
                    [{String(index + 1).padStart(2, "0")}] {item.label}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
                  )}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => {
              telemetry.track("hero_cta_click", { location: "mobile_navbar" });
              scrollTo("intake");
            }}
            className="w-full py-3.5 bg-gradient-to-r from-white via-slate-100 to-[#E2E8F0] hover:from-[#00F0FF] hover:to-[#7C5CFF] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            <span>Start a Project</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
