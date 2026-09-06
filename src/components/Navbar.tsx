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
      const scrollPosition = window.scrollY + 220;
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
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-3 sm:px-6 pointer-events-none transition-all duration-300">
      {/* Sleek Floating Island Pill with Fully Rounded Corners */}
      <div
        className={`w-full max-w-5xl pointer-events-auto rounded-full border transition-all duration-300 flex items-center justify-between gap-3 sm:gap-4 px-3 sm:px-5 py-2 sm:py-2.5 ${
          scrolled
            ? "bg-[#08090C]/92 backdrop-blur-xl border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.12)]"
            : "bg-[#08090C]/80 backdrop-blur-lg border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]"
        }`}
      >
        {/* Brand Lockup */}
        <Link
          to="/"
          className="flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none group shrink-0 pl-1"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-8 h-8 rounded-full bg-[#12141F] border border-white/10 flex items-center justify-center p-1.5 transition-transform duration-200 group-hover:scale-105 shrink-0">
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
              AI Systems That Run The Business
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-xs uppercase tracking-wider whitespace-nowrap">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id, item.event)}
                className={`px-3 py-1.5 rounded-full transition-all duration-150 flex items-center gap-1.5 ${
                  isActive
                    ? "text-white bg-white/10 shadow-[0_0_10px_rgba(0,240,255,0.15)] font-semibold"
                    : "text-[#8E93A4] hover:text-white hover:bg-white/5"
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

        {/* Primary CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 pr-1">
          <button
            onClick={() => {
              telemetry.track("hero_cta_click", { location: "navbar" });
              scrollTo("intake");
            }}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 sm:py-2.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#00F0FF] rounded-full transition-all duration-150 shadow-sm hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] whitespace-nowrap"
          >
            <span>Start a Project</span>
            <ArrowRight size={13} />
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

      {/* Sleek Floating Mobile Drawer Card */}
      {mobileMenuOpen && (
        <div className="lg:hidden pointer-events-auto w-full max-w-5xl mt-2 bg-[#08090C]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 flex flex-col gap-4 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-1.5 font-mono text-xs tracking-wider uppercase">
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id, item.event)}
                  className={`text-left py-2.5 px-3 rounded-xl transition-colors border-b border-[#14161F] flex items-center justify-between ${
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
            className="w-full py-3.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider rounded-full flex items-center justify-center gap-2 hover:bg-[#00F0FF] transition-colors"
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
