import { motion } from "framer-motion";
import { Globe2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const regions = [
  { region: "South Asia", countries: ["India", "Sri Lanka", "Bangladesh"] },
  { region: "Southeast Asia", countries: ["Singapore", "Malaysia", "Philippines"] },
  { region: "Middle East", countries: ["UAE", "Saudi Arabia", "Qatar"] },
  { region: "Africa", countries: ["Nigeria", "Kenya", "South Africa"] },
  { region: "Europe", countries: ["UK", "Germany", "Netherlands"] },
  { region: "Americas", countries: ["USA", "Canada", "Brazil"] },
];

const globalStats = [
  { value: "18+", label: "Countries" },
  { value: "6", label: "Continents" },
  { value: "200+", label: "Clients" },
  { value: "24/7", label: "Support" },
];

const GlobalSection = () => {
  return (
    <section
      className="py-28 relative z-10 overflow-hidden"
      style={{ background: "var(--obsidian)", borderTop: "1px solid var(--graphite-600)" }}
    >
      {/* World grid subtle texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(124,92,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Copy */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-primary font-semibold text-xs tracking-widest uppercase mb-5"
            >
              Global Reach
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl md:text-[52px] font-display font-bold text-white tracking-tight leading-[1.05] mb-6"
            >
              One Standard.
              <br />
              <span className="text-gradient">Everywhere.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="text-lg leading-relaxed mb-10"
              style={{ color: "var(--graphite-300)" }}
            >
              From Lagos to London to Los Angeles — Ripple Nexus delivers enterprise-grade
              infrastructure to founders and operators who demand the same quality their
              Silicon Valley counterparts take for granted.
            </motion.p>

            {/* Global stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
              {globalStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.18 + i * 0.07 }}
                >
                  <div className="text-3xl font-display font-bold text-white mb-1">{s.value}</div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: "var(--graphite-400)" }}>{s.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 font-body font-semibold text-sm px-7 py-3.5 rounded-lg transition-all duration-200"
                style={{
                  background: "var(--nexus-violet)",
                  color: "#fff",
                  boxShadow: "0 8px 32px -4px rgba(124,92,255,0.4)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "var(--violet-hover)";
                  e.currentTarget.style.boxShadow = "0 8px 40px -4px rgba(124,92,255,0.55)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "var(--nexus-violet)";
                  e.currentTarget.style.boxShadow = "0 8px 32px -4px rgba(124,92,255,0.4)";
                }}
              >
                Work With Us Globally
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Region grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {regions.map((r, i) => (
              <motion.div
                key={r.region}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group rounded-xl p-4 transition-all duration-300"
                style={{
                  background: "rgba(124,92,255,0.02)",
                  border: "1px solid var(--graphite-600)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(124,92,255,0.3)";
                  e.currentTarget.style.background = "rgba(124,92,255,0.05)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--graphite-600)";
                  e.currentTarget.style.background = "rgba(124,92,255,0.02)";
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Globe2 size={12} style={{ color: "rgba(124,92,255,0.6)" }} />
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--graphite-400)" }}>
                    {r.region}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {r.countries.map((c) => (
                    <div key={c} className="text-[13px]" style={{ color: "var(--graphite-300)" }}>
                      {c}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default GlobalSection;
