import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { telemetry } from "../analytics/telemetry";
import logoMark from "../assets/logo-icon-mark.svg";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050608] border-t border-[#1E2028] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1E2028]">
          {/* Brand Lockup & Positioning */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logoMark}
                alt="Ripple Nexus"
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg sm:text-xl uppercase tracking-tight leading-none text-white">
                  Ripple Nexus
                </span>
                <span className="font-mono text-[10px] text-[#00F0FF] tracking-wider uppercase mt-1 font-medium">
                  Zero Manual Work
                </span>
              </div>
            </div>
            <p className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider">
              DIGITAL PRODUCT ENGINEERING + AI + AUTOMATION
            </p>
            <p className="font-body text-sm text-[#8E93A4] max-w-sm leading-relaxed">
              We build the digital systems behind ambitious businesses. SaaS platforms, AI workflows, business applications, and data infrastructure built around how your business actually operates.
            </p>
            <div className="font-mono text-xs text-white pt-2">
              BUILD → AUTOMATE → SCALE
            </div>
          </div>

          {/* Quick Architecture Navigation */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-[#8E93A4] uppercase tracking-widest pb-1 border-b border-[#1E2028]">
              NAVIGATION
            </div>
            <ul className="space-y-2 text-[#B4B9C8]">
              <li>
                <a href="#proof" className="hover:text-white transition-colors">
                  [01] Systems Proof
                </a>
              </li>
              <li>
                <a href="#intent" className="hover:text-white transition-colors">
                  [02] Problem Identification
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-white transition-colors">
                  [03] Verified Case Studies
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-white transition-colors">
                  [04] Core Capabilities
                </a>
              </li>
              <li>
                <a href="#founder" className="hover:text-white transition-colors">
                  [05] Human Accountability
                </a>
              </li>
              <li>
                <a href="#objections" className="hover:text-white transition-colors">
                  [06] Objections & FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Verification & Channels */}
          <div className="lg:col-span-4 space-y-3 font-mono text-xs">
            <div className="text-[#8E93A4] uppercase tracking-widest pb-1 border-b border-[#1E2028]">
              DIRECT CONTACT
            </div>
            <div className="space-y-2 text-[#B4B9C8]">
              <div>
                <span className="text-[#8E93A4]">MAIL US:</span>{" "}
                <a
                  href="mailto:info@theripplenexus.com"
                  onClick={() => telemetry.track("email_click", { location: "footer" })}
                  className="text-white hover:text-[#00F0FF] underline"
                >
                  info@theripplenexus.com
                </a>
              </div>
              <div>
                <span className="text-[#8E93A4]">TELEPHONE:</span>{" "}
                <a href="tel:+917599756826" className="text-white">
                  +91-7599-756-826
                </a>
              </div>
              <div className="pt-2 text-[11px] text-[#8E93A4]">
                LOCATION: Cospazes, A-116 Urbtech Trade Centre, Sec-132, Noida, UP 201304, India.
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/ripple-nexus"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => telemetry.track("linkedin_click", { location: "footer" })}
                className="inline-flex items-center gap-1 text-white hover:text-[#00F0FF] transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={12} />
              </a>
              <a
                href="https://x.com/ripplenexus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white hover:text-[#00F0FF] transition-colors"
              >
                <span>X / Twitter</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8E93A4]">
          <div>
            © {new Date().getFullYear()} Ripple Nexus. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/cancellation-policy" className="hover:text-white transition-colors">
              Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
