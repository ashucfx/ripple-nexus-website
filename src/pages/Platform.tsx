import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import SEOHead from "@/components/SEOHead";

const BASE_URL = "https://www.theripplenexus.com";

const products = [
  {
    num: "01",
    name: "Nexus Flow",
    tagline: "Turn your ICP into an autonomous pipeline.",
    desc: "Proprietary lead qualification agents trained on your ideal customer profile. Integrates with your CRM to score, route, and engage high-intent accounts 24/7 — before a human sales rep touches them.",
    how: "RAG pipelines + intent scoring models + CRM API mesh",
    outcome: "60%+ reduction in unqualified pipeline · Demo-to-close rate improved by 30%",
    tags: ["LLM Agents", "RAG", "CRM Integration", "Intent Scoring", "OpenAI"],
    anchor: "Replaces a ₹20L/year SDR function with a ₹4L/year agent licence.",
  },
  {
    num: "02",
    name: "Nexus Command",
    tagline: "Eliminate 20+ hours of manual work per team per week.",
    desc: "End-to-end workflow automation built on open standards — n8n, Python, and your existing stack. No proprietary platform lock-in. Every workflow you own, forever.",
    how: "Custom n8n orchestration + Python RPA + API mesh integrations",
    outcome: "20+ hrs/week reclaimed · 70% reduction in manual internal operations",
    tags: ["n8n", "Python RPA", "Zapier Enterprise", "API Mesh", "Zero Lock-in"],
    anchor: "Automating 70% of internal ops increases gross margin to 65–75%.",
  },
  {
    num: "03",
    name: "Nexus Core",
    tagline: "99.9%+ uptime. 10× traffic. Zero rewrites.",
    desc: "Multi-tenant SaaS architecture engineered for scale from day one. We own the full stack — microservices, CI/CD, multi-AZ resilience, schema design — and you own 100% of the IP on delivery.",
    how: "Microservices architecture + multi-AZ deployment + predictive DevSecOps",
    outcome: "99.97% uptime SLA · 10× scale capacity · 40%+ deployment speed increase",
    tags: ["AWS", "Node.js", "PostgreSQL", "Kubernetes", "Microservices"],
    anchor: "Architecture-first prevents the costly rewrite at 100k users.",
  },
  {
    num: "04",
    name: "Nexus Intelligence",
    tagline: "Convert data silos into a live competitive moat.",
    desc: "Unified data infrastructure that eliminates gut-feeling decisions. Custom ETL pipelines, real-time streaming, and BI layers that deliver sub-100ms query response across your entire dataset.",
    how: "Kafka streaming + BigQuery/Snowflake + dbt transformation layers",
    outcome: "Sub-100ms query response · 100% data visibility · OPEX reduction from insights",
    tags: ["Kafka", "BigQuery", "Snowflake", "dbt", "Spark"],
    anchor: "Data visibility drives 15–25% efficiency gains in operations.",
  },
  {
    num: "05",
    name: "Nexus Edge",
    tagline: "Native performance. Embedded intelligence.",
    desc: "iOS and Android applications with AI features built into the architecture level — in-app agents, personalisation layers, predictive UX. Concept to App Store in under 10 weeks.",
    how: "React Native + Swift/Kotlin + on-device AI models + Edge inference",
    outcome: "10-week App Store launch · 4.8+ typical store rating · Sub-second load times",
    tags: ["React Native", "Swift", "Kotlin", "On-device AI", "Edge"],
    anchor: "Time-to-market advantage compounds quarterly.",
  },
  {
    num: "06",
    name: "Nexus Web",
    tagline: "Built to rank in AI search. Built to convert.",
    desc: "Headless, composable web platforms optimised for Core Web Vitals and AI search engine discovery. Structured for AEO, GEO, and programmatic SEO — the 2026 standard for B2B visibility.",
    how: "Next.js + Vercel Edge + headless CMS + structured AEO/GEO schema",
    outcome: "Conversion rates doubled through performance · 250%+ YoY AI referral traffic growth",
    tags: ["Next.js", "Vercel Edge", "AEO/GEO", "Headless CMS", "SEO"],
    anchor: "190%+ YoY AI referral traffic growth is the 2026 industry benchmark.",
  },
];

