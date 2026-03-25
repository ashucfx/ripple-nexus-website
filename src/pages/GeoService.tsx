import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CtaSection from "@/components/CtaSection";

// Semantic SEO template for Geo-Targeted commercial intent pages
const GeoService = () => {
  const { country, service } = useParams();
  
  const formattedCountry = country 
    ? country.toUpperCase() === 'USA' || country.toUpperCase() === 'UK' 
      ? country.toUpperCase() 
      : country.charAt(0).toUpperCase() + country.slice(1)
    : 'Global';

  const formattedService = service 
    ? service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Software Development';

  // Geo-specific Service Schema
  const geoSchema = {
    "@context": "https://schema.org/",
    "@type": "Service",
    "serviceType": formattedService,
    "provider": {
      "@type": "Organization",
      "name": "Ripple Nexus"
    },
    "areaServed": {
      "@type": "Country",
      "name": formattedCountry
    }
  };

  return (
    <div className="min-h-screen bg-[#020610] text-foreground">
      <SEOHead 
        title={`Top ${formattedService} Company in ${formattedCountry} | Ripple Nexus`}
        description={`Partner with the leading ${formattedService.toLowerCase()} experts serving ${formattedCountry}. We build high-ROI enterprise systems.`}
        canonical={`https://www.theripplenexus.com/locations/${country}/${service}`}
        schemaMarkup={geoSchema}
      />
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* Geo-Targeted SEO Hero */}
        <section className="section-padding max-w-4xl mx-auto text-center mb-20 relative z-10">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase mb-4 block">
            Serving {formattedCountry}
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 tracking-tight">
            Premium {formattedService} in <span className="text-primary">{formattedCountry}</span>
          </h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Delivering unshakeable architectural infrastructure and high-performance applications tailored for the {formattedCountry} market.
          </p>
        </section>

        <section className="section-padding max-w-3xl mx-auto text-white/70 prose prose-invert prose-lg mb-20 text-center">
          <h2>Market Leaders in {formattedCountry}</h2>
          <p>
            Operating across timezones, our robust development protocols ensure that companies based in <strong>{formattedCountry}</strong> receive seamless communication, rapid deployment, and structural code advantages exactly when they need them.
          </p>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default GeoService;
