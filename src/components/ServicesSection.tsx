import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    num: "01",
    name: "AI Revenue Qualification System",
    desc: "Autonomous lead qualification agents trained on your ICP. Replaces manual SDR workflows with 24/7 AI that identifies, scores, and routes high-intent accounts — before a human touches them.",
    outcome: "60%+ reduction in unqualified pipeline",
    tags: ["LLM Agents", "RAG", "CRM Integration", "Intent Scoring"],
    span: "md:col-span-2",
  },
  {
    num: "02",
    name: "Autonomous Operations Engine",
    desc: "End-to-end workflow automation that eliminates the manual handoffs killing your team's bandwidth. Custom-built on n8n, Python, and your existing stack — not locked into a SaaS platform.",
    outcome: "20+ hrs/week reclaimed per team",
    tags: ["n8n", "Python RPA", "API Mesh", "Zero Vendor Lock-in"],
    span: "md:col-span-1",
  },
  {
    num: "03",
    name: "Scale Infrastructure System",
    desc: "Multi-tenant SaaS architecture engineered for 10× growth without a rewrite. We own the full stack — CI/CD, schema design, multi-AZ resilience — from day one.",
    outcome: "99.9%+ uptime · 10× scale capacity",
    tags: ["AWS", "Node.js", "PostgreSQL", "Microservices"],
    span: "md:col-span-1",
  },
  {
    num: "04",
    name: "Real-Time Intelligence Hub",
    desc: "Unified data infrastructure that converts fragmented silos into a live decision engine. Sub-100ms query response across your entire business dataset.",
    outcome: "Sub-100ms · 100% data visibility",
    tags: ["Kafka", "BigQuery", "dbt", "Snowflake"],
    span: "md:col-span-1",
  },
  {
    num: "05",
    name: "AI-First Mobile Platform",
    desc: "Native iOS and Android apps with embedded AI features — in-app agents, personalization layers, and predictive UX built in from the architecture level.",
    outcome: "App Store launch in 10 weeks",
    tags: ["React Native", "Swift", "On-device AI", "Edge"],
    span: "md:col-span-1",
  },
  {
    num: "06",
    name: "Conversion Web Platform",
    desc: "Headless, composable web platforms optimised for Core Web Vitals and AI search engine discovery. Structured for AEO, GEO, and programmatic SEO at scale.",
    outcome: "Conversion rates doubled through performance",
    tags: ["Next.js", "Vercel Edge", "AEO/GEO", "Headless CMS"],
    span: "md:col-span-2",
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="py-28 relative z-10"
      style={{ borderTop: "1px solid var(--graphite-600)" }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow mb-5"
            >
              What We Build
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-display font-bold leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", color: "var(--pearl)" }}
            >
              Six systems.{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #7C5CFF 0%, #B794FF 55%, #22D3EE 100%)" }}
              >
                One objective.
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-sm font-body font-medium transition-all duration-200 px-5 py-2.5 rounded-xl"
              style={{
                border: "1px solid var(--graphite-600)",
                color: "var(--graphite-300)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(124,92,255,0.5)";
                e.currentTarget.style.color = "var(--pearl)";
                e.currentTarget.style.background = "rgba(124,92,255,0.06)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--graphite-600)";
                e.currentTarget.style.color = "var(--graphite-300)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Full System Catalogue
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--graphite-600)" }}>
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className={`flex flex-col p-8 group transition-colors duration-300 ${p.span}`}
              style={{ background: "var(--obsidian)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--ink)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--obsidian)")}
            >
              {/* Number */}
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase" style={{ color: "var(--nexus-violet)" }}>
                  {p.num}
                </span>
              </div>

              <h3
                className="font-display font-semibold text-xl leading-snug mb-3"
                style={{ letterSpacing: "-0.015em", color: "var(--pearl)" }}
              >
                {p.name}
              </h3>
              <p className="font-body text-sm leading-relaxed flex-1 mb-6" style={{ color: "var(--graphite-400)" }}>
                {p.desc}
              </p>

              {/* Outcome metric */}
              <div
                className="flex items-center gap-2 mb-5"
                style={{ borderTop: "1px solid var(--graphite-600)", paddingTop: "1.25rem" }}
              >
                <span className="font-mono text-[0.55rem] tracking-widest uppercase" style={{ color: "var(--ion-cyan)" }}>
                  Outcome
                </span>
                <span className="w-px h-3" style={{ background: "var(--graphite-600)" }} />
                <span className="font-mono text-sm font-medium" style={{ color: "var(--quantum-lime)" }}>
                  {p.outcome}
                </span>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.6rem] px-2 py-0.5 tracking-wide rounded"
                    style={{
                      background: "rgba(124,92,255,0.06)",
                      border: "1px solid rgba(124,92,255,0.2)",
                      color: "var(--graphite-300)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom signal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-6 rounded-xl"
          style={{ border: "1px solid var(--graphite-600)", background: "var(--ink)" }}
        >
          <p className="font-body text-base italic" style={{ color: "var(--graphite-300)" }}>
            All systems are built on open standards — you own 100% of the IP, code, and workflow logic.
          </p>
          <a
            href="/#rns-scheduler"
            className="group inline-flex items-center gap-2 font-body font-semibold text-sm px-6 py-3 shrink-0 transition-all duration-200 rounded-xl"
            style={{
              background: "var(--nexus-violet)",
              color: "#fff",
              boxShadow: "0 8px 32px -4px rgba(124,92,255,0.4)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "var(--violet-hover)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "var(--nexus-violet)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Audit My Stack
            <ArrowUpRight size={14} />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesSection;