const comparison = [
  {
    dimension: "Ownership",
    market: "Vendor-owned workflows, proprietary platforms, lock-in by design",
    rn: "100% IP transfer on delivery — code, workflows, data, all yours",
  },
  {
    dimension: "Architecture",
    market: "Feature-obsessed builds that break at multi-tenant scale",
    rn: "Systems-first: microservices, multi-AZ, infinite horizontal scale from day one",
  },
  {
    dimension: "AI Approach",
    market: "Generic ChatGPT wrappers — same output as every competitor",
    rn: "Proprietary data pipelines — Information Gain your competitors cannot replicate",
  },
  {
    dimension: "Pricing",
    market: "Hours billed, scope creep, retainer lock-in",
    rn: "Value-based: Project Price = Annual Value × Value Capture Rate (10–25%)",
  },
  {
    dimension: "Timeline",
    market: "6-month roadmaps, 12-month builds, 18-month ROI",
    rn: "Production-deployed in 60–90 days. Verifiable ROI from day one.",
  },
];

const Platform = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: { "@type": "Organization", name: "Ripple Nexus", url: BASE_URL },
    serviceType: products.map(p => p.name),
    areaServed: "Worldwide",
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--obsidian)" }}>
      <SEOHead
        title="AI Systems & Automation Infrastructure | Ripple Nexus"
        description="Six productized AI systems: Revenue Qualification, Autonomous Operations, Scale Infrastructure, Real-Time Intelligence, AI-First Mobile, and Conversion Web Platform. Verifiable ROI. You own 100% of the IP."
        canonical={`${BASE_URL}/services`}
        schemaMarkup={schema}
      />
      <Navbar />

      <main className="pt-32 pb-24 relative z-10">

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="section-padding max-w-5xl mx-auto mb-24">
          {/* Background glow */}
          <div
            className="absolute top-0 right-0 w-1/2 h-96 pointer-events-none"
            style={{
              background: "radial-gradient(50% 50% at 80% 20%, rgba(124,92,255,0.18) 0%, rgba(10,11,20,0) 100%)",
            }}
          />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="eyebrow mb-6">System Catalogue</p>
            <div
              className="w-12 h-px mb-10"
              style={{ background: "linear-gradient(90deg, #7C5CFF 0%, #22D3EE 100%)" }}
            />
            <h1
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em", color: "var(--pearl)" }}
            >
              Six systems.<br />
              <span style={{ color: "var(--graphite-300)" }}>
                One Infrastructure.
              </span>
            </h1>
            <p className="font-body text-xl max-w-2xl leading-relaxed" style={{ color: "var(--graphite-300)" }}>
              Not generic services. Productized AI systems with defined outcomes,
              open-standard architecture, and 100% IP ownership on delivery.
            </p>
          </motion.div>
        </section>

        {/* ── COMPARISON BLOCK ────────────────────────────────────── */}
        <section className="section-padding max-w-6xl mx-auto mb-24">
          <div className="mb-12">
            <p className="eyebrow mb-6">The Ripple Nexus Difference</p>
            <h2
              className="font-display font-bold leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)", letterSpacing: "-0.025em", color: "var(--pearl)" }}
            >
              Why category leaders migrate to our architecture.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px" style={{ background: "var(--graphite-600)" }}>
            {/* Header row */}
            <div className="grid grid-cols-3 gap-px" style={{ background: "var(--graphite-600)" }}>
              <div className="p-4" style={{ background: "var(--obsidian)" }}>
                <p className="font-mono text-[0.55rem] tracking-widest uppercase" style={{ color: "var(--graphite-400)" }}>Dimension</p>
              </div>
              <div className="p-4" style={{ background: "rgba(244,63,94,0.06)" }}>
                <p className="font-mono text-[0.55rem] tracking-widest uppercase" style={{ color: "rgba(244,63,94,0.7)" }}>
                  What the market delivers
                </p>
              </div>
              <div className="p-4" style={{ background: "rgba(124,92,255,0.07)" }}>
                <p className="eyebrow">Ripple Nexus</p>
              </div>
            </div>

            {comparison.map((row, i) => (
              <motion.div
                key={row.dimension}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="grid grid-cols-3 gap-px"
                style={{ background: "var(--graphite-600)" }}
              >
                <div className="p-5 flex items-start" style={{ background: "var(--obsidian)" }}>
                  <p className="font-body text-sm font-semibold" style={{ color: "var(--pearl)" }}>{row.dimension}</p>
                </div>
                <div className="p-5 flex items-start" style={{ background: "rgba(244,63,94,0.03)" }}>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-400)" }}>{row.market}</p>
                </div>
                <div className="p-5 flex items-start" style={{ background: "rgba(124,92,255,0.04)" }}>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "var(--pearl)" }}>{row.rn}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── PRODUCT CATALOGUE ───────────────────────────────────── */}
        <section id="solutions" className="section-padding max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="eyebrow mb-6">System Breakdown</p>
            <h2
              className="font-display font-bold leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)", letterSpacing: "-0.025em", color: "var(--pearl)" }}
            >
              Each system. Every outcome.
            </h2>
          </div>

          <div className="flex flex-col gap-px" style={{ background: "var(--graphite-600)" }}>
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-px group"
                style={{ background: "var(--graphite-600)" }}
              >
                {/* Left: Number + Name */}
                <div
                  className="p-8 flex flex-col justify-between lg:col-span-1 transition-colors duration-300"
                  style={{ background: "var(--obsidian)" }}
                >
                  <div>
                    <p className="font-mono text-[0.55rem] tracking-[0.3em] uppercase mb-4" style={{ color: "var(--nexus-violet)" }}>
                      {p.num}
                    </p>
                    <h3
                      className="font-display font-bold leading-snug mb-3"
                      style={{ fontSize: "1.4rem", letterSpacing: "-0.015em", color: "var(--pearl)" }}
                    >
                      {p.name}
                    </h3>
                    <p className="font-body text-sm italic" style={{ color: "var(--graphite-400)" }}>{p.tagline}</p>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-1.5">
                    {p.tags.map(tag => (
                      <span
                        key={tag}
                        className="font-mono text-[0.55rem] px-2 py-0.5 tracking-wide rounded"
                        style={{
                          border: "1px solid rgba(124,92,255,0.2)",
                          color: "var(--graphite-300)",
                          background: "rgba(124,92,255,0.06)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Middle: Description + How */}
                <div className="p-8 lg:col-span-1" style={{ background: "var(--ink)" }}>
                  <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "var(--graphite-400)" }}>{p.desc}</p>
                  <div>
                    <p className="font-mono text-[0.55rem] tracking-widest uppercase mb-2" style={{ color: "var(--nexus-violet)" }}>
                      How we build it
                    </p>
                    <p className="font-body text-sm" style={{ color: "var(--pearl)" }}>{p.how}</p>
                  </div>
                </div>

                {/* Right: Outcome + Anchor */}
                <div className="p-8 flex flex-col justify-between lg:col-span-1" style={{ background: "var(--carbon)" }}>
                  <div>
                    <p className="font-mono text-[0.55rem] tracking-widest uppercase mb-3" style={{ color: "var(--ion-cyan)" }}>
                      Verified Outcome
                    </p>
                    <p className="font-display font-semibold text-base leading-snug mb-5" style={{ color: "var(--quantum-lime)" }}>{p.outcome}</p>
                  </div>
                  <div style={{ borderTop: "1px solid var(--graphite-600)", paddingTop: "1rem" }}>
                    <p className="font-body text-sm italic" style={{ color: "var(--graphite-400)" }}>{p.anchor}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── BOTTOM CTA ──────────────────────────────────────────── */}
        <section className="section-padding max-w-5xl mx-auto mt-24">
          <div
            className="p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 rounded-2xl"
            style={{ border: "1px solid var(--graphite-600)", background: "var(--ink)" }}
          >
            <div>
              <p className="eyebrow mb-4">Enterprise Expansions</p>
              <h2
                className="font-display font-bold leading-snug mb-3"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.02em", color: "var(--pearl)" }}
              >
                Need custom primitives?
              </h2>
              <p className="font-body text-sm max-w-lg leading-relaxed" style={{ color: "var(--graphite-400)" }}>
                We do not build from scratch. We deploy our proprietary core engine 
                and write the final 20% custom to your specific business logic.
              </p>
            </div>
            <Link
              to="/#lead-form"
              className="inline-flex items-center gap-2 font-body font-semibold text-[13px] px-8 py-3.5 shrink-0 transition-all duration-300 rounded-md"
              style={{
                background: "var(--pearl)",
                color: "var(--obsidian)",
                boxShadow: "0 4px 14px 0 rgba(255,255,255,0.1)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 20px 0 rgba(255,255,255,0.15)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "var(--pearl)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 14px 0 rgba(255,255,255,0.1)";
              }}
            >
              Initialize Integration Planning
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

      </main>

      <CtaSection />
      <Footer />
    </div>
  );
};

export default Platform;
