import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const tiers = [
  {
    tier: "I",
    name: "AI Readiness Audit",
    subtitle: "Start here",
    price: "$5,000 – $15,000",
    priceINR: "₹2L – ₹6.5L",
    anchor: "Anchored against $50K–$300K (₹40L–₹2.5Cr) annual automation ROI.",
    deliverables: [
      "60-minute AI systems diagnostic",
      "Automation Opportunity Index (AOI) score",
      "Top 5 highest-ROI automation candidates",
      "Implementation roadmap with effort/value matrix",
      "Your three highest-leverage AI investments in 90 days",
    ],
    transformation: "Uncertainty → Clarity on your automation ROI potential",
    href: "/#rns-scheduler",
    cta: "Request Audit",
    featured: false,
  },
  {
    tier: "II",
    name: "Custom AI Agent Build",
    subtitle: "Primary engagement — most popular",
    price: "$20,000 – $150,000",
    priceINR: "₹8L – ₹75L",
    anchor: "Anchored against 10–25% of the annual value the system creates.",
    deliverables: [
      "Full-stack proprietary AI agent, built on your data",
      "RAG pipeline with your knowledge base integration",
      "CRM, ERP, and tool-stack API connections",
      "Production deployment with monitoring and alerting",
      "IP transfer — 100% code ownership on delivery",
      "60–90 day delivery · senior engineers throughout",
    ],
    transformation: "Manual Operations → Autonomous, 24/7 AI Infrastructure",
    href: "/#rns-scheduler",
    cta: "Scope My Build",
    featured: true,
  },
  {
    tier: "III",
    name: "Agent License & Retainer",
    subtitle: "Ongoing performance layer",
    price: "$1,500 – $5,000 / mo",
    priceINR: "₹60K – ₹2L / month",
    anchor: "Covers ongoing model upgrades, API costs, monitoring, and expansion builds.",
    deliverables: [
      "Monthly agent performance review and optimisation",
      "Model version upgrades as LLM landscape evolves",
      "API cost management and usage cap configuration",
      "Stall detection and automated re-engagement flows",
      "New automation modules as your business scales",
    ],
    transformation: "One-Time Build → Compounding Autonomous Revenue Engine",
    href: "/#rns-scheduler",
    cta: "Add License",
    featured: false,
  },
];

const PricingSection = () => {
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
            Agent Licensing Model
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-display font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.035em", color: "var(--pearl)" }}
          >
            Three tiers.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #7C5CFF 0%, #B794FF 55%, #22D3EE 100%)" }}
            >
              One system.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="font-body text-lg max-w-2xl"
            style={{ color: "var(--graphite-300)" }}
          >
            Every price is anchored against a provable automation ROI — not the cost of
            the service. This is a return-on-investment decision, not an expense.
          </motion.p>
        </div>

        {/* Pricing panels */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: "var(--graphite-600)" }}
        >
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="flex flex-col gap-6 p-8"
              style={{
                background: tier.featured ? "var(--ink)" : "var(--obsidian)",
                outline: tier.featured ? "1px solid var(--nexus-violet)" : "none",
                outlineOffset: tier.featured ? "-1px" : "0",
                boxShadow: tier.featured ? "inset 0 1px 0 rgba(124,92,255,0.2)" : "none",
              }}
            >
              {tier.featured && (
                <p className="eyebrow" style={{ color: "var(--nexus-violet)" }}>Most Popular</p>
              )}

              {/* Tier info */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[0.55rem] tracking-[0.25em] uppercase" style={{ color: "var(--nexus-violet)" }}>
                    TIER {tier.tier}
                  </span>
                </div>
                <h3
                  className="font-display font-bold text-2xl mb-1"
                  style={{ letterSpacing: "-0.02em", color: "var(--pearl)" }}
                >
                  {tier.name}
                </h3>
                <p className="font-body text-xs tracking-wide" style={{ color: "var(--graphite-400)" }}>{tier.subtitle}</p>
              </div>

              {/* Price */}
              <div style={{ borderTop: "1px solid var(--graphite-600)", paddingTop: "1rem" }}>
                <p className="font-display font-bold text-2xl" style={{ color: "var(--pearl)" }}>{tier.price}</p>
                <p className="font-body text-sm italic mt-0.5" style={{ color: "var(--graphite-400)" }}>{tier.priceINR}</p>
                <p className="font-body text-xs leading-relaxed mt-3" style={{ color: "var(--graphite-400)" }}>{tier.anchor}</p>
              </div>

              {/* Deliverables */}
              <ul className="flex flex-col gap-2.5 flex-1">
                {tier.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="text-xs shrink-0 mt-0.5" style={{ color: "var(--nexus-violet)" }}>—</span>
                    <span className="font-body text-sm leading-snug" style={{ color: "var(--graphite-300)" }}>{d}</span>
                  </li>
                ))}
              </ul>

              {/* Outcome + CTA */}
              <div style={{ borderTop: "1px solid var(--graphite-600)", paddingTop: "1.5rem" }}>
                <p className="font-mono text-[0.55rem] tracking-widest uppercase mb-2" style={{ color: "var(--graphite-400)" }}>
                  TRANSFORMATION
                </p>
                <p className="font-body text-sm italic mb-6" style={{ color: "var(--ion-cyan)" }}>
                  {tier.transformation}
                </p>
                <a
                  href={tier.href}
                  className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm px-6 py-3 w-full transition-all duration-200 rounded-xl"
                  style={
                    tier.featured
                      ? {
                          background: "var(--nexus-violet)",
                          color: "#fff",
                          boxShadow: "0 8px 32px -4px rgba(124,92,255,0.45)",
                        }
                      : {
                          border: "1px solid var(--graphite-600)",
                          color: "var(--pearl)",
                        }
                  }
                  onMouseEnter={e => {
                    if (tier.featured) {
                      e.currentTarget.style.background = "var(--violet-hover)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    } else {
                      e.currentTarget.style.borderColor = "rgba(124,92,255,0.5)";
                      e.currentTarget.style.background = "rgba(124,92,255,0.06)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (tier.featured) {
                      e.currentTarget.style.background = "var(--nexus-violet)";
                      e.currentTarget.style.transform = "translateY(0)";
                    } else {
                      e.currentTarget.style.borderColor = "var(--graphite-600)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {tier.cta}
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Free entry nudge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="font-body text-sm" style={{ color: "var(--graphite-400)" }}>
            Not sure where to start?{" "}
            <a
              href="#lead-form"
              className="transition-colors duration-200 underline underline-offset-2"
              style={{ color: "var(--nexus-violet)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--pearl)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--nexus-violet)")}
            >
              Send a message
            </a>
            {" "}— we'll map the right entry point for your business in 24 hours.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default PricingSection;
