import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ProofSection from "../components/ProofSection";
import BehavioralIntentSelector from "../components/BehavioralIntentSelector";
import CaseStudiesSection from "../components/CaseStudiesSection";
import CapabilitySection from "../components/CapabilitySection";
import FounderSection from "../components/FounderSection";
import ObjectionSection from "../components/ObjectionSection";
import ProcessSection from "../components/ProcessSection";
import ProjectIntake from "../components/ProjectIntake";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { BehavioralIntentId, CaseStudyItem } from "../models/behavioral";
import { telemetry } from "../analytics/telemetry";

const BASE_URL = "https://www.theripplenexus.com";

const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Ripple Nexus",
      url: BASE_URL,
      logo: `${BASE_URL}/favicon.svg`,
      description:
        "Digital product engineering, AI workflows, automation systems, and data infrastructure for companies that refuse to operate manually.",
      foundingDate: "2023",
      areaServed: "Worldwide",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-7599-756-826",
        contactType: "technical sales",
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
        streetAddress: "Cospazes, A-116 Urbtech Trade Centre, Sec-132",
        addressLocality: "Noida",
        addressRegion: "Uttar Pradesh",
        postalCode: "201304",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: "Ripple Nexus — Digital Systems & AI Engineering",
      description:
        "We build SaaS platforms, AI workflows, business applications and digital infrastructure around how your business actually works.",
      isPartOf: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

const Index: React.FC = () => {
  const [currentIntent, setCurrentIntent] = useState<BehavioralIntentId>("build");
  const [selectedIntakeProblem, setSelectedIntakeProblem] = useState<
    "new_product" | "internal_platform" | "ai_automation" | "existing_software" | "data_infrastructure" | "not_sure"
  >("new_product");

  useEffect(() => {
    telemetry.track("page_view", { title: document.title });
  }, []);

  const handleIntentChange = (intent: BehavioralIntentId) => {
    setCurrentIntent(intent);
    if (intent === "build") setSelectedIntakeProblem("new_product");
    else if (intent === "automate") setSelectedIntakeProblem("ai_automation");
    else if (intent === "modernize") setSelectedIntakeProblem("existing_software");
    else if (intent === "scale") setSelectedIntakeProblem("data_infrastructure");
  };

  const handleIntentAction = (intent: BehavioralIntentId) => {
    handleIntentChange(intent);
    const el = document.getElementById("intake");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleDiscussSimilarCase = (study: CaseStudyItem) => {
    handleIntentChange(study.intentCategory);
    const el = document.getElementById("intake");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectCapability = (capTitle: string) => {
    const el = document.getElementById("intake");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-white selection:bg-[#00F0FF] selection:text-black">
      <SEOHead
        title="Ripple Nexus — Digital Systems & AI Engineering"
        description="We build SaaS platforms, AI workflows, business applications and digital infrastructure around how your business actually operates. Build → Automate → Scale."
        canonical={BASE_URL}
        schemaMarkup={schemaMarkup}
      />

      <Navbar />

      <main>
        {/* 01 ATTENTION: Hero */}
        <HeroSection />

        {/* 03 CURIOSITY: Architectural Proof */}
        <ProofSection />

        {/* 04 & 05 SELF-IDENTIFICATION & RELEVANCE: Behavioral Intent */}
        <BehavioralIntentSelector
          currentIntent={currentIntent}
          onIntentChange={handleIntentChange}
          onIntentAction={handleIntentAction}
        />

        {/* 06 CREDIBILITY: 6-Stage Case Studies */}
        <CaseStudiesSection onDiscussSimilar={handleDiscussSimilarCase} />

        {/* 07 TECHNICAL COMPETENCE: 4 Capability Domains */}
        <CapabilitySection onSelectCapability={handleSelectCapability} />

        {/* 08 HUMAN ACCOUNTABILITY: Founder & Lead Architect */}
        <FounderSection />

        {/* 09 OBJECTION REMOVAL: Pre-empting Enterprise Friction */}
        <ObjectionSection />

        {/* 10 RISK REDUCTION: Transparent What Happens Next */}
        <ProcessSection />

        {/* 11 COMMITMENT: Progressive Smart Intake Engine */}
        <ProjectIntake initialProblem={selectedIntakeProblem} />

        {/* 12 CONVERSION: Final Decisive CTA */}
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
