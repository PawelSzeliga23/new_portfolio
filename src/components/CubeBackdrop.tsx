import { animate, motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import TechCube, { CUBE_SIZE, THEME_FACE_INDEX } from "./TechCube";

const BASE_Y = 45;
// Starting tilt — a 3/4 view, so the cube reads as a cube and not a flat square.
// It is only a starting point: rotation is deliberately unbounded on BOTH axes (see the
// idle loop and handlePanEnd). An earlier version capped the vertical axis to keep faces
// from passing 90°, because past vertical a face's label renders upside down / mirrored.
// The user chose free tumbling over upright labels — any cap makes the cube feel like it
// is on rails. Don't reintroduce one.
const INITIAL_TILT = -50;
const HIT_SIZE = CUBE_SIZE + 90;
const DRAG_SENSITIVITY = 0.4;
// press-and-hold on the theme face before the easter egg fires
const HOLD_MS = 1200;
const FLOOD_MS = 520;
// how long the flood takes to fade back off the page afterwards. Removing the overlay
// outright is what made the new theme snap in: the background matches either way, but all
// the *content* under it reappears in a single frame. Fading it lets the page surface.
const REVEAL_MS = 850;

const RAD = Math.PI / 180;

/**
 * How far each face points towards the viewer, given the cube's current rotation.
 *
 * The cube's transform is `rotateX(rx) rotateY(ry)`, so a face normal ends up at
 * Rx(rx) · Ry(ry) · n, and only the z component matters for "is this face facing me".
 * Working that through for the six local normals (+Z, +X, -Z, -X, -Y, +Y — the order of
 * FACE_TRANSFORMS in TechCube) collapses to the expressions below. Doing it as maths
 * rather than hit-testing matters because the visual cube is `pointer-events: none`: the
 * drag hit-area is a separate flat element on top of it, so the faces themselves can
 * never receive a pointer event to be hit-tested against.
 */
const faceDepths = (rx: number, ry: number) => {
  const sx = Math.sin(rx * RAD);
  const cx = Math.cos(rx * RAD);
  const sy = Math.sin(ry * RAD);
  const cy = Math.cos(ry * RAD);
  return [cy * cx, -sy * cx, -cy * cx, sy * cx, -sx, sx];
};

const frontFaceIndex = (rx: number, ry: number) => {
  const depths = faceDepths(rx, ry);
  return depths.reduce((best, depth, i) => (depth > depths[best] ? i : best), 0);
};

export default function CubeBackdrop() {
  const rotateX = useMotionValue(INITIAL_TILT);
  const rotateY = useMotionValue(BASE_Y);
  const holdProgress = useMotionValue(0);
  const { toggleTheme } = useTheme();

  const draggingRef = useRef(false);
  // bumped on every new grab, so a glide still settling from a previous gesture can't
  // hand control back to the idle loop underneath a press that has already started
  const gestureId = useRef(0);
  // a press that never turned into a drag gets no onPanEnd, so it has to resume the idle
  // loop itself — without this the cube would freeze after any plain click
  const pannedRef = useRef(false);
  const holdTimer = useRef<number | undefined>(undefined);
  const hitAreaRef = useRef<HTMLDivElement>(null);

  const [flood, setFlood] = useState<
    { x: number; y: number; scale: number; color: string; fading: boolean } | null
  >(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (draggingRef.current) return;
      // Both axes tumble by a step *relative* to wherever the cube currently is, never
      // towards an absolute preset: after a free drag it can rest at any orientation, and
      // easing back to a fixed tilt would quietly undo the drag.
      if (Math.random() < 0.3) {
        const delta = Math.random() < 0.5 ? 45 : -45;
        animate(rotateX, rotateX.get() + delta, { duration: 1.4, ease: [0.65, 0, 0.35, 1] });
      } else {
        const delta = Math.random() < 0.5 ? 90 : -90;
        animate(rotateY, rotateY.get() + delta, { duration: 1.4, ease: [0.65, 0, 0.35, 1] });
      }
    }, 2800);
    return () => clearInterval(id);
  }, [rotateX, rotateY]);

  const resumeIdle = () => {
    const id = gestureId.current;
    window.setTimeout(() => {
      if (gestureId.current === id) draggingRef.current = false;
    }, 1200);
  };

  const cancelHold = () => {
    if (holdTimer.current === undefined) return;
    window.clearTimeout(holdTimer.current);
    holdTimer.current = undefined;
    animate(holdProgress, 0, { duration: 0.25, ease: "easeOut" });
  };

  const fireEasterEgg = () => {
    holdTimer.current = undefined;

    const rect = hitAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = rect.x + rect.width / 2;
    const y = rect.y + rect.height / 2;
    // grow past the furthest viewport corner so the circle really does cover everything
    const reach = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    // Resolve --inverse-bg to a literal colour *now*. It has to be frozen: the custom
    // property is redefined by the .dark class, so leaving `var(--inverse-bg)` on the
    // overlay would make it flip to the other colour at the exact moment the theme
    // toggles — inverting the wipe halfway through.
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--inverse-bg")
      .trim();

    setFlood({ x, y, scale: (reach * 2) / HIT_SIZE, color, fading: false });

    // Flip the theme once the flood has covered the page, then fade the overlay away so the
    // page surfaces through it rather than snapping back in one frame. The overlay is the
    // incoming theme's background colour, so the swap underneath it is never visible.
    window.setTimeout(() => {
      toggleTheme();
      holdProgress.jump(0);
      setFlood((current) => (current ? { ...current, fading: true } : current));
      window.setTimeout(() => setFlood(null), REVEAL_MS);
    }, FLOOD_MS);
  };

  const handlePointerDown = () => {
    draggingRef.current = true;
    gestureId.current += 1;
    pannedRef.current = false;
    // MotionValue.set() does *not* interrupt a running animation (only .jump()/.stop() do),
    // so without this an idle tween or a still-decaying glide would keep writing its own
    // value every frame and fight the pointer for control of the cube.
    rotateX.stop();
    rotateY.stop();
    // prevent the drag gesture from also starting a native text selection anywhere on the page
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";

    // arm the hold only when the theme face is the one actually looking at the viewer
    if (frontFaceIndex(rotateX.get(), rotateY.get()) === THEME_FACE_INDEX) {
      animate(holdProgress, 1, { duration: HOLD_MS / 1000, ease: "linear" });
      holdTimer.current = window.setTimeout(fireEasterEgg, HOLD_MS);
    }
  };

  // Called from both release paths and safe to run twice. onPointerUp misses the case
  // where the pointer is released off the element, but reaching "off the element" always
  // means movement, which means a pan started and handlePanEnd will fire instead.
  const endGesture = () => {
    document.body.style.userSelect = "";
    document.body.style.webkitUserSelect = "";
    window.getSelection()?.removeAllRanges();
  };

  const releasePointer = () => {
    cancelHold();
    endGesture();
    // a real drag hands back to the idle loop from handlePanEnd, once its glide has settled
    if (!pannedRef.current) resumeIdle();
  };

  const handlePanStart = () => {
    pannedRef.current = true;
    // movement means this is a drag, not a press — drop the charge
    cancelHold();
  };

  const handlePan = (_: unknown, info: { delta: { x: number; y: number } }) => {
    rotateY.set(rotateY.get() + info.delta.x * DRAG_SENSITIVITY);
    rotateX.set(rotateX.get() - info.delta.y * DRAG_SENSITIVITY);
  };

  const handlePanEnd = (_: unknown, info: { velocity: { x: number; y: number } }) => {
    endGesture();

    // Keep spinning after release, decelerating from the release velocity — same px->deg
    // sensitivity as the live drag, just spread over time.
    // The "0" target is a deliberate throwaway (the same trick framer-motion's own drag
    // momentum uses internally): the inertia generator derives its real endpoint from
    // velocity/power and ignores this value — but framer's canAnimate() drops the whole
    // animation as a no-op when the target equals the current value, so it can't be
    // rotateY.get()/rotateX.get() here. No min/max/modifyTarget on either axis: both
    // tumble freely.
    const inertiaOptions = { type: "inertia" as const, power: 0.4, timeConstant: 400, restDelta: 0.5 };
    const spin = animate(rotateY, 0, { ...inertiaOptions, velocity: info.velocity.x * DRAG_SENSITIVITY });
    const tilt = animate(rotateX, 0, { ...inertiaOptions, velocity: -info.velocity.y * DRAG_SENSITIVITY });

    // Hand back to the idle loop only once the glide has really settled — a hard fling
    // decays for well over 2s, and a fixed timeout let the idle tween cut in mid-glide and
    // yank the cube off its arc. The grace floor keeps a gentle release (velocity ≈ 0, so
    // the glide ends on the first frame) from being pounced on instantly.
    const id = gestureId.current;
    const grace = new Promise((resolve) => window.setTimeout(resolve, 1200));
    Promise.all([Promise.allSettled([spin.finished, tilt.finished]), grace]).then(() => {
      if (gestureId.current === id) draggingRef.current = false;
    });
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
        <TechCube rotateX={rotateX} rotateY={rotateY} holdProgress={holdProgress} />
      </motion.div>

      <motion.div
        ref={hitAreaRef}
        onPointerDown={handlePointerDown}
        onPointerUp={releasePointer}
        onPointerCancel={releasePointer}
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

      {flood && (
        <motion.div
          aria-hidden="true"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: flood.scale, opacity: flood.fading ? 0 : 1 }}
          transition={{
            scale: { duration: FLOOD_MS / 1000, ease: [0.65, 0, 0.35, 1] },
            opacity: { duration: REVEAL_MS / 1000, ease: [0.33, 0, 0.2, 1] },
          }}
          style={{
            position: "fixed",
            left: flood.x - HIT_SIZE / 2,
            top: flood.y - HIT_SIZE / 2,
            width: HIT_SIZE,
            height: HIT_SIZE,
            borderRadius: "9999px",
            background: flood.color,
            pointerEvents: "none",
            zIndex: 60,
          }}
        />
      )}
    </>
  );
}
