import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CtaSection from "@/components/CtaSection";

const ServiceSilo = () => {
  const { slug } = useParams();

  const formattedTitle = slug
    ? slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    : "AI Automation Systems";

  const serviceSchema = {
    "@context": "https://schema.org/",
    "@type": "Service",
    serviceType: formattedTitle,
    provider: { "@type": "Organization", name: "Ripple Nexus", url: "https://www.theripplenexus.com" },
    areaServed: { "@type": "Country", name: "Worldwide" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${formattedTitle} Systems`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: `Enterprise ${formattedTitle}` },
        },
      ],
    },
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <SEOHead
        title={`${formattedTitle} | Proprietary AI Systems by Ripple Nexus`}
        description={`Build proprietary ${formattedTitle.toLowerCase()} on your data. Open-standard architecture, 100% IP ownership, production deployment in 60–90 days. Verifiable ROI.`}
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
          <p className="eyebrow mb-6">System Catalogue</p>
          <h1
            className="font-display font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em", color: "var(--pearl)" }}
          >
            Enterprise{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #7C5CFF 0%, #B794FF 55%, #22D3EE 100%)" }}
            >
              {formattedTitle}
            </span>
          </h1>
          <p
            className="font-body text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "var(--graphite-300)" }}
          >
            Proprietary {formattedTitle.toLowerCase()} built on your data.
            Open-standard architecture. 100% IP ownership on delivery. Production in 60–90 days.
          </p>
        </section>

        {/* Content */}
        <section className="section-padding max-w-3xl mx-auto mb-20">
          <div
            className="p-8 rounded-xl space-y-6"
            style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}
          >
            <div>
              <h2
                className="font-display font-bold text-xl mb-3"
                style={{ color: "var(--pearl)", letterSpacing: "-0.02em" }}
              >
                Why Choose Ripple Nexus for {formattedTitle}?
              </h2>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-300)" }}>
                When investing in <strong style={{ color: "var(--pearl)" }}>{formattedTitle.toLowerCase()}</strong>,
                companies face the technical debt of rushed configurations and poorly scoped architectures.
                We eliminate that risk. Our discovery process ensures the infrastructure we build is
                exactly what your next stage of growth demands.
              </p>
            </div>

            <div style={{ borderTop: "1px solid var(--graphite-600)", paddingTop: "1.5rem" }}>
              <h3
                className="font-display font-bold text-base mb-3"
                style={{ color: "var(--pearl)", letterSpacing: "-0.015em" }}
              >
                Open-Standard Architecture
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-400)" }}>
                Built on Make, n8n, Python, and open APIs — not proprietary black boxes.
                Every workflow, every agent, every data pipeline stays yours forever.
                Walk away with 100% of the IP, any time.
              </p>
            </div>

            <div style={{ borderTop: "1px solid var(--graphite-600)", paddingTop: "1.5rem" }}>
              <h3
                className="font-display font-bold text-base mb-4"
                style={{ color: "var(--pearl)", letterSpacing: "-0.015em" }}
              >
                Implementation Phases
              </h3>
              <ul className="space-y-3">
                {[
                  ["Discovery & Architecture", "Mapping data flows, automation opportunities, and scale requirements."],
                  ["Engineered Development", "Clean, production-grade systems built on open standards."],
                  ["QA & Stress Testing", "High-load simulations before any production deployment."],
                  ["Deployment & Handover", "Zero-downtime rollout with full IP transfer on delivery."],
                ].map(([label, desc]) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="font-mono text-xs mt-0.5 shrink-0" style={{ color: "var(--nexus-violet)" }}>—</span>
                    <span className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-300)" }}>
                      <strong style={{ color: "var(--pearl)" }}>{label}:</strong> {desc}
                    </span>
                  </li>
                ))}
              </ul>
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
