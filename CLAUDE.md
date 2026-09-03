# Project context for Claude

Read this first — it should save you from re-reading every component to understand the architecture.

## What this is

Paweł Szeliga's portfolio site. Single-page React app, no backend, no router (scroll navigation only).
Owner is a CS grad (B.Sc. from PJATK) currently studying Applied CS at Politechnika Warszawska, with a
6-month software internship at Veolia CUW. Built black/white monochrome, bilingual EN/PL, dark/light theme.

Not yet deployed. Git initialized locally (`master` branch, one commit as of this writing) but **no GitHub
remote yet** — the user said they'd create the repo later. Don't assume a remote exists; check with
`git remote -v` before assuming push will work.

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
