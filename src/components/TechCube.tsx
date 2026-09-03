import { motion, type MotionValue } from "framer-motion";

const FACES = ["React", "TypeScript", ".NET", "Python", "SQL", "Java"];
const SIZE = 230;
const HALF = SIZE / 2;

const FACE_TRANSFORMS = [
  `rotateY(0deg) translateZ(${HALF}px)`,
  `rotateY(90deg) translateZ(${HALF}px)`,
  `rotateY(180deg) translateZ(${HALF}px)`,
  `rotateY(-90deg) translateZ(${HALF}px)`,
  `rotateX(90deg) translateZ(${HALF}px)`,
  `rotateX(-90deg) translateZ(${HALF}px)`,
];

export { SIZE as CUBE_SIZE };

interface TechCubeProps {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
}

export default function TechCube({ rotateX, rotateY }: TechCubeProps) {
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
              key={label}
              className="absolute inset-0 flex items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)]/90"
              style={{ transform: FACE_TRANSFORMS[i], backfaceVisibility: "hidden" }}
            >
              <span className="font-mono text-base tracking-wide">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
