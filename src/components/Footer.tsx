import { Link } from "react-router-dom";
import logoMark from "@/assets/logo-icon-mark.svg";
import { Phone, Mail, MessageCircle, MapPin, Linkedin, Instagram, Twitter } from "lucide-react";

const socialLinks = [
  { href: "https://www.linkedin.com/company/ripple-nexus", icon: Linkedin, label: "LinkedIn" },
  { href: "https://x.com/ripplenexus", icon: Twitter, label: "X / Twitter" },
  { href: "https://www.instagram.com/ripplenexus/", icon: Instagram, label: "Instagram" },
];

const Footer = () => {
  return (
    <footer
      className="relative pt-24 pb-12 overflow-hidden"
      style={{
        background: "var(--obsidian)",
        borderTop: "1px solid var(--graphite-600)",
      }}
    >
      {/* Violet radial glow at top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top, rgba(124,92,255,0.1) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

          {/* Brand & Mission */}
          <div className="lg:col-span-4 pr-4">
            <Link to="/" className="flex items-center gap-2.5 mb-6 group">
              <img src={logoMark} alt="" aria-hidden="true" className="w-9 h-9 object-contain" />
              <span
                className="font-display font-bold text-xl tracking-tight"
                style={{ letterSpacing: "-0.03em", color: "var(--pearl)" }}
              >
                Ripple <span style={{ color: "var(--graphite-300)" }}>Nexus</span>
              </span>
            </Link>
            <p className="font-body text-[15px] leading-relaxed mb-5" style={{ color: "var(--graphite-400)" }}>
              AI-First Digital Transformation systems for organizations that demand operational supremacy. 
              We engineer predictive intelligence, workflow automation, and enterprise infrastructure.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["Security-First", "100% IP Ownership", "18+ Countries"].map((badge) => (
                <span
                  key={badge}
                  className="font-mono text-[11px] rounded-full px-2.5 py-0.5 font-medium"
                  style={{
                    color: "var(--graphite-300)",
                    border: "1px solid var(--graphite-600)",
                    background: "rgba(124,92,255,0.05)",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    background: "rgba(124,92,255,0.06)",
                    border: "1px solid var(--graphite-600)",
                    color: "var(--graphite-300)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(124,92,255,0.15)";
                    e.currentTarget.style.borderColor = "rgba(124,92,255,0.4)";
                    e.currentTarget.style.color = "var(--nexus-violet)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(124,92,255,0.06)";
                    e.currentTarget.style.borderColor = "var(--graphite-600)";
                    e.currentTarget.style.color = "var(--graphite-300)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <h4
              className="font-body font-bold text-sm tracking-wider uppercase mb-7"
              style={{ color: "var(--pearl)" }}
            >
              Capabilities
            </h4>
            <nav className="flex flex-col gap-4 text-[15px]">
              {[
                { to: "/services/ai-agents", label: "AI Agents" },
                { to: "/services/ai-workflow-automation", label: "Workflow Automation" },
                { to: "/services/enterprise-applications", label: "Enterprise Software" },
                { to: "/services/data-engineering", label: "Data Engineering" },
                { to: "/platform", label: "View All Capabilities" },
              ].map(({ to, label }) => (
                <Link
                  key={label}
                  to={to}
                  className="transition-colors duration-200 hover:text-[var(--pearl)]"
                  style={{ color: "var(--graphite-400)" }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h4
              className="font-body font-bold text-sm tracking-wider uppercase mb-7"
              style={{ color: "var(--pearl)" }}
            >
              Company
            </h4>
            <nav className="flex flex-col gap-4 text-[15px]">
              {[
                { to: "/about", label: "About Us" },
                { to: "/case-studies", label: "Case Studies" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <Link
                  key={label}
                  to={to}
                  className="transition-colors duration-200 hover:text-[var(--pearl)]"
                  style={{ color: "var(--graphite-400)" }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Office (Compact) */}
          <div className="lg:col-span-3">
            <h4
              className="font-body font-bold text-sm tracking-wider uppercase mb-7"
              style={{ color: "var(--pearl)" }}
            >
              Office
            </h4>
            <address
              className="font-body text-[13px] not-italic leading-relaxed flex flex-col gap-2 mb-5"
              style={{ color: "var(--graphite-400)" }}
            >
              <span>Cospazes, A-116<br />Urbtech Trade Centre<br />Sec-132, Noida — 201304, India</span>
              <a href="mailto:info@theripplenexus.com" className="mt-2 hover:text-white transition-colors">info@theripplenexus.com</a>
              <a href="tel:+917599756826" className="hover:text-white transition-colors">+91 7599 756 826</a>
            </address>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderTop: "1px solid var(--graphite-600)" }}
        >
          <div>
            <p
              className="font-body text-[14px] font-medium tracking-wide"
              style={{ color: "var(--graphite-400)" }}
            >
              © {new Date().getFullYear()} Ripple Nexus. All rights reserved.
            </p>
            <p className="font-body text-[12px] mt-1" style={{ color: "var(--graphite-500)" }}>
              Engineered for Enterprise scale. Delivered with startup velocity.
            </p>
          </div>
          <div className="flex items-center gap-6 text-[14px] font-medium">
            {[
              { to: "/privacy-policy", label: "Privacy Policy" },
              { to: "/terms-of-service", label: "Terms of Service" },
              { to: "/cancellation-policy", label: "Refund Policy" },
            ].map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                className="transition-colors duration-200"
                style={{ color: "var(--graphite-400)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--nexus-violet)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--graphite-400)")}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
