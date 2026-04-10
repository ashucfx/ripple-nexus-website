import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-24 bg-black border-t border-b border-white/5 relative z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,86,212,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="section-padding max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight mb-6"
        >
          Ready to scale <span className="text-gradient">infrastructure?</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-white/65 max-w-2xl mx-auto mb-10"
        >
          Partner with our architects to uncover bottlenecks, define scale, and build the systems your growing enterprise deserves.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://calendly.com/ripplenexus/book-a-consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-md font-semibold hover:bg-white/95 hover:shadow-[0_0_30px_rgba(255,255,255,0.12)] hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
          >
            <Calendar size={18} /> Schedule a Strategy Call
          </a>
          <a
            href="/contact"
            className="flex items-center justify-center gap-2 bg-transparent border border-white/25 text-white/85 px-8 py-4 rounded-md font-medium hover:bg-white/5 hover:border-white/40 hover:text-white transition-all duration-200 w-full sm:w-auto"
          >
            Contact Sales <ArrowRight size={18} />
          </a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="text-white/30 text-xs mt-6 tracking-wide"
        >
          No commitment. Free 30-min strategy session.
        </motion.p>
      </div>
    </section>
  );
};

export default CtaSection;
