import { Code2, Braces, TerminalSquare, Layers } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";

const DeveloperHub = () => {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--obsidian)" }}>
      <SEOHead
        title="Developer Hub & APIs | Ripple Nexus"
        description="Integrate Ripple Nexus primitives into your enterprise architecture. Documentation, API reference, and SDKs."
        canonical="https://www.theripplenexus.com/docs"
      />
      <Navbar />

      <main className="pt-32 pb-24 relative z-10">
        <section className="section-padding max-w-4xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="eyebrow mb-6">Developer Hub</p>
            <h1
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.04em", color: "var(--pearl)" }}
            >
              Built for <br />
              <span style={{ color: "var(--graphite-400)" }}>engineers.</span>
            </h1>
            <p className="font-body text-lg leading-relaxed max-w-2xl" style={{ color: "var(--graphite-300)" }}>
              Ripple Nexus provides a robust, developer-first integration layer. Explore our REST and GraphQL APIs, webhooks, and pre-built SDKs designed for seamless interoperability with your legacy stack.
            </p>
          </motion.div>
        </section>

        <section className="section-padding max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--graphite-600)" }}>
            {[
              {
                icon: Braces,
                title: "REST & GraphQL APIs",
                desc: "Full programmatic access to your intelligence and automation systems. Enterprise API keys are provisioned during your implementation phase.",
              },
              {
                icon: TerminalSquare,
                title: "Real-Time Webhooks",
                desc: "Subscribe to systemic events instantly. Route intelligence data back into your CRM, ERP, or custom dashboard in milliseconds.",
              },
              {
                icon: Layers,
                title: "Integration Architecture",
                desc: "Read our technical blueprints on how to securely connect Nexus Primitives with Snowflake, Salesforce, AWS, and GCP environments.",
              },
              {
                icon: Code2,
                title: "SDKs & Libraries",
                desc: "Official libraries for Node.js, Python, and Go. Currently available to enterprise partners under active deployment.",
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 p-8 rounded-xl"
            style={{ border: "1px solid var(--graphite-600)", background: "rgba(124,92,255,0.03)" }}
          >
            <p className="font-body text-sm italic" style={{ color: "var(--graphite-400)" }}>
              Access to comprehensive technical documentation, changelogs, and sandbox environments is currently gated for active enterprise clients. If you are a prospective client evaluating architecture compatibility, please request access via your assigned systems architect.
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DeveloperHub;
