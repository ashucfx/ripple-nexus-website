import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoMark from "@/assets/logo-icon-mark.svg";

const navLinks = [
  { label: "Platform", href: "/platform" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
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

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(`${href}/`);

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

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <img
            src={logoMark}
            alt="Ripple Nexus Logo"
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

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-body text-[13px] font-medium tracking-wide transition-colors duration-200 relative group"
              style={{ color: isActive(link.href) ? "var(--pearl)" : "var(--graphite-300)" }}
            >
              <span className="group-hover:text-[var(--pearl)] transition-colors">{link.label}</span>
              {isActive(link.href) && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: "var(--nexus-violet)" }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/contact"
            className="font-body text-[13px] font-medium tracking-wide transition-colors duration-200 hover:text-[var(--pearl)]"
            style={{ color: "var(--graphite-300)" }}
          >
            Contact
          </Link>
          <a
            href="/#lead-form"
            className="font-body font-semibold text-[13px] px-6 py-2.5 rounded-md transition-all duration-300 hover:-translate-y-px"
            style={{
              background: "var(--nexus-violet)",
              color: "#fff",
              boxShadow: "0 4px 14px 0 rgba(124,92,255,0.35)",
            }}
          >
            Book Assessment
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden transition-colors duration-200 p-1 hover:text-[var(--pearl)]"
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
                  className="font-body text-sm font-medium transition-colors duration-200 py-1 hover:text-[var(--pearl)]"
                  style={{ color: isActive(link.href) ? "var(--pearl)" : "var(--graphite-300)" }}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/#lead-form"
                onClick={() => setMobileOpen(false)}
                className="font-body font-semibold text-sm px-4 py-3 mt-2 rounded-md text-center w-full transition-all duration-300"
                style={{
                  background: "var(--nexus-violet)",
                  color: "#fff",
                }}
              >
                Book Assessment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
