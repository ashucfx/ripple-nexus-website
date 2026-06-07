import { motion } from "framer-motion";

const clients = [
  { industry: "FinTech", name: "Series B Platform", location: "Singapore" },
  { industry: "Healthcare", name: "Specialty Network", location: "United States" },
  { industry: "Manufacturing", name: "Global Group", location: "North America" },
  { industry: "SaaS", name: "Enterprise Scale", location: "United Kingdom" },
  { industry: "Government", name: "Public Agency", location: "India" },
  { industry: "Logistics", name: "Supply Chain", location: "Australia" }
];

const ClientLogoStrip = () => {
  return (
    <div className="w-full overflow-hidden py-6 relative">
      {/* Edge gradient masks for smooth fade out */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 z-10" style={{ background: "linear-gradient(to right, var(--obsidian), transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 z-10" style={{ background: "linear-gradient(to left, var(--obsidian), transparent)" }} />
      
      <motion.div
        className="flex gap-4 sm:gap-8 min-w-max px-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 30, repeat: Infinity }}
      >
        {/* Duplicate the list for seamless looping */}
        {[...clients, ...clients].map((client, i) => (
          <div 
            key={`${client.name}-${i}`}
            className="flex flex-col items-center justify-center min-w-[140px] h-[72px] px-6 rounded-xl border transition-all duration-300 group cursor-default"
            style={{ 
              background: "rgba(255,255,255,0.015)",
              borderColor: "var(--graphite-600)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "rgba(124,92,255,0.3)";
              e.currentTarget.style.background = "rgba(124,92,255,0.04)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--graphite-600)";
              e.currentTarget.style.background = "rgba(255,255,255,0.015)";
            }}
          >
            <span className="font-display font-semibold text-sm mb-1 group-hover:text-white transition-colors duration-300" style={{ color: "var(--graphite-300)" }}>
              {client.industry}
            </span>
            <span className="font-mono text-[0.6rem] tracking-widest uppercase opacity-70" style={{ color: "var(--graphite-400)" }}>
              {client.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ClientLogoStrip;
