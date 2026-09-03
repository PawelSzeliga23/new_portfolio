import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const letter = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

function AnimatedName({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className="font-display flex flex-wrap gap-x-[0.22em] text-[15vw] sm:text-[11vw] md:text-[7.5vw] font-medium leading-[0.95] tracking-tight"
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} aria-hidden="true" className="inline-flex whitespace-nowrap leading-[1.15]">
          {word.split("").map((char, ci) => (
            <span key={ci} className="inline-block overflow-hidden align-bottom">
              <motion.span variants={letter} className="inline-block">
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}

function RoleCycler({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, [roles]);

  return (
    <span className="inline-block h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="block"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const { t } = useTranslation();
  const roles = t("hero.roles", { returnObjects: true }) as string[];

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-mono text-xs tracking-[0.25em] text-[var(--muted)] uppercase"
        >
          {t("hero.kicker")}
        </motion.span>

        <AnimatedName text={t("hero.name")} />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-2 font-display text-2xl md:text-3xl text-[var(--muted)]"
        >
          <RoleCycler roles={roles} />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]"
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-3 font-mono text-xs text-[var(--muted)]"
        >
          {t("hero.location")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton onClick={() => scrollTo("projects")}>{t("hero.ctaPrimary")}</MagneticButton>
          <MagneticButton variant="outline" onClick={() => scrollTo("contact")}>
            {t("hero.ctaSecondary")}
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--muted)] uppercase">{t("hero.scroll")}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-[1px] bg-[var(--border-strong)]"
        />
      </motion.div>
    </section>
  );
}
