import { Shield, ShieldCheck, Lock, FileText, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";

const SecurityCenter = () => {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--obsidian)" }}>
      <SEOHead
        title="Security & Trust Center | Ripple Nexus"
        description="Enterprise-grade security, Zero-Trust architecture, and global compliance standards at Ripple Nexus."
        canonical="https://www.theripplenexus.com/security"
      />
      <Navbar />

      <main className="pt-32 pb-24 relative z-10">
        <section className="section-padding max-w-4xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="eyebrow mb-6">Trust Center</p>
            <h1
              className="font-display font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.04em", color: "var(--pearl)" }}
            >
              Enterprise security.<br />
              <span style={{ color: "var(--graphite-400)" }}>Zero compromises.</span>
            </h1>
            <p className="font-body text-lg leading-relaxed max-w-2xl" style={{ color: "var(--graphite-300)" }}>
              Ripple Nexus is architected on a Zero-Trust security model. We protect your operational data with the same rigor we apply to our own infrastructure.
            </p>
          </motion.div>
        </section>

        <section className="section-padding max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "var(--graphite-600)" }}>
            {[
              {
                icon: ShieldCheck,
                title: "SOC 2 Type II Ready",
                desc: "Our platform and organizational controls are built to exceed the stringent requirements of SOC 2 Type II compliance.",
              },
              {
                icon: Lock,
                title: "AES-256 Encryption",
                desc: "All data is encrypted at rest using AES-256 and in transit using TLS 1.3 across our global infrastructure.",
              },
              {
                icon: Shield,
                title: "Zero-Trust Architecture",
                desc: "Every request is verified. Identity and context are continuously validated across all network boundaries.",
              },
              {
                icon: FileText,
                title: "GDPR & DPDP Compliant",
                desc: "Full compliance with global data privacy regulations, including GDPR and the Indian Digital Personal Data Protection Act.",
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

export default SecurityCenter;
