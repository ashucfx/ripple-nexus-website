import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const magnetTarget = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input[type='submit']");
      const computed = window.getComputedStyle(target);
      const pointer =
        computed.cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        interactive !== null;

      setIsPointer(pointer);

      // Magnetic effect for interactive elements
      if (interactive && pointer) {
        const rect = (interactive as HTMLElement).getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.max(rect.width, rect.height) * 0.8;

        if (dist < maxDist) {
          const pull = 0.25 * (1 - dist / maxDist);
          magnetTarget.current = {
            x: e.clientX - dx * pull,
            y: e.clientY - dy * pull,
          };
          setPos(magnetTarget.current);
          return;
        }
      }

      magnetTarget.current = null;
      setPos({ x: e.clientX, y: e.clientY });
    };

    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    document.addEventListener("mousemove", move);
    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [visible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const outerSize = isPointer ? 52 : 40;
  const halfOuter = outerSize / 2;

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: outerSize,
          height: outerSize,
          border: "1.5px solid hsl(222 76% 58% / 0.35)",
          background: isPointer
            ? "radial-gradient(circle, hsl(222 76% 58% / 0.12) 0%, transparent 70%)"
            : "radial-gradient(circle, hsl(222 76% 58% / 0.06) 0%, transparent 70%)",
          boxShadow: isPointer
            ? "0 0 20px 4px hsl(222 76% 58% / 0.15), inset 0 0 10px hsl(222 76% 58% / 0.08)"
            : "0 0 12px 2px hsl(222 76% 58% / 0.08)",
          backdropFilter: "blur(1px)",
        }}
        animate={{
          x: pos.x - halfOuter,
          y: pos.y - halfOuter,
          opacity: visible ? 1 : 0,
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.4 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: 5,
          height: 5,
          background: "hsl(222 76% 58% / 0.9)",
          boxShadow: "0 0 6px 2px hsl(222 76% 58% / 0.3)",
        }}
        animate={{
          x: pos.x - 2.5,
          y: pos.y - 2.5,
          opacity: visible ? 1 : 0,
          scale: isPointer ? 0 : isClicking ? 1.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      />
    </>
  );
};

export default CustomCursor;
