import { motion } from "framer-motion";
import { HelpCircle, ChevronRight, FileText } from "lucide-react";

interface QnA {
  question: string;
  answer: string;
}

interface Definition {
  term: string;
  definition: string;
}

interface AeoBlockProps {
  title?: string;
  qnaList?: QnA[];
  definitions?: Definition[];
  structuredList?: string[];
}

const AeoBlock = ({ title = "Knowledge Base & Definitions", qnaList, definitions, structuredList }: AeoBlockProps) => {
  return (
    <section className="py-16 relative z-10" style={{ borderTop: "1px solid var(--graphite-600)" }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10">
          <p className="eyebrow mb-3 flex items-center gap-2">
            <HelpCircle size={14} style={{ color: "var(--nexus-violet)" }} />
            AI Search Optimization Block
          </p>
          <h2 className="font-display font-bold text-2xl text-[var(--pearl)]">
            {title}
          </h2>
          <p className="font-body text-sm mt-2 text-[var(--graphite-400)]">
            Semantic definitions and structured answers optimized for LLM extraction.
          </p>
        </div>

        <div className="space-y-12">
          {/* Definitions Table */}
          {definitions && definitions.length > 0 && (
            <div className="overflow-hidden rounded-xl" style={{ border: "1px solid var(--graphite-600)", background: "var(--ink)" }}>
              <div className="bg-[var(--graphite-600)] px-6 py-3 border-b border-[var(--graphite-600)] flex items-center gap-2">
                <FileText size={14} style={{ color: "var(--pearl)" }} />
                <h3 className="font-body font-semibold text-sm text-[var(--pearl)] uppercase tracking-wider">Entity Definitions</h3>
              </div>
              <div className="p-6">
                <dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {definitions.map((def, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <dt className="font-display font-semibold text-base text-[var(--ion-cyan)]">{def.term}</dt>
                      <dd className="font-body text-sm text-[var(--graphite-300)] leading-relaxed">{def.definition}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}

          {/* Q&A Section */}
          {qnaList && qnaList.length > 0 && (
            <div itemScope itemType="https://schema.org/FAQPage">
              <h3 className="font-display font-bold text-xl text-[var(--pearl)] mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {qnaList.map((qna, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-xl"
                    style={{ background: "var(--ink)", border: "1px solid var(--graphite-600)" }}
                    itemScope 
                    itemProp="mainEntity" 
                    itemType="https://schema.org/Question"
                  >
                    <h4 itemProp="name" className="font-display font-semibold text-lg text-[var(--pearl)] mb-3 flex items-start gap-3">
                      <span className="font-mono text-sm mt-1 text-[var(--nexus-violet)]">Q.</span>
                      {qna.question}
                    </h4>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p itemProp="text" className="font-body text-base text-[var(--graphite-300)] leading-relaxed flex items-start gap-3">
                        <span className="font-mono text-sm mt-1 text-[var(--graphite-500)]">A.</span>
                        {qna.answer}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Structured List */}
          {structuredList && structuredList.length > 0 && (
            <div>
               <h3 className="font-display font-bold text-xl text-[var(--pearl)] mb-6">Key Capabilities</h3>
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {structuredList.map((item, i) => (
                   <li key={i} className="flex items-start gap-3 p-4 rounded-lg bg-[#12141c] border border-white/5">
                     <ChevronRight size={16} className="mt-0.5 text-[var(--quantum-lime)] shrink-0" />
                     <span className="font-body text-sm text-[var(--graphite-300)]">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AeoBlock;
