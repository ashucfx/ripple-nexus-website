import { motion } from "framer-motion";

const industries = [
  "FinTech", "HealthTech", "EdTech", "Insurance Tech",
  "PropTech", "Logistics", "Manufacturing", "Retail",
  "Enterprise SaaS", "Banking", "Government", "E-Commerce",
];

const trustStats = [
  { value: "200+", label: "Companies Served" },
  { value: "18+", label: "Countries" },
  { value: "4.9 / 5", label: "Client Rating" },
  { value: "< 4 hrs", label: "Avg. First Response" },
];

const TrustSection = () => {
  return (
    <section className="bg-black border-t border-b border-white/[0.06] relative z-10 overflow-hidden">

      {/* Aggregate trust stats */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-b border-white/[0.06]">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-white/40 text-xs uppercase tracking-widest font-semibold"
          >
            By the numbers
          </motion.p>
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            {trustStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="flex items-baseline gap-2"
              >
                <span className="text-2xl font-display font-bold text-white">{s.value}</span>
                <span className="text-xs text-white/40 uppercase tracking-wider">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Industries ticker */}
      <div className="py-10">
        <div className="max-w-6xl mx-auto px-6 mb-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/30 text-xs uppercase tracking-widest font-semibold text-center"
          >
            Industries we've scaled
          </motion.p>
        </div>

        <div className="overflow-hidden flex items-center relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <motion.div
            className="flex gap-14 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {[...industries, ...industries].map((industry, i) => (
              <div
                key={i}
                className="text-sm font-bold font-display text-white/45 uppercase tracking-[0.15em] flex items-center gap-4 shrink-0 hover:text-white/70 transition-colors duration-300"
              >
                <span className="w-1 h-1 rounded-full bg-primary/50 inline-block" />
                {industry}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default TrustSection;
