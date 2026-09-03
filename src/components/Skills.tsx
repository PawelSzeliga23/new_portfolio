import { useState, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Section from "./Section";
import Marquee from "./Marquee";
import SkillModal from "./SkillModal";

interface SkillItem {
  id: string;
  label: string;
}

interface SkillGroup {
  title: string;
  items: SkillItem[];
}

interface Origin {
  dx: number;
  dy: number;
  scale: number;
}

// approximate final modal size used to compute the fly-in scale/offset from the clicked tile
const MODAL_WIDTH = 448;
const MODAL_HEIGHT = 220;

export default function Skills() {
  const { t } = useTranslation();
  const groups = t("skills.groups", { returnObjects: true }) as SkillGroup[];
  const descriptions = t("skills.descriptions", { returnObjects: true }) as Record<string, string>;
  const [selected, setSelected] = useState<SkillItem | null>(null);
  const [origin, setOrigin] = useState<Origin>({ dx: 0, dy: 0, scale: 0.3 });
  const marqueeItems = (groups[0]?.items.concat(groups[1]?.items ?? []) ?? []).map((i) => i.label);

  const handleSelect = (item: SkillItem, e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const tileCenterX = rect.left + rect.width / 2;
    const tileCenterY = rect.top + rect.height / 2;
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    setOrigin({
      dx: tileCenterX - viewportCenterX,
      dy: tileCenterY - viewportCenterY,
      scale: Math.max(0.15, rect.width / MODAL_WIDTH, rect.height / MODAL_HEIGHT),
    });
    setSelected(item);
  };

  return (
    <Section id="skills" kicker={t("skills.kicker")} title={t("skills.title")} subtitle={t("skills.tapHint")}>
      <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 mb-16">
        {groups.map((group, gi) => (
          <div key={group.title}>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-4">{group.title}</h3>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((item, i) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={(e) => handleSelect(item, e)}
                  data-cursor-hover
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.05 + i * 0.03, duration: 0.4 }}
                  whileHover={{ scale: 1.06, backgroundColor: "var(--fg)", color: "var(--bg)" }}
                  className="rounded-full border border-[var(--border-strong)] px-4 py-1.5 text-sm cursor-pointer select-none"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Marquee items={marqueeItems} />

      <SkillModal
        skill={selected ? { id: selected.id, label: selected.label, description: descriptions[selected.id] } : null}
        origin={origin}
        onClose={() => setSelected(null)}
      />
    </Section>
  );
}
