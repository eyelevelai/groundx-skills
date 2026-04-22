# Deck template

Drop-in scaffold for a GroundX slide deck. Everything you need to author and render is in this folder.

## Quick start

```bash
npm install
npm run dev    # serves on http://localhost:4173
npm run build  # writes out/deck.pdf
```

## Project layout

```
templates/
├── styles.css           Shared palette + typography + layout CSS
├── base.html            Copy-paste starter for a new slide
├── build.mjs            Puppeteer build script → out/deck.pdf
├── package.json         Dependencies + scripts
├── index.html           Thumbnail index (open at http://localhost:4173/)
├── assets/
│   └── logos/           GroundX wordmarks copied from design-standards
└── slides/
    ├── 00-section-break.html
    ├── 01-cover.html
    ├── 02-hero-with-stats.html
    ├── 03-split-problem-solution.html
    ├── 04-three-card-grid.html
    ├── 05-numbered-steps.html
    ├── 06-display-stat.html
    ├── 07-cta.html
    └── 08-detail-grid-with-sidebar.html
```

## Adding a slide

1. Copy an existing slide that's closest to the layout you want.
2. Rename with a numeric prefix that places it in order (e.g., `03-whitepaper-quotes.html` sorts after `02-…`).
3. Update the `.slide-number` in the top-right and the `<title>`.
4. Rewrite the content. **Do not change the class names unless you're adding a new layout to `styles.css`.**

## Choosing a layout

See `../references/layouts.md` for when to use each layout and what it looks like at 1920×1080.

## Style rules

- **No hex literals in the HTML.** Every color comes from `var(--gx-*)` in `styles.css`. If you need a new color, add it to `:root` there first and give it a semantic name.
- **No `box-shadow`.** The single exception is the thin gradient accent bar, and that's already defined as `.accent-bar`.
- **Eyebrows written as uppercase strings**, not `text-transform: uppercase`.
- **Every slide has the wordmark (top-left) and slide number (bottom-right)**. Cover and CTA slides also have the "A VALANTOR COMPANY" tagline.

## Fonts

THICCCBOI loads from `cdn.eyelevel.ai`. Puppeteer waits for `document.fonts.ready` before printing each slide, so the PDF always ships with the right font. If you need offline rendering, copy THICCCBOI `.woff2` files into `fonts/` and swap the `@import` at the top of `styles.css` for a `@font-face` block pointing at local paths.

## What this template is *not*

It is not a slide presenter. It does not ship a keynote-style UI, a presenter timer, or keyboard navigation. The build output is a PDF — use any PDF viewer to present.

If you need click-to-advance slides for a live meeting, open `index.html` and present the browser window; or export the PDF and present from that.
