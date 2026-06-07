import { motion } from "framer-motion";

const ArchitectureDiagram = () => {
  const nodes = [
    { id: "1", label: "Client CRM", type: "external" },
    { id: "2", label: "API Gateway Mesh", type: "infra" },
    { id: "3", label: "n8n Orchestration", type: "core" },
    { id: "4", label: "Proprietary LLM Agent", type: "core" },
    { id: "5", label: "Vector DB (RAG)", type: "data" },
    { id: "6", label: "PostgreSQL (Schema)", type: "data" },
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-[#0c0d12] p-6 shadow-2xl relative overflow-hidden">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 h-full min-h-[300px]">
        {/* Layer 1: Ingestion */}
        <div className="flex flex-col gap-4">
          <Node label="Client CRM / Data" type="external" />
          <Node label="Webhook Event" type="external" />
        </div>

        {/* Connector */}
        <Connector direction="horizontal" />

        {/* Layer 2: Mesh & Core */}
        <div className="flex flex-col gap-6">
          <Node label="API Gateway (Node.js)" type="infra" />
          <div className="flex items-center gap-4">
            <Connector direction="vertical" height="h-8" />
          </div>
          <div className="p-4 rounded-lg border border-[var(--nexus-violet)] bg-[#1a162b] relative">
            <span className="absolute -top-2.5 left-3 bg-[#0c0d12] px-2 text-[0.6rem] font-mono text-[var(--nexus-violet)] uppercase">Core Engine</span>
            <div className="flex flex-col gap-3">
              <Node label="n8n Event Orchestrator" type="core" />
              <Node label="Intent Scoring Agent" type="core" />
            </div>
          </div>
        </div>

        {/* Connector */}
        <Connector direction="horizontal" />

        {/* Layer 3: Persistence */}
        <div className="flex flex-col gap-4">
          <Node label="PostgreSQL (ACID)" type="data" />
          <Node label="Vector DB (RAG)" type="data" />
          <Node label="Datadog Telemetry" type="infra" />
        </div>
      </div>
    </div>
  );
};

const Node = ({ label, type }: { label: string, type: 'external' | 'infra' | 'core' | 'data' }) => {
  const styles = {
    external: "border-white/20 bg-white/5 text-white/70",
    infra: "border-[var(--ion-cyan)]/50 bg-[var(--ion-cyan)]/10 text-[var(--ion-cyan)]",
    core: "border-[var(--nexus-violet)]/80 bg-[var(--nexus-violet)]/20 text-white",
    data: "border-green-500/50 bg-green-500/10 text-green-400"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`px-4 py-2.5 rounded-md border backdrop-blur-sm flex items-center justify-center text-center shadow-lg w-40 h-14 ${styles[type]}`}
    >
      <span className="font-mono text-[0.65rem] tracking-wide leading-tight">{label}</span>
    </motion.div>
  );
};

const Connector = ({ direction, height }: { direction: 'horizontal' | 'vertical', height?: string }) => {
  return (
    <div className={`hidden md:flex items-center justify-center ${direction === 'horizontal' ? 'flex-1 h-px' : height + ' w-px'}`}>
      <div className={`bg-white/20 ${direction === 'horizontal' ? 'w-full h-px' : 'h-full w-px'}`} />
    </div>
  );
}

export default ArchitectureDiagram;
