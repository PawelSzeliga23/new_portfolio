import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const scrollTop = () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center md:flex-row md:justify-between md:px-10 md:text-left">
        <p className="font-mono text-xs text-[var(--muted)]">
          © {year} Paweł Szeliga — {t("footer.rights")}
        </p>
        <p className="font-mono text-xs text-[var(--muted)]">{t("footer.tagline")}</p>
        <button
          onClick={scrollTop}
          data-cursor-hover
          className="font-mono text-xs uppercase tracking-wide text-[var(--muted)] hover:text-[var(--fg)] cursor-pointer"
        >
          ↑ {t("footer.backToTop")}
        </button>
      </div>
    </footer>
  );
}
