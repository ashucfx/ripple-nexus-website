import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CtaSection from "@/components/CtaSection";
import { servicesData } from "@/data/services";
import NotFound from "./NotFound";

const ServiceSilo = () => {
  const { slug } = useParams();
  
  const service = servicesData.find(s => s.slug === slug);

  if (!service) {
    return <NotFound />;
  }

  const serviceSchema = {
    "@context": "https://schema.org/",
    "@type": "Service",
    "name": `${service.title} | Ripple Nexus`,
    "description": service.overview,
    "provider": { "@type": "Organization", "name": "Ripple Nexus", "url": "https://www.theripplenexus.com" },
    "areaServed": { "@type": "Country", "name": "Worldwide" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${service.title} Services`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": `Enterprise ${service.title}` },
        },
      ],
    },
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <SEOHead
        title={`${service.title} | AI & Digital Transformation | Ripple Nexus`}
        description={service.overview}
        canonical={`https://www.theripplenexus.com/services/${slug}`}
        schemaMarkup={serviceSchema}
      />
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Hero */}
        <section className="section-padding max-w-4xl mx-auto text-center mb-20 relative z-10">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: "600px",
              height: "300px",
              background: "radial-gradient(ellipse at top, rgba(124,92,255,0.12) 0%, transparent 65%)",
            }}
          />
          <p className="eyebrow mb-6">{service.category}</p>
          <h1
            className="font-display font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em", color: "var(--pearl)" }}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #7C5CFF 0%, #B794FF 55%, #22D3EE 100%)" }}
            >
              {service.title}
            </span>
          </h1>
          <p
            className="font-body text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "var(--graphite-300)" }}
          >
            {service.overview}
          </p>
        </section>

        {/* Content */}
        <section className="section-padding max-w-4xl mx-auto mb-20 space-y-12">
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Challenges */}
            <div
              className="p-8 rounded-xl space-y-6"
              style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}
            >
              <h2
                className="font-display font-bold text-xl mb-3"
                style={{ color: "var(--pearl)", letterSpacing: "-0.02em" }}
              >
                Business Challenges We Solve
              </h2>
              <ul className="space-y-4">
                {service.businessChallenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-mono text-xs mt-0.5 shrink-0" style={{ color: "rgba(244,63,94,0.8)" }}>—</span>
                    <span className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-300)" }}>
                      {challenge}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div
              className="p-8 rounded-xl space-y-6"
              style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}
            >
              <h2
                className="font-display font-bold text-xl mb-3"
                style={{ color: "var(--pearl)", letterSpacing: "-0.02em" }}
              >
                Expected ROI & Benefits
              </h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-mono text-xs mt-0.5 shrink-0" style={{ color: "var(--quantum-lime)" }}>✓</span>
                    <span className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-300)" }}>
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Solution & Delivery */}
          <div
            className="p-8 rounded-xl"
            style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}
          >
            <div className="mb-10">
              <h3 className="font-display font-bold text-2xl mb-4" style={{ color: "var(--pearl)" }}>
                Solution Overview
              </h3>
              <p className="font-body text-base leading-relaxed" style={{ color: "var(--graphite-300)" }}>
                {service.solutionOverview}
              </p>
            </div>
            
            <div className="mb-10 pt-10" style={{ borderTop: "1px solid var(--graphite-600)" }}>
              <h3 className="font-display font-bold text-2xl mb-4" style={{ color: "var(--pearl)" }}>
                How We Deliver
              </h3>
              <p className="font-body text-base leading-relaxed" style={{ color: "var(--graphite-300)" }}>
                {service.howWeDeliver}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 pt-10" style={{ borderTop: "1px solid var(--graphite-600)" }}>
              <div>
                <h4 className="font-body font-semibold text-sm mb-4 uppercase tracking-wider text-[var(--pearl)]">Deliverables</h4>
                <ul className="space-y-3">
                  {service.deliverables.map((item, i) => (
                    <li key={i} className="font-body text-sm leading-relaxed text-[var(--graphite-300)] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--nexus-violet)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-body font-semibold text-sm mb-4 uppercase tracking-wider text-[var(--pearl)]">Technical Specifications</h4>
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="font-mono text-xs text-[var(--graphite-400)] block mb-1">Timeline</span>
                    <span className="font-body text-sm text-[var(--pearl)]">{service.timeline}</span>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-[var(--graphite-400)] block mb-2">Technology Stack</span>
                    <div className="flex flex-wrap gap-2">
                      {service.technologyStack.map((tech, i) => (
                        <span key={i} className="font-mono text-[0.65rem] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
};

export default ServiceSilo;
