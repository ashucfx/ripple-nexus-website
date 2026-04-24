import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Agreement to Terms",
    content: `By accessing or using the services provided by Ripple Nexus ("Company"), you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and Ripple Nexus, governed by the laws of India, including the Information Technology Act, 2000 and the Indian Contract Act, 1872, alongside applicable international trade and digital commerce regulations.`,
  },
  {
    title: "2. Services",
    content: `Ripple Nexus provides proprietary AI automation systems, autonomous operations infrastructure, agentic AI pipelines, enterprise SaaS architecture, real-time data engineering, native mobile development, and related technology services. The specific scope of services will be defined in individual Statements of Work (SOW) or service agreements.`,
  },
  {
    title: "3. Client Obligations",
    items: [
      "Provide accurate and complete information as required for service delivery",
      "Ensure timely feedback and approvals to avoid project delays",
      "Maintain confidentiality of any proprietary tools, methodologies, or materials shared",
      "Comply with all applicable laws and regulations in your jurisdiction",
    ],
  },
  {
    title: "4. Intellectual Property",
    content: `All intellectual property created during the engagement — including code, workflows, data pipelines, and AI agent configurations — shall be assigned to the client upon full payment, as explicitly stated in the SOW. Pre-existing IP, frameworks, and tools of Ripple Nexus remain the sole property of the Company. Ripple Nexus retains the right to use anonymized project details for portfolio and marketing purposes.`,
  },
  {
    title: "5. Payment Terms",
    content: `Payment terms, including fees, milestones, and due dates, will be specified in the applicable SOW or invoice. All payments are due within 15 days of invoice date unless otherwise agreed. Late payments may incur interest at 1.5% per month. All fees are exclusive of applicable taxes (GST/VAT) unless stated otherwise.`,
  },
  {
    title: "6. Confidentiality",
    content: `Both parties agree to maintain the confidentiality of all proprietary information shared during the engagement. This obligation survives the termination of services for a period of 3 years.`,
  },
  {
    title: "7. Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, Ripple Nexus shall not be liable for indirect, incidental, consequential, or punitive damages. Our total liability shall not exceed the amount paid by the client for the specific service giving rise to the claim.`,
  },
  {
    title: "8. Dispute Resolution",
    content: `Any disputes arising from these terms shall be first resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration under the Arbitration and Conciliation Act, 1996 (India), with the seat of arbitration in Noida, Uttar Pradesh, India. The language of arbitration shall be English.`,
  },
  {
    title: "9. Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of India. The courts of Noida, Uttar Pradesh shall have exclusive jurisdiction over any matters not subject to arbitration.`,
  },
  {
    title: "10. Amendments",
    content: `We reserve the right to modify these Terms at any time. Changes become effective upon posting to this page. Continued use of our services after changes constitutes acceptance of the modified terms.`,
  },
];

const TermsOfService = () => {
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
            Terms of Service
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
              {s.content && (
                <p className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-300)" }}>
                  {s.content}
                </p>
              )}
              {s.items && (
                <ul className="space-y-2.5">
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
              11. Contact
            </h2>
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
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
