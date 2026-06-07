import { motion } from "framer-motion";
import { Quote, PlayCircle, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    quote:
      "Ripple Nexus restructured our entire lead qualification pipeline. The autonomous agent they built reduced unqualified pipeline by 60% and our SDRs now close 2× faster — they only touch accounts that are already pre-qualified.",
    name: "Sarah Jenkins",
    role: "VP of Revenue Operations",
    company: "Series B FinTech",
    industry: "FinTech",
    metric: "60%",
    metricLabel: "Pipeline waste eliminated",
    featured: true,
  },
  {
    quote:
      "Our cloud migration was delivered in 8 weeks — half the timeline we budgeted for. Uptime went from 99.2% to 99.97% and infrastructure costs dropped 60%.",
    name: "David Chen",
    role: "Chief Technology Officer",
    company: "Enterprise SaaS",
    industry: "SaaS",
    metric: "99.97%",
    metricLabel: "Uptime SLA",
    featured: false,
  },
  {
    quote:
      "The ERP system they delivered replaced three tools we were paying for. The team were genuinely embedded partners — not vendors waiting on a spec.",
    name: "Michael Roberts",
    role: "Chief Operating Officer",
    company: "Manufacturing Group",
    industry: "Manufacturing",
    metric: "3 tools",
    metricLabel: "Consolidated",
    featured: false,
  },
  {
    quote:
      "Patient record retrieval went from 12 minutes to under 30 seconds. The real-time intelligence hub has fundamentally changed how our clinicians make decisions.",
    name: "Dr. Elena Rostova",
    role: "Medical Director",
    company: "Healthcare Network",
    industry: "HealthTech",
    metric: "24×",
    metricLabel: "Faster retrieval",
    featured: false,
  },
  {
    quote:
      "We scaled from 1,000 to 50,000 users without a single architectural change. That's the difference between an agency and an engineering partner.",
    name: "James Wilson",
    role: "Co-Founder & CTO",
    company: "Consumer Platform",
    industry: "Consumer",
    metric: "50×",
    metricLabel: "Scale without rewrite",
    featured: false,
  },
  {
    quote:
      "Encryption, access controls, and audit logging were built in from day one. We passed our compliance audit without a single finding.",
    name: "Anita Desai",
    role: "CISO",
    company: "Financial Services",
    industry: "Finance",
    metric: "Zero",
    metricLabel: "Compliance findings",
    featured: false,
  },
];

function InitialAvatar({ name, size = "lg" }: { name: string; size?: "sm" | "lg" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const dim = size === "lg" ? "w-14 h-14 text-lg" : "w-10 h-10 text-sm";

  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-display font-bold shrink-0 relative overflow-hidden`}
      style={{
        background: "linear-gradient(135deg, rgba(124,92,255,0.2), rgba(34,211,238,0.1))",
        border: "1px solid rgba(124,92,255,0.3)",
        color: "var(--pearl)",
      }}
    >
      <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />
      <span className="relative z-10 drop-shadow-md">{initials}</span>
    </div>
  );
}

const TestimonialsSection = () => {
  const featured = testimonials.find(t => t.featured);
  const others = testimonials.filter(t => !t.featured);

  return (
    <section
      className="py-32 relative z-10"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow mb-6"
          >
            Client References
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-display font-bold leading-tight"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.03em",
                color: "var(--pearl)",
              }}
            >
              Named outcomes.{" "}
              <span className="gradient-text-vibrant">
                Verified partners.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="font-body text-sm max-w-xs text-right hidden md:block"
              style={{ color: "var(--graphite-400)" }}
            >
              Reference calls available on request for qualified enterprise engagements.
            </motion.p>
          </div>
        </div>

        {/* Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Featured Testimonial (Spans 2 columns) */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 glass-panel p-8 sm:p-10 rounded-2xl relative overflow-hidden group hover:bg-white/5 transition-colors duration-300"
            >
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <Quote size={28} className="text-primary/40 mb-6" />
                  <p className="font-display text-xl sm:text-2xl leading-relaxed mb-10" style={{ color: "var(--pearl)" }}>
                    "{featured.quote}"
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-4">
                    <InitialAvatar name={featured.name} size="lg" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-body font-semibold" style={{ color: "var(--pearl)" }}>{featured.name}</p>
                        <CheckCircle2 size={14} className="text-primary" />
                      </div>
                      <p className="font-mono text-[0.65rem] tracking-wide mt-0.5" style={{ color: "var(--graphite-300)" }}>{featured.role}, {featured.company}</p>
                    </div>
                  </div>
                  
                  {/* Metric Pill */}
                  <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-black/40 border border-white/5 shrink-0">
                    <span className="font-display font-bold text-xl" style={{ color: "var(--nexus-violet)" }}>{featured.metric}</span>
                    <span className="font-mono text-[0.6rem] tracking-widest uppercase text-muted-foreground w-16">{featured.metricLabel}</span>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* Standard Testimonials (Grid) */}
          <div className="grid grid-cols-1 gap-6">
            {others.slice(0, 2).map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + (i * 0.1), duration: 0.5 }}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between group relative overflow-hidden hover:bg-white/5 transition-colors duration-300"
              >
                
                <p className="font-body text-sm leading-relaxed mb-6 italic relative z-10" style={{ color: "var(--graphite-300)" }}>
                  "{t.quote}"
                </p>
                
                <div className="flex items-center justify-between mt-auto relative z-10">
                  <div className="flex items-center gap-3">
                    <InitialAvatar name={t.name} size="sm" />
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="font-body text-xs font-semibold" style={{ color: "var(--pearl)" }}>{t.name}</p>
                        <CheckCircle2 size={12} className="text-primary" />
                      </div>
                      <p className="font-mono text-[0.55rem] tracking-wide" style={{ color: "var(--graphite-400)" }}>{t.company}</p>
                    </div>
                  </div>
                  <span className="font-display font-bold text-lg" style={{ color: "var(--ion-cyan)" }}>{t.metric}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row */}
          {others.slice(2).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
              className="glass-panel p-6 rounded-2xl flex flex-col justify-between group relative overflow-hidden hover:bg-white/5 transition-colors duration-300"
            >
              <p className="font-body text-sm leading-relaxed mb-6 italic relative z-10" style={{ color: "var(--graphite-300)" }}>
                "{t.quote}"
              </p>
              
              <div className="flex items-center justify-between mt-auto relative z-10">
                <div className="flex items-center gap-3">
                  <InitialAvatar name={t.name} size="sm" />
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-body text-xs font-semibold" style={{ color: "var(--pearl)" }}>{t.name}</p>
                      <CheckCircle2 size={12} className="text-primary" />
                    </div>
                    <p className="font-mono text-[0.55rem] tracking-wide" style={{ color: "var(--graphite-400)" }}>{t.company}</p>
                  </div>
                </div>
                <span className="font-display font-bold text-lg" style={{ color: "var(--ion-cyan)" }}>{t.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
