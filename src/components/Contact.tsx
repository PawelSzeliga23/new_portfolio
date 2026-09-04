import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Section from "./Section";
import MagneticButton from "./MagneticButton";

const EMAIL = "p.szeliga.dev@gmail.com";
const GITHUB = "https://github.com/PawelSzeliga23";
const LINKEDIN = encodeURI("https://www.linkedin.com/in/paweł-szeliga");
const CV_PL = "/cv/Pawel_Szeliga_CV_JuniorDeveloper_PL.pdf";
const CV_EN = "/cv/Pawel_Szeliga_CV_JuniorDeveloper_EN.pdf";

export default function Contact() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${name || "website visitor"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ""}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Section id="contact" kicker={t("contact.kicker")} title={t("contact.title")} subtitle={t("contact.subtitle")}>
      <div className="grid grid-cols-1 gap-14 md:grid-cols-5">
        <div className="md:col-span-2 space-y-6">
          <a href={`mailto:${EMAIL}`} data-cursor-hover className="block group">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              {t("contact.emailLabel")}
            </div>
            <div className="mt-1 font-display text-lg group-hover:opacity-60 transition-opacity break-all">
              {EMAIL}
            </div>
          </a>
          <a href={GITHUB} target="_blank" rel="noreferrer" data-cursor-hover className="block group">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              {t("contact.githubLabel")}
            </div>
            <div className="mt-1 font-display text-lg group-hover:opacity-60 transition-opacity">
              github.com/PawelSzeliga23
            </div>
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer" data-cursor-hover className="block group">
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              {t("contact.linkedinLabel")}
            </div>
            <div className="mt-1 font-display text-lg group-hover:opacity-60 transition-opacity break-all">
              linkedin.com/in/paweł-szeliga
            </div>
          </a>
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
              {t("contact.cvLabel")}
            </div>
            <div className="mt-2 flex gap-3">
              <a
                href={CV_PL}
                download
                data-cursor-hover
                className="rounded-full border border-[var(--border-strong)] px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-[var(--fg)] transition-colors hover:bg-[var(--surface)]"
              >
                PL
              </a>
              <a
                href={CV_EN}
                download
                data-cursor-hover
                className="rounded-full border border-[var(--border-strong)] px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-[var(--fg)] transition-colors hover:bg-[var(--surface)]"
              >
                EN
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="font-mono text-xs uppercase tracking-wide text-[var(--muted)]">
                {t("contact.form.name")}
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full border-b border-[var(--border-strong)] bg-transparent py-2 outline-none focus:border-[var(--fg)] transition-colors"
              />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-wide text-[var(--muted)]">
                {t("contact.form.email")}
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border-b border-[var(--border-strong)] bg-transparent py-2 outline-none focus:border-[var(--fg)] transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-wide text-[var(--muted)]">
              {t("contact.form.message")}
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 w-full resize-none border-b border-[var(--border-strong)] bg-transparent py-2 outline-none focus:border-[var(--fg)] transition-colors"
            />
          </div>
          <div className="flex items-center gap-4 pt-2">
            <MagneticButton className="!px-6">{t("contact.form.send")}</MagneticButton>
            {sent && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-xs text-[var(--muted)]"
              >
                {t("contact.form.success")}
              </motion.span>
            )}
          </div>
        </form>
      </div>
    </Section>
  );
}
