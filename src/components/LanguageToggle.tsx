import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const isPl = i18n.resolvedLanguage === "pl";

  const setLang = (lng: "en" | "pl") => {
    i18n.changeLanguage(lng);
  };

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-[var(--border-strong)] p-1 font-mono text-xs"
      role="group"
      aria-label="Language"
    >
      <button
        onClick={() => setLang("en")}
        data-cursor-hover
        className={`rounded-full px-2.5 py-1 transition-colors cursor-pointer ${
          !isPl ? "bg-[var(--fg)] text-[var(--bg)]" : "text-[var(--muted)]"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("pl")}
        data-cursor-hover
        className={`rounded-full px-2.5 py-1 transition-colors cursor-pointer ${
          isPl ? "bg-[var(--fg)] text-[var(--bg)]" : "text-[var(--muted)]"
        }`}
      >
        PL
      </button>
    </div>
  );
}
