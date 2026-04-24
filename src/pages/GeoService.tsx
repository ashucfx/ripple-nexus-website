import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CtaSection from "@/components/CtaSection";

const GeoService = () => {
  const { country, service } = useParams();

  const formattedCountry = country
    ? country.toUpperCase() === "USA" || country.toUpperCase() === "UK"
      ? country.toUpperCase()
      : country.charAt(0).toUpperCase() + country.slice(1)
    : "Global";

  const formattedService = service
    ? service.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    : "AI Automation Systems";

  const geoSchema = {
    "@context": "https://schema.org/",
    "@type": "Service",
    serviceType: formattedService,
    provider: { "@type": "Organization", name: "Ripple Nexus" },
    areaServed: { "@type": "Country", name: formattedCountry },
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <SEOHead
        title={`Top ${formattedService} Company in ${formattedCountry} | Ripple Nexus`}
        description={`Partner with the leading ${formattedService.toLowerCase()} experts serving ${formattedCountry}. Proprietary AI systems. 100% IP ownership. Production in 60–90 days.`}
        canonical={`https://www.theripplenexus.com/locations/${country}/${service}`}
        schemaMarkup={geoSchema}
      />
      <Navbar />

      <main className="pt-32 pb-24">
        <section className="section-padding max-w-4xl mx-auto text-center mb-20 relative z-10">
          <p className="eyebrow mb-6">Serving {formattedCountry}</p>
          <h1
            className="font-display font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em", color: "var(--pearl)" }}
          >
            {formattedService} in{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #7C5CFF 0%, #B794FF 55%, #22D3EE 100%)" }}
            >
              {formattedCountry}
            </span>
          </h1>
          <p
            className="font-body text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "var(--graphite-300)" }}
          >
            Delivering proprietary AI automation infrastructure and enterprise-grade systems
            tailored for businesses operating in the {formattedCountry} market.
          </p>
        </section>

        <section className="section-padding max-w-3xl mx-auto mb-20">
          <div
            className="p-8 rounded-xl"
            style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}
          >
            <h2
              className="font-display font-bold text-xl mb-4"
              style={{ color: "var(--pearl)", letterSpacing: "-0.02em" }}
            >
              Market Leaders in {formattedCountry}
            </h2>
            <p className="font-body text-sm leading-relaxed mb-4" style={{ color: "var(--graphite-300)" }}>
              Operating across timezones, our robust engineering protocols ensure that companies
              in <strong style={{ color: "var(--pearl)" }}>{formattedCountry}</strong> receive
              seamless communication, rapid AI system deployment, and open-standard architecture
              with 100% IP ownership on delivery.
            </p>
            <p className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-400)" }}>
              We build proprietary systems on your data — not generic ChatGPT wrappers.
              Every system is deployed to production in 60–90 days.
            </p>
          </div>
        </section>

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
};

export default GeoService;
