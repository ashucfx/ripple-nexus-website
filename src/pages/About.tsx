import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Users, Globe, Lightbulb, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import SEOHead from "@/components/SEOHead";

const BASE_URL = "https://www.theripplenexus.com";

const values = [
  {
    icon: Target,
    title: "Outcome-First Engineering",
    desc: "Every architecture decision is anchored to a measurable business outcome — not a technology trend. We build what generates ROI, not what wins awards.",
  },
  {
    icon: Users,
    title: "Systems Partner, Not Vendor",
    desc: "We embed with your team as autonomous infrastructure partners. You own 100% of the IP, code, and workflows — from day one.",
  },
  {
    icon: Globe,
    title: "Open-Standard Architecture",
    desc: "Built on Make, n8n, Python, and open APIs. No proprietary black boxes. Walk away with everything, any time, no lock-in.",
  },
  {
    icon: Lightbulb,
    title: "Information Gain Over Generics",
    desc: "We build systems on your proprietary data — customer behaviour, operational history, domain context. Competitive advantages that can't be bought off the shelf.",
  },
];

const milestones = [
  "200+ AI systems and automation workflows delivered across 18+ countries",
  "Zero data breaches since inception",
  "100% IP ownership transferred on every engagement — all code, workflows, and data",
  "Security-first engineering: RBAC, encryption at rest and in transit, audit logging",
  "60–90 day production deployment — no 6-month strategy decks",
  "Every engagement led directly by the founding architect, not an account manager",
];

