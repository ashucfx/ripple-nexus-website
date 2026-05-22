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
    { icon: Phone,         label: "Call Us",   value: "+91 7599 756 826",       href: "tel:+917599756826" },
    { icon: MessageCircle, label: "WhatsApp",  value: "Chat Now",               href: "https://wa.me/917599756826" },
    { icon: Mail,          label: "Email",     value: "info@theripplenexus.com", href: "mailto:info@theripplenexus.com" },
    { icon: Clock,         label: "Hours",     value: "Mon–Fri, 9 AM – 5 PM IST", href: "" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <SEOHead
        title="Contact Ripple Nexus: Request an AI Systems Audit"
        description="Get in touch with Ripple Nexus for proprietary AI automation systems, enterprise SaaS architecture, and data engineering. Senior architects respond within 24 hours."
        canonical={`${BASE_URL}/contact`}
        schemaMarkup={schema}
      />
      <Navbar />

      <main>
        {/* Hero */}
        <section
          className="relative pt-40 pb-20 overflow-hidden"
          style={{ borderBottom: "1px solid var(--graphite-600)" }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at top, rgba(124,92,255,0.12) 0%, transparent 65%)",
            }}
          />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="eyebrow mb-6">Contact</p>
              <h1
                className="font-display font-bold leading-tight mb-6"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.04em", color: "var(--pearl)" }}
              >
                Start the Dialogue.
              </h1>
              <p className="font-body text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--graphite-300)" }}>
                Ready to deploy your first autonomous growth system? Connect with our engineering team.
                Senior architects respond within 24 hours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section
          className="py-16"
          style={{ borderBottom: "1px solid var(--graphite-600)" }}
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "var(--graphite-600)" }}>
              {contactCards.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 text-center flex flex-col items-center transition-colors duration-200"
                  style={{ background: "var(--obsidian)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--ink)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "var(--obsidian)")}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "rgba(124,92,255,0.1)", border: "1px solid rgba(124,92,255,0.2)" }}
                  >
                    <item.icon size={18} style={{ color: "var(--nexus-violet)" }} />
                  </div>
                  <p className="font-mono text-[0.6rem] tracking-widest uppercase mb-2" style={{ color: "var(--graphite-400)" }}>
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="font-body text-sm font-medium transition-colors duration-200 break-all"
                      style={{ color: "var(--graphite-300)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--nexus-violet)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--graphite-300)")}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-body text-sm font-medium break-all" style={{ color: "var(--graphite-300)" }}>
                      {item.value}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <div className="max-w-full overflow-hidden">
          <LeadForm />
        </div>

        {/* Location & Scheduling */}
        <section
          className="py-20"
          style={{ borderTop: "1px solid var(--graphite-600)" }}
        >
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Office */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl"
              style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}
            >
              <h2
                className="font-display font-bold text-lg mb-5 flex items-center gap-3"
                style={{ color: "var(--pearl)", letterSpacing: "-0.015em" }}
              >
                <MapPin size={18} style={{ color: "var(--nexus-violet)" }} />
                Registered Office
              </h2>
              <address className="font-body text-sm not-italic leading-relaxed" style={{ color: "var(--graphite-400)" }}>
                Cospazes, A-116 Urbtech Trade Centre,<br />
                Sec-132, Noida — 201304, India
              </address>
            </motion.div>

            {/* Direct Booking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="p-8 rounded-xl"
              style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}
            >
              <h2
                className="font-display font-bold text-lg mb-5 flex items-center gap-3"
                style={{ color: "var(--pearl)", letterSpacing: "-0.015em" }}
              >
                <Calendar size={18} style={{ color: "var(--nexus-violet)" }} />
                Direct Booking
              </h2>
              <p className="font-body text-sm mb-7 leading-relaxed" style={{ color: "var(--graphite-400)" }}>
                For founders and engineering leaders with a specific architecture or scaling problem.
                Qualify in 2 minutes. A senior architect leads your session.
              </p>
              <a
                href="/#lead-form"
                className="inline-flex items-center justify-between w-full font-body font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-200"
                style={{
                  background: "var(--nexus-violet)",
                  color: "#fff",
                  boxShadow: "0 8px 32px -4px rgba(124,92,255,0.4)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "var(--violet-hover)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px -4px rgba(124,92,255,0.55)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "var(--nexus-violet)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 32px -4px rgba(124,92,255,0.4)";
                }}
              >
                <span>Request AI Systems Audit</span>
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
