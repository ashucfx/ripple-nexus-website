import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Code, Brain, Database, Briefcase, Zap, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoMark from "@/assets/logo-icon-mark.svg";
import { servicesData } from "@/data/services";

const categories = [
  { name: 'Artificial Intelligence', icon: <Brain className="w-4 h-4" /> },
  { name: 'Engineering', icon: <Code className="w-4 h-4" /> },
  { name: 'Data', icon: <Database className="w-4 h-4" /> },
  { name: 'Infrastructure', icon: <Shield className="w-4 h-4" /> },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

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
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group z-50">
          <img src={logoMark} alt="Ripple Nexus Logo" aria-hidden="true" className="w-8 h-8 object-contain" />
          <span className="font-display font-bold text-xl tracking-tight" style={{ letterSpacing: "-0.03em", color: "var(--pearl)" }}>
            Ripple <span style={{ color: "var(--graphite-300)" }}>Nexus</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          
          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 font-body text-[13px] font-medium tracking-wide transition-colors duration-200 py-2"
              style={{ color: isActive('/services') || servicesOpen ? "var(--pearl)" : "var(--graphite-300)" }}
            >
              Services
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[600px] rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    background: "rgba(15, 17, 26, 0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid var(--graphite-600)",
                  }}
                >
                  <div className="p-6 grid grid-cols-2 gap-x-8 gap-y-6">
                    {categories.map(cat => {
                      const catServices = servicesData.filter(s => s.category === cat.name).slice(0, 4);
                      if (catServices.length === 0) return null;
                      return (
                        <div key={cat.name}>
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--nexus-violet)" }}>
                            {cat.icon} {cat.name}
                          </div>
                          <ul className="space-y-2.5">
                            {catServices.map(s => (
                              <li key={s.slug}>
                                <Link 
                                  to={`/services/${s.slug}`}
                                  className="block text-sm font-medium transition-colors hover:text-white"
                                  style={{ color: "var(--graphite-300)" }}
                                >
                                  {s.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/case-studies" className="font-body text-[13px] font-medium tracking-wide transition-colors duration-200" style={{ color: isActive('/case-studies') ? "var(--pearl)" : "var(--graphite-300)" }}>
            <span className="hover:text-[var(--pearl)] transition-colors">Case Studies</span>
          </Link>
          <Link to="/about" className="font-body text-[13px] font-medium tracking-wide transition-colors duration-200" style={{ color: isActive('/about') ? "var(--pearl)" : "var(--graphite-300)" }}>
            <span className="hover:text-[var(--pearl)] transition-colors">About</span>
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4 z-50">
          <Link to="/contact" className="font-body text-[13px] font-medium tracking-wide transition-colors duration-200 hover:text-[var(--pearl)]" style={{ color: "var(--graphite-300)" }}>
            Contact
          </Link>
          <a href="/#lead-form" className="font-body font-semibold text-[13px] px-6 py-2.5 rounded-md transition-all duration-300 hover:-translate-y-px" style={{ background: "var(--nexus-violet)", color: "#fff", boxShadow: "0 4px 14px 0 rgba(124,92,255,0.35)" }}>
            Book Assessment
          </a>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden transition-colors duration-200 p-1 hover:text-[var(--pearl)] z-50" style={{ color: "var(--graphite-300)" }} aria-label="Toggle menu">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-0 left-0 right-0 md:hidden overflow-y-auto"
            style={{
              background: "rgba(10,11,20,0.98)",
              backdropFilter: "blur(20px)",
              paddingTop: "5rem" // Space for the header
            }}
          >
            <div className="flex flex-col px-6 py-4 pb-20 gap-2">
              
              {/* Mobile Services Accordion */}
              <div className="border-b border-[var(--graphite-600)] py-3">
                <button 
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full font-body text-lg font-medium transition-colors duration-200"
                  style={{ color: "var(--pearl)" }}
                >
                  Services
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pb-2 pl-4 space-y-5">
                        {categories.map(cat => {
                          const catServices = servicesData.filter(s => s.category === cat.name).slice(0,3);
                          if(catServices.length === 0) return null;
                          return (
                            <div key={cat.name}>
                              <p className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: "var(--nexus-violet)" }}>
                                {cat.icon} {cat.name}
                              </p>
                              <ul className="space-y-3 border-l border-[var(--graphite-600)] pl-4">
                                {catServices.map(s => (
                                  <li key={s.slug}>
                                    <Link to={`/services/${s.slug}`} onClick={() => setMobileOpen(false)} className="block text-sm font-medium" style={{ color: "var(--graphite-300)" }}>
                                      {s.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/case-studies" onClick={() => setMobileOpen(false)} className="font-body text-lg font-medium transition-colors duration-200 py-3 border-b border-[var(--graphite-600)] hover:text-[var(--pearl)]" style={{ color: isActive('/case-studies') ? "var(--pearl)" : "var(--graphite-300)" }}>
                Case Studies
              </Link>
              <Link to="/about" onClick={() => setMobileOpen(false)} className="font-body text-lg font-medium transition-colors duration-200 py-3 border-b border-[var(--graphite-600)] hover:text-[var(--pearl)]" style={{ color: isActive('/about') ? "var(--pearl)" : "var(--graphite-300)" }}>
                About
              </Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="font-body text-lg font-medium transition-colors duration-200 py-3 border-b border-[var(--graphite-600)] hover:text-[var(--pearl)]" style={{ color: isActive('/contact') ? "var(--pearl)" : "var(--graphite-300)" }}>
                Contact
              </Link>

              <a href="/#lead-form" onClick={() => setMobileOpen(false)} className="font-body font-semibold text-base px-4 py-4 mt-6 rounded-md text-center w-full transition-all duration-300" style={{ background: "var(--nexus-violet)", color: "#fff" }}>
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
