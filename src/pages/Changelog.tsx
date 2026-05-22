import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";

const changelogData = [
  {
    version: "v2.4.0",
    date: "October 12, 2024",
    title: "Multi-AZ Kubernetes Failover & Nexus Core Updates",
    changes: [
      "Deployed automated multi-AZ failover across all Enterprise clusters, reducing theoretical downtime window to < 1.2s.",
      "Introduced custom RBAC roles in the Control Plane for granular team access.",
      "Optimized Nexus Core data ingestion layer, reducing latency on large CSV uploads by 40%.",
    ],
    type: "infrastructure",
  },
  {
    version: "v2.3.5",
    date: "September 28, 2024",
    title: "Intent Scoring Models Updated in Nexus Flow",
    changes: [
      "Upgraded underlying LLM routing in Nexus Flow. Agents now successfully categorize complex ambiguous enterprise leads with 94% accuracy.",
      "Added native webhook support for HubSpot custom objects.",
      "Fixed an edge case where rate-limiting would aggressively throttle sustained API calls during peak ingestion.",
    ],
    type: "feature",
  },
  {
    version: "v2.3.0",
    date: "September 10, 2024",
    title: "Nexus Python SDK Beta Release",
    changes: [
      "Released `nexus-sdk` 0.1.0 on PyPI for early access enterprise clients.",
      "Added support for programmatic DataStream mounting directly via the SDK.",
      "Deprecated legacy v1 authentication tokens in favor of short-lived rotating JWTs.",
    ],
    type: "developer",
  },
];

const Changelog = () => {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--obsidian)" }}>
      <SEOHead
        title="Changelog & Release Notes | Ripple Nexus"
        description="Track the velocity of the Ripple Nexus platform. Weekly release notes, infrastructure updates, and API deprecations."
        canonical="https://www.theripplenexus.com/changelog"
      />
      <Navbar />

      <main className="pt-32 pb-24 relative z-10">
        <section className="section-padding max-w-4xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="eyebrow mb-6">Changelog</p>
            <h1
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.04em", color: "var(--pearl)" }}
            >
              Platform velocity.
            </h1>
            <p className="font-body text-lg leading-relaxed max-w-2xl" style={{ color: "var(--graphite-300)" }}>
              A chronological ledger of infrastructure upgrades, feature releases, and API modifications across the Nexus ecosystem.
            </p>
          </motion.div>
        </section>

        <section className="section-padding max-w-4xl mx-auto">
          <div className="flex flex-col gap-12">
            {changelogData.map((release, index) => (
              <motion.div
                key={release.version}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col md:flex-row gap-6 md:gap-12"
              >
                {/* Date & Version column */}
                <div className="md:w-48 shrink-0 flex flex-col gap-1">
                  <span className="font-mono text-sm" style={{ color: "var(--pearl)" }}>{release.version}</span>
                  <span className="font-body text-sm" style={{ color: "var(--graphite-400)" }}>{release.date}</span>
                  <span 
                    className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded mt-3 inline-block w-max"
                    style={{ 
                      background: release.type === 'infrastructure' ? 'rgba(34,211,238,0.1)' : 
                                 release.type === 'developer' ? 'rgba(124,92,255,0.1)' : 'rgba(168,255,104,0.1)',
                      color: release.type === 'infrastructure' ? 'var(--ion-cyan)' : 
                             release.type === 'developer' ? 'var(--nexus-violet)' : 'var(--quantum-lime)'
                    }}
                  >
                    {release.type}
                  </span>
                </div>

                {/* Content column */}
                <div className="flex-1 pb-12" style={{ borderBottom: index !== changelogData.length -1 ? "1px solid var(--graphite-600)" : "none" }}>
                  <h3 className="font-display font-semibold text-xl mb-6" style={{ color: "var(--pearl)" }}>
                    {release.title}
                  </h3>
                  <ul className="flex flex-col gap-4">
                    {release.changes.map((change, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "var(--graphite-400)" }} />
                        <span className="font-body text-[15px] leading-relaxed" style={{ color: "var(--graphite-300)" }}>
                          {change}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Changelog;
