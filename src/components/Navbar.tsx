import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoMark from "@/assets/logo-icon-mark.svg";

const navLinks = [
  { label: "Platform", href: "/platform" },
  { label: "Deployments", href: "/case-studies" },
  { label: "Developers", href: "/docs" },
  { label: "Company", href: "/about" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,11,20,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--graphite-600)" : "1px solid transparent",
        paddingTop: scrolled ? "1rem" : "1.5rem",
        paddingBottom: scrolled ? "1rem" : "1.5rem",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between relative">

        {/* Logo — icon mark + wordmark in HTML so Satoshi Variable loads correctly */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <img
            src={logoMark}
            alt=""
            aria-hidden="true"
            className="w-8 h-8 object-contain"
          />
          <span
            className="font-display font-bold text-xl tracking-tight"
            style={{ letterSpacing: "-0.03em", color: "var(--pearl)" }}
          >
            Ripple{" "}
            <span style={{ color: "var(--graphite-300)" }}>
              Nexus
            </span>
          </span>
        </Link>

        {/* Desktop Links — Centered */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-body text-[13px] font-medium tracking-wide transition-colors duration-200 relative"
              style={{ color: isActive(link.href) ? "var(--pearl)" : "var(--graphite-300)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--pearl)")}
              onMouseLeave={e => (e.currentTarget.style.color = isActive(link.href) ? "var(--pearl)" : "var(--graphite-300)")}
            >
              {link.label}
              {isActive(link.href) && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: "var(--nexus-violet)" }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop CTA & Auth */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/login"
            className="font-body text-[13px] font-medium tracking-wide transition-colors duration-200"
            style={{ color: "var(--graphite-300)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--pearl)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--graphite-300)")}
          >
            Sign In
          </Link>
          <a
            href="/#lead-form"
            className="font-body font-semibold text-[13px] px-6 py-2.5 rounded-md transition-all duration-300"
            style={{
              background: "var(--pearl)",
              color: "var(--obsidian)",
              boxShadow: "0 4px 14px 0 rgba(255,255,255,0.1)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.boxShadow = "0 6px 20px 0 rgba(255,255,255,0.15)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "var(--pearl)";
              e.currentTarget.style.boxShadow = "0 4px 14px 0 rgba(255,255,255,0.1)";
            }}
          >
            Initialize
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden transition-colors duration-200 p-1"
          style={{ color: "var(--graphite-300)" }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 md:hidden overflow-hidden"
            style={{
              background: "rgba(10,11,20,0.97)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid var(--graphite-600)",
            }}
          >
            <div className="flex flex-col px-6 py-6 pb-8 gap-4">
              {[...navLinks, { label: "Contact", href: "/contact" }].map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-sm font-medium transition-colors duration-200 py-1"
                  style={{ color: isActive(link.href) ? "var(--pearl)" : "var(--graphite-300)" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="font-body text-sm font-medium transition-colors duration-200 py-2 border-t mt-2"
                style={{ color: "var(--graphite-300)", borderColor: "var(--graphite-600)" }}
              >
                Sign In
              </Link>
              <a
                href="/#lead-form"
                onClick={() => setMobileOpen(false)}
                className="font-body font-semibold text-sm px-4 py-3 mt-2 rounded-md text-center w-full transition-all duration-300"
                style={{
                  background: "var(--pearl)",
                  color: "var(--obsidian)",
                }}
              >
                Initialize
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
