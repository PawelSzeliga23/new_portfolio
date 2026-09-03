import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import Section from "./Section";
import { projects, type ProjectCategory } from "../data/projects";

type Filter = "all" | ProjectCategory;

export default function Projects() {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState<Filter>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const categories = t("projects.categories", { returnObjects: true }) as Record<Filter, string>;
  const isPl = i18n.resolvedLanguage === "pl";

  const filterOptions: Filter[] = ["all", "web", "ml", "game", "systems"];

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  const selectFilter = (f: Filter) => {
    setFilter(f);
    setExpandedId(null);
  };

  return (
    <Section id="projects" kicker={t("projects.kicker")} title={t("projects.title")} subtitle={t("projects.subtitle")}>
      <div className="mb-10 flex flex-wrap gap-2">
        {filterOptions.map((f) => (
          <button
            key={f}
            onClick={() => selectFilter(f)}
            data-cursor-hover
            className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wide cursor-pointer transition-colors ${
              filter === f
                ? "border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)]"
                : "border-[var(--border-strong)] text-[var(--muted)] hover:text-[var(--fg)]"
            }`}
          >
            {categories[f]}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 [grid-auto-flow:dense]">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => {
            const isExpanded = expandedId === project.id;
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, layout: { type: "spring", damping: 30, stiffness: 300 } }}
                whileHover={!isExpanded ? { y: -4 } : undefined}
                onClick={() => !isExpanded && setExpandedId(project.id)}
                data-cursor-hover
                className={`group relative flex flex-col rounded-2xl border p-6 transition-colors ${
                  isExpanded
                    ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 max-h-[70vh] cursor-default border-[var(--border-strong)] lg:max-h-none"
                    : "cursor-pointer border-[var(--border)] hover:border-[var(--border-strong)]"
                }`}
              >
                {/* header */}
                <div
                  className={`flex shrink-0 items-start justify-between gap-4 ${
                    isExpanded ? "border-b border-[var(--border)] pb-4" : ""
                  }`}
                >
                  <div>
                    <h3 className="font-display text-xl font-medium leading-snug">{project.title}</h3>
                    {project.inProgress && (
                      <span className="mt-2 inline-block rounded-full border border-[var(--border-strong)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[var(--muted)]">
                        {t("projects.inProgress")}
                      </span>
                    )}
                  </div>
                  {isExpanded && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedId(null);
                      }}
                      aria-label={t("projects.close")}
                      data-cursor-hover
                      className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--border-strong)] text-base hover:bg-[var(--surface)]"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* content — the only part that scrolls when expanded */}
                <div className={`min-h-0 flex-1 py-4 ${isExpanded ? "overflow-y-auto" : ""}`}>
                  {isExpanded ? (
                    (isPl ? project.longDescPl : project.longDescEn).split("\n\n").map((paragraph, i) => (
                      <p
                        key={i}
                        className={`text-sm leading-relaxed text-[var(--muted)] ${i > 0 ? "mt-3" : ""}`}
                      >
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-sm leading-relaxed text-[var(--muted)]">
                      {isPl ? project.descPl : project.descEn}
                    </p>
                  )}
                </div>

                {/* footer */}
                <div
                  className={`shrink-0 ${isExpanded ? "border-t border-[var(--border)] pt-4" : ""}`}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-[var(--surface)] px-2.5 py-1 font-mono text-[10px] text-[var(--muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        data-cursor-hover
                        className="font-mono text-[11px] uppercase tracking-wide text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
                      >
                        {project.githubSecondary ? t("projects.frontend") : t("projects.viewCode")} ↗
                      </a>
                    )}
                    {project.githubSecondary && (
                      <a
                        href={project.githubSecondary.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        data-cursor-hover
                        className="font-mono text-[11px] uppercase tracking-wide text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
                      >
                        {t("projects.backend")} ↗
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
