import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  kicker?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Section({ id, kicker, title, subtitle, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`relative border-t border-[var(--border)] py-24 md:py-32 scroll-mt-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {(kicker || title) && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="mb-14 md:mb-20"
          >
            {kicker && (
              <span className="font-mono text-xs tracking-[0.25em] text-[var(--muted)] uppercase">{kicker}</span>
            )}
            {title && (
              <h2 className="font-display mt-3 text-4xl md:text-6xl font-medium tracking-tight leading-[1.05]">
                {title}
              </h2>
            )}
            {subtitle && <p className="mt-4 max-w-xl text-[var(--muted)] text-lg">{subtitle}</p>}
          </motion.div>
        )}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
