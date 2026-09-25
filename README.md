# Studio — The Index

The index of the Autonomous Premium Web Studio: fifty independent websites, each with
its own name, palette, typography and voice. Built, tested and deployed separately —
fifty out of fifty verified live on 25 September 2026.

## The design

**A specimen book.** Warm paper for the reading, ink plates for the specimens. The claim
the site makes is that every project has its own design system, so the index *is* fifty
design systems: each plate carries that project's real accent (read out of its compiled
CSS), a monogram mark, and its name set in one of four specimen faces.

- **Palette** — bone paper `#F2EFE7`, ink plates `#1C1C15`, one studio accent (persimmon
  `#B5371A`). Each project supplies its own accent for its mark, top rule and hover wash.
- **Type** — Fraunces (display), Schibsted Grotesk (text), JetBrains Mono (data), plus
  Instrument Serif, Space Grotesk and Syne for the per-project specimen faces.
- **Edge** — 2–4px radii, hairline rules, shadows only where something lifts off the page.
- **Motion** — masked line reveals, a staggered colour wall, scroll reveals, FLIP on
  filter, a scale/slide sheet, toasts. All of it disabled under `prefers-reduced-motion`.

## Pages

| Page | Purpose |
|---|---|
| `/` | The index — hero, the wall, search + filter + sort, fifty plates, project sheet |
| `/method.html` | The four pipeline stages, the six rules, the measured numbers |
| `/404.html` | Not found — in brand, with the wall |
| `/about.html` | Redirect to `/method.html` (kept so old links still land) |

## Structure

```
index.html · method.html · 404.html · about.html
src/
  main.js               boot: chrome → reveals → entrance
  style.css             the whole design system, in one ordered sheet
  data/
    studio.js           origin, verification date — small, always loaded
    projects.js         the 50 projects: slugs, disciplines, copy, colours
  lib/
    chrome.js           header + footer, mobile nav, scroll state
    color.js            hue, for laying the wall out as a spectrum
    dom.js              $/el/esc/debounce/scroll lock
    icons.js            16px icon set + the studio mark
    mark.js             the monogram tile
    motion.js           reveal, FLIP, counters, reduced-motion
    sheet.js            the project sheet (native <dialog>)
    toast.js            toasts + clipboard
  pages/                index.js · method.js · notfound.js
public/                 favicon.svg · og.svg (generated from the data)
```

`projects.js` is loaded through a real dynamic `import()`, so it lands in its own
chunk — the shared bundle stays around 3 kB gzipped and the skeleton you see on a cold
load is a genuine network state, not theatre.

## How the data stays honest

Slugs are stored, never derived. Transliterating a name at runtime turns `Rörliga` into
`rrliga` and 404s; the stored values (`rorliga`, `mane`, `bolge`, `vaxthus`, `nordfard`,
`sigrid-dahl`, `halvorsen-voss`, `studio-n`, `blue-hour`, `northern-current`) are the
ones the deployments actually answer on. Every number quoted on the site — 50 shipped,
50/50 live, 62 typefaces, 0 shared stylesheets, 10 countries, 8 disciplines — was
measured against the live sites, not estimated.

## Stack

Vite multi-page build · vanilla ES modules · CSS custom properties · no runtime
dependencies · GitHub Pages via Actions.

```
npm install
npm run dev      # http://localhost:5173/studio/
npm run build
```

Live at https://temidayoxyz.github.io/studio/
