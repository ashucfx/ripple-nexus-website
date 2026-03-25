import { useRef, useCallback } from "react";

export const useTilt = (maxTilt = 8) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) translateY(-4px)`;
    ref.current.style.boxShadow = `${-x * 20}px ${y * 20}px 40px -12px hsl(222 76% 48% / 0.12)`;
  }, [maxTilt]);

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "";
    ref.current.style.boxShadow = "";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
};
