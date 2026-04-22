# Minimal deck — 3 slides

The smallest complete GroundX deck: a cover, one content slide, and a CTA close.

Use this as a starting point when you need to pitch a single idea or ship a one-pager deck in under an hour.

## Run

Copy this folder next to `templates/`, then:

```bash
cd minimal-deck
cp ../../templates/{styles.css,build.mjs,package.json,index.html} .
npm install
npm run build   # → out/deck.pdf
```

Alternatively, keep the deck inside the templates folder (renaming slides/ contents) and run `npm run build` directly — this example is a reference for *content*, not a second runnable project.

## Slides

```
slides/
├── 01-cover.html       Navy cover. One title, one subhead.
├── 02-content.html     Aqua three-card grid. One proposition, three supporting cards.
└── 03-cta.html         Navy CTA. One ask, two buttons.
```

Use the minimal deck as a pattern; use `../../templates/` for the full starter.
