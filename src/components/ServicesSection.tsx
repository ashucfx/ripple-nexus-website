import { motion } from "framer-motion";
import { Code2, Database, Bot, Zap, Smartphone, Globe, ArrowRight } from "lucide-react";

const services = [
  { icon: Code2, title: "Enterprise SaaS", desc: "Resilient applications tailored to your specific tech stack.", span: "md:col-span-2 lg:col-span-2" },
  { icon: Bot, title: "AI & LLMs", desc: "Custom GenAI and automation.", span: "md:col-span-1 lg:col-span-1" },
  { icon: Database, title: "Data Engines", desc: "Enterprise database architecture & integrations.", span: "md:col-span-1 lg:col-span-1" },
  { icon: Smartphone, title: "Native Mobile", desc: "High-performance cross-platform solutions.", span: "md:col-span-2 lg:col-span-1" },
  { icon: Globe, title: "Web Platforms", desc: "Headless CMS for extreme performance.", span: "md:col-span-1 lg:col-span-1" },
  { icon: Zap, title: "RPA Automation", desc: "Zero-latency workflows.", span: "md:col-span-2 lg:col-span-3" },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-32 bg-black border-t border-white/5 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white mb-4 tracking-tight">Capabilities.</h2>
          <p className="text-xl text-white/50 max-w-2xl font-light">Architectural clarity across the modern stack.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className={`group flex flex-col p-8 bg-[#0a0a0a] border border-white/10 rounded-2xl hover:border-white/20 transition-colors ${s.span}`}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white group-hover:text-black transition-colors">
                  <s.icon size={18} />
                </div>
                <ArrowRight size={16} className="text-white/20 group-hover:text-white transition-colors" />
              </div>
              
              <div className="mt-auto">
                <h3 className="font-display font-medium text-white text-xl tracking-tight mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
