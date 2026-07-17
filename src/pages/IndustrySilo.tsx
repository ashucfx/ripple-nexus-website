import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CtaSection from "@/components/CtaSection";
import { industriesData } from "@/data/industries";
import NotFound from "./NotFound";

const IndustrySilo = () => {
  const { slug } = useParams();
  
  const industry = industriesData.find(ind => ind.slug === slug);

  if (!industry) {
    return <NotFound />;
  }

  const industrySchema = {
    "@context": "https://schema.org/",
    "@type": "WebPage",
    "name": `${industry.title} AI & Digital Transformation | Ripple Nexus`,
    "description": industry.overview,
    "provider": { "@type": "Organization", name: "Ripple Nexus", url: "https://www.theripplenexus.com" },
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <SEOHead
        title={`${industry.title} AI & Digital Transformation | Ripple Nexus`}
        description={industry.overview}
        canonical={`https://www.theripplenexus.com/industries/${slug}`}
        schemaMarkup={industrySchema}
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
          <p className="eyebrow mb-6">Industry Transformation</p>
          <h1
            className="font-display font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em", color: "var(--pearl)" }}
          >
            AI-First {" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #7C5CFF 0%, #B794FF 55%, #22D3EE 100%)" }}
            >
              {industry.title}
            </span>
          </h1>
          <p
            className="font-body text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "var(--graphite-300)" }}
          >
            {industry.overview}
          </p>
        </section>

        {/* Content */}
        <section className="section-padding max-w-4xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="p-8 rounded-xl space-y-6"
              style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}
            >
              <h2
                className="font-display font-bold text-xl mb-3"
                style={{ color: "var(--pearl)", letterSpacing: "-0.02em" }}
              >
                Industry Challenges
              </h2>
              <ul className="space-y-4">
                {industry.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-mono text-xs mt-0.5 shrink-0" style={{ color: "var(--nexus-violet)" }}>—</span>
                    <span className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-300)" }}>
                      {challenge}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div
              className="p-8 rounded-xl space-y-6"
              style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}
            >
              <h2
                className="font-display font-bold text-xl mb-3"
                style={{ color: "var(--pearl)", letterSpacing: "-0.02em" }}
              >
                AI Opportunities
              </h2>
              <ul className="space-y-4">
                {industry.aiOpportunities.map((opportunity, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-mono text-xs mt-0.5 shrink-0" style={{ color: "var(--quantum-lime)" }}>✓</span>
                    <span className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-300)" }}>
                      {opportunity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div
            className="p-8 rounded-xl mt-8"
            style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}
          >
              <h3
                className="font-display font-bold text-xl mb-6"
                style={{ color: "var(--pearl)", letterSpacing: "-0.015em" }}
              >
                Implementation Examples & ROI
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-body font-semibold text-sm mb-3 text-[var(--pearl)]">Real-World Applications</h4>
                  <ul className="space-y-3">
                    {industry.implementationExamples.map((example, i) => (
                      <li key={i} className="font-body text-sm leading-relaxed text-[var(--graphite-300)] border-l-2 border-[rgba(124,92,255,0.4)] pl-4">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-body font-semibold text-sm mb-3 text-[var(--pearl)]">Verified Outcomes</h4>
                  <div className="flex flex-col gap-3">
                    {industry.roiMetrics.map((metric, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(124,92,255,0.06)] border border-[rgba(124,92,255,0.2)]">
                        <span className="font-display font-bold text-lg text-[var(--ion-cyan)]">{metric.match(/^[\d$.+%]+/)?.[0] || '10x'}</span>
                        <span className="font-body text-xs text-[var(--pearl)]">{metric.replace(/^[\d$.+%]+\s/, '')}</span>
                      </div>
                    ))}
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

export default IndustrySilo;
