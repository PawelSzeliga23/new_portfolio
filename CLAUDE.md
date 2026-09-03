# Project context for Claude

Read this first — it should save you from re-reading every component to understand the architecture.

## What this is

Paweł Szeliga's portfolio site. Single-page React app, no backend, no router (scroll navigation only).
Owner is a CS grad (B.Sc. from PJATK) currently studying Applied CS at Politechnika Warszawska, with a
6-month software internship at Veolia CUW. Built black/white monochrome, bilingual EN/PL, dark/light theme.

Not yet deployed. Git remote `origin` is set to https://github.com/PawelSzeliga23/new_portfolio.git,
with `master` tracking `origin/master`.

## Stack

React 19 + TS + Vite, Tailwind CSS v4, Framer Motion, i18next/react-i18next. Devicon loaded via CDN
(`index.html`) for skill logos. `npm run dev` — port isn't pinned in `vite.config.ts`, so it uses Vite's
default (5173) unless that's taken; check the terminal output (or `--port` flag) for the actual port rather
than assuming.

## Where content lives (edit these, not components, for copy changes)

- `src/i18n/en.json` / `pl.json` — **all** UI copy: hero, about, experience, education, skills (groups +
  per-skill `descriptions` keyed by id), contact, footer. Structured, not flat strings — e.g.
  `skills.groups[].items[]` is `{id, label}[]`, and `skills.descriptions[id]` is the plain-English popup text.
- `src/data/projects.ts` — project list. Each has `descEn/descPl` (short, collapsed card) and
  `longDescEn/longDescPl` (2-paragraph, `\n\n`-separated, expanded card).
- `src/data/devicons.ts` — skill id → Devicon CSS class. Not every skill has a real logo (conceptual skills
  like "OOP & design patterns" intentionally have no entry — they render without an icon, not a broken one).

## Section order (deliberate, not default)

Hero → About → **Experience → Skills → Projects** → Education → Contact. Reasoning discussed with the user:
real experience and shipped projects outrank a skills list and an in-progress degree for a recruiter skimming
the page — so Experience/Projects were pulled ahead of the more conventional Skills-then-Education ordering.
If asked to reorder, remember this was intentional, not an oversight.

## Architecture gotchas (things not obvious from reading one file)

- **Theming**: `ThemeContext` toggles a `.dark` class on `<html>`. All colors are CSS custom properties
  defined in `src/index.css` (`:root` and `.dark`) — components use `var(--fg)`, `var(--bg)`, `var(--muted)`,
  `var(--border)`, `var(--border-strong)`, `var(--surface)`. Never hardcode a color in a component.
- **`CubeBackdrop.tsx` / `TechCube.tsx`**: the 3D cube is a real CSS `rotateX/rotateY` transform cube (not an
  image/lib). It's rendered as a `position: fixed` layer at `z-index: -1`, placed early in `App.tsx`'s DOM —
  since none of the `<section>`s have an opaque background, the cube shows through the whole page as you
  scroll, not just the hero. It blurs/fades via `useScroll`+`useTransform` on `scrollY`. It's draggable
  (`onPan`), but the invisible drag-hit-area is a **separate** element from the visual cube, with an explicit
  `z-index: 30` (needed — without it, clicks fell through to underlying text despite `position: fixed`,
  because the hero `<h1>`'s flexbox box extends past its visible glyphs and normally-flowed content can still
  win the hit-test) and `pointerEvents` bound to `scrollY < 20` so it only accepts input while the cube is
  fully sharp — once blurred, it stops intercepting clicks on real content below.
- **Cube drag momentum (`CubeBackdrop.tsx`)**: releasing a drag starts a `type: "inertia"` animation on each
  axis so the cube keeps spinning and decelerates. Three non-obvious things hold this together, all of which
  were bugs first:
  - The `to` argument is a throwaway `0`, **not** the current value. Framer's `canAnimate()` drops an
    animation as a silent no-op when the target equals the current value, and its escape hatch for
    generator-driven animations only whitelists the string `"spring"`, not `"inertia"` — so passing
    `rotateY.get()` there makes the whole glide do nothing, with no console error. The inertia generator
    derives its real endpoint from velocity/power and ignores this value anyway (framer's own drag momentum
    passes `0` for the same reason).
  - `handlePanStart` calls `rotateX.stop()`/`rotateY.stop()`. `MotionValue.set()` does *not* interrupt a
    running animation (only `.jump()`/`.stop()` do), so re-grabbing mid-glide otherwise leaves the old
    animation writing its own value every frame, fighting the pointer.
  - The idle auto-rotate loop is handed back control off the glide's `.finished` promise (plus a grace
    floor), not a fixed timeout. A hard fling decays for well over 2s, and the old 2000ms timeout let the
    idle tween cut in mid-glide and yank the cube off its arc. A `gestureId` counter guards the handover so
    a stale glide can't unlock the idle loop underneath a drag that has already started.
  Rotation is deliberately **unbounded on both axes**. An earlier version capped the vertical axis to keep a
  face from passing 90° (past vertical, labels render upside down / mirrored) — the user explicitly chose
  free tumbling over upright labels, because any cap makes the cube feel like it is on rails. Note this also
  means `min`/`max` must not come back: they are an *elastic* bound in framer's inertia, so the glide
  overshoots them and a spring hauls it back, which looked like a glitch rather than a limit.
