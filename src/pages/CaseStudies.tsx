import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Building2, Globe, ExternalLink, Filter } from "lucide-react";
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
    name: "Case Studies — Ripple Nexus",
    description: "Verified enterprise projects with measurable business outcomes across CRM, cloud, ERP, cybersecurity, and more.",
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
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Case Studies — Verified Enterprise Projects | Ripple Nexus"
        description="Explore 30+ verified enterprise projects: CRM overhauls, cloud migrations, ERP implementations, cybersecurity setups, and more. Real results, measurable impact."
        canonical={`${BASE_URL}/case-studies`}
        schemaMarkup={schema}
      />
      <Navbar />

      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Background Depth */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
        <div className="absolute top-40 left-[-200px] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
        
        <section className="section-padding max-w-5xl mx-auto text-center mb-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 text-sm font-semibold tracking-wide uppercase">
              <CheckCircle2 size={16} /> Verified Projects
            </span>
            <h1 className="text-5xl md:text-6xl font-display font-extrabold text-white mb-6 tracking-tight">
              Proven Results. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary">Verified Impact.</span>
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Real businesses. Measurable transformations. Explore our deep archive of enterprise overhauls, massive scale-ups, and architectural wins.
            </p>
            <div className="flex justify-center gap-6 mt-10 text-sm text-foreground/80 font-medium flex-wrap">
              <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/60 border border-white/5"><CheckCircle2 size={16} className="text-primary" /> {caseStudies.length}+ Verified Projects</span>
              <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/60 border border-white/5"><Building2 size={16} className="text-primary" /> 15+ Industries</span>
              <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/60 border border-white/5"><Globe size={16} className="text-primary" /> 12+ Countries</span>
            </div>
          </motion.div>
        </section>

        {/* Filters */}
        <section className="section-padding max-w-7xl mx-auto mb-16 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3 text-foreground font-medium">
              <Filter size={20} className="text-muted-foreground" />
              <span>Filter by Capability:</span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center md:justify-end">
              <button
                onClick={() => setActiveCategory("All")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === "All" 
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(31,86,212,0.4)]" 
                    : "bg-card border border-white/5 text-muted-foreground hover:text-foreground hover:border-white/20"
                }`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat 
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(31,86,212,0.4)]" 
                      : "bg-card border border-white/5 text-muted-foreground hover:text-foreground hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding max-w-7xl mx-auto relative z-10">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const Icon = project.icon;
                return (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                    className="h-full"
                  >
                    <AnimatedCard className="h-full flex flex-col p-8 bg-card/60 border border-white/5 hover:border-primary/30 transition-colors">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                          <Icon size={24} />
                        </div>
                        <span className="flex items-center gap-1.5 text-xs text-secondary bg-secondary/10 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
                          <CheckCircle2 size={12} strokeWidth={3} /> Verified
                        </span>
                      </div>

                      <h2 className="font-display font-bold text-white text-xl mb-2">{project.title}</h2>
                      <p className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">{project.client} <span className="mx-2 text-border">|</span> <span className="text-primary/80">{project.category}</span></p>

                      <div className="space-y-5 flex-1 bg-black/20 p-5 rounded-xl border border-white/[0.02]">
                        <div>
                          <p className="text-[11px] font-bold text-red-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.7)]" /> The Chaos
                          </p>
                          <p className="text-sm text-foreground/80 leading-relaxed">{project.challenge}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-1.5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/80" /> The Fix
                          </p>
                          <p className="text-sm text-foreground/80 leading-relaxed">{project.approach}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-secondary uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary/80" /> The Impact
                          </p>
                          <ul className="space-y-2">
                            {project.outcomes.map((outcome) => (
                              <li key={outcome} className="text-sm text-foreground flex items-start gap-2 bg-secondary/5 px-2 py-1.5 rounded-md">
                                <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-secondary" />
                                <span className="font-medium">{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs font-semibold bg-white/5 text-muted-foreground px-2.5 py-1 rounded-md border border-white/5">{tag}</span>
                          ))}
                        </div>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-black/30 px-2 py-1 rounded-md">{project.duration}</span>
                      </div>
                    </AnimatedCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground font-medium">No case studies found for this category.</p>
              <button 
                onClick={() => setActiveCategory("All")}
                className="mt-4 text-primary font-semibold hover:underline"
              >
                View all projects
              </button>
            </div>
          )}
        </section>

        <section className="section-padding max-w-4xl mx-auto text-center mt-24 relative z-10">
          <div className="glass-panel p-12 rounded-3xl border border-primary/20 bg-primary/5">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">Ready to engineer your own success story?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              We analyze constraints, architect solutions, and build scalable engines for growth. Let's discuss your specific operational challenges.
            </p>
            <a
              href="https://calendly.com/ripplenexus/book-a-consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-base hover:shadow-[0_0_30px_rgba(31,86,212,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
              Book an Architectural Review <ExternalLink size={18} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudies;
