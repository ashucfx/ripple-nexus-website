import { Activity, Server, Database, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";

const Reliability = () => {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--obsidian)" }}>
      <SEOHead
        title="Reliability & SLAs | Ripple Nexus"
        description="Global multi-AZ infrastructure engineered for 99.97% uptime and enterprise-grade resilience."
        canonical="https://www.theripplenexus.com/reliability"
      />
      <Navbar />

      <main className="pt-32 pb-24 relative z-10">
        <section className="section-padding max-w-4xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="eyebrow mb-6">Global Infrastructure</p>
            <h1
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.04em", color: "var(--pearl)" }}
            >
              Engineered for <br />
              <span style={{ color: "var(--graphite-400)" }}>absolute continuity.</span>
            </h1>
            <p className="font-body text-lg leading-relaxed max-w-2xl" style={{ color: "var(--graphite-300)" }}>
              Downtime is not an option. Our systems are deployed across multi-AZ Kubernetes clusters with automated failover and global edge caching, backed by a financially guaranteed 99.97% SLA.
            </p>
          </motion.div>
        </section>

        <section className="section-padding max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--graphite-600)" }}>
            {[
              {
                icon: Activity,
                title: "99.97% Uptime SLA",
                desc: "Financially backed Service Level Agreements ensuring your operational intelligence systems remain online.",
              },
              {
                icon: Server,
                title: "Multi-AZ Resilience",
                desc: "Infrastructure deployed across multiple Availability Zones to ensure automatic failover and zero single points of failure.",
              },
              {
                icon: Globe,
                title: "Global Edge Network",
                desc: "Sub-100ms latency worldwide via Vercel and Cloudflare edge networks, ensuring real-time response anywhere.",
              },
              {
                icon: Database,
                title: "Continuous Backups",
                desc: "Point-in-time recovery with continuous database replication across independent geographic regions.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 flex flex-col items-start gap-5"
                style={{ background: "var(--ink)" }}
              >
                <feature.icon size={28} style={{ color: "var(--nexus-violet)" }} />
                <h3 className="font-display font-semibold text-xl" style={{ color: "var(--pearl)" }}>{feature.title}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "var(--graphite-400)" }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Reliability;
