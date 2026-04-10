import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ChatBot from "@/components/ChatBot";
import SEOHead from "@/components/SEOHead";

// Above-fold sections — eager
const TrustSection = lazy(() => import("@/components/TrustSection"));

// Below-fold sections — lazy loaded
const ProblemSolutionSection = lazy(() => import("@/components/ProblemSolutionSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const RealStoriesSection = lazy(() => import("@/components/RealStoriesSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const GlobalSection = lazy(() => import("@/components/GlobalSection"));
const QuestionsSection = lazy(() => import("@/components/QuestionsSection"));
const EmotionalStatement = lazy(() => import("@/components/EmotionalStatement"));
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
        "Ripple Nexus builds automation-first platforms, enterprise SaaS, AI/LLM pipelines, and RPA workflows for founders and enterprises across 18+ countries.",
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
        "https://www.facebook.com/ripplenexusglobal/",
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
      name: "Ripple Nexus — Automation-First Growth Systems for Enterprises",
      description:
        "We architect automation-first platforms, AI pipelines, and enterprise SaaS for founders and companies who refuse to operate below their potential.",
      isPartOf: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "en-US",
      potentialAction: {
        "@type": "ReadAction",
        target: BASE_URL,
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
            text: "Book a free 30-minute strategy call at calendly.com/ripplenexus/book-a-consultation. We'll diagnose your system and propose a solution within 48 hours.",
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
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <SEOHead
        title="Ripple Nexus — Automation-First Growth Systems for Founders & Enterprises"
        description="We build automation-first platforms, AI pipelines, and enterprise SaaS for companies that refuse to operate below their potential. 200+ clients. 18+ countries. Free strategy call."
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

        {/* 3. Capabilities: what we build with outcomes */}
        <ServicesSection />

        {/* 4. Process: how we work — removes risk objection */}
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

        {/* 11. Lead form */}
        <LeadForm />

        {/* 12. Footer */}
        <Footer />
      </Suspense>

      <ChatBot />
    </div>
  );
};

export default Index;
