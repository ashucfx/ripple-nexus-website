import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Building2, Globe, ArrowRight, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import AnimatedCard from "@/components/AnimatedCard";
import { caseStudies, categories, Category } from "@/data/caseStudies";

const BASE_URL = "https://www.theripplenexus.com";

const CaseStudies = () => {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");

  const filteredProjects = activeCategory === "All"
    ? caseStudies
    : caseStudies.filter(p => p.category === activeCategory);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Case Studies: Verified AI Systems Results | Ripple Nexus",
    description: "Verified AI automation and enterprise engineering projects with measurable business outcomes across 18+ countries.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: caseStudies.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.title,
        description: p.challenge,
      })),
    },
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      <SEOHead
        title="Case Studies: Verified AI Systems Results | Ripple Nexus"
        description="30+ verified projects: AI automation systems, SaaS platforms, data pipelines, and RPA workflows. Real clients, specific metrics, measurable ROI across 18+ countries."
        canonical={`${BASE_URL}/case-studies`}
        schemaMarkup={schema}
      />
      <Navbar />

      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Background glows */}
        <div
          className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(50% 50% at 80% 20%, rgba(124,92,255,0.12) 0%, transparent 100%)" }}
        />
        <div
          className="absolute top-60 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(50% 50% at 20% 50%, rgba(34,211,238,0.05) 0%, transparent 100%)" }}
        />

        {/* Hero */}
        <section className="section-padding max-w-5xl mx-auto text-center mb-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="eyebrow mb-6">Verified Projects</p>
            <div
              className="w-12 h-px mx-auto mb-10"
              style={{ background: "linear-gradient(90deg, #7C5CFF 0%, #22D3EE 100%)" }}
            />
            <h1
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em", color: "var(--pearl)" }}
            >
              Proven Results.{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #7C5CFF 0%, #B794FF 55%, #22D3EE 100%)" }}
              >
                Verified Impact.
              </span>
            </h1>
            <p className="font-body text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10" style={{ color: "var(--graphite-300)" }}>
              Real businesses. Measurable transformations. AI automation systems, SaaS platforms,
              and data infrastructure — built for outcomes, not hours billed.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              {[
                { icon: CheckCircle2, text: `${caseStudies.length}+ Verified Projects` },
                { icon: Building2,   text: "15+ Industries" },
                { icon: Globe,       text: "18+ Countries" },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm font-medium"
                  style={{
                    background: "var(--ink)",
                    border: "1px solid var(--graphite-600)",
                    color: "var(--graphite-300)",
                  }}
                >
                  <Icon size={15} style={{ color: "var(--nexus-violet)" }} />
                  {text}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Filters */}
        <section
          className="section-padding max-w-7xl mx-auto mb-12 relative z-10 pb-6"
          style={{ borderBottom: "1px solid var(--graphite-600)" }}
        >
          <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
            <div className="flex items-center gap-3" style={{ color: "var(--graphite-300)" }}>
              <Filter size={16} style={{ color: "var(--graphite-400)" }} />
              <span className="font-body text-sm font-medium">Filter by Capability</span>
            </div>
            <div className="flex flex-wrap gap-2.5 justify-center md:justify-end">
              {(["All", ...categories] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-1.5 rounded-full font-body text-sm font-semibold transition-all duration-200"
                  style={
                    activeCategory === cat
                      ? {
                          background: "var(--nexus-violet)",
                          color: "#fff",
                          boxShadow: "0 4px 16px -2px rgba(124,92,255,0.4)",
                        }
                      : {
                          background: "var(--ink)",
                          border: "1px solid var(--graphite-600)",
                          color: "var(--graphite-400)",
                        }
                  }
                  onMouseEnter={e => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.borderColor = "rgba(124,92,255,0.4)";
                      e.currentTarget.style.color = "var(--pearl)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeCategory !== cat) {
                      e.currentTarget.style.borderColor = "var(--graphite-600)";
                      e.currentTarget.style.color = "var(--graphite-400)";
                    }
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Cards grid */}
        <section className="section-padding max-w-7xl mx-auto relative z-10">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--graphite-600)" }}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const Icon = project.icon;
                return (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                    className="h-full"
                  >
                    <AnimatedCard
                      className="h-full flex flex-col p-7"
                      style={{ background: "var(--obsidian)" }}
                    >
                      {/* Card header */}
                      <div className="flex items-start justify-between mb-6">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{
                            background: "rgba(124,92,255,0.1)",
                            border: "1px solid rgba(124,92,255,0.2)",
                          }}
                        >
                          <Icon size={22} style={{ color: "var(--nexus-violet)" }} />
                        </div>
                        <span
                          className="inline-flex items-center gap-1.5 font-mono text-[0.55rem] tracking-widest uppercase px-2.5 py-1 rounded-full"
                          style={{
                            background: "rgba(163,230,53,0.08)",
                            border: "1px solid rgba(163,230,53,0.2)",
                            color: "var(--quantum-lime)",
                          }}
                        >
                          <CheckCircle2 size={10} strokeWidth={3} /> Verified
                        </span>
                      </div>

                      <h2
                        className="font-display font-bold text-lg mb-1.5 leading-snug"
                        style={{ color: "var(--pearl)", letterSpacing: "-0.015em" }}
                      >
                        {project.title}
                      </h2>
                      <p className="font-mono text-[0.6rem] tracking-widest uppercase mb-5" style={{ color: "var(--graphite-400)" }}>
                        {project.client}
                        <span className="mx-2" style={{ color: "var(--graphite-600)" }}>|</span>
                        <span style={{ color: "var(--nexus-violet)" }}>{project.category}</span>
                      </p>

                      {/* Content panels */}
                      <div
                        className="flex-1 rounded-xl p-5 space-y-5"
                        style={{ background: "rgba(124,92,255,0.03)", border: "1px solid var(--graphite-600)" }}
                      >
                        <div>
                          <p
                            className="font-mono text-[0.55rem] tracking-widest uppercase mb-1.5 flex items-center gap-2"
                            style={{ color: "rgba(244,63,94,0.7)" }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full inline-block"
                              style={{ background: "rgba(244,63,94,0.7)" }}
                            />
                            The Challenge
                          </p>
                          <p className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-300)" }}>
                            {project.challenge}
                          </p>
                        </div>
                        <div>
                          <p
                            className="font-mono text-[0.55rem] tracking-widest uppercase mb-1.5 flex items-center gap-2"
                            style={{ color: "var(--nexus-violet)" }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full inline-block"
                              style={{ background: "var(--nexus-violet)" }}
                            />
                            The Solution
                          </p>
                          <p className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-300)" }}>
                            {project.approach}
                          </p>
                        </div>
                        <div>
                          <p
                            className="font-mono text-[0.55rem] tracking-widest uppercase mb-2 flex items-center gap-2"
                            style={{ color: "var(--quantum-lime)" }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full inline-block"
                              style={{ background: "var(--quantum-lime)" }}
                            />
                            The Impact
                          </p>
                          <ul className="space-y-2">
                            {project.outcomes.map((outcome) => (
                              <li
                                key={outcome}
                                className="font-body text-sm flex items-start gap-2.5 px-2.5 py-1.5 rounded-lg"
                                style={{
                                  background: "rgba(163,230,53,0.05)",
                                  border: "1px solid rgba(163,230,53,0.12)",
                                }}
                              >
                                <CheckCircle2
                                  size={13}
                                  className="mt-0.5 shrink-0"
                                  style={{ color: "var(--quantum-lime)" }}
                                />
                                <span style={{ color: "var(--graphite-300)" }}>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Footer */}
                      <div
                        className="mt-5 pt-4 flex items-center justify-between gap-3"
                        style={{ borderTop: "1px solid var(--graphite-600)" }}
                      >
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[0.6rem] px-2 py-0.5 rounded tracking-wide"
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
                        <span
                          className="font-mono text-[0.6rem] tracking-widest uppercase shrink-0 px-2 py-1 rounded"
                          style={{ background: "var(--carbon)", color: "var(--graphite-400)" }}
                        >
                          {project.duration}
                        </span>
                      </div>
                    </AnimatedCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-24">
              <p className="font-body text-lg" style={{ color: "var(--graphite-400)" }}>
                No case studies found for this category.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="mt-4 font-body text-sm font-semibold transition-colors duration-200"
                style={{ color: "var(--nexus-violet)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--pearl)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--nexus-violet)")}
              >
                View all projects
              </button>
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="section-padding max-w-4xl mx-auto text-center mt-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-2xl"
            style={{
              background: "var(--ink)",
              border: "1px solid rgba(124,92,255,0.25)",
              boxShadow: "inset 0 1px 0 rgba(124,92,255,0.1)",
            }}
          >
            <p className="eyebrow mb-6">Start Here</p>
            <h2
              className="font-display font-bold leading-tight mb-5"
              style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.03em", color: "var(--pearl)" }}
            >
              Ready to build your own{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #7C5CFF 0%, #B794FF 55%, #22D3EE 100%)" }}
              >
                success story?
              </span>
            </h2>
            <p className="font-body text-lg mb-10 max-w-2xl mx-auto" style={{ color: "var(--graphite-300)" }}>
              A 45-minute AI Systems Audit surfaces exactly what to automate, in what order,
              and the provable ROI before you commit a rupee to implementation.
            </p>
            <a
              href="/#lead-form"
              className="group inline-flex items-center gap-2.5 font-body font-semibold text-sm px-9 py-4 rounded-xl transition-all duration-200"
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
              Request an AI Systems Audit
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudies;
