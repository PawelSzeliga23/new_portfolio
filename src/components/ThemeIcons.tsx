// Sun/moon as inline SVG rather than the ☀/☾ glyphs these replace. U+2600 carries
// Emoji=Yes, so most mobile platforms resolve it through the colour emoji font and paint
// a yellow sun that ignores the surrounding `color` — on a monochrome site that reads as a
// bug. The U+FE0E text-presentation selector is the usual hint for this, but several
// mobile browsers ignore it, so these drop the font dependency entirely.
//
// Both inherit `currentColor` and are sized in `em`, so callers keep controlling them with
// plain text colour and font-size utilities exactly as they did the glyphs.

interface IconProps {
  className?: string;
}

const RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export function SunIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ width: "1em", height: "1em", display: "block" }}
    >
      <circle cx="12" cy="12" r="5" fill="currentColor" />
      {RAY_ANGLES.map((angle) => (
        <rect
          key={angle}
          x="11.1"
          y="0.6"
          width="1.8"
          height="4"
          rx="0.9"
          fill="currentColor"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
    </svg>
  );
}

export function MoonIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ width: "1em", height: "1em", display: "block" }}
    >
      <path
        d="M20.3 14.8A8.6 8.6 0 0 1 9.2 3.7a8.6 8.6 0 1 0 11.1 11.1Z"
        fill="currentColor"
      />
    </svg>
  );
}
