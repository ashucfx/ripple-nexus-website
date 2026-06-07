import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * FounderSection — The single most important trust signal missing from the site.
 *
 * Diagnosis fix:
 * ✓ Adds human accountability to the brand (was completely faceless)
 * ✓ Named founder with philosophy — buyers hire the judgment of a person
 * ✓ Visible conviction narrative — not a company bio, a point of view
 * ✓ LinkedIn signal present (enterprise buyers will verify)
 * ✓ Track record tied to individual — not just a corporate entity
 */

const beliefs = [
  "AI deployed on proprietary data compounds. AI deployed on generic models commoditizes.",
  "The agency model is structurally misaligned with client outcomes. We ended it.",
  "Every production system we deliver is owned 100% by the client. Always.",
  "A written architecture brief in 48 hours or the engagement doesn't proceed.",
];

const FounderSection = () => {
  return (
    <section
      className="py-28 relative z-10 overflow-hidden"
      style={{ borderTop: "1px solid var(--graphite-600)" }}
    >
      {/* Subtle glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 60% at 80% 50%, rgba(124,92,255,0.06) 0%, rgba(10,11,20,0) 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-start">

          {/* Left: Identity */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow mb-8"
            >
              The Architect
            </motion.p>

            {/* Avatar — professional, not decorative */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mb-8 relative w-20 h-20"
            >
              <img 
                src="/ashutosh-shukla.jpg" 
                alt="Ashutosh Shukla" 
                className="w-24 h-24 rounded-2xl object-cover absolute inset-0 z-20 shadow-xl"
                style={{ border: "1px solid rgba(124,92,255,0.3)" }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Premium Typographic Fallback with Video Hook */}
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center font-display font-bold text-3xl absolute inset-0 z-10 overflow-hidden group cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, rgba(124,92,255,0.2) 0%, rgba(34,211,238,0.1) 100%)",
                  border: "1px solid rgba(124,92,255,0.4)",
                  color: "var(--pearl)",
                  letterSpacing: "-0.04em",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
                onClick={() => window.open("https://www.linkedin.com/in/ashutosh-shuklaa/", "_blank")}
              >
                <div className="absolute inset-0 backdrop-blur-md bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
                <span className="relative z-10 drop-shadow-md group-hover:opacity-0 transition-opacity duration-300">AS</span>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-[var(--nexus-violet)] flex items-center justify-center shadow-[0_0_20px_rgba(124,92,255,0.6)]">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
            >
              <h2
                className="font-display font-bold leading-tight mb-2"
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  letterSpacing: "-0.03em",
                  color: "var(--pearl)",
                }}
              >
                Ashutosh Shukla
              </h2>
              <p
                className="font-body text-sm mb-1"
                style={{ color: "var(--graphite-400)" }}
              >
                Founder & Chief Architect, Ripple Nexus
              </p>
              <a
                href="https://www.linkedin.com/in/ashutosh-shuklaa/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.6rem] tracking-widest uppercase transition-colors duration-200"
                style={{ color: "var(--nexus-violet)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--pearl)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--nexus-violet)")}
              >
                LinkedIn Profile →
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-10 space-y-3"
            >
              <p
                className="font-mono text-[0.6rem] tracking-widest uppercase mb-3"
                style={{ color: "var(--graphite-400)" }}
              >
                Track Record
              </p>
              {[
                "200+ AI systems deployed across 18+ countries",
                "Engineering-led: every engagement begins with the architect, not a sales team",
                "Noida, India · Global delivery capability across 6 continents",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="font-mono text-xs shrink-0 mt-0.5"
                    style={{ color: "var(--nexus-violet)" }}
                  >
                    —
                  </span>
                  <span
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "var(--graphite-300)" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Philosophy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-10"
            >
              <h3
                className="font-display font-bold leading-tight mb-5"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  letterSpacing: "-0.025em",
                  color: "var(--pearl)",
                }}
              >
                Why I built Ripple Nexus — and why it operates the way it does.
              </h3>
              <p
                className="font-body text-base leading-relaxed mb-4"
                style={{ color: "var(--graphite-300)" }}
              >
                I spent years watching businesses pay for "AI strategies" that produced slide decks — and
                "automation agencies" that built on platforms that owned the client's data.
                Neither model was aligned with client outcomes.
              </p>
              <p
                className="font-body text-base leading-relaxed"
                style={{ color: "var(--graphite-300)" }}
              >
                Ripple Nexus was built on one conviction: that proprietary AI infrastructure — built on
                your data, owned by you, delivered in production — is the only automation that
                creates a real competitive moat. We operate by a set of principles I hold personally
                accountable, on every engagement.
              </p>
            </motion.div>

            {/* Beliefs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4 mb-10"
            >
              <p
                className="font-mono text-[0.6rem] tracking-widest uppercase mb-4"
                style={{ color: "var(--graphite-400)" }}
              >
                Founding Principles
              </p>
              {beliefs.map((belief, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.07 }}
                  className="flex gap-4 p-5 rounded-xl"
                  style={{
                    background: "var(--ink)",
                    border: "1px solid var(--graphite-600)",
                  }}
                >
                  <span
                    className="font-mono text-sm shrink-0 mt-0.5"
                    style={{ color: "var(--nexus-violet)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "var(--graphite-300)" }}
                  >
                    {belief}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="/#lead-form"
                className="group inline-flex items-center gap-2.5 font-body font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-200"
                style={{
                  background: "var(--nexus-violet)",
                  color: "#fff",
                  boxShadow: "0 8px 32px -4px rgba(124,92,255,0.45)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--violet-hover)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--nexus-violet)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Speak with the Architect
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
