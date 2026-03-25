import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Globe, Smartphone, Code2, Database, Bot, Zap,
  Palette, FileText, Linkedin, PenTool, ArrowRight,
  TrendingUp, CheckCircle2, ShieldAlert
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import SEOHead from "@/components/SEOHead";
import AnimatedCard from "@/components/AnimatedCard";

const BASE_URL = "https://www.theripplenexus.com";

const services = [
  { 
    icon: Code2, 
    title: "Enterprise SaaS & Software Build", 
    desc: "We engineer resilient, high-bandwidth applications built on tech-agnostic modern architectures tailored exactly to your requirements, equipped to handle millions of transactions.", 
    how: "Microservices architecture & containerization for flawless scale.",
    outcome: "Zero-downtime platforms with a 40%+ increase in deployment speed.",
    keywords: ["SaaS", "API Design", "Node.js", "AWS", "K8s"] 
  },
  { 
    icon: Bot, 
    title: "Conversational AI & LLM Systems", 
    desc: "Intelligent automation powered by custom-fine-tuned GenAI models that integrate natively into your existing data lakes and support channels.", 
    how: "RAG architectures and strict token-efficiency models.",
    outcome: "Resolves up to 75% of tier-1 support autonomously.",
    keywords: ["GenAI", "LLM", "RAG", "Automation"] 
  },
  { 
    icon: Database, 
    title: "ERP & Data Warehouse Implementation", 
    desc: "Unify fragmented data silos into centralized engines (SAP, Snowflake, custom builds) that drive instant business intelligence and automated operations.", 
    how: "Custom ETL pipelines and complex mapping.",
    outcome: "100% data visibility leading to dramatic OPEX reductions.",
    keywords: ["SAP", "Snowflake", "ETL", "BI"] 
  },
  { 
    icon: Smartphone, 
    title: "Native & Cross-Platform Mobile", 
    desc: "Stunning iOS & Android applications tailored for massive user retention, utilizing React Native and Swift with hyper-optimized bridge layers.", 
    how: "60fps animations and modularized state management.",
    outcome: "Sub-second load times & 4.8+ typical app store ratings.",
    keywords: ["React Native", "iOS", "Android", "Mobile"] 
  },
  { 
    icon: Globe, 
    title: "High-Traffic Web Platforms", 
    desc: "SEO-obsessed, universally accessible web portals and decoupled CMS implementations focused on instant TTFB (Time To First Byte).", 
    how: "Headless CMS + Edge content delivery networks.",
    outcome: "Conversion rates routinely doubled through performance alone.",
    keywords: ["Custom Stacks", "Tech-Agnostic", "Headless CMS", "SEO"] 
  },
  { 
    icon: Zap, 
    title: "Workflow Security & RPA", 
    desc: "Identify manual vulnerabilities and inject Robotic Process Automation connected directly to your central auth layer.", 
    how: "Custom scripting + n8n/Zapier enterprise deployments.",
    outcome: "Thousands of manual hours eliminated monthly.",
    keywords: ["RPA", "n8n", "Security", "IAM"] 
  },
];

