import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ChatBot from "@/components/ChatBot";
import SEOHead from "@/components/SEOHead";

const QuestionsSection = lazy(() => import("@/components/QuestionsSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const EmotionalStatement = lazy(() => import("@/components/EmotionalStatement"));
const TrustSection = lazy(() => import("@/components/TrustSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const CtaSection = lazy(() => import("@/components/CtaSection"));
const RealStoriesSection = lazy(() => import("@/components/RealStoriesSection"));
const LeadForm = lazy(() => import("@/components/LeadForm"));
const Footer = lazy(() => import("@/components/Footer"));

const BASE_URL = "https://www.theripplenexus.com";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <SEOHead
        title="Ripple Nexus — Growth Partner for Modern Businesses"
        description="We help founders remove system chaos, clarify strategy, and build scalable growth platforms. Enterprise SaaS, AI solutions, website development & career branding."
        canonical={BASE_URL}
      />
      <Navbar />
      <HeroSection />
      <Suspense fallback={<div className="py-20" />}>
        <TrustSection />
        <ServicesSection />
        <RealStoriesSection />
        <TestimonialsSection />
        <QuestionsSection />
        <EmotionalStatement />
        <CtaSection />
        <LeadForm />
        <Footer />
      </Suspense>
      <ChatBot />
    </div>
  );
};

export default Index;
