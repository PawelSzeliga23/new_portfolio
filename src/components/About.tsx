import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Section from "./Section";
import portrait from "../assets/photo/pawel.jpg";

interface Highlight {
  label: string;
  value: string;
}

export default function About() {
  const { t } = useTranslation();
  const highlights = t("about.highlights", { returnObjects: true }) as Highlight[];

  return (
    <Section id="about" kicker={t("about.kicker")} title={t("about.title")}>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--border)]">
            <img
              src={portrait}
              alt="Paweł Szeliga"
              className="h-full w-full object-cover grayscale contrast-105"
            />
          </div>
        </motion.div>

        <div className="md:col-span-3 space-y-10">
          <div className="space-y-6 text-lg leading-relaxed text-[var(--muted)]">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)]">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-[var(--bg)] p-5"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">{h.label}</div>
                <div className="mt-1.5 font-display text-base font-medium">{h.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
