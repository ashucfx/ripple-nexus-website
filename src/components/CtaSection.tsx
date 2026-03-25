import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-24 bg-black border-t border-b border-white/5 relative z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,86,212,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="section-padding max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight mb-6"
        >
          Ready to scale <span className="text-white/40">infrastructure?</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-white/50 max-w-2xl mx-auto mb-10 font-light"
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
            className="flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-md font-medium hover:bg-white/90 transition-colors w-full sm:w-auto"
          >
            <Calendar size={18} /> Schedule a Strategy Call
          </a>
          <a
            href="/contact"
            className="flex items-center justify-center gap-2 bg-transparent border border-white/10 text-white px-8 py-4 rounded-md font-medium hover:bg-white/5 transition-colors w-full sm:w-auto"
          >
            Contact Sales <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
