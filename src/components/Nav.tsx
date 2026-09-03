import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useScrollSpy } from "../hooks/useScrollSpy";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

const SECTION_IDS = ["home", "about", "experience", "skills", "projects", "education", "contact"];

export default function Nav() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(SECTION_IDS);

  const links = SECTION_IDS.map((id) => ({ id, label: t(`nav.${id}`) }));

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md transition-colors duration-400">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <button
          onClick={() => scrollTo("home")}
          data-cursor-hover
          className="font-display text-lg font-semibold tracking-tight cursor-pointer"
        >
          PSz.
        </button>

        <ul className="hidden md:flex items-center gap-1 font-mono text-xs tracking-wide uppercase">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                data-cursor-hover
                className={`relative px-3 py-2 cursor-pointer transition-colors ${
                  active === link.id ? "text-[var(--fg)]" : "text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-3 right-3 -bottom-0.5 h-[1.5px] bg-[var(--fg)]"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="h-[1.5px] w-6 bg-[var(--fg)]" />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className="h-[1.5px] w-6 bg-[var(--fg)]" />
          <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="h-[1.5px] w-6 bg-[var(--fg)]" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-[var(--border)]"
          >
            <ul className="flex flex-col gap-1 px-6 py-4 font-mono text-sm uppercase">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className={`w-full text-left py-2 ${active === link.id ? "text-[var(--fg)]" : "text-[var(--muted)]"}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 px-6 pb-5">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
