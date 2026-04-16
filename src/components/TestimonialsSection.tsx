import { motion } from "framer-motion";
import { Star, BadgeCheck, Quote } from "lucide-react";
import { useState } from "react";

// Avatar helper — DiceBear lorelei style, consistent per seed
const avatar = (seed: string) =>
  `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(seed)}&backgroundColor=0d1117`;

const testimonials = [
  { quote: "Ripple Nexus didn't just build our platform — they understood our business first. The CRM they delivered cut our response time by 68%.", name: "Arjun M.", role: "Operations Lead", company: "FMCG Distribution", rating: 5, avatar: avatar("Arjun") },
  { quote: "Their cloud migration was seamless. We went from 99.2% to 99.97% uptime and saved 60% on infrastructure costs.", name: "Priya S.", role: "CTO", company: "Fintech Startup", rating: 5, avatar: avatar("Priya") },
  { quote: "What impressed me most was their process. They asked the right questions before writing any code.", name: "Daniel K.", role: "Founder", company: "EdTech Platform", rating: 5, avatar: avatar("Daniel") },
  { quote: "Our e-commerce store went from crashing during sales to handling 10x traffic surges with zero downtime.", name: "Sarah L.", role: "E-Commerce Director", company: "Fashion Retail", rating: 5, avatar: avatar("Sarah") },
  { quote: "The automation they built saved our team 20+ hours per week. ROI was visible within the first month.", name: "Vikram R.", role: "COO", company: "Logistics Firm", rating: 5, avatar: avatar("Vikram") },
  { quote: "They rebuilt our entire SaaS onboarding flow. Customer activation improved by 3x in just 6 weeks.", name: "Chen W.", role: "Product Lead", company: "SaaS Platform", rating: 5, avatar: avatar("Chen") },
  { quote: "The AI chatbot they integrated handles 70% of our customer queries — our support team finally has bandwidth.", name: "Fatima A.", role: "Support Manager", company: "Insurance Tech", rating: 5, avatar: avatar("Fatima") },
  { quote: "Our website conversion rate jumped from 1.2% to 4.8% after they redesigned our landing pages.", name: "James T.", role: "Marketing Head", company: "B2B Services", rating: 5, avatar: avatar("James") },
  { quote: "They didn't oversell. They listened, proposed a lean MVP, and delivered ahead of schedule.", name: "Neha P.", role: "Startup Founder", company: "HealthTech", rating: 4, avatar: avatar("Neha") },
  { quote: "The ERP system they built replaced three separate tools we were paying for. Huge cost savings.", name: "Roberto G.", role: "Operations Manager", company: "Manufacturing", rating: 5, avatar: avatar("Roberto") },
  { quote: "Our patient record retrieval went from 12 minutes to 30 seconds. The impact on patient care is immeasurable.", name: "Dr. Ananya K.", role: "Medical Director", company: "Multi-Specialty Clinic", rating: 5, avatar: avatar("Ananya") },
  { quote: "They took our vague idea and turned it into a fully functional platform in under 90 days.", name: "Alex M.", role: "Co-Founder", company: "PropTech Startup", rating: 5, avatar: avatar("Alex") },
  { quote: "Professional, responsive, and genuinely invested in our success. Rare combination in this industry.", name: "Samantha J.", role: "CEO", company: "Digital Agency", rating: 5, avatar: avatar("Samantha") },
  { quote: "They automated our invoice processing — what used to take 2 days now happens in 15 minutes.", name: "Kenji T.", role: "Finance Director", company: "Import/Export", rating: 5, avatar: avatar("Kenji") },
  { quote: "Our mobile app went from concept to App Store in 10 weeks. Clean code, great UX, zero bugs at launch.", name: "Maria C.", role: "Product Owner", company: "Fitness App", rating: 5, avatar: avatar("Maria") },
  { quote: "They migrated our legacy system with zero data loss and minimal downtime. Our board was impressed.", name: "Thomas H.", role: "IT Director", company: "Banking", rating: 5, avatar: avatar("Thomas") },
  { quote: "They rebuilt our reporting infrastructure from the ground up. What once took 3 analysts now runs automatically every morning.", name: "Aisha N.", role: "Analytics Director", company: "Insurance Group", rating: 5, avatar: avatar("Aisha") },
  { quote: "Their security-first engineering approach gave us full confidence. Encryption, access controls, and audit logging were built into the architecture from day one.", name: "David L.", role: "CISO", company: "FinServ Company", rating: 5, avatar: avatar("David") },
  { quote: "We needed a partner, not a vendor. Ripple Nexus delivered on that distinction perfectly.", name: "Linda W.", role: "VP of Engineering", company: "Enterprise SaaS", rating: 5, avatar: avatar("Linda") },
  { quote: "The dashboard they built gives us real-time visibility into every aspect of our operations.", name: "Omar F.", role: "General Manager", company: "Hospitality Group", rating: 5, avatar: avatar("Omar") },
  { quote: "They fixed our checkout flow and we saw a 35% decrease in cart abandonment within the first week.", name: "Emily R.", role: "E-Commerce Manager", company: "DTC Brand", rating: 5, avatar: avatar("Emily") },
  { quote: "Our API response times dropped from 3 seconds to 200ms after their backend optimization.", name: "Suresh V.", role: "Lead Engineer", company: "Data Platform", rating: 5, avatar: avatar("Suresh") },
  { quote: "They trained our team alongside the build. We're fully self-sufficient now. That's rare.", name: "Jessica B.", role: "Operations Lead", company: "Non-Profit", rating: 4, avatar: avatar("Jessica") },
  { quote: "Their process is transparent. Weekly updates, clear milestones, no surprises. Exactly what we needed.", name: "Patricia M.", role: "Project Manager", company: "Consulting Firm", rating: 5, avatar: avatar("Patricia") },
  { quote: "We scaled from 1,000 to 50,000 users without a single architectural change. Future-proof design.", name: "Nathan S.", role: "CTO", company: "Social Platform", rating: 5, avatar: avatar("Nathan") },
  { quote: "The chatbot they built handles appointment scheduling end-to-end. Our reception staff can focus on patients.", name: "Dr. Michael P.", role: "Clinic Owner", company: "Dental Practice", rating: 5, avatar: avatar("Michael") },
  { quote: "They turned our spreadsheet-based workflow into a proper system. The team loves it.", name: "Rachel K.", role: "Team Lead", company: "Real Estate Agency", rating: 5, avatar: avatar("Rachel") },
  { quote: "Post-launch support has been exceptional. They're responsive, proactive, and always have solutions.", name: "Andrew C.", role: "Founder", company: "MarTech Startup", rating: 5, avatar: avatar("Andrew") },
  { quote: "Our SEO rankings improved dramatically after they restructured our site architecture and content strategy.", name: "Sophie H.", role: "Content Director", company: "Media Company", rating: 5, avatar: avatar("Sophie") },
  { quote: "They reduced our infrastructure costs by 45% while improving performance. That's engineering excellence.", name: "Ryan W.", role: "VP of Infrastructure", company: "Cloud Services", rating: 5, avatar: avatar("Ryan") },
  { quote: "Integration between our existing tools was seamless. No disruption to daily operations during the transition.", name: "Carlos D.", role: "IT Manager", company: "Retail Chain", rating: 5, avatar: avatar("Carlos") },
  { quote: "They built our analytics dashboard in record time. Now every decision is data-driven.", name: "Hannah T.", role: "Analytics Lead", company: "E-Learning", rating: 5, avatar: avatar("Hannah") },
  { quote: "Working with Ripple Nexus feels like having a world-class tech team in-house. Highly recommended.", name: "Peter A.", role: "Managing Director", company: "Advisory Firm", rating: 5, avatar: avatar("Peter") },
  { quote: "They identified bottlenecks in our workflow we didn't even know existed. Revenue up 28% in Q1.", name: "Lisa M.", role: "Business Owner", company: "Services Company", rating: 5, avatar: avatar("Lisa") },
  { quote: "The mobile-first approach they took made all the difference. 60% of our users are on mobile now.", name: "George P.", role: "Digital Lead", company: "News Platform", rating: 5, avatar: avatar("George") },
  { quote: "From our first call to launch, everything was professional and well-organized. The delivery itself was excellent.", name: "Diana S.", role: "Project Sponsor", company: "Government Agency", rating: 4, avatar: avatar("Diana") },
  { quote: "They're not just engineers. They're strategists who happen to write excellent code. That's the difference.", name: "Mark R.", role: "CEO", company: "Growth Agency", rating: 5, avatar: avatar("Mark") },
  { quote: "Our delivery accuracy jumped to 98.5% after their logistics platform went live. Game changer.", name: "Yuki O.", role: "Supply Chain Head", company: "Distribution Co.", rating: 5, avatar: avatar("Yuki") },
  { quote: "The AI recommendations engine they built increased our average order value by 22%.", name: "Clara V.", role: "Revenue Lead", company: "Marketplace", rating: 5, avatar: avatar("Clara") },
];

