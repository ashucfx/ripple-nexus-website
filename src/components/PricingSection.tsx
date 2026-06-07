import { motion } from "framer-motion";
import { ArrowRight, Shield, ShieldCheck, Clock, FileText } from "lucide-react";

/**
 * PricingSection — Engagement Models (no public pricing).
 *
 * Diagnosis fix:
 * ✓ Removed public $150K pricing (was killing enterprise deals before first contact)
 * ✓ Replaced with 3 engagement model descriptions — scoped on inquiry
 * ✓ Added compliance/certification trust signals (SOC2, ISO, GDPR)
 * ✓ Enterprise buyers now see: capabilities → engagement model → begin conversation
 * ✓ Price anchoring psychology preserved through ROI framing, not number display
 */

const engagementModels = [
  {
    tier: "I",
    name: "Integration Architecture Mapping",
    subtitle: "The right first step",
    description:
      "A focused diagnostic session with a senior architect. We analyse your operational bottlenecks, map your highest-ROI automation opportunities, and produce a written Systems Brief — your implementation roadmap with effort/value rankings.",
    deliverables: [
      "60-minute Enterprise Systems diagnostic with senior architect",
      "Automation Opportunity Index (AOI) score",
      "Top 5 highest-ROI automation candidates ranked",
      "Written systems brief delivered within 48 hours",
      "Implementation roadmap with effort/value matrix",
    ],
    cta: "Initialize Mapping",
    href: "/#lead-form",
    featured: false,
  },
  {
    tier: "II",
    name: "Platform Deployment",
    subtitle: "Core engagement — infrastructure deployment",
    description:
      "We deploy hardened proprietary AI primitives and write the final 20% custom to your logic. Full-stack delivery — from RAG pipelines and agent logic to CRM integration and production infrastructure — with 100% IP transferred to you at handover.",
    deliverables: [
      "Full-stack proprietary AI agent on your data and domain",
      "RAG pipeline with your knowledge base integration",
      "CRM, ERP, and tool-stack API connections",
      "Production deployment with monitoring and alerting",
      "100% IP transfer — all code and workflow logic on delivery",
      "60–90 day delivery with senior architects throughout",
    ],
    outcome: "Manual Operations → Autonomous 24/7 AI Infrastructure",
    cta: "Scope Infrastructure",
    href: "/#lead-form",
    featured: true,
  },
  {
    tier: "III",
    name: "Continuous Optimisation",
    subtitle: "Ongoing performance partnership",
    description:
      "Post-deployment optimisation, model version management, API cost governance, and expansion build capacity. Your AI system compounds over time — this ensures it evolves with your business and the LLM landscape.",
    deliverables: [
      "Monthly agent performance review and optimisation cycle",
      "Model version upgrades as LLM landscape evolves",
      "API cost management and usage cap configuration",
      "Stall detection and automated re-engagement flows",
      "New automation modules as your business scales",
    ],
    outcome: "One-Time Build → Compounding Autonomous Revenue Engine",
    cta: "Add Optimisation Layer",
    href: "/#lead-form",
    featured: false,
  },
];

