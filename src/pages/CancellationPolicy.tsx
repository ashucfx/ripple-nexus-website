import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Overview",
    content: `This Cancellation & Refund Policy applies to all services provided by Ripple Nexus. This policy is compliant with the Consumer Protection Act, 2019 (India) and applicable e-commerce regulations, as well as international fair trade standards.`,
  },
  {
    title: "2. Cancellation by Client",
    subsections: [
      {
        label: "Before Project Commencement",
        text: "If a client cancels before the project kickoff date, a full refund of any advance payment will be processed within 15 business days, minus any non-refundable consultation fees (if applicable).",
      },
      {
        label: "After Project Commencement",
        text: "Cancellation after project work has begun will be subject to pro-rata billing. The client will be charged for all work completed up to the date of cancellation, including any third-party costs incurred.",
      },
      {
        label: "Notice Period",
        text: "A minimum of 7 business days written notice is required for any cancellation request. Cancellation requests must be sent via email to info@theripplenexus.com.",
        email: true,
      },
    ],
  },
  {
    title: "3. Cancellation by Ripple Nexus",
    intro: "We reserve the right to cancel or suspend services if:",
    items: [
      "The client fails to make payments as per the agreed schedule",
      "The client breaches the Terms of Service or any applicable SOW",
      "Continued service delivery becomes impractical due to circumstances beyond our control (force majeure)",
    ],
    outro: "In such cases, any unused advance payments (minus work completed) will be refunded within 15 business days.",
  },
  {
    title: "4. Refund Process",
    items: [
      "Refunds will be processed to the original payment method",
      "Refund processing time: 7–15 business days from approval",
      "All refunds are subject to deduction of work already completed and any non-recoverable third-party expenses",
      "GST/tax adjustments will be handled as per applicable law",
    ],
  },
  {
    title: "5. Non-Refundable Items",
    items: [
      "Discovery/consultation sessions that have been completed",
      "Third-party software licenses, cloud infrastructure costs, or domain registrations procured on behalf of the client",
      "Custom development work that has been delivered and approved",
    ],
  },
  {
    title: "6. Dispute Resolution",
    content: `If you are dissatisfied with a refund decision, you may raise a dispute within 30 days. We will review all disputes in good faith and aim to resolve them within 15 business days. Unresolved disputes will be subject to the arbitration provisions outlined in our Terms of Service.`,
  },
];

const CancellationPolicy = () => {
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
            Cancellation & Refund Policy
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
              {s.intro && (
                <p className="font-body text-sm leading-relaxed mb-3" style={{ color: "var(--graphite-300)" }}>
                  {s.intro}
                </p>
              )}
              {s.subsections && (
                <div className="space-y-4">
                  {s.subsections.map((sub) => (
                    <div
                      key={sub.label}
                      className="p-5 rounded-xl"
                      style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}
                    >
                      <p className="font-body text-sm font-semibold mb-1.5" style={{ color: "var(--pearl)" }}>
                        {sub.label}
                      </p>
                      <p className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-400)" }}>
                        {sub.email ? (
                          <>
                            A minimum of 7 business days written notice is required for any cancellation request. Cancellation requests must be sent via email to{" "}
                            <a
                              href="mailto:info@theripplenexus.com"
                              className="transition-colors duration-200"
                              style={{ color: "var(--nexus-violet)" }}
                              onMouseEnter={e => (e.currentTarget.style.color = "var(--pearl)")}
                              onMouseLeave={e => (e.currentTarget.style.color = "var(--nexus-violet)")}
                            >
                              info@theripplenexus.com
                            </a>
                            .
                          </>
                        ) : (
                          sub.text
                        )}
                      </p>
                    </div>
                  ))}
                </div>
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
              {s.outro && (
                <p className="font-body text-sm leading-relaxed mt-3" style={{ color: "var(--graphite-300)" }}>
                  {s.outro}
                </p>
              )}
            </section>
          ))}

          {/* Contact section */}
          <section>
            <h2
              className="font-display font-bold text-lg mb-4"
              style={{ color: "var(--pearl)", letterSpacing: "-0.015em" }}
            >
              7. Contact Us
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

export default CancellationPolicy;
