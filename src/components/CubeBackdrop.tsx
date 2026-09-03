import { animate, motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import TechCube, { CUBE_SIZE } from "./TechCube";

const BASE_Y = 45;
// kept well within (-90, 90) so a face is never flipped past vertical (which would
// render its label upside down / mirrored) — still gives a real vertical tumble.
const TILTS = [-50, -10, 35];
const HIT_SIZE = CUBE_SIZE + 90;

export default function CubeBackdrop() {
  const rotateX = useMotionValue(TILTS[0]);
  const rotateY = useMotionValue(BASE_Y);
  const draggingRef = useRef(false);
  const resumeTimeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    const id = setInterval(() => {
      if (draggingRef.current) return;
      if (Math.random() < 0.3) {
        const current = rotateX.get();
        const idx = TILTS.reduce(
          (best, t, i) => (Math.abs(t - current) < Math.abs(TILTS[best] - current) ? i : best),
          0
        );
        animate(rotateX, TILTS[(idx + 1) % TILTS.length], { duration: 1.4, ease: [0.65, 0, 0.35, 1] });
      } else {
        const delta = Math.random() < 0.5 ? 90 : -90;
        animate(rotateY, rotateY.get() + delta, { duration: 1.4, ease: [0.65, 0, 0.35, 1] });
      }
    }, 2800);
    return () => clearInterval(id);
  }, [rotateX, rotateY]);

  const handlePanStart = () => {
    draggingRef.current = true;
    if (resumeTimeout.current) window.clearTimeout(resumeTimeout.current);
    // prevent the drag gesture from also starting a native text selection anywhere on the page
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
  };

  const handlePan = (_: unknown, info: { delta: { x: number; y: number } }) => {
    rotateY.set(rotateY.get() + info.delta.x * 0.4);
    const next = rotateX.get() - info.delta.y * 0.4;
    rotateX.set(Math.max(-75, Math.min(75, next)));
  };

  const handlePanEnd = () => {
    document.body.style.userSelect = "";
    document.body.style.webkitUserSelect = "";
    window.getSelection()?.removeAllRanges();
    resumeTimeout.current = window.setTimeout(() => {
      draggingRef.current = false;
    }, 2000);
  };

  const { scrollY } = useScroll();
  const blurPx = useTransform(scrollY, [0, 500], [0, 14]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.22]);
  const filter = useTransform(blurPx, (b) => `blur(${b}px)`);
  // the grab handle only accepts input while the cube is fully sharp (unblurred) —
  // once scroll starts blurring/fading it into the background, it stops intercepting clicks.
  const pointerEvents = useTransform(scrollY, (y) => (y < 20 ? "auto" : "none"));

  return (
    <>
      <motion.div
        style={{ filter, opacity, zIndex: -1 }}
        className="pointer-events-none fixed right-[16%] top-[52%] hidden -translate-y-1/2 lg:block"
      >
        <TechCube rotateX={rotateX} rotateY={rotateY} />
      </motion.div>

      <motion.div
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        style={{
          width: HIT_SIZE,
          height: HIT_SIZE,
          pointerEvents,
          touchAction: "none",
          userSelect: "none",
          zIndex: 30,
        }}
        className="fixed right-[16%] top-[52%] hidden -translate-y-1/2 cursor-grab active:cursor-grabbing lg:block"
      />
    </>
  );
}
