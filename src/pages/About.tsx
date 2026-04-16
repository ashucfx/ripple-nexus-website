import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Users, Globe, Lightbulb, CheckCircle2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import SEOHead from "@/components/SEOHead";

const BASE_URL = "https://www.theripplenexus.com";

const values = [
  { icon: Target, title: "Clarity First", desc: "We cut through complexity to deliver clear, actionable strategies that drive measurable growth." },
  { icon: Users, title: "Partnership, Not Vendor", desc: "We embed with your team as growth partners — not just service providers sending invoices." },
  { icon: Globe, title: "Global Standards, Local Context", desc: "Enterprise-grade solutions built with deep understanding of Indian and international markets." },
  { icon: Lightbulb, title: "Innovation with Purpose", desc: "Every technology decision is driven by business outcomes, not trends." },
];

const milestones = [
  "50+ businesses transformed across 12+ countries",
  "99.9% uptime across all managed infrastructure",
  "Zero data breaches since inception",
  "ISO 27001 aligned security practices",
  "Dual compliance: Indian IT Act + GDPR",
];

const About = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: "Ripple Nexus",
      url: BASE_URL,
      description: "Enterprise engineering partner for SaaS architecture, agentic AI pipelines, data infrastructure, and operational automation across 18+ countries.",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Ripple Nexus: Enterprise Engineering Partner for SaaS and AI Architecture"
        description="Ripple Nexus engineers the technical backbone of growing businesses. 200+ deployments across 18+ countries. Zero data breaches, 99.9% uptime, GDPR-aligned security."
        canonical={`${BASE_URL}/about`}
        schemaMarkup={schema}
      />
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero with illustration */}
        <section className="section-padding max-w-7xl mx-auto mb-20">
          <div className="max-w-2xl text-center mx-auto">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">Our Story</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-3 mb-6">
              Engineered for <span className="text-gradient">Scale</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Ripple Nexus was founded on a simple premise: technology should accelerate business, not hinder it. We build robust, scalable systems that solve complex problems.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding max-w-6xl mx-auto mb-20">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-elevated p-6 hover-lift group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <v.icon className="text-primary group-hover:text-primary-foreground transition-colors duration-300" size={24} />
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Milestones */}
        <section className="section-padding max-w-4xl mx-auto mb-20">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">Track Record</h2>
          <div className="card-elevated p-8">
            <ul className="space-y-4">
              {milestones.map((m) => (
                <li key={m} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Ready to simplify your growth?</h2>
          <p className="text-muted-foreground mb-8">Let's discuss how we can help your business scale without the chaos.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all">
              Get in Touch <ArrowRight size={16} />
            </Link>
            <Link to="/case-studies" className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-7 py-3.5 rounded-xl font-medium hover:bg-muted transition-all">
              View Our Work
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