- **Theme easter egg (cube face 5)**: the sixth face carries no tech label — it shows a single centred pip so
  it reads as the "1" side of a die. Press and hold it for 1.2s and the pip grows until it swallows the face,
  then a circle floods the viewport and the theme flips. It replaced the "Java" label; Java is still listed
  in the Skills section.
  - The glyph is deliberately the **inverse** of `ThemeToggle`'s: the nav toggle shows the theme you are in
    (`☾` in dark), the pip shows the theme you'd get (`☀` in dark). The pip is a promise, not a status.
    Don't "fix" the inconsistency.
  - `THEME_FACE_INDEX` in `TechCube.tsx` must stay in sync with the `null` entry in that file's `FACES`
    array — `CubeBackdrop` matches against it to decide whether the pip is the face you're looking at.
  - Which face is front is computed as **maths, not hit-testing** (`faceDepths()`): the visual cube is
    `pointer-events: none` with the drag hit-area floating over it as a separate flat element, so a face can
    never receive a pointer event of its own to be hit-tested.
  - Press vs. drag: the hold is armed on `pointerdown` and cancelled by `onPanStart`, which only fires once
    framer sees 3px of movement — so stillness charges, movement rotates, and the two gestures don't collide.
  - A press that never becomes a drag gets **no** `onPanEnd` (framer only fires it if a pan actually
    started), so `releasePointer` has to resume the idle loop itself. Without that, a plain click on the cube
    froze it permanently.
  - The flood overlay's colour is resolved from `--inverse-bg` to a literal string *before* the toggle and
    frozen in state. Left as `var(--inverse-bg)` it would flip to the other colour at the exact moment the
    theme changes, inverting the wipe halfway through.
- **Skill modal (`SkillModal.tsx` + `Skills.tsx`)**: clicking a tile flies it to center, growing + rotating.
  This is done with a **manually captured** `getBoundingClientRect()` on click + plain `x/y/scale/rotateY`
  animation (pure `transform`/`opacity`, GPU-compositable) — deliberately *not* Framer's `layoutId` shared-
  layout projection. An earlier version used `layoutId` + `rotateY` + animated `border-radius` together and
  was visibly janky (layout projection recalculates every frame across the whole tile grid; border-radius
  isn't compositable). If tempted to "simplify" this back to `layoutId`, don't — it was tried and reverted.
- **Expanded project card (`Projects.tsx`)**: header → `border-b` divider → scrollable content
  (`flex-1 min-h-0 overflow-y-auto`) → `border-t` divider → footer (tech tags + code link). Header/footer are
  `shrink-0` so they never scroll — only the description does. On mobile/tablet the whole card is capped at
  `max-h-[70vh]` (removed via `lg:max-h-none` where the grid's `row-span-2` already gives it real height).
  Expanding sets `col-span-2 row-span-2` in the `lg:grid-cols-4` grid (4 cells) via a single `expandedId`
  state — only one card expands at a time, filter changes reset it.
- **Logos/photo** (`src/assets/logos/`, `src/assets/photo/`): the school/company logos (PW, PJATK, Veolia)
  and the profile photo were supplied by the user as raw source files, then processed with **one-off Node
  scripts** (manual PNG zlib decode/recolor for logos → exact `#0a0a0a`/`#f5f5f5` theme colors with trimmed
  padding; `jpeg-js` for the photo crop+grayscale). Those scripts were run once in the scratchpad and are
  **not** part of the repo — only their output (the processed PNG/JPG files) is committed. If asked to
  reprocess or add another logo, you'll need to rebuild a similar script rather than find one in the repo.

## Known non-issues

If testing in a Chrome automation tool and a screenshot comes back solid black/blank right after a
click/nav, it's very likely a capture-timing artifact of that tool, not an app bug — wait ~1-2s and
re-screenshot before concluding something broke. This happened repeatedly during development and was
never a real rendering issue.

## Commands

```
npm run dev       # dev server
npm run build     # tsc -b && vite build
npm run preview
npm run lint       # oxlint
```
