import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

const EmotionalStatement = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-secondary/[0.04] pointer-events-none" />
      <motion.div
        style={{ scale, opacity }}
        className="section-padding max-w-5xl mx-auto text-center relative z-10"
      >
        <div className="space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
            We don't build projects.
            <br />
            <span className="text-gradient">
              We build growth systems.
            </span>
          </h2>
          <p className="text-foreground/70 text-lg sm:text-xl max-w-2xl mx-auto">
            Most agencies hand you a product and walk away. We stick around to make sure it actually moves your business forward.
          </p>
          <a
            href="#lead-form"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-base hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 hover:scale-[1.03] transition-all duration-300 shadow-md whitespace-nowrap"
          >
            Let's Build Something Powerful
            <ArrowRight size={18} />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default EmotionalStatement;
