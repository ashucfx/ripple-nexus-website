import { lazy, Suspense, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ChatBot from "@/components/ChatBot";
import SEOHead from "@/components/SEOHead";

/**
 * Homepage — Institutional authority conversion structure:
 *
 * Diagnosis-driven restructure:
 * ✓ Removed QuestionsSection (fear-based, redundant, CTA noise)
 * ✓ Removed EmotionalStatement (replaced by FounderSection authority)
 * ✓ Added FounderSection immediately after proof (humanises brand)
 * ✓ Page flows: Hero → Trust → Mechanism → Capabilities → Proof →
 *   Testimonials → Founder → Process → Global → CTA → Form → Footer
 * ✓ Reduced from 15 sections to 11 — each with a distinct conversion purpose
 */

// Above-fold sections — eager
const TrustSection = lazy(() => import("@/components/TrustSection"));

// Below-fold sections — lazy loaded
const ProblemSolutionSection = lazy(() => import("@/components/ProblemSolutionSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const ControlPlaneSection = lazy(() => import("@/components/ControlPlaneSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const RealStoriesSection = lazy(() => import("@/components/RealStoriesSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FounderSection = lazy(() => import("@/components/FounderSection"));
const GlobalSection = lazy(() => import("@/components/GlobalSection"));
const CtaSection = lazy(() => import("@/components/CtaSection"));
const LeadForm = lazy(() => import("@/components/LeadForm"));
const Footer = lazy(() => import("@/components/Footer"));

const BASE_URL = "https://www.theripplenexus.com";

const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Ripple Nexus",
      url: BASE_URL,
      logo: `${BASE_URL}/logo-icon.svg`,
      description:
        "Ripple Nexus architects enterprise SaaS platforms, agentic AI pipelines, data engineering systems, and RPA workflows for companies across 18+ countries.",
      foundingDate: "2021",
      areaServed: "Worldwide",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-7599-756-826",
        contactType: "customer support",
        email: "info@theripplenexus.com",
        availableLanguage: "English",
      },
      sameAs: [
        "https://www.linkedin.com/company/ripple-nexus",
        "https://x.com/ripplenexus",
        "https://www.instagram.com/ripplenexus/",
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Cospazes, A-116, Urbtech Trade Centre, Sec-132",
        addressLocality: "Noida",
        addressRegion: "Uttar Pradesh",
        postalCode: "201304",
        addressCountry: "IN",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "42",
        bestRating: "5",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: "Ripple Nexus: Information Gain Infrastructure — Enterprise AI Systems & Data Engineering",
      description:
        "Ripple Nexus architects proprietary AI systems on your data — not generic wrappers. Enterprise SaaS platforms, agentic AI pipelines, and real-time data infrastructure across 18+ countries.",
      isPartOf: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "en-US",
      potentialAction: {
        "@type": "ReadAction",
        target: BASE_URL,
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#service`,
      name: "Ripple Nexus Engineering Services",
      url: BASE_URL,
      description: "Enterprise SaaS architecture, agentic AI pipelines, real-time data engineering, native mobile development, and RPA workflow automation.",
      provider: { "@id": `${BASE_URL}/#organization` },
      areaServed: "Worldwide",
      serviceType: [
        "SaaS Architecture",
        "Agentic AI Development",
        "Data Engineering",
        "Mobile App Development",
        "RPA Automation",
        "Cloud Infrastructure",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does Ripple Nexus build?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ripple Nexus builds proprietary AI automation systems on your data — enterprise SaaS platforms, AI/LLM automation pipelines, data engines, native mobile apps, and RPA workflows for businesses globally.",
          },
        },
        {
          "@type": "Question",
          name: "How long does a typical project take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most projects go from Architecture Discovery to production in 60–90 days. MVP launches can be as fast as 4–6 weeks depending on scope.",
          },
        },
        {
          "@type": "Question",
          name: "What countries does Ripple Nexus serve?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ripple Nexus serves clients in 18+ countries across South Asia, Southeast Asia, the Middle East, Africa, Europe, and the Americas.",
          },
        },
        {
          "@type": "Question",
          name: "How do I start working with Ripple Nexus?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Begin with an Architecture Discovery session at theripplenexus.com. A senior architect will analyse your operational bottlenecks and deliver a written systems brief within 48 hours.",
          },
        },
      ],
    },
  ],
};

/**
 * Homepage — Institutional authority conversion structure
 *
 * Section order rationale:
 * 1. Hero — Category positioning (aspiration, not fear)
 * 2. TrustSection — Immediate credibility: stats, IP guarantee, compliance, industry ticker
 * 3. ProblemSolution — Mechanism differentiation: why generic AI fails, what we do instead
 * 4. ServicesSection — Capabilities: six proprietary systems
 * 5. PricingSection — Engagement Models (no public pricing) + compliance badges
 * 6. RealStoriesSection — Proof: verified metrics from named deployments
 * 7. TestimonialsSection — Named references with verifiable companies
 * 8. FounderSection — Human accountability: who is responsible for your system
 * 9. ProcessSection — Risk removal: transparent, repeatable delivery
 * 10. GlobalSection — Geographic authority
 * 11. CtaSection — Aspirational close
 * 12. LeadForm — Booking mechanism
 * 13. LeadForm — General inquiry fallback
 * 14. Footer
 */
const Index = () => {
  useEffect(() => {
    if (window.location.hash !== "#lead-form") return;
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById("lead-form");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts++ < 30) {
        setTimeout(tryScroll, 150);
      }
    };
    tryScroll();
  }, []);

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <SEOHead
        title="Ripple Nexus: Information Gain Infrastructure — Enterprise AI Systems"
        description="We build proprietary AI systems on your data — not generic wrappers. Autonomous agents, enterprise SaaS platforms, and real-time data infrastructure that deliver measurable outcomes. 200+ deployments across 18+ countries."
        canonical={BASE_URL}
        schemaMarkup={schemaMarkup}
      />
      <Navbar />
      <HeroSection />

      <Suspense fallback={<div className="py-16" />}>

        {/* 1. Immediate trust signals */}
        <TrustSection />

        {/* 2. Mechanism: why generic AI fails, what we do differently */}
        <ProblemSolutionSection />

        {/* 3. Capabilities: what we build */}
        <ServicesSection />

        {/* 3.5. Productization: how the client manages it (Operational Maturity) */}
        <ControlPlaneSection />

        {/* 4. Engagement models (no public pricing) + compliance */}
        <PricingSection />

        {/* 5. Proof: verified metrics from named deployments */}
        <RealStoriesSection />

        {/* 6. Named references with verifiable companies */}
        <TestimonialsSection />

        {/* 7. Founder: human accountability — who is responsible for your system */}
        <FounderSection />

        {/* 8. Process: risk removal through transparent delivery */}
        <ProcessSection />

        {/* 9. Global reach: authority positioning */}
        <GlobalSection />

        {/* 10. Aspirational close */}
        <CtaSection />

        {/* 11. Booking mechanism (Now a frictionless intake flow) */}
        <LeadForm />

        {/* 12. Footer */}
        <Footer />

      </Suspense>

      <ChatBot />
    </div>
  );
};

export default Index;
