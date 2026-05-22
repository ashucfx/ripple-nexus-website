import { motion } from "framer-motion";

const ControlPlaneSection = () => {
  return (
    <section className="py-28 relative z-10" style={{ borderTop: "1px solid var(--graphite-600)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-[0.6875rem] font-semibold tracking-widest uppercase mb-6" style={{ color: "var(--graphite-400)" }}>
              The Nexus Control Plane
            </p>
            <h2
              className="font-display font-bold leading-tight mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", color: "var(--pearl)" }}
            >
              Total operational visibility.
            </h2>
            <div className="space-y-6 font-body text-[1.05rem] leading-relaxed" style={{ color: "var(--graphite-300)" }}>
              <p>
                You don't just receive code in a repository. Every system we deploy is governed by the Nexus Control Plane — a unified, secure dashboard where you manage your enterprise architecture.
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "var(--pearl)" }} />
                  <div>
                    <strong className="block font-medium" style={{ color: "var(--pearl)" }}>Real-Time Telemetry</strong>
                    <span className="text-sm">Monitor agent decisions, API latency, and operational health globally.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "var(--pearl)" }} />
                  <div>
                    <strong className="block font-medium" style={{ color: "var(--pearl)" }}>Governance & Access</strong>
                    <span className="text-sm">Granular RBAC controls over your proprietary logic and connected data streams.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "var(--pearl)" }} />
                  <div>
                    <strong className="block font-medium" style={{ color: "var(--pearl)" }}>Cost Management</strong>
                    <span className="text-sm">Live LLM inference tracking and token optimization caps.</span>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right: The Product UI Image & Terminal */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ border: "1px solid var(--graphite-600)" }}
            >
              <div className="w-full h-10 flex items-center px-4" style={{ background: "var(--obsidian)", borderBottom: "1px solid var(--graphite-600)" }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--graphite-500)" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--graphite-500)" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--graphite-500)" }} />
                </div>
              </div>
              <img 
                src="/nexus-control-plane.png" 
                alt="Nexus Control Plane Dashboard" 
                className="w-full h-auto object-cover opacity-90 mix-blend-lighten"
                style={{ background: "var(--ink)", maxHeight: "300px" }}
              />
            </motion.div>

            {/* The Terminal Reality Snippet */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl overflow-hidden shadow-2xl font-mono text-[13px] leading-relaxed"
              style={{ border: "1px solid var(--graphite-600)", background: "var(--ink)" }}
            >
              <div className="w-full h-10 flex items-center justify-between px-4" style={{ background: "var(--obsidian)", borderBottom: "1px solid var(--graphite-600)" }}>
                <span style={{ color: "var(--graphite-400)" }}>ingest_pipeline.py</span>
                <span style={{ color: "var(--graphite-500)", fontSize: "11px" }}>Python 3.11</span>
              </div>
              <div className="p-6 overflow-x-auto whitespace-pre">
                <span style={{ color: "#c678dd" }}>from</span> <span style={{ color: "var(--pearl)" }}>nexus</span> <span style={{ color: "#c678dd" }}>import</span> <span style={{ color: "#e5c07b" }}>NexusClient</span><br />
                <span style={{ color: "#c678dd" }}>from</span> <span style={{ color: "var(--pearl)" }}>nexus.intelligence</span> <span style={{ color: "#c678dd" }}>import</span> <span style={{ color: "#e5c07b" }}>DataStream</span><br />
                <br />
                <span style={{ color: "#7f848e", fontStyle: "italic" }}># Initialize Enterprise SDK</span><br />
                <span style={{ color: "var(--pearl)" }}>client = </span><span style={{ color: "#e5c07b" }}>NexusClient</span><span style={{ color: "var(--pearl)" }}>(api_key=</span><span style={{ color: "#98c379" }}>"nx_live_9a8b7..."</span><span style={{ color: "var(--pearl)" }}>)</span><br />
                <br />
                <span style={{ color: "#7f848e", fontStyle: "italic" }}># Mount a new unstructured data source to the Core</span><br />
                <span style={{ color: "var(--pearl)" }}>stream = client.core.</span><span style={{ color: "#61afef" }}>mount_stream</span><span style={{ color: "var(--pearl)" }}>(</span><br />
                <span style={{ color: "var(--pearl)" }}>    source=</span><span style={{ color: "#98c379" }}>"s3://acme-corp-raw-data"</span><span style={{ color: "var(--pearl)" }}>,</span><br />
                <span style={{ color: "var(--pearl)" }}>    auto_embed=</span><span style={{ color: "#d19a66" }}>True</span><br />
                <span style={{ color: "var(--pearl)" }}>)</span><br />
                <br />
                <span style={{ color: "var(--pearl)" }}>stream.</span><span style={{ color: "#61afef" }}>sync</span><span style={{ color: "var(--pearl)" }}>()</span><br />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ControlPlaneSection;
