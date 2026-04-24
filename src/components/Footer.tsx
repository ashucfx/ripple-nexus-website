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
                Ripple{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #7C5CFF 0%, #B794FF 55%, #22D3EE 100%)" }}
                >
                  Nexus
                </span>
              </span>
            </Link>
            <p className="font-body text-[15px] leading-relaxed mb-5" style={{ color: "var(--graphite-400)" }}>
              Automation-first AI systems for founders and enterprises who refuse to
              operate below their potential. Trusted by 200+ companies across 18+ countries.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["SOC 2 Ready", "99.97% SLA", "18+ Countries"].map((badge) => (
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

          {/* Navigation */}
          <div className="lg:col-span-2 lg:ml-10">
            <h4
              className="font-body font-bold text-sm tracking-wider uppercase mb-7"
              style={{ color: "var(--pearl)" }}
            >
              Company
            </h4>
            <nav className="flex flex-col gap-4 text-[15px]">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "Our Approach" },
                { to: "/services", label: "Capabilities" },
                { to: "/case-studies", label: "Case Studies" },
                { to: "/contact", label: "Contact" },
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
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4
              className="font-body font-bold text-sm tracking-wider uppercase mb-7"
              style={{ color: "var(--pearl)" }}
            >
              Reach Out
            </h4>
            <nav className="flex flex-col gap-5 text-[15px]">
              <a
                href="mailto:info@theripplenexus.com"
                className="flex items-center gap-3 transition-colors duration-200"
                style={{ color: "var(--graphite-400)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--nexus-violet)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--graphite-400)")}
              >
                <Mail size={17} style={{ color: "var(--nexus-violet)", opacity: 0.7 }} />
                info@theripplenexus.com
              </a>
              <a
                href="tel:+917599756826"
                className="flex items-center gap-3 transition-colors duration-200"
                style={{ color: "var(--graphite-400)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--nexus-violet)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--graphite-400)")}
              >
                <Phone size={17} style={{ color: "var(--nexus-violet)", opacity: 0.7 }} />
                +91 7599 756 826
              </a>
              <a
                href="https://wa.me/917599756826"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors duration-200"
                style={{ color: "var(--graphite-400)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--nexus-violet)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--graphite-400)")}
              >
                <MessageCircle size={17} style={{ color: "var(--nexus-violet)", opacity: 0.7 }} />
                WhatsApp Support
              </a>
            </nav>
          </div>

          {/* Office */}
          <div className="lg:col-span-3">
            <h4
              className="font-body font-bold text-sm tracking-wider uppercase mb-7"
              style={{ color: "var(--pearl)" }}
            >
              Office
            </h4>
            <address
              className="font-body text-[14px] not-italic leading-relaxed flex items-start gap-3 mb-5"
              style={{ color: "var(--graphite-400)" }}
            >
              <MapPin size={19} className="shrink-0 mt-0.5" style={{ color: "var(--nexus-violet)" }} />
              <span>
                Cospazes, A-116<br />
                Urbtech Trade Centre<br />
                Sec-132, Noida — 201304, India
              </span>
            </address>

            <div
              className="w-full h-36 rounded-xl overflow-hidden transition-all duration-300"
              style={{
                border: "1px solid var(--graphite-600)",
                background: "var(--ink)",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(124,92,255,0.4)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--graphite-600)")}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.9282427581543!2d77.37541287508688!3d28.51180657573095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce72d5d23fd2d%3A0xccad56c7a364950a!2sRipple%20Nexus!5e0!3m2!1sen!2sin!4v1772174925570!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.85) hue-rotate(185deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ripple Nexus Office"
              />
            </div>
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
              Building growth systems for the world's most ambitious companies.
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
