interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-[var(--border)] py-5">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 hover:[animation-play-state:paused]">
        {track.map((item, i) => (
          <span key={i} className="font-display text-3xl md:text-5xl text-[var(--muted)] whitespace-nowrap flex items-center gap-10">
            {item}
            <span className="text-[var(--border-strong)]">/</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
