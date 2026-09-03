import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "solid" | "outline";
  className?: string;
}

export default function MagneticButton({ children, onClick, variant = "solid", className = "" }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    variant === "solid"
      ? "bg-[var(--fg)] text-[var(--bg)]"
      : "border border-[var(--border-strong)] text-[var(--fg)]";

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      data-cursor-hover
      style={{ x: springX, y: springY }}
      className={`${base} rounded-full px-7 py-3.5 text-sm font-medium tracking-wide cursor-pointer ${className}`}
    >
      {children}
    </motion.button>
  );
}
