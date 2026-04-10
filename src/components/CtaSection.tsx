import { motion } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle2, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const guarantees = [
  { icon: CheckCircle2, text: "Free 30-min strategy session" },
  { icon: Shield, text: "No commitment required" },
  { icon: Clock, text: "Response within 4 hours" },
];

const CtaSection = () => {
  return (
    <section className="py-28 relative z-10 overflow-hidden">
      {/* Background radial + grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(31,86,212,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">

        {/* Overline */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-primary font-semibold text-xs tracking-widest uppercase mb-6"
        >
          Ready to Scale?
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-4xl md:text-[60px] lg:text-[68px] font-display font-bold text-white tracking-tight leading-[1.02] mb-6"
        >
          Stop Losing to
          <br />
          <span className="text-gradient">Better Infrastructure.</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Every week you operate without the right systems, you're paying for it in missed
          revenue, burned team capacity, and ground lost to competitors who already fixed this.
          Book your free session. We'll show you exactly where you're leaking.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <a
            href="https://calendly.com/ripplenexus/book-a-consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 bg-primary text-white px-9 py-4 rounded-xl font-bold text-base hover:bg-primary/90 hover:shadow-[0_0_50px_hsl(222_74%_48%/0.45)] hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
          >
            <Calendar size={17} />
            Book Your Free Strategy Call
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white/80 px-9 py-4 rounded-xl font-semibold text-base hover:bg-white/[0.05] hover:border-white/35 hover:text-white transition-all duration-200 w-full sm:w-auto"
          >
            Contact Our Team <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Trust guarantees */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.28 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          {guarantees.map((g) => (
            <div key={g.text} className="flex items-center gap-1.5 text-white/35 text-xs">
              <g.icon size={12} className="text-secondary" />
              {g.text}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default CtaSection;
