import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { useState } from "react";

const testimonials = [
  { quote: "Ripple Nexus didn't just build our platform — they understood our business first. The CRM they delivered cut our response time by 68%.", name: "Arjun M.", role: "Operations Lead", company: "FMCG Distribution", rating: 5 },
  { quote: "Their cloud migration was seamless. We went from 99.2% to 99.97% uptime and saved 60% on infrastructure costs.", name: "Priya S.", role: "CTO", company: "Fintech Startup", rating: 5 },
  { quote: "What impressed me most was their process. They asked the right questions before writing any code.", name: "Daniel K.", role: "Founder", company: "EdTech Platform", rating: 5 },
  { quote: "Our e-commerce store went from crashing during sales to handling 10x traffic surges with zero downtime.", name: "Sarah L.", role: "E-Commerce Director", company: "Fashion Retail", rating: 5 },
  { quote: "The automation they built saved our team 20+ hours per week. ROI was visible within the first month.", name: "Vikram R.", role: "COO", company: "Logistics Firm", rating: 5 },
  { quote: "They rebuilt our entire SaaS onboarding flow. Customer activation improved by 3x in just 6 weeks.", name: "Chen W.", role: "Product Lead", company: "SaaS Platform", rating: 5 },
  { quote: "The AI chatbot they integrated handles 70% of our customer queries — our support team finally has bandwidth.", name: "Fatima A.", role: "Support Manager", company: "Insurance Tech", rating: 5 },
  { quote: "Our website conversion rate jumped from 1.2% to 4.8% after they redesigned our landing pages.", name: "James T.", role: "Marketing Head", company: "B2B Services", rating: 5 },
  { quote: "They didn't oversell. They listened, proposed a lean MVP, and delivered ahead of schedule.", name: "Neha P.", role: "Startup Founder", company: "HealthTech", rating: 5 },
  { quote: "The ERP system they built replaced three separate tools we were paying for. Huge cost savings.", name: "Roberto G.", role: "Operations Manager", company: "Manufacturing", rating: 5 },
  { quote: "Our patient record retrieval went from 12 minutes to 30 seconds. The impact on patient care is immeasurable.", name: "Dr. Ananya K.", role: "Medical Director", company: "Multi-Specialty Clinic", rating: 5 },
  { quote: "They took our vague idea and turned it into a fully functional platform in under 90 days.", name: "Alex M.", role: "Co-Founder", company: "PropTech Startup", rating: 5 },
  { quote: "Professional, responsive, and genuinely invested in our success. Rare combination in this industry.", name: "Samantha J.", role: "CEO", company: "Digital Agency", rating: 5 },
  { quote: "The LinkedIn optimization they did for me landed me 3 interview calls within 2 weeks. Worth every penny.", name: "Rahul D.", role: "Senior Developer", company: "Career Client", rating: 5 },
  { quote: "They automated our invoice processing — what used to take 2 days now happens in 15 minutes.", name: "Kenji T.", role: "Finance Director", company: "Import/Export", rating: 5 },
  { quote: "Our mobile app went from concept to App Store in 10 weeks. Clean code, great UX, zero bugs at launch.", name: "Maria C.", role: "Product Owner", company: "Fitness App", rating: 5 },
  { quote: "They migrated our legacy system with zero data loss and minimal downtime. Our board was impressed.", name: "Thomas H.", role: "IT Director", company: "Banking", rating: 5 },
  { quote: "The career branding package completely transformed how recruiters perceive me. I got my dream role.", name: "Aisha N.", role: "Marketing Manager", company: "Career Client", rating: 5 },
  { quote: "Their attention to security gave us confidence. SOC 2 compliance was built into the architecture from day one.", name: "David L.", role: "CISO", company: "FinServ Company", rating: 5 },
  { quote: "We needed a partner, not a vendor. Ripple Nexus delivered on that distinction perfectly.", name: "Linda W.", role: "VP of Engineering", company: "Enterprise SaaS", rating: 5 },
  { quote: "The dashboard they built gives us real-time visibility into every aspect of our operations.", name: "Omar F.", role: "General Manager", company: "Hospitality Group", rating: 5 },
  { quote: "They fixed our checkout flow and we saw a 35% decrease in cart abandonment within the first week.", name: "Emily R.", role: "E-Commerce Manager", company: "DTC Brand", rating: 5 },
  { quote: "Our API response times dropped from 3 seconds to 200ms after their backend optimization.", name: "Suresh V.", role: "Lead Engineer", company: "Data Platform", rating: 5 },
  { quote: "They trained our team alongside the build. We're fully self-sufficient now. That's rare.", name: "Jessica B.", role: "Operations Lead", company: "Non-Profit", rating: 5 },
  { quote: "The resume they crafted for me was night and day different from what I had. Landed interviews at FAANG.", name: "Kevin Z.", role: "Software Engineer", company: "Career Client", rating: 5 },
  { quote: "Their process is transparent. Weekly updates, clear milestones, no surprises. Exactly what we needed.", name: "Patricia M.", role: "Project Manager", company: "Consulting Firm", rating: 5 },
  { quote: "We scaled from 1,000 to 50,000 users without a single architectural change. Future-proof design.", name: "Nathan S.", role: "CTO", company: "Social Platform", rating: 5 },
  { quote: "The chatbot they built handles appointment scheduling end-to-end. Our reception staff can focus on patients.", name: "Dr. Michael P.", role: "Clinic Owner", company: "Dental Practice", rating: 5 },
  { quote: "They turned our spreadsheet-based workflow into a proper system. The team loves it.", name: "Rachel K.", role: "Team Lead", company: "Real Estate Agency", rating: 5 },
  { quote: "Post-launch support has been exceptional. They're responsive, proactive, and always have solutions.", name: "Andrew C.", role: "Founder", company: "MarTech Startup", rating: 5 },
  { quote: "Our SEO rankings improved dramatically after they restructured our site architecture and content strategy.", name: "Sophie H.", role: "Content Director", company: "Media Company", rating: 5 },
  { quote: "They reduced our infrastructure costs by 45% while improving performance. That's engineering excellence.", name: "Ryan W.", role: "VP of Infrastructure", company: "Cloud Services", rating: 5 },
  { quote: "The cover letter and positioning strategy they built helped me negotiate a 40% salary increase.", name: "Meera J.", role: "Product Manager", company: "Career Client", rating: 5 },
  { quote: "Integration between our existing tools was seamless. No disruption to daily operations during the transition.", name: "Carlos D.", role: "IT Manager", company: "Retail Chain", rating: 5 },
  { quote: "They built our analytics dashboard in record time. Now every decision is data-driven.", name: "Hannah T.", role: "Analytics Lead", company: "E-Learning", rating: 5 },
  { quote: "Working with Ripple Nexus feels like having a world-class tech team in-house. Highly recommended.", name: "Peter A.", role: "Managing Director", company: "Advisory Firm", rating: 5 },
  { quote: "They identified bottlenecks in our workflow we didn't even know existed. Revenue up 28% in Q1.", name: "Lisa M.", role: "Business Owner", company: "Services Company", rating: 5 },
  { quote: "The mobile-first approach they took made all the difference. 60% of our users are on mobile now.", name: "George P.", role: "Digital Lead", company: "News Platform", rating: 5 },
  { quote: "From our first call to launch, everything was professional and well-organized. No scope creep.", name: "Diana S.", role: "Project Sponsor", company: "Government Agency", rating: 5 },
  { quote: "They're not just coders — they're strategists who happen to code. That's the difference.", name: "Mark R.", role: "CEO", company: "Growth Agency", rating: 5 },
  { quote: "Our delivery accuracy jumped to 98.5% after their logistics platform went live. Game changer.", name: "Yuki O.", role: "Supply Chain Head", company: "Distribution Co.", rating: 5 },
  { quote: "The AI recommendations engine they built increased our average order value by 22%.", name: "Clara V.", role: "Revenue Lead", company: "Marketplace", rating: 5 },
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
            Trusted by <span className="text-gradient">40+ Businesses</span> Worldwide
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Real words from real people who chose to grow with us.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {current.map((t, i) => (
            <motion.div
              key={`${page}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i, duration: 0.4 }}
              className="card-elevated p-6 hover-lift group"
              style={{ transition: "transform 0.4s cubic-bezier(.22,.68,0,.71), box-shadow 0.4s ease" }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={14} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-foreground text-sm font-semibold truncate">{t.name}</p>
                    <BadgeCheck size={14} className="text-primary flex-shrink-0" />
                  </div>
                  <p className="text-muted-foreground text-xs truncate">{t.role} · {t.company}</p>
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
