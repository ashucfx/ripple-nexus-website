import { Link } from "react-router-dom";
import logoIcon from "@/assets/logo-icon.svg";
import { Phone, Mail, MessageCircle, MapPin, Linkedin, Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-[#020610] border-t border-white/10 pt-24 pb-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(31,86,212,0.15)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand & Mission (Spans 4 columns) */}
          <div className="lg:col-span-4 pr-4">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img 
                src={logoIcon} 
                alt="Ripple Nexus Logo" 
                className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(31,86,212,0.5)]" 
              />
              <span className="font-display font-bold text-2xl tracking-tight text-white drop-shadow-sm">
                Ripple <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Nexus</span>
              </span>
            </Link>
            <p className="text-white/60 text-[15px] leading-relaxed mb-8">
              Pioneering digital governance and engineering resilient high-scale architectures. Securely. Scalably. Compliantly.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/ripple-nexus" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all shadow-sm">
                <Linkedin size={18} />
              </a>
              <a href="https://www.facebook.com/ripplenexusglobal/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all shadow-sm">
                <Facebook size={18} />
              </a>
              <a href="https://x.com/ripplenexus" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all shadow-sm">
                <Twitter size={18} />
              </a>
              <a href="https://www.instagram.com/ripplenexus/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all shadow-sm">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Navigation (Spans 2 columns) */}
          <div className="lg:col-span-2 lg:ml-10">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-7">Platform</h4>
            <nav className="flex flex-col gap-4 text-[15px] text-white/60">
              <Link to="/" className="hover:text-primary transition-colors flex items-center gap-2">Home</Link>
              <Link to="/about" className="hover:text-primary transition-colors flex items-center gap-2">Our Approach</Link>
              <Link to="/services" className="hover:text-primary transition-colors flex items-center gap-2">Capabilities</Link>
              <Link to="/case-studies" className="hover:text-primary transition-colors flex items-center gap-2">Case Studies</Link>
            </nav>
          </div>

          {/* Contact (Spans 3 columns) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-7">Reach Out</h4>
            <nav className="flex flex-col gap-5 text-[15px] text-white/60">
              <a href="mailto:info@theripplenexus.com" className="hover:text-primary transition-colors flex items-center gap-3">
                <Mail size={18} className="text-primary/70" /> info@theripplenexus.com
              </a>
              <a href="tel:+917599756826" className="hover:text-primary transition-colors flex items-center gap-3">
                <Phone size={18} className="text-primary/70" /> +91 7599 756 826
              </a>
              <a href="https://wa.me/917599756826" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-3">
                <MessageCircle size={18} className="text-primary/70" /> WhatsApp Support
              </a>
            </nav>
          </div>

          {/* Office & Map (Spans 3 columns) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-7">Office</h4>
            <address className="text-[14px] text-white/70 not-italic leading-relaxed flex items-start gap-3 mb-5">
              <MapPin size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <span>
                Cospazes, A-116<br />
                Urbtech Trade Centre<br />
                Sec-132, Noida — 201304, India
              </span>
            </address>
            
            <div className="w-full h-36 rounded-xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-black opacity-90 hover:opacity-100 hover:border-primary/50 transition-all duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.9282427581543!2d77.37541287508688!3d28.51180657573095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce72d5d23fd2d%3A0xccad56c7a364950a!2sRipple%20Nexus!5e0!3m2!1sen!2sin!4v1772174925570!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ripple Nexus Office"
              />
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[14px] text-white/40 font-medium tracking-wide">
            © {new Date().getFullYear()} Ripple Nexus. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[14px] font-medium text-white/40">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/cancellation-policy" className="hover:text-primary transition-colors">Refund Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
