import { ReactNode, CSSProperties } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  glowOnHover?: boolean;
}

const AnimatedCard = ({ children, className, style, delay = 0, glowOnHover = true }: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "relative rounded-2xl overflow-hidden group",
        glowOnHover && "glow-border",
        className
      )}
      style={style}
    >
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

export default AnimatedCard;
