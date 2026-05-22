import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Introduction",
    content: `Ripple Nexus ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our services. This policy is governed by the Information Technology Act, 2000 (India) and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, as well as applicable international data protection standards including GDPR where applicable.`,
  },
  {
    title: "2. Information We Collect",
    items: [
      "Personal Data: Name, email address, phone number, company name, business website, and any information you voluntarily provide through our lead forms or consultations.",
      "Usage Data: Browser type, IP address, pages visited, time spent, referring URLs, and device information — collected automatically via cookies and analytics tools.",
      "Business Data: Project descriptions, budget ranges, timelines, and business challenges shared during engagement.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    items: [
      "To respond to your inquiries and provide requested services",
      "To process and manage client engagements",
      "To improve our website, services, and user experience",
      "To send relevant communications about our services (with consent)",
      "To comply with legal obligations under Indian and international law",
    ],
  },
  {
    title: "4. Data Sharing & Disclosure",
    content: `We do not sell, trade, or rent your personal data. We may share information with trusted third-party service providers (hosting, analytics, CRM) who assist in operating our business, subject to strict confidentiality agreements. We may disclose data when required by law or to protect our legal rights.`,
  },
  {
    title: "5. Data Security",
    content: `We implement industry-standard security measures including encryption, access controls, and regular security audits. While no method of transmission over the internet is 100% secure, we strive to protect your personal information using commercially acceptable means in compliance with IS/ISO 27001 standards.`,
  },
  {
    title: "6. Data Retention",
    content: `We retain personal data for as long as necessary to fulfill the purposes outlined in this policy, or as required by applicable law. You may request deletion of your data at any time by contacting us.`,
  },
  {
    title: "7. Your Rights",
    intro: "Under applicable Indian and international laws, you have the right to:",
    items: [
      "Access the personal data we hold about you",
      "Request correction of inaccurate data",
      "Request deletion of your personal data",
      "Withdraw consent for data processing",
      "Lodge a complaint with a supervisory authority",
    ],
  },
  {
    title: "8. Cookies",
    content: `Our website uses cookies to enhance your browsing experience. You can control cookie preferences through your browser settings. Disabling cookies may affect certain website functionalities.`,
  },
  {
    title: "9. Third-Party Links",
    content: `Our website may contain links to third-party sites. We are not responsible for the privacy practices of these external sites and encourage you to review their privacy policies.`,
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] tracking-widest uppercase mb-12 transition-colors duration-200"
          style={{ color: "var(--graphite-400)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--nexus-violet)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--graphite-400)")}
        >
          <ArrowLeft size={12} /> Back to Home
        </Link>

        {/* Header */}
        <div className="mb-14" style={{ borderBottom: "1px solid var(--graphite-600)", paddingBottom: "2rem" }}>
          <p className="eyebrow mb-4">Legal</p>
          <h1
            className="font-display font-bold leading-tight mb-3"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em", color: "var(--pearl)" }}
          >
            Privacy Policy
          </h1>
          <p className="font-mono text-[0.65rem] tracking-widest uppercase" style={{ color: "var(--graphite-400)" }}>
            Last updated: March 2026
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.title}>
              <h2
                className="font-display font-bold text-lg mb-4"
                style={{ color: "var(--pearl)", letterSpacing: "-0.015em" }}
              >
                {s.title}
              </h2>
              {s.intro && (
                <p className="font-body text-sm leading-relaxed mb-3" style={{ color: "var(--graphite-300)" }}>
                  {s.intro}
                </p>
              )}
              {s.content && (
                <p className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-300)" }}>
                  {s.content}
                </p>
              )}
              {s.items && (
                <ul className="space-y-2.5 mt-3">
                  {s.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="font-mono text-xs shrink-0 mt-0.5" style={{ color: "var(--nexus-violet)" }}>—</span>
                      <span className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-300)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Contact section */}
          <section>
            <h2
              className="font-display font-bold text-lg mb-4"
              style={{ color: "var(--pearl)", letterSpacing: "-0.015em" }}
            >
              10. Contact Us
            </h2>
            <p className="font-body text-sm leading-relaxed mb-4" style={{ color: "var(--graphite-300)" }}>
              For privacy-related inquiries or to exercise your data rights:
            </p>
            <div
              className="p-6 rounded-xl text-sm"
              style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}
            >
              <p className="font-body font-semibold mb-2" style={{ color: "var(--pearl)" }}>Ripple Nexus</p>
              <p className="font-body leading-relaxed mb-3" style={{ color: "var(--graphite-400)" }}>
                Cospazes, A-116 Urbtech Trade Centre, Sec-132<br />
                Noida — 201304, India
              </p>
              <p className="font-body" style={{ color: "var(--graphite-400)" }}>
                Email:{" "}
                <a
                  href="mailto:info@theripplenexus.com"
                  className="transition-colors duration-200"
                  style={{ color: "var(--nexus-violet)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--pearl)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--nexus-violet)")}
                >
                  info@theripplenexus.com
                </a>
              </p>
              <p className="font-body mt-1" style={{ color: "var(--graphite-400)" }}>
                Phone:{" "}
                <a
                  href="tel:+917599756826"
                  className="transition-colors duration-200"
                  style={{ color: "var(--nexus-violet)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--pearl)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--nexus-violet)")}
                >
                  +91 7599 756 826
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
