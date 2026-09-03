# Paweł Szeliga — Portfolio

A single-page portfolio site: React + TypeScript + Vite, Tailwind CSS v4, and Framer Motion. Bilingual (EN/PL), dark/light theme, no backend.

Live locally at `npm run dev` → http://localhost:5183/

## Stack

- **React 19 + TypeScript**, built with **Vite**
- **Tailwind CSS v4** for styling (monochrome black/white design system, CSS custom properties for theming)
- **Framer Motion** for all animation (reveal-on-scroll, page transitions, gestures)
- **i18next / react-i18next** for EN/PL translations, with browser-language auto-detection
- **Devicon** (via CDN) for technology logos in the skills popups
- No backend — the contact form builds a `mailto:` link; everything else is static

## Structure

Single page (`src/App.tsx`), scroll-navigated (no router). Section order was chosen to read the way a recruiter actually scans a page — experience and shipped projects before the in-progress education, skills as supporting detail:

1. **Hero** — animated name reveal, rotating role text, and a draggable 3D cube (see below)
2. **About** — bio + grayscale portrait + quick-fact grid
3. **Experience** — timeline, led by the Veolia CUW internship (with its logo), then JSK, then academic projects
4. **Skills** — grouped tags; every tag opens a modal with a plain-English explanation (written for non-technical readers, e.g. recruiters) and, where one exists, a Devicon logo
5. **Projects** — filterable grid; clicking a card expands it in place (grows to a 2×2 grid area, header/divider/scrollable-content/divider/footer layout, only one expanded at a time)
6. **Education** — PJATK (completed B.Sc.) and Politechnika Warszawska (in progress), each with the school's logo
7. **Contact** — email / GitHub / LinkedIn + a form that opens the visitor's mail client

## Notable implementation details

- **Theme**: `ThemeContext` toggles a `dark` class on `<html>`; all colors are CSS custom properties in `src/index.css`, so components never hardcode light/dark values.
- **i18n content**: all copy lives in `src/i18n/en.json` / `pl.json`, including structured data (skills groups + per-skill descriptions, experience/education entries). `src/data/projects.ts` holds the project list (bilingual short + long descriptions, tech tags, repo links).
- **3D cube** (`TechCube.tsx` + `CubeBackdrop.tsx`): a real CSS 3D-transform cube (not an image), rendered as a fixed background layer at `z-index: -1` so it shows through the page rather than sitting on top of content. Blurs and fades out as you scroll past the hero. Click-and-drag rotates it — the drag hit-area is a separate invisible element whose `pointer-events` are only enabled near the top of the page (while the cube is sharp), so it never intercepts clicks on real content further down.
- **Skill modals**: clicking a skill tile flies it to the center of the screen (captures the tile's on-screen position on click, animates via `transform`/`opacity` only — deliberately avoids Framer's `layoutId` shared-layout projection, which caused visible jank when combined with a 3D flip).
- **Logos** (`src/assets/logos/`, `src/assets/photo/`): school and company logos were supplied as source images and processed with small one-off Node scripts (pure `zlib`/manual PNG decode, no dependencies) to recolor them to the exact theme black/white and trim padding; the profile photo was cropped and converted to grayscale the same way. None of the original source files are committed — only the processed output.

## Scripts

```
npm run dev       # start dev server
npm run build     # typecheck + production build
npm run preview   # preview the production build
npm run lint      # oxlint
```

## Content changes

Bio, experience, education, skills and project copy live entirely in `src/i18n/en.json` / `src/i18n/pl.json` and `src/data/projects.ts` — no code changes needed to update text, add a project, or add a skill (add it to the relevant `groups` array in both locale files, plus a `descriptions` entry; add a Devicon mapping in `src/data/devicons.ts` if one exists for it).
