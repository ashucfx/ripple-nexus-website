import { motion } from "framer-motion";
import { Code2, Database, Bot, Zap, Smartphone, Globe, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Enterprise SaaS",
    desc: "Full-stack platforms engineered for 99.9%+ uptime and 10x scale. We own your architecture end-to-end — from schema design to CI/CD.",
    span: "md:col-span-2 lg:col-span-2",
  },
  {
    icon: Bot,
    title: "AI & LLMs",
    desc: "Custom GenAI agents, RAG pipelines, and LLM workflows that cut manual work by 60%+.",
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    icon: Database,
    title: "Data Engines",
    desc: "Enterprise database architecture, real-time pipelines, and BI integrations that make every decision data-driven.",
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    icon: Smartphone,
    title: "Native Mobile",
    desc: "Cross-platform iOS & Android apps with native performance. Concept to App Store in under 10 weeks.",
    span: "md:col-span-2 lg:col-span-1",
  },
  {
    icon: Globe,
    title: "Web Platforms",
    desc: "Headless CMS and composable frontends built for Core Web Vitals perfection and extreme load.",
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    icon: Zap,
    title: "RPA Automation",
    desc: "Zero-latency intelligent workflows that eliminate repetitive ops. Our clients reclaim 20+ hours per week from day one.",
    span: "md:col-span-2 lg:col-span-3",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-32 bg-black border-t border-white/5 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white mb-4 tracking-tight">Capabilities.</h2>
          <p className="text-xl text-white/65 max-w-2xl">Architectural clarity across the modern stack.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group flex flex-col p-8 bg-[#0a0a0a] border border-white/10 rounded-2xl
                hover:border-primary/30 hover:bg-[#0d0d16]
                hover:shadow-[0_8px_40px_-12px_hsl(222_74%_48%/0.3)]
                transition-colors duration-300 cursor-pointer ${s.span}`}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                  <s.icon size={18} className="group-hover:text-primary transition-colors duration-300" />
                </div>
                <ArrowRight size={16} className="text-white/25 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
              </div>

              <div className="mt-auto">
                <h3 className="font-display font-semibold text-white text-xl tracking-tight mb-2 group-hover:text-white transition-colors">{s.title}</h3>
                <p className="text-white/65 text-[15px] leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