const About = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: "Ripple Nexus",
      url: BASE_URL,
      description: "Automation-first AI systems for founders and enterprises. 200+ deployments across 18+ countries.",
    },
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <SEOHead
        title="About Ripple Nexus — Automation-First AI Systems Partner"
        description="Ripple Nexus builds proprietary AI automation systems on your data. 200+ deployments across 18+ countries. 100% IP ownership. Production in 60–90 days."
        canonical={`${BASE_URL}/about`}
        schemaMarkup={schema}
      />
      <Navbar />

      <main>
        {/* Hero */}
        <section
          className="relative pt-40 pb-28 overflow-hidden"
          style={{ borderBottom: "1px solid var(--graphite-600)" }}
        >
          <div
            className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
            style={{
              background: "radial-gradient(50% 50% at 80% 30%, rgba(124,92,255,0.14) 0%, rgba(10,11,20,0) 100%)",
            }}
          />
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="eyebrow mb-6">Our Story</p>
              <div
                className="w-12 h-px mb-10"
                style={{ background: "linear-gradient(90deg, #7C5CFF 0%, #22D3EE 100%)" }}
              />
              <h1
                className="font-display font-bold leading-tight mb-6"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em", color: "var(--pearl)" }}
              >
                Built to install{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #7C5CFF 0%, #B794FF 55%, #22D3EE 100%)" }}
                >
                  autonomous growth.
                </span>
              </h1>
              <p className="font-body text-xl leading-relaxed max-w-2xl" style={{ color: "var(--graphite-300)" }}>
                Ripple Nexus was founded by{" "}
                <a
                  href="https://www.linkedin.com/in/ashutosh-shuklaa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200"
                  style={{ color: "var(--pearl)", borderBottom: "1px solid rgba(124,92,255,0.4)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderBottomColor = "var(--nexus-violet)")}
                  onMouseLeave={e => (e.currentTarget.style.borderBottomColor = "rgba(124,92,255,0.4)")}
                >
                  Ashutosh Shukla
                </a>{" "}
                on one conviction: AI should compound your competitive advantage, not
                commoditize it. We build proprietary systems on your data — not generic wrappers on someone else's model.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section
          className="py-28"
          style={{ borderBottom: "1px solid var(--graphite-600)" }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow mb-6"
            >
              Core Principles
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-display font-bold leading-tight mb-16"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)", letterSpacing: "-0.03em", color: "var(--pearl)" }}
            >
              How we think about building.
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--graphite-600)" }}>
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-8 flex gap-5 transition-colors duration-300"
                  style={{ background: "var(--obsidian)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--ink)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "var(--obsidian)")}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(124,92,255,0.1)", border: "1px solid rgba(124,92,255,0.2)" }}
                  >
                    <v.icon size={20} style={{ color: "var(--nexus-violet)" }} />
                  </div>
                  <div>
                    <h3
                      className="font-display font-bold text-base mb-2"
                      style={{ color: "var(--pearl)", letterSpacing: "-0.015em" }}
                    >
                      {v.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-400)" }}>
                      {v.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Information Gain Manifesto */}
        <section
          className="py-28 relative"
          style={{ borderBottom: "1px solid var(--graphite-600)", background: "var(--ink)" }}
        >
          <div className="absolute top-0 left-0 w-1/3 h-full pointer-events-none" style={{ background: "radial-gradient(100% 100% at 0% 50%, rgba(124,92,255,0.04) 0%, transparent 100%)" }} />
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="eyebrow mb-6">The Founder's Thesis</p>
              <h2
                className="font-display font-bold leading-tight mb-10"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em", color: "var(--pearl)" }}
              >
                The End of Generic AI:<br/>
                Why Information Gain is the Only Defensible Moat.
              </h2>
              <div className="space-y-6 font-body text-[1.05rem] leading-relaxed" style={{ color: "var(--graphite-300)" }}>
                <p>
                  We are entering an era where access to intelligence is commoditized. If you deploy a generic ChatGPT wrapper, your competitor can deploy the exact same wrapper tomorrow. The technology itself is no longer a moat.
                </p>
                <p>
                  So what separates market leaders from everyone else? <strong style={{ color: "var(--pearl)" }}>Information Gain.</strong>
                </p>
                <p>
                  Information Gain is the proprietary delta between what a public foundational model knows, and what your private organizational data reveals. It is the hidden context in your CRM, the historical decisions of your top performers, and the unique telemetry of your operations.
                </p>
                <p>
                  At Ripple Nexus, we do not build wrappers. We build <strong style={{ color: "var(--pearl)" }}>Information Gain Infrastructure</strong>. We architect systems that continuously ingest your private data, reason over it, and execute workflows autonomously. The system we build for you will make decisions that your competitors cannot replicate, because they do not have your data.
                </p>
                <p className="pt-6 font-display font-bold text-lg" style={{ color: "var(--pearl)" }}>
                  Ashutosh Shukla<br/>
                  <span className="font-body text-sm font-normal" style={{ color: "var(--graphite-400)" }}>Founder & Lead Architect</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How we work — honest founder-led framing */}
        <section
          className="py-28 relative"
          style={{ borderBottom: "1px solid var(--graphite-600)" }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow mb-6"
            >
              How We Work
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2
                  className="font-display font-bold leading-tight mb-6"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)", letterSpacing: "-0.03em", color: "var(--pearl)" }}
                >
                  Direct access to the engineer building your system.
                </h2>
                <p className="font-body text-lg leading-relaxed" style={{ color: "var(--graphite-300)" }}>
                  There is no project manager between you and the architect. No account rep translating requirements. Every engagement is led directly by the same senior engineer from scoping through to production handover.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <ul className="space-y-6">
                  <li className="p-6 rounded-xl" style={{ border: "1px solid var(--graphite-600)", background: "var(--ink)" }}>
                    <h4 className="font-display font-bold text-base mb-2" style={{ color: "var(--pearl)" }}>Written brief in 48 hours</h4>
                    <p className="font-body text-sm" style={{ color: "var(--graphite-400)" }}>After every intake call we deliver a written architecture brief — scope, effort estimates, and technical approach. If we can't articulate it in writing, we don't build it.</p>
                  </li>
                  <li className="p-6 rounded-xl" style={{ border: "1px solid var(--graphite-600)", background: "var(--ink)" }}>
                    <h4 className="font-display font-bold text-base mb-2" style={{ color: "var(--pearl)" }}>No lock-in, ever</h4>
                    <p className="font-body text-sm" style={{ color: "var(--graphite-400)" }}>Every system is built on open standards (Python, n8n, open-source LLM frameworks) and transferred to you on delivery. You can operate, extend, or migrate it without our involvement.</p>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Track Record */}
        <section
          className="py-28"
          style={{ borderBottom: "1px solid var(--graphite-600)" }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow mb-6"
            >
              Verifiable Track Record
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-display font-bold leading-tight mb-14"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)", letterSpacing: "-0.03em", color: "var(--pearl)" }}
            >
              Numbers we stand behind.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-xl p-8"
              style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}
            >
              <ul className="space-y-5">
                {milestones.map((m, i) => (
                  <motion.li
                    key={m}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-4"
                  >
                    <span
                      className="font-mono text-xs shrink-0 mt-0.5"
                      style={{ color: "var(--quantum-lime)" }}
                    >
                      ✓
                    </span>
                    <span className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-300)" }}>
                      {m}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-28">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-bold leading-tight mb-5"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)", letterSpacing: "-0.03em", color: "var(--pearl)" }}
            >
              Initialize your infrastructure rollout.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-body text-lg leading-relaxed mb-10 max-w-xl mx-auto"
              style={{ color: "var(--graphite-300)" }}
            >
              Begin with an Architecture Discovery session. We analyze your bottlenecks and provide a concrete deployment topology.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="/#lead-form"
                className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm px-8 py-4 rounded-xl transition-all duration-200"
                style={{
                  background: "var(--nexus-violet)",
                  color: "#fff",
                  boxShadow: "0 8px 32px -4px rgba(124,92,255,0.45)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "var(--violet-hover)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px -4px rgba(124,92,255,0.55)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "var(--nexus-violet)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 32px -4px rgba(124,92,255,0.45)";
                }}
              >
                Request AI Systems Audit <ArrowRight size={15} />
              </a>
              <Link
                to="/case-studies"
                className="inline-flex items-center justify-center gap-2 font-body font-medium text-sm px-8 py-4 rounded-xl transition-all duration-200"
                style={{ border: "1px solid var(--graphite-600)", color: "var(--pearl)" }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(124,92,255,0.5)";
                  e.currentTarget.style.background = "rgba(124,92,255,0.06)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--graphite-600)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                See Verified Results
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
