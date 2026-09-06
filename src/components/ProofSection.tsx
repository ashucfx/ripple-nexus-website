import React, { useState } from "react";
import { ArrowUpRight, Cpu, Layers, Database, ShieldCheck } from "lucide-react";
import { telemetry } from "../analytics/telemetry";

interface ArchitectureProofItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  specs: { label: string; value: string }[];
  overview: string;
}

const PROOF_ITEMS: ArchitectureProofItem[] = [
  {
    id: "control-plane",
    tag: "LIVE SYSTEMS CONTROL",
    title: "Operational Control Plane & Workflow Hub",
    subtitle: "Centralized event orchestration, service mesh telemetry, and permissioned routing.",
    imageSrc: "/nexus-control-plane.jpg",
    overview: "Unified administrative interface connecting multi-cloud workers, database synchronization jobs, and automated alerts without vendor lock-in.",
    specs: [
      { label: "Throughput Latency", value: "< 25ms p95" },
      { label: "Data Pipeline", value: "Real-time SSE" },
      { label: "Access Model", value: "Strict RBAC" },
    ],
  },
  {
    id: "multi-az-k8s",
    tag: "HIGH AVAILABILITY",
    title: "Multi-AZ Kubernetes Failover Topology",
    subtitle: "Automated traffic failover across isolated cloud availability zones.",
    imageSrc: "/multi-az-k8s.jpg",
    overview: "Production infrastructure topology deployed on AWS/GCP with active-active pod auto-scaling, ingress load balancing, and zero-downtime rolling releases.",
    specs: [
      { label: "Target Availability", value: "99.99% Uptime" },
      { label: "Failover Threshold", value: "< 30s Automated" },
      { label: "Provisioning", value: "Infrastructure as Code" },
    ],
  },
  {
    id: "rag-topology",
    tag: "DETERMINISTIC AI",
    title: "Private Data RAG & Vector Pipeline",
    subtitle: "Hallucination-free reasoning over proprietary enterprise data.",
    imageSrc: "/rag-topology.jpg",
    overview: "Multi-stage retrieval and reranking topology using pgvector/Pinecone. Grounding LLM responses strictly in company documents with zero leakage.",
    specs: [
      { label: "Hallucination Rate", value: "0% Deterministic Fallback" },
      { label: "Vector Search Time", value: "< 45ms" },
      { label: "Data Boundary", value: "Tenant-Isolated Encryption" },
    ],
  },
  {
    id: "data-ingestion",
    tag: "DATA INFRASTRUCTURE",
    title: "High-Throughput Streaming Ingestion Mesh",
    subtitle: "Stream validation, schema deduplication, and transactional routing.",
    imageSrc: "/data-ingestion.jpg",
    overview: "Event-driven distributed ingestion pipeline processing millions of daily event payloads from disparate POS, ERP, and mobile client endpoints.",
    specs: [
      { label: "Payload Capacity", value: "10K+ events / sec" },
      { label: "Data Loss", value: "Zero Guaranteed Delivery" },
      { label: "Buffer Layer", value: "Kafka / Redis Streams" },
    ],
  },
];

