import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Section from "./Section";
import pwBlack from "../assets/logos/pw-black.png";
import pwWhite from "../assets/logos/pw-white.png";
import pjaitBlack from "../assets/logos/pjait-black.png";
import pjaitWhite from "../assets/logos/pjait-white.png";

interface EducationItem {
  degree: string;
  school: string;
  period: string;
  description: string;
}

const LOGOS = [
  { black: pwBlack, white: pwWhite, alt: "Warsaw University of Technology" },
  { black: pjaitBlack, white: pjaitWhite, alt: "Polish-Japanese Academy of Information Technology" },
];

export default function Education() {
  const { t } = useTranslation();
  const items = t("education.items", { returnObjects: true }) as EducationItem[];

  return (
    <Section id="education" kicker={t("education.kicker")} title={t("education.title")}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((item, i) => {
          const logo = LOGOS[i];
          return (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-[var(--border)] p-7 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs text-[var(--muted)]">{item.period}</span>
                {logo && (
                  <div className="h-7 w-auto shrink-0">
                    <img src={logo.black} alt={logo.alt} className="h-full w-auto object-contain dark:hidden" />
                    <img src={logo.white} alt={logo.alt} className="hidden h-full w-auto object-contain dark:block" />
                  </div>
                )}
              </div>
              <h3 className="font-display mt-2 text-2xl font-medium leading-tight">{item.degree}</h3>
              <p className="mt-1 text-[var(--muted)]">{item.school}</p>
              <p className="mt-4 leading-relaxed text-[var(--muted)]">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
