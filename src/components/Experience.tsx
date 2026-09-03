import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Section from "./Section";
import veoliaBlack from "../assets/logos/veolia-black.png";
import veoliaWhite from "../assets/logos/veolia-white.png";

interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  description: string;
}

const LOGOS: Record<number, { black: string; white: string; alt: string }> = {
  0: { black: veoliaBlack, white: veoliaWhite, alt: "Veolia" },
};

export default function Experience() {
  const { t } = useTranslation();
  const items = t("experience.items", { returnObjects: true }) as ExperienceItem[];

  return (
    <Section id="experience" kicker={t("experience.kicker")} title={t("experience.title")}>
      <div className="border-t border-[var(--border)]">
        {items.map((item, i) => {
          const logo = LOGOS[i];
          return (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group grid grid-cols-1 gap-2 border-b border-[var(--border)] py-8 md:grid-cols-12 md:gap-6"
            >
              <div className="md:col-span-3 font-mono text-sm text-[var(--muted)]">{item.period}</div>
              <div className="flex items-start gap-3 md:col-span-4">
                {logo && (
                  <div className="mt-1 h-8 w-8 shrink-0">
                    <img src={logo.black} alt={logo.alt} className="h-full w-full object-contain dark:hidden" />
                    <img src={logo.white} alt={logo.alt} className="hidden h-full w-full object-contain dark:block" />
                  </div>
                )}
                <div>
                  <h3 className="font-display text-xl font-medium">{item.role}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{item.org}</p>
                </div>
              </div>
              <p className="md:col-span-5 text-[var(--muted)] leading-relaxed">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