export const ProofSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<ArchitectureProofItem>(PROOF_ITEMS[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const selectProof = (item: ArchitectureProofItem) => {
    setActiveItem(item);
    telemetry.track("hero_work_click", { proofId: item.id });
  };

  return (
    <section id="proof" className="py-24 border-b border-[#1E2028] bg-[#08090C]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1E2028]">
          <div>
            <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest mb-3">
              [STATE 03 // ARCHITECTURAL PROOF]
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight uppercase leading-[1.05]">
              We don’t just design interfaces.
              <br />
              <span className="text-[#8E93A4]">We build the systems behind them.</span>
            </h2>
          </div>
          <p className="font-body text-sm text-[#8E93A4] max-w-md">
            Real architecture diagrams and running system topology from live client deployments. We deliver verified technical reality, not speculative Figma mockups.
          </p>
        </div>

        {/* Console Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1E2028] my-8 border border-[#1E2028]">
          {PROOF_ITEMS.map((item, idx) => {
            const isSelected = activeItem.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => selectProof(item)}
                className={`text-left p-3.5 sm:p-4 transition-colors duration-150 relative ${
                  isSelected ? "bg-[#14161F] text-white" : "bg-[#08090C] text-[#8E93A4] hover:bg-[#0E1017] hover:text-white"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#00F0FF]" />
                )}
                <div className="font-mono text-[10px] text-[#00F0FF] uppercase tracking-wider mb-1">
                  0{idx + 1} // {item.tag}
                </div>
                <div className="font-display font-bold text-xs sm:text-sm leading-snug">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Architecture Viewer Console */}
        <div className="border border-[#1E2028] bg-[#0E1017] shadow-[0_0_50px_rgba(0,240,255,0.03)]">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#1E2028] bg-[#12141F]">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#00E599] animate-pulse inline-block" />
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-white">
                SYS_INSPECTOR // {activeItem.id.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[10px] sm:text-[11px]">
              <span className="text-[#00F0FF] hidden sm:inline-block">
                TELEMETRY: ACTIVE (22ms p95)
              </span>
              <span className="text-[#8E93A4]">
                STATUS: PRODUCTION DEPLOYED
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 items-center">
            {/* Left: Diagram Preview Canvas with zoom hint */}
            <div
              onClick={() => setLightboxOpen(true)}
              className="lg:col-span-8 bg-[#050608] border border-[#1E2028] hover:border-[#00F0FF]/50 p-2 sm:p-4 flex items-center justify-center overflow-hidden min-h-[240px] sm:min-h-[380px] relative group cursor-zoom-in transition-all duration-200"
            >
              <img
                src={activeItem.imageSrc}
                alt={activeItem.title}
                className="w-full h-auto max-h-[460px] object-contain rounded transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <div className="absolute bottom-3 right-3 font-mono text-[10px] bg-black/80 text-[#00F0FF] px-2.5 py-1 border border-[#00F0FF]/30 uppercase tracking-widest opacity-80 group-hover:opacity-100 flex items-center gap-1.5 backdrop-blur-md">
                <span>Click to Inspect Full 1080p Topology</span>
                <ArrowUpRight size={12} />
              </div>
            </div>

            {/* Right: Technical Specs & Explanation */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
              <div>
                <span className="font-mono text-xs text-[#00F0FF] uppercase tracking-widest">
                  {activeItem.tag}
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-1 mb-3">
                  {activeItem.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#B4B9C8] leading-relaxed mb-6">
                  {activeItem.overview}
                </p>

                {/* Specs Box */}
                <div className="border-t border-[#1E2028] pt-4 space-y-3 font-mono text-xs">
                  {activeItem.specs.map((spec, i) => (
                    <div key={i} className="flex items-center justify-between py-1 border-b border-[#14161F]">
                      <span className="text-[#8E93A4]">{spec.label}</span>
                      <span className="text-white font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  telemetry.track("hero_cta_click", { context: `proof_${activeItem.id}` });
                  const el = document.getElementById("intake");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-3.5 bg-transparent hover:bg-white text-white hover:text-black font-mono text-xs font-bold uppercase tracking-wider border border-[#2A2E44] hover:border-white transition-all duration-150 flex items-center justify-between px-4"
              >
                <span>Discuss System Architecture</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl w-full border border-[#1E2028] bg-[#08090C] p-4 relative"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1E2028] font-mono text-xs text-[#8E93A4]">
              <span className="text-white font-bold">{activeItem.title}</span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="px-3 py-1 bg-[#14161F] text-white hover:bg-white hover:text-black transition-colors uppercase text-xs"
              >
                Close [ESC]
              </button>
            </div>
            <img
              src={activeItem.imageSrc}
              alt={activeItem.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProofSection;
