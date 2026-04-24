import { lazy, Suspense, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ChatBot from "@/components/ChatBot";
import SEOHead from "@/components/SEOHead";

// Above-fold sections — eager
const TrustSection = lazy(() => import("@/components/TrustSection"));

// Below-fold sections — lazy loaded
const ProblemSolutionSection = lazy(() => import("@/components/ProblemSolutionSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const RealStoriesSection = lazy(() => import("@/components/RealStoriesSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const GlobalSection = lazy(() => import("@/components/GlobalSection"));
const QuestionsSection = lazy(() => import("@/components/QuestionsSection"));
const EmotionalStatement = lazy(() => import("@/components/EmotionalStatement"));
const CtaSection = lazy(() => import("@/components/CtaSection"));
const RNSScheduler = lazy(() => import("@/components/scheduler/RNSScheduler"));
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
      name: "Ripple Nexus: Enterprise SaaS Architecture, Agentic AI & Data Engineering",
      description:
        "Ripple Nexus architects enterprise SaaS platforms, agentic AI pipelines, and data infrastructure that deliver measurable uptime, throughput, and revenue outcomes.",
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
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Engineering Service Catalog",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "High-Scale SaaS Architecture" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Agentic AI and RAG Pipelines" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Real-Time Data Infrastructure" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Native Mobile Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Operational Automation via RPA" } },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does Ripple Nexus build?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ripple Nexus builds enterprise SaaS platforms, AI/LLM automation pipelines, data engines, native mobile apps, web platforms, and RPA workflows for businesses globally.",
          },
        },
        {
          "@type": "Question",
          name: "How long does a typical project take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most projects go from discovery to production in 60–90 days. MVP launches can be as fast as 4–6 weeks depending on scope.",
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
            text: "Apply for a premium strategy consultation at theripplenexus.com. Complete a short qualification form, secure your session with a one-time fee, and book a time that works for you.",
          },
        },
      ],
    },
  ],
};

/**
 * Homepage — Conversion-optimized structure:
 * Hero → Trust → Problem/Solution → Services → Process →
 * Proof → Testimonials → Global → Diagnostic → Statement → CTA → Form → Footer
 */
const Index = () => {
  useEffect(() => {
    if (window.location.hash !== "#rns-scheduler") return;
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById("rns-scheduler");
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
        title="Ripple Nexus: Enterprise SaaS Architecture, Agentic AI & Data Engineering"
        description="We engineer enterprise SaaS platforms, agentic AI pipelines, and scalable data infrastructure that deliver measurable uptime, throughput, and revenue outcomes. 200+ deployments across 18+ countries."
        canonical={BASE_URL}
        schemaMarkup={schemaMarkup}
      />
      <Navbar />
      <HeroSection />

      <Suspense fallback={<div className="py-16" />}>
        {/* 1. Trust signals immediately below hero */}
        <TrustSection />

        {/* 2. Problem → Solution: reframe from service provider to systems partner */}
        <ProblemSolutionSection />

        {/* 3. Capabilities: productized AI systems */}
        <ServicesSection />

        {/* 4. Pricing: Agent Licensing Model */}
        <PricingSection />

        {/* 5. Process: how we work — removes risk objection */}
        <ProcessSection />

        {/* 5. Proof: real case study metrics */}
        <RealStoriesSection />

        {/* 6. Social proof: testimonials with featured metric cards */}
        <TestimonialsSection />

        {/* 7. Global reach: authority positioning */}
        <GlobalSection />

        {/* 8. Diagnostic: urgency through self-identification */}
        <QuestionsSection />

        {/* 9. Emotional positioning statement */}
        <EmotionalStatement />

        {/* 10. Final CTA — strong close */}
        <CtaSection />

        {/* 11. Ripple Nexus Scheduler — paid qualification + booking funnel */}
        <RNSScheduler />

        {/* 12. Lead form (general inquiries) */}
        <LeadForm />

        {/* 13. Footer */}
        <Footer />
      </Suspense>

      <ChatBot />
    </div>
  );
};

export default Index;
