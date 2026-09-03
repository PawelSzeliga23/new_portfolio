import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { DEVICONS } from "../data/devicons";

interface Skill {
  id: string;
  label: string;
  description: string;
}

interface Origin {
  dx: number;
  dy: number;
  scale: number;
}

interface SkillModalProps {
  skill: Skill | null;
  origin: Origin;
  onClose: () => void;
}

export default function SkillModal({ skill, origin, onClose }: SkillModalProps) {
  useEffect(() => {
    if (!skill) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [skill, onClose]);

  return (
    <AnimatePresence>
      {skill && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
          style={{ perspective: 1000, willChange: "opacity" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ x: origin.dx, y: origin.dy, scale: origin.scale, rotateY: -100, opacity: 0 }}
            animate={{ x: 0, y: 0, scale: 1, rotateY: 0, opacity: 1 }}
            exit={{ x: origin.dx, y: origin.dy, scale: origin.scale, rotateY: 100, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="skill-modal-title"
            style={{ willChange: "transform, opacity" }}
            className="relative w-full max-w-md rounded-2xl border border-[var(--border-strong)] bg-[var(--bg)] p-8 shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              data-cursor-hover
              className="absolute right-5 top-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--border-strong)] text-base hover:bg-[var(--surface)]"
            >
              ×
            </button>
            <div className="flex items-center gap-3 pr-10">
              {DEVICONS[skill.id] && (
                <i className={`${DEVICONS[skill.id]} shrink-0 text-3xl`} aria-hidden="true" />
              )}
              <h3 id="skill-modal-title" className="font-display text-2xl font-medium">
                {skill.label}
              </h3>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.35 }}
            >
              <div className="mt-4 border-t border-[var(--border)]" />
              <p className="mt-4 leading-relaxed text-[var(--muted)]">{skill.description}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
