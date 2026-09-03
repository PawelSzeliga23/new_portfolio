import { motion, useTransform, type MotionValue } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { MoonIcon, SunIcon } from "./ThemeIcons";

// `null` marks the theme face: instead of a tech label it carries a single centred pip,
// like the "1" side of a die. Its position in this array is the face index, and
// THEME_FACE_INDEX below is what CubeBackdrop matches against when deciding whether the
// theme face is the one currently pointed at the viewer — keep the two in sync.
const FACES: (string | null)[] = ["React", "TypeScript", ".NET", "Python", "SQL", null];
export const THEME_FACE_INDEX = 5;

const SIZE = 230;
const HALF = SIZE / 2;
const PIP = 46;
// how far the pip has to grow to swallow the face corner-to-corner
const PIP_MAX_SCALE = (SIZE * Math.SQRT2) / PIP;

const FACE_TRANSFORMS = [
  `rotateY(0deg) translateZ(${HALF}px)`,
  `rotateY(90deg) translateZ(${HALF}px)`,
  `rotateY(180deg) translateZ(${HALF}px)`,
  `rotateY(-90deg) translateZ(${HALF}px)`,
  `rotateX(90deg) translateZ(${HALF}px)`,
  `rotateX(-90deg) translateZ(${HALF}px)`,
];

export { SIZE as CUBE_SIZE };

// The pip is already painted in the opposite colour, so at rest it reads as a solid die
// dot and needs no colour crossfade — holding just grows it until it floods the face.
function ThemeFace({ holdProgress }: { holdProgress: MotionValue<number> }) {
  const { theme } = useTheme();
  const scale = useTransform(holdProgress, [0, 1], [1, PIP_MAX_SCALE]);

  return (
    <div className="relative flex items-center justify-center">
      <motion.span
        aria-hidden="true"
        style={{ width: PIP, height: PIP, scale }}
        className="absolute rounded-full bg-[var(--inverse-bg)]"
      />
      {/* Deliberately the opposite of ThemeToggle, which shows the theme you are *in*. The
          pip is a promise of what holding it does, so in light mode it shows the moon
          ("hold this and it becomes night") and in dark mode the sun. */}
      <span className="relative text-[19px] leading-none text-[var(--inverse-fg)]">
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </span>
    </div>
  );
}

interface TechCubeProps {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  holdProgress: MotionValue<number>;
}

export default function TechCube({ rotateX, rotateY, holdProgress }: TechCubeProps) {
  return (
    <div style={{ perspective: 1800, width: SIZE, height: SIZE }}>
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateZ: [0, 2, 0, -2, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          style={{
            width: SIZE,
            height: SIZE,
            position: "relative",
            transformStyle: "preserve-3d",
            rotateX,
            rotateY,
          }}
        >
          {FACES.map((label, i) => (
            <div
              key={label ?? "theme"}
              className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)]/90"
              style={{ transform: FACE_TRANSFORMS[i], backfaceVisibility: "hidden" }}
            >
              {label === null ? (
                <ThemeFace holdProgress={holdProgress} />
              ) : (
                <span className="font-mono text-base tracking-wide">{label}</span>
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