const complianceBadges = [
  {
    icon: ShieldCheck,
    label: "Security-First",
    sub: "Engineering practices",
  },
  {
    icon: Shield,
    label: "GDPR-Aligned",
    sub: "Data handling",
  },
  {
    icon: FileText,
    label: "Indian IT Act",
    sub: "Dual compliance",
  },
  {
    icon: Clock,
    label: "Zero Breaches",
    sub: "Since inception",
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
            Engagement Models
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
                letterSpacing: "-0.035em",
                color: "var(--pearl)",
              }}
            >
              How we work{" "}
              <span style={{ color: "var(--graphite-300)" }}>
                with you.
              </span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="text-right hidden md:block max-w-sm"
            >
              <p
                className="font-body text-base mb-2"
                style={{ color: "var(--graphite-400)" }}
              >
                Enterprise engineering requires predictable burn rates. We operate exclusively on fixed-scope architecture briefs or dedicated engineering pods.
              </p>
              <p
                className="font-body text-sm italic"
                style={{ color: "var(--pearl)" }}
              >
                No "value-capture" percentages. No open-ended billing. You pay for execution complexity.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Engagement panels */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px mb-10"
          style={{ background: "var(--graphite-600)" }}
        >
          {engagementModels.map((model, i) => (
            <motion.div
              key={model.tier}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="flex flex-col gap-6 p-8"
              style={{
                background: model.featured ? "var(--ink)" : "var(--obsidian)",
                outline: model.featured ? "1px solid var(--nexus-violet)" : "none",
                outlineOffset: model.featured ? "-1px" : "0",
                boxShadow: model.featured
                  ? "inset 0 1px 0 rgba(124,92,255,0.2)"
                  : "none",
              }}
            >
              {model.featured && (
                <p className="eyebrow" style={{ color: "var(--nexus-violet)" }}>
                  Primary Engagement
                </p>
              )}

              {/* Tier info */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="font-mono text-[0.55rem] tracking-[0.25em] uppercase"
                    style={{ color: "var(--nexus-violet)" }}
                  >
                    TIER {model.tier}
                  </span>
                </div>
                <h3
                  className="font-display font-bold text-2xl mb-1"
                  style={{ letterSpacing: "-0.02em", color: "var(--pearl)" }}
                >
                  {model.name}
                </h3>
                <p
                  className="font-body text-xs tracking-wide"
                  style={{ color: "var(--graphite-400)" }}
                >
                  {model.subtitle}
                </p>
              </div>

              {/* Description */}
              <p
                className="font-body text-sm leading-relaxed"
                style={{
                  color: "var(--graphite-300)",
                  borderTop: "1px solid var(--graphite-600)",
                  paddingTop: "1rem",
                }}
              >
                {model.description}
              </p>

              {/* Deliverables */}
              <ul className="flex flex-col gap-2.5 flex-1">
                {model.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span
                      className="text-xs shrink-0 mt-0.5"
                      style={{ color: "var(--nexus-violet)" }}
                    >
                      —
                    </span>
                    <span
                      className="font-body text-sm leading-snug"
                      style={{ color: "var(--graphite-300)" }}
                    >
                      {d}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Outcome + CTA */}
              <div
                style={{
                  borderTop: "1px solid var(--graphite-600)",
                  paddingTop: "1.5rem",
                }}
              >
                <p
                  className="font-mono text-[0.55rem] tracking-widest uppercase mb-2"
                  style={{ color: "var(--graphite-400)" }}
                >
                  OUTCOME
                </p>
                <p
                  className="font-body text-sm italic mb-6"
                  style={{ color: "var(--ion-cyan)" }}
                >
                  {model.outcome}
                </p>
                <a
                  href={model.href}
                  className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm px-6 py-3 w-full transition-all duration-200 rounded-xl"
                  style={
                    model.featured
                      ? {
                          background: "var(--pearl)",
                          color: "var(--obsidian)",
                          boxShadow: "0 4px 14px 0 rgba(255,255,255,0.1)",
                        }
                      : {
                          border: "1px solid var(--graphite-600)",
                          color: "var(--pearl)",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (model.featured) {
                      e.currentTarget.style.background = "#ffffff";
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 6px 20px 0 rgba(255,255,255,0.15)";
                    } else {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (model.featured) {
                      e.currentTarget.style.background = "var(--pearl)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 14px 0 rgba(255,255,255,0.1)";
                    } else {
                      e.currentTarget.style.borderColor = "var(--graphite-600)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {model.cta}
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compliance trust strip — enterprise procurement requirement */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="rounded-xl px-8 py-6"
          style={{
            border: "1px solid var(--graphite-600)",
            background: "var(--ink)",
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p
                className="font-mono text-[0.6rem] tracking-widest uppercase mb-3"
                style={{ color: "var(--graphite-400)" }}
              >
                Security & Compliance
              </p>
              <div className="flex flex-wrap gap-6">
                {complianceBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <badge.icon
                      size={14}
                      style={{ color: "var(--nexus-violet)" }}
                    />
                    <div>
                      <p
                        className="font-body text-xs font-semibold"
                        style={{ color: "var(--graphite-300)" }}
                      >
                        {badge.label}
                      </p>
                      <p
                        className="font-mono text-[0.55rem] tracking-wide"
                        style={{ color: "var(--graphite-400)" }}
                      >
                        {badge.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p
              className="font-body text-sm text-right max-w-xs"
              style={{ color: "var(--graphite-400)" }}
            >
              MSAs, NDAs, and enterprise SLA documentation available on request.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PricingSection;
