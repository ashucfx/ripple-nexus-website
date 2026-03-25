import { motion } from "framer-motion";

const brands = [
  "Acme Corp", "GlobalTech", "Nexus Industries", "NovaLabs", "Quantum Financial", "Aurora Systems"
];

const TrustSection = () => {
  return (
    <section className="py-24 bg-black border-t border-b border-white/5 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          
          <div className="shrink-0 max-w-xs text-center md:text-left">
            <h3 className="font-display font-medium text-white text-2xl tracking-tight mb-2">Trusted by 200+</h3>
            <p className="text-white/40 text-sm font-light">Industry leaders running on our infrastructure.</p>
          </div>

          {/* Minimal Logo Ticker */}
          <div className="w-full overflow-hidden flex items-center relative [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div 
              className="flex gap-16 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
              {[...brands, ...brands].map((brand, i) => (
                <div key={i} className="text-xl font-bold font-display text-white/20 uppercase tracking-widest flex items-center shrink-0">
                  {brand}
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustSection;
