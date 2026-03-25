import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Calendar, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import SEOHead from "@/components/SEOHead";

const BASE_URL = "https://www.theripplenexus.com";

const Contact = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "Organization",
      name: "Ripple Nexus",
      url: BASE_URL,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-7599-756-826",
        contactType: "sales",
        availableLanguage: ["English", "Hindi"],
        areaServed: "Worldwide",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Cospazes, A-116 Urbtech Trade Centre, Sec-132",
        addressLocality: "Noida",
        postalCode: "201304",
        addressCountry: "IN",
      },
    },
  };

  const contactCards = [
    { icon: Phone, label: "Call Us", value: "+91 7599 756 826", href: "tel:+917599756826" },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat Now", href: "https://wa.me/917599756826" },
    { icon: Mail, label: "Email", value: "info@theripplenexus.com", href: "mailto:info@theripplenexus.com" },
    { icon: Clock, label: "Hours", value: "Mon–Fri, 9 AM – 5 PM IST", href: "" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contact Ripple Nexus — Book a Free Consultation"
        description="Get in touch with Ripple Nexus for enterprise SaaS, AI solutions, website development, and digital transformation services. Free consultation available."
        canonical={`${BASE_URL}/contact`}
        schemaMarkup={schema}
      />
      <Navbar />

      <main className="pt-28 pb-20">
        {/* Clean Typographic Hero */}
        <section className="section-padding max-w-4xl mx-auto text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-white/40 font-semibold text-sm tracking-widest uppercase mb-4 block">Contact</span>
            <h1 className="font-display font-medium text-4xl md:text-6xl text-white tracking-tight mb-6">
              Start the Dialogue.
            </h1>
            <p className="text-white/50 text-xl font-light max-w-2xl mx-auto">
              Ready to execute your architectural vision? Connect directly with our engineering and growth specialists.
            </p>
          </motion.div>
        </section>

        {/* Contact Info Cards */}
        <section className="section-padding max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {contactCards.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="card-elevated p-5 text-center hover-lift group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-colors duration-300">
                  <item.icon className="text-primary group-hover:text-primary-foreground transition-colors duration-300" size={20} />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors break-all inline-block w-full">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-foreground break-all inline-block w-full">{item.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Lead Form */}
        <div className="max-w-full overflow-hidden">
          <LeadForm />
        </div>

        {/* Location & Scheduling */}
        <section className="section-padding max-w-4xl mx-auto mt-16 pb-20 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="p-10 border border-white/10 rounded-2xl bg-black/40">
            <h2 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-3">
              <MapPin size={20} className="text-white/50" /> Registered Office
            </h2>
            <address className="text-white/60 not-italic text-sm leading-relaxed">
              Cospazes, A-116 Urbtech Trade Centre,<br />
              Sec-132, Noida — 201304, India
            </address>
          </div>
          <div className="p-10 border border-white/10 rounded-2xl bg-black/40">
            <h2 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Calendar size={20} className="text-white/50" /> Direct Booking
            </h2>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">Instantly schedule a deep-dive technical consultation with our lead architects.</p>
            <a
              href="https://calendly.com/ripplenexus/book-a-consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full bg-white text-black px-6 py-3.5 rounded-lg font-medium hover:bg-white/90 transition-colors text-sm"
            >
              <span>Schedule a Call</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
