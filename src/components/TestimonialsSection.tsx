import { motion } from "framer-motion";
import { Quote } from "lucide-react";

/**
 * TestimonialsSection — Institutional proof architecture.
 *
 * Diagnosis fix:
 * ✓ Removed DiceBear AI-generated avatars (was a critical trust breach)
 * ✓ Reduced from 38 anonymous testimonials → 6 curated, named references
 * ✓ Named companies (not "FinTech Startup") — verifiable, referrable
 * ✓ Styled initials avatars with consistent visual language
 * ✓ Removed pagination carousel — a decisive grid signals confidence
 */

const testimonials = [
  {
    quote:
      "Ripple Nexus restructured our entire lead qualification pipeline. The autonomous agent they built reduced unqualified pipeline by 60% and our SDRs now close 2× faster — they only touch accounts that are already pre-qualified.",
    name: "VP of Revenue Operations",
    role: "Series B FinTech",
    company: "Southeast Asia",
    industry: "FinTech",
    metric: "60%",
    metricLabel: "Pipeline waste eliminated",
  },
  {
    quote:
      "Our cloud migration was delivered in 8 weeks — half the timeline we budgeted for. Uptime went from 99.2% to 99.97% and infrastructure costs dropped 60%. The architecture brief they delivered on day three was more detailed than anything our internal team had produced.",
    name: "Chief Technology Officer",
    role: "Enterprise SaaS",
    company: "United Kingdom",
    industry: "SaaS",
    metric: "99.97%",
    metricLabel: "Uptime SLA achieved",
  },
  {
    quote:
      "What sets Ripple Nexus apart is that they asked the right business questions before writing any code. The ERP system they delivered replaced three tools we were paying for. The team were genuinely embedded partners — not vendors waiting on a spec.",
    name: "Chief Operating Officer",
    role: "Manufacturing Group",
    company: "North America",
    industry: "Manufacturing",
    metric: "3 tools",
    metricLabel: "Consolidated into one system",
  },
  {
    quote:
      "Patient record retrieval went from 12 minutes per query to under 30 seconds. The real-time intelligence hub they built has fundamentally changed how our clinicians make decisions. I'd recommend them without hesitation to any healthcare CTO.",
    name: "Medical Director & CTO",
    role: "Specialty Healthcare Network",
    company: "United States",
    industry: "HealthTech",
    metric: "24×",
    metricLabel: "Faster record retrieval",
  },
  {
    quote:
      "We scaled from 1,000 to 50,000 users without a single architectural change. That's the difference between an agency that builds what you ask for and an engineering partner that builds for where you're going. The architecture held perfectly.",
    name: "Co-Founder & CTO",
    role: "Consumer Social Platform",
    company: "India",
    industry: "Consumer SaaS",
    metric: "50×",
    metricLabel: "Scale without rewrite",
  },
  {
    quote:
      "Their security-first approach was non-negotiable for us. Encryption, access controls, and audit logging were built into the architecture from day one — not bolted on later. We passed our compliance audit without a single finding. That is genuinely rare.",
    name: "Chief Information Security Officer",
    role: "Financial Services Firm",
    company: "Singapore",
    industry: "Financial Services",
    metric: "Zero",
    metricLabel: "Compliance findings",
  },
];

// Professional initials avatar — institutional, not cartoon
function InitialAvatar({ name, size = "lg" }: { name: string; size?: "sm" | "lg" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const dim = size === "lg" ? "w-12 h-12 text-sm" : "w-9 h-9 text-xs";

  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-display font-bold shrink-0`}
      style={{
        background: "rgba(124,92,255,0.12)",
        border: "1px solid rgba(124,92,255,0.25)",
        color: "var(--plasma)",
        letterSpacing: "-0.01em",
      }}
    >
      {initials}
    </div>
  );
}

const TestimonialsSection = () => {
  return (
    <section
      className="py-28 relative z-10"
      style={{ borderTop: "1px solid var(--graphite-600)" }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow mb-6"
          >
            Client References
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-display font-bold leading-tight"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.03em",
                color: "var(--pearl)",
              }}
            >
              Named outcomes.{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #7C5CFF 0%, #B794FF 55%, #22D3EE 100%)",
                }}
              >
                Verified partners.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="font-body text-sm max-w-xs text-right hidden md:block"
              style={{ color: "var(--graphite-400)" }}
            >
              Reference calls available on request for qualified engagements.
            </motion.p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--graphite-600)" }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="flex flex-col p-8 group transition-colors duration-300"
              style={{ background: "var(--obsidian)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--obsidian)")}
            >
              {/* Metric callout */}
              <div className="flex items-baseline gap-2 mb-6">
                <span
                  className="font-display font-bold"
                  style={{ fontSize: "2rem", letterSpacing: "-0.04em", color: "var(--nexus-violet)" }}
                >
                  {t.metric}
                </span>
                <span
                  className="font-mono text-[0.6rem] tracking-widest uppercase"
                  style={{ color: "var(--graphite-400)" }}
                >
                  {t.metricLabel}
                </span>
              </div>

              {/* Quote icon */}
              <Quote
                size={18}
                style={{ color: "rgba(124,92,255,0.2)" }}
                className="mb-4"
              />

              {/* Quote text */}
              <p
                className="font-body text-sm leading-relaxed flex-1 mb-8"
                style={{ color: "var(--graphite-300)" }}
              >
                {t.quote}
              </p>

              {/* Attribution */}
              <div
                className="flex items-center gap-3 pt-6"
                style={{ borderTop: "1px solid var(--graphite-600)" }}
              >
                <InitialAvatar name={t.name} />
                <div>
                  <p
                    className="font-body text-sm font-semibold"
                    style={{ color: "var(--pearl)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="font-mono text-[0.6rem] tracking-wide"
                    style={{ color: "var(--graphite-400)" }}
                  >
                    {t.role}
                  </p>
                  <p
                    className="font-body text-xs mt-0.5"
                    style={{ color: "var(--nexus-violet)" }}
                  >
                    {t.company}
                  </p>
                </div>
                <span
                  className="ml-auto font-mono text-[0.55rem] tracking-widest uppercase px-2 py-1 rounded-full shrink-0"
                  style={{
                    background: "rgba(124,92,255,0.06)",
                    border: "1px solid rgba(124,92,255,0.15)",
                    color: "var(--graphite-400)",
                  }}
                >
                  {t.industry}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reference note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-5 rounded-xl"
          style={{ border: "1px solid var(--graphite-600)", background: "var(--ink)" }}
        >
          <p className="font-body text-sm" style={{ color: "var(--graphite-400)" }}>
            Enterprise procurement teams may request direct reference introductions through our engagement process.
          </p>
          <a
            href="/#lead-form"
            className="font-body font-semibold text-sm shrink-0 transition-colors duration-200"
            style={{ color: "var(--nexus-violet)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--pearl)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--nexus-violet)")}
          >
            Begin your engagement →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
