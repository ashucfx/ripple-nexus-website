import { motion } from "framer-motion";
import { Code2, Database, Bot, Zap, Smartphone, Globe, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    num: "01",
    icon: Code2,
    title: "Enterprise SaaS",
    desc: "Full-stack platforms engineered for 99.9%+ uptime and 10x scale. We own your architecture end-to-end — from schema design to CI/CD.",
    tags: ["React", "Node.js", "AWS", "PostgreSQL"],
    metric: "10× scale capacity",
    span: "md:col-span-2 lg:col-span-2",
    featured: true,
  },
  {
    num: "02",
    icon: Bot,
    title: "AI & LLMs",
    desc: "Custom GenAI agents, RAG pipelines, and LLM workflows that cut manual work by 60%+. We build AI that understands your business context.",
    tags: ["OpenAI", "LangChain", "RAG", "Fine-tuning"],
    metric: "60%+ manual work eliminated",
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    num: "03",
    icon: Database,
    title: "Data Engines",
    desc: "Enterprise database architecture, real-time pipelines, and BI integrations that make every decision data-driven.",
    tags: ["Kafka", "Spark", "BigQuery", "dbt"],
    metric: "Real-time data at scale",
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    num: "04",
    icon: Smartphone,
    title: "Native Mobile",
    desc: "Cross-platform iOS & Android apps with native performance. Concept to App Store in under 10 weeks.",
    tags: ["React Native", "Swift", "Kotlin"],
    metric: "10-week launch cycle",
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    num: "05",
    icon: Globe,
    title: "Web Platforms",
    desc: "Headless CMS and composable frontends built for Core Web Vitals perfection and extreme traffic load.",
    tags: ["Next.js", "Vercel", "Sanity", "Edge"],
    metric: "Sub-100ms response",
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    num: "06",
    icon: Zap,
    title: "RPA Automation",
    desc: "Zero-latency intelligent workflows that eliminate repetitive ops. Our clients reclaim 20+ hours per week from day one.",
    tags: ["UiPath", "n8n", "Zapier", "Custom"],
    metric: "20+ hrs/week reclaimed",
    span: "md:col-span-2 lg:col-span-3",
    wide: true,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-28 bg-black border-t border-white/[0.06] relative z-10">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-primary font-semibold text-xs tracking-widest uppercase mb-4"
            >
              What We Build
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl md:text-[52px] font-display font-bold text-white tracking-tight leading-[1.05]"
            >
              Capabilities Built
              <br />
              <span className="text-gradient">for Scale.</span>
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
              className="group inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors duration-200 border border-white/10 hover:border-white/25 rounded-lg px-5 py-2.5"
            >
              View All Capabilities <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45, ease: "easeOut" }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`group flex flex-col p-7 bg-[#080810] border border-white/[0.08] rounded-2xl
                hover:border-primary/30 hover:bg-[#0d0d18]
                hover:shadow-[0_12px_48px_-12px_hsl(222_74%_48%/0.3)]
                transition-colors duration-300 cursor-pointer ${s.span} ${s.featured ? "relative overflow-hidden" : ""}`}
            >
              {/* Featured badge */}
              {s.featured && (
                <span className="absolute top-5 right-5 text-[10px] font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="flex items-start justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center border border-white/[0.07] group-hover:bg-primary/15 group-hover:border-primary/25 transition-all duration-300">
                  <s.icon size={18} className="text-white/60 group-hover:text-primary transition-colors duration-300" />
                </div>
                <span className="font-mono text-[11px] text-white/20 group-hover:text-white/40 transition-colors">
                  {s.num}
                </span>
              </div>

              <div className="mt-auto">
                <h3 className="font-display font-bold text-white text-xl tracking-tight mb-2 group-hover:text-white transition-colors">
                  {s.title}
                </h3>
                <p className="text-white/70 text-[14px] leading-relaxed mb-5">{s.desc}</p>

                {/* Outcome metric */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full bg-secondary inline-block shrink-0 shadow-[0_0_6px_rgba(63,189,139,0.7)]" />
                  <span className="text-secondary text-xs font-bold tracking-wide">{s.metric}</span>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.12] text-white/55 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
