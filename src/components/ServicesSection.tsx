import { motion } from "framer-motion";
import ArchitectureDiagram from "./ArchitectureDiagram";
import TelemetryLog from "./TelemetryLog";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    num: "01",
    name: "Autonomous Lead Flow",
    desc: "Autonomous lead qualification agents trained on your ICP. Replaces manual SDR workflows with 24/7 AI that identifies, scores, and routes high-intent accounts — before a human touches them.",
    outcome: "60%+ reduction in unqualified pipeline",
    tags: ["LLM Agents", "RAG", "CRM Integration", "Intent Scoring"],
    span: "md:col-span-2",
  },
  {
    num: "02",
    name: "Workflow Automation",
    desc: "End-to-end workflow automation that eliminates the manual handoffs killing your team's bandwidth. Custom-built on n8n, Python, and your existing stack — not locked into a SaaS platform.",
    outcome: "20+ hrs/week reclaimed per team",
    tags: ["n8n", "Python RPA", "API Mesh", "Zero Vendor Lock-in"],
    span: "md:col-span-1",
  },
  {
    num: "03",
    name: "SaaS Architecture Core",
    desc: "Multi-tenant SaaS architecture engineered for 10× growth without a rewrite. We own the full stack — CI/CD, schema design, multi-AZ resilience — from day one.",
    outcome: "99.9%+ uptime · 10× scale capacity",
    tags: ["AWS", "Node.js", "PostgreSQL", "Microservices"],
    span: "md:col-span-1",
  },
  {
    num: "04",
    name: "Real-Time Intelligence",
    desc: "Unified data infrastructure that converts fragmented silos into a live decision engine. Sub-100ms query response across your entire business dataset.",
    outcome: "Sub-100ms · 100% data visibility",
    tags: ["Kafka", "BigQuery", "dbt", "Snowflake"],
    span: "md:col-span-1",
  },
  {
    num: "05",
    name: "AI-First Mobile Edge",
    desc: "Native iOS and Android apps with embedded AI features — in-app agents, personalization layers, and predictive UX built in from the architecture level.",
    outcome: "App Store launch in 10 weeks",
    tags: ["React Native", "Swift", "On-device AI", "Edge"],
    span: "md:col-span-1",
  },
  {
    num: "06",
    name: "High-Performance Web",
    desc: "Headless, composable web platforms optimised for Core Web Vitals and AI search engine discovery. Structured for AEO, GEO, and programmatic SEO at scale.",
    outcome: "Conversion rates doubled through performance",
    tags: ["Next.js", "Vercel Edge", "AEO/GEO", "Headless CMS"],
    span: "md:col-span-3",
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
              Six Capabilities.{" "}
              <span style={{ color: "var(--graphite-300)" }}>
                One Standard.
              </span>
            </motion.h2>
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className={`flex flex-col p-8 rounded-xl border border-white/5 bg-[#12141c] hover:border-white/10 transition-colors duration-300 ${p.span}`}
            >
              {/* Terminal-style Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-sm bg-white/20" />
                  <div className="w-2 h-2 rounded-sm bg-white/20" />
                </div>
                <span className="font-mono text-[0.65rem] tracking-widest uppercase text-white/40">
                  SYS.MOD.{p.num}
                </span>
              </div>

              <h3 className="font-display font-semibold text-xl leading-snug mb-3 text-white">
                {p.name}
              </h3>
              <p className="font-body text-sm leading-relaxed text-white/60 mb-8">
                {p.desc}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.65rem] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Outcome metric - System Status style */}
              <div className="pt-5 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                  <span className="font-mono text-[0.6rem] text-white/40 uppercase tracking-widest">
                    Verified Target
                  </span>
                </div>
                <span className="font-mono text-xs font-medium text-white/80">
                  {p.outcome}
                </span>
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
          className="mt-8 px-8 py-6 rounded-xl"
          style={{ border: "1px solid var(--graphite-600)", background: "var(--ink)" }}
        >
          <p className="font-body text-base italic" style={{ color: "var(--graphite-300)" }}>
            We do not build from scratch. We deploy hardened Nexus Primitives and write the final 20% custom to your business logic. 100% IP transferred on delivery.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesSection;