// Metric-heavy testimonials pinned at the top as featured proof
const featuredProof = [
  {
    metric: "68%",
    metricLabel: "Faster Response Time",
    quote: "Ripple Nexus didn't just build our platform — they understood our business first. The CRM they delivered cut our response time by 68%.",
    name: "Arjun M.",
    role: "Operations Lead",
    company: "FMCG Distribution",
    avatar: avatar("Arjun"),
  },
  {
    metric: "3×",
    metricLabel: "Customer Activation",
    quote: "They rebuilt our entire SaaS onboarding flow. Customer activation improved by 3x in just 6 weeks.",
    name: "Chen W.",
    role: "Product Lead",
    company: "SaaS Platform",
    avatar: avatar("Chen"),
  },
  {
    metric: "60%",
    metricLabel: "Infrastructure Cost Saved",
    quote: "Their cloud migration was seamless. We went from 99.2% to 99.97% uptime and saved 60% on infrastructure costs.",
    name: "Priya S.",
    role: "CTO",
    company: "Fintech Startup",
    avatar: avatar("Priya"),
  },
];

const VISIBLE_COUNT = 6;

const TestimonialsSection = () => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(testimonials.length / VISIBLE_COUNT);
  const current = testimonials.slice(page * VISIBLE_COUNT, page * VISIBLE_COUNT + VISIBLE_COUNT);

  return (
    <section className="section-spacing">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-medium text-sm tracking-wide uppercase mb-4"
          >
            Client Voices
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4"
          >
            Verified Outcomes from <span className="text-gradient">Real Deployments</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Specific results from specific engagements. No generic metrics, no anonymous initials.
          </motion.p>
        </div>

        {/* Featured Proof Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {featuredProof.map((fp, i) => (
            <motion.div
              key={fp.metric}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45, ease: "easeOut" }}
              className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.08] to-transparent p-6 overflow-hidden"
            >
              <div className="absolute top-4 right-4 opacity-10">
                <Quote size={32} className="text-primary" />
              </div>
              <div className="mb-4">
                <span className="text-4xl font-display font-bold text-gradient">{fp.metric}</span>
                <span className="ml-2 text-xs uppercase tracking-widest text-white/50 font-medium">{fp.metricLabel}</span>
              </div>
              <p className="text-white/75 text-sm leading-relaxed mb-5">"{fp.quote}"</p>
              <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                <img
                  src={fp.avatar}
                  alt={fp.name}
                  className="w-9 h-9 rounded-full border border-white/15 bg-[#0d1117] object-cover shrink-0"
                  loading="lazy"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = "none";
                    (el.nextElementSibling as HTMLElement)?.style.setProperty("display", "flex");
                  }}
                />
                <div
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/40 to-secondary/20 items-center justify-center text-white font-semibold text-xs border border-white/10 shrink-0"
                  style={{ display: "none" }}
                >
                  {fp.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">{fp.name}</p>
                  <p className="text-white/45 text-[11px]">{fp.role} · {fp.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {current.map((t, i) => (
            <motion.div
              key={`${page}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.35, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-elevated p-6 group hover:border-primary/25 hover:shadow-[0_8px_32px_-8px_hsl(222_74%_48%/0.2)] transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={13}
                    className={s < t.rating ? "fill-accent text-accent" : "fill-white/10 text-white/10"}
                  />
                ))}
              </div>
              <p className="text-foreground/75 text-[15px] leading-relaxed mb-5">"{t.quote}"</p>
              <div className="flex items-center gap-3 border-t border-border/60 pt-4">
                <div className="relative shrink-0">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full border border-white/15 bg-[#0d1117] object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = "none";
                      (el.nextElementSibling as HTMLElement)?.style.setProperty("display", "flex");
                    }}
                  />
                  <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 items-center justify-center text-white font-semibold text-sm border border-white/10"
                    style={{ display: "none" }}
                  >
                    {t.name.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-foreground text-sm font-semibold truncate">{t.name}</p>
                    <BadgeCheck size={13} className="text-primary flex-shrink-0" />
                  </div>
                  <p className="text-white/50 text-xs truncate">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === page
                  ? "bg-primary w-8"
                  : "bg-border hover:bg-primary/30"
              }`}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
