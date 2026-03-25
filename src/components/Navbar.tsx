import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoSvg from "@/assets/logo-icon.svg";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = (href: string) => {
    const isActive = location.pathname === href;
    return `${isActive ? "text-white" : "text-white/50"} hover:text-white transition-colors text-[13px] font-medium tracking-wide`;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/60 backdrop-blur-lg border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between relative">
        
        {/* Logo area */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logoSvg} alt="Ripple Nexus" className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(31,86,212,0.4)]" />
          <span className="font-display font-bold text-2xl tracking-tight text-white group-hover:text-white/80 transition-colors">
            Ripple <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Nexus</span>
          </span>
        </Link>

        {/* Desktop Links - Centered */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA & Contact */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/contact" className={linkClass("/contact")}>
            Contact
          </Link>
          <a
            href="https://calendly.com/ripplenexus/book-a-consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-4 py-1.5 rounded-full font-medium text-[13px] hover:bg-white/90 transition-colors"
          >
            Book Call
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/70 hover:text-white transition-colors"
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
            className="absolute top-full left-0 right-0 bg-[#050505] border-b border-white/5 shadow-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 pb-8 gap-4">
              {[...navLinks, { label: "Contact", href: "/contact" }].map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/70 hover:text-white transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://calendly.com/ripplenexus/book-a-consultation"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="bg-white text-black px-4 py-2 mt-4 rounded-md font-medium text-[13px] text-center w-full"
              >
                Book a Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