const Services = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: { "@type": "Organization", name: "Ripple Nexus", url: BASE_URL },
    serviceType: services.map(s => s.title),
    areaServed: { "@type": "Country", name: "India" },
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SEOHead
        title="Services — Enterprise SaaS, AI & Digital Solutions | Ripple Nexus"
        description="Scalable engineering, SaaS platforms, AI chatbots, ERP systems, and automation. Enterprise-grade development for modern businesses."
        canonical={`${BASE_URL}/services`}
        schemaMarkup={schema}
      />
      <Navbar />

      <main className="pt-32 pb-24 relative z-10">
        <div className="absolute top-[10%] left-[20%] w-[35rem] h-[35rem] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Hero Section */}
        <section className="section-padding max-w-4xl mx-auto text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-white/40 font-semibold text-sm tracking-widest uppercase mb-4 block">Our Capabilities</span>
            <h1 className="font-display font-medium text-4xl md:text-6xl text-white tracking-tight mb-6">
              Full-Stack Architecture.
            </h1>
            <p className="text-white/50 text-xl font-light max-w-2xl mx-auto">
              From high-performance web platforms to enterprise backend systems, we engineer the unshakeable foundations your business needs to scale globally.
            </p>
          </motion.div>
        </section>

        {/* The Comparative Approach Block */}
        <section className="section-padding max-w-7xl mx-auto mb-32 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">The Ripple Nexus Difference</h2>
            <p className="text-muted-foreground text-lg">Why hyper-growth companies migrate to our architectures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedCard glowOnHover={false} delay={0.1} className="p-8 md:p-10 border border-destructive/20 bg-destructive/5 hover:bg-destructive/10">
               <div className="flex items-center justify-between mb-8">
                 <h3 className="text-2xl font-bold text-destructive/90 flex items-center gap-3"><ShieldAlert size={28} /> Traditional Vendors</h3>
                 <span className="bg-destructive/10 text-destructive text-xs font-bold px-3 py-1 uppercase rounded-md tracking-wider">The Risk</span>
               </div>
               <ul className="space-y-6">
                 <li className="flex gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2" />
                   <p className="text-white/80"><strong className="text-white block mb-1">Feature-Obsessed, System-Agnostic</strong> They build isolated features that break under multi-tenant scale or traffic spikes.</p>
                 </li>
                 <li className="flex gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2" />
                   <p className="text-white/80"><strong className="text-white block mb-1">Blackbox Monoliths</strong> Codebases that are impossible to hand over or maintain internally without heavy vendor lock-in.</p>
                 </li>
                 <li className="flex gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2" />
                   <p className="text-white/80"><strong className="text-white block mb-1">Reactive Problem Solving</strong> They wait for servers to crash before scaling, resulting in permanent data loss.</p>
                 </li>
               </ul>
            </AnimatedCard>

            <AnimatedCard glowOnHover={true} delay={0.2} className="p-8 md:p-10 border border-primary/30 bg-primary/10 hover:bg-primary/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-secondary/10 blur-[80px]" />
               <div className="flex items-center justify-between mb-8 relative z-10">
                 <h3 className="text-2xl font-bold text-primary flex items-center gap-3"><CheckCircle2 size={28} /> Ripple Nexus</h3>
                 <span className="bg-primary/20 text-primary-foreground border border-primary/30 text-xs font-bold px-3 py-1 uppercase rounded-md tracking-wider">Our Approach</span>
               </div>
               <ul className="space-y-6 relative z-10">
                 <li className="flex gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                   <p className="text-white/90"><strong className="text-white block mb-1">Architecture First</strong> We design multi-AZ databases and microservices first, ensuring infinite horizontal scale from day one.</p>
                 </li>
                 <li className="flex gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                   <p className="text-white/90"><strong className="text-white block mb-1">Transparent & agnostic</strong> We use modern, tech-agnostic paradigms tailored to your stack. You completely own your IP.</p>
                 </li>
                 <li className="flex gap-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                   <p className="text-white/90"><strong className="text-white block mb-1">Predictive DevSecOps</strong> Auto-scaling groups, predictive anomaly monitoring, and automated zero-downtime CI/CD pipelines.</p>
                 </li>
               </ul>
            </AnimatedCard>
          </div>
        </section>

        {/* Detailed Services Grid */}
        <section id="solutions" className="section-padding max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Core Capabilities</h2>
            <p className="text-muted-foreground text-lg">Deep domain expertise across the modern web stack.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((s, i) => (
              <AnimatedCard key={s.title} delay={i * 0.1} glowOnHover={true} className="flex flex-col p-8 bg-card/60 border border-white/5 hover:bg-card/90">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary/20 to-secondary/10 flex items-center justify-center mb-6 shadow-inner ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-500">
                  <s.icon className="text-primary w-7 h-7" />
                </div>
                
                <h3 className="font-display font-bold text-white text-xl mb-3 tracking-tight">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light h-20">{s.desc}</p>
                
                <div className="flex-1 space-y-4 pt-5 border-t border-white/5">
                   <div>
                     <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-1.5">How we do it</p>
                     <p className="text-sm text-white/70">{s.how}</p>
                   </div>
                   <div>
                     <p className="text-[11px] font-bold text-secondary uppercase tracking-widest mb-1.5">Outcome</p>
                     <p className="text-sm font-medium text-white/90 flex gap-2 items-start"><TrendingUp size={16} className="text-secondary flex-shrink-0 mt-0.5" /> {s.outcome}</p>
                   </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {s.keywords.map(k => (
                    <span key={k} className="text-[11px] font-semibold bg-white/5 text-muted-foreground px-2.5 py-1 rounded-md border border-white/5">{k}</span>
                  ))}
                </div>
              </AnimatedCard>
            ))}
          </div>
        </section>

        <section className="section-padding max-w-4xl mx-auto text-center mt-32">
          <div className="relative py-12 px-8 overflow-hidden rounded-[2rem] border border-primary/20 bg-background pointer-events-none shadow-[0_0_100px_rgba(31,86,212,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent blur-md" />
            <h2 className="font-display text-3xl font-bold text-white mb-4 relative z-10 pointer-events-auto">Need a specialized technical capability?</h2>
            <p className="text-muted-foreground mb-8 relative z-10 pointer-events-auto max-w-xl mx-auto">We assemble elite squads of engineers for bespoke system architecture and massive legacy migrations.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all pointer-events-auto">
              Consult Our Architects <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
