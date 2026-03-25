import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import CtaSection from "@/components/CtaSection";

// This is a semantic SEO structure template designed to be fed by a Headless CMS (like Sanity)
// Hardcoding 50+ 2500-word articles here would destroy the bundle size.
const ServiceSilo = () => {
  const { slug } = useParams();
  
  // Format slug for display (e.g. software-development -> Software Development)
  const formattedTitle = slug 
    ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Enterprise Services';

  // Dynamic Service Schema.org JSON-LD
  const serviceSchema = {
    "@context": "https://schema.org/",
    "@type": "Service",
    "serviceType": formattedTitle,
    "provider": {
      "@type": "Organization",
      "name": "Ripple Nexus",
      "url": "https://www.theripplenexus.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Worldwide"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${formattedTitle} Packages`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `Enterprise ${formattedTitle}`
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#020610] text-foreground">
      <SEOHead 
        title={`${formattedTitle} Company | Expert Solutions by Ripple Nexus`}
        description={`Scale your business with our elite ${formattedTitle} services. Engineered for performance, security, and measurable ROI.`}
        canonical={`https://www.theripplenexus.com/services/${slug}`}
        schemaMarkup={serviceSchema}
      />
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* SEO Dominating Hero */}
        <section className="section-padding max-w-4xl mx-auto text-center mb-20 relative z-10">
          <h1 className="text-5xl md:text-6xl font-display font-medium text-white mb-6 tracking-tight">
            Enterprise <span className="text-primary">{formattedTitle}</span>.
          </h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Architecting high-performance, resilient, and scalable {formattedTitle.toLowerCase()} solutions perfectly tailored to your business realities. No legacy debt. Just speed.
          </p>
        </section>

        {/* 2000-Word Semantic SEO Content Placeholder Area */}
        {/* In production, this data should strictly be fetched via getStaticProps/Server Components from a Headless CMS */}
        <section className="section-padding max-w-3xl mx-auto text-white/70 prose prose-invert prose-lg mb-20">
          <h2>Why Choose Ripple Nexus for {formattedTitle}?</h2>
          <p>
            When investing in <strong>{formattedTitle.toLowerCase()}</strong>, companies often face the technical debt of rushed configurations and poorly scoped architectures. We eliminate that risk. Our deep-dive discovery process ensures that the infrastructure we build is exactly what your next stage of growth demands.
          </p>
          
          <h3>Core Competencies & Stack Agnosticism</h3>
          <p>
            We do not force you into a single framework. Whether your enterprise requires robust Node.js microservices, Python-based AI engines, native Swift iOS environments, or high-bandwidth React web portals, our engineering team tailors the solution.
          </p>

          <blockquote>
            "Ripple Nexus didn't just write our software; they re-engineered our entire operational flow." — Enterprise Client
          </blockquote>

          <h3>Strategic Implementation Phases</h3>
          <ul>
            <li><strong>Discovery & Architecture:</strong> Mapping out data flows and scalability limits.</li>
            <li><strong>Engineered Development:</strong> Writing clean, self-documenting, and brutally efficient code.</li>
            <li><strong>Stress Testing & QA:</strong> Subjecting the architecture to high-load simulations.</li>
            <li><strong>Deployment & Scaling:</strong> Seamless CI/CD rollouts with zero downtime.</li>
          </ul>
        </section>

        <CtaSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceSilo;
