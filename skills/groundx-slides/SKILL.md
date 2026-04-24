---
name: groundx-slides
description: Produce EyeLevel-branded presentation decks as HTML-rendered PDFs. EyeLevel is a Valantor company. GroundX is an EyeLevel product. Use this skill whenever the user asks for slides, a deck, a pitch, a presentation, a keynote, an executive briefing, a white-paper cover deck, or any .pdf slide output that should carry EyeLevel branding. Triggers include "build a deck for …", "make slides about …", "presentation for the Dell team", "pitch deck", "one-pager slide", "executive briefing". The skill renders slides as 16:9 HTML pages styled to match the GroundX dashboard, then exports them to PDF via a headless-browser build step (Puppeteer / Chrome). This is the preferred medium for EyeLevel decks — it uses the same Inter webfont, the same green-primary-CTA palette, and the same flat surface language as the web UI. Do NOT use this skill for .pptx output; if a user specifically wants an editable PowerPoint file, reach for the built-in pptx skill instead and apply the palette/typography from the design standards manually. Before producing any deck, read ../groundx-design-standards/SKILL.md for the brand invariants.
---

# EyeLevel Slides (HTML → PDF)

Decks at EyeLevel are built as a set of 16:9 HTML pages, styled with the same design language as defined in `groundx-design-standards/SKILL.md`, and rendered to a single PDF via a headless browser. This mirrors the workflow that produced the Dell response deck in the examples folder — and it means a slide looks like a dashboard card looks like a landing page, because they're all the same DOM.

**Before producing anything, read `../groundx-design-standards/SKILL.md` and `../groundx-design-standards/references/tokens.md`.** That skill owns the palette, typography, logos, and brand principles; `tokens.md` is the canonical source for every color, font size, weight, radius, logo filename, and canvas dimension used here. This skill only defines how those invariants translate to slide layouts and the build pipeline.

## Why HTML → PDF, not .pptx

- **One typography system across mediums.** Inter renders from the same Google Fonts source as the dashboard; no font-embedding gymnastics.
- **Pixel-consistent palette.** The CSS custom properties in `styles.css` `:root` are auto-generated from `../groundx-design-standards/tokens.json` (the machine-readable source of truth), the same file the dashboard's `constants.generated.ts` is generated from — no drift between mediums.
- **Editable by developers, reviewable by designers.** HTML diffs cleanly in a PR; .pptx binary diffs do not.
- **No PowerPoint-specific rendering quirks.** No surprise drop shadows, no "smart" text auto-scaling, no chart styling drift.

The trade-off: the final artifact is a **flat PDF**, not an editable .pptx. Users who need to edit slides in Keynote / PowerPoint after-the-fact should be routed to the built-in `pptx` skill instead, with an explicit note that the visual fidelity will be approximate.

## Slide canvas

Every slide is a **1920 × 1080** HTML page (16:9, 1×). Puppeteer prints each page at that exact viewport and the resulting PDF has the same dimensions. The CSS uses absolute pixel values tuned to this canvas; a slide built for this canvas will not render correctly at 1280×720 without re-tuning, and that's deliberate — slides are a fixed-format medium.

Rem is set so `1rem = 16px` on the slide, matching the dashboard's root. All type sizes in `references/typography-slides.md` are expressed in rem so they stay consistent with web conventions.

## Decision tree — which layout does this slide want?

Pick a layout from `references/layouts.md` based on the slide's job:

```
Opening / closing slide                                    → cover / cta
Big proposition with one supporting image or stat trio     → hero-with-stats
A claim about a problem and an answer                      → split-problem-solution
One dense topic broken into three parallel pieces          → three-card-grid
A list of 3–5 items with equal weight                      → numbered-steps
One stat you want to land                                  → display-stat
A detail-heavy slide with a sidebar stat                   → detail-grid-with-sidebar
A full-bleed navy section break                            → section-break
```

Layouts are built from the patterns in `../groundx-design-standards/references/patterns.md`. If a slide doesn't fit a layout here, reach for a pattern and compose — don't invent a new layout on a one-off basis.

## Reference map

```
What hex / size / weight / radius / logo    → ../groundx-design-standards/references/tokens.md (narrative)
filename / canvas dimension do I use?         ../groundx-design-standards/tokens.json     (machine source of truth)
                                              (canonical values — always start here)

What are the slide layouts?                 → references/layouts.md
Slide-specific typography rules              → references/typography-slides.md
(unified label tier, 1:4 stat ratio,
 layout-scoped subheads — sizes themselves
 live in tokens.md § 3)
How do I build + render to PDF?             → references/implementation.md
How do I set up the project / dependencies? → references/implementation.md (§ Project setup)
What's in the starter template?             → templates/README.md
```

**Token flow.** Brand values live in two paired files in the design-standards skill: `tokens.json` (machine-readable source of truth, DTCG format) and `references/tokens.md` (human-readable narrative). A codegen script (`groundx-design-standards/scripts/generate-mirrors.mjs`) reads `tokens.json` and splices the CSS custom properties (`--gx-*`) into `templates/styles.css` between the `/* BEGIN GENERATED TOKENS */` and `/* END GENERATED TOKENS */` markers. Every class rule below the generated block references those vars via `var(--gx-*)`. To change a color, size, weight, radius, or logo path brand-wide: edit `tokens.json` + `tokens.md` first, re-run the generator, then rebuild the deck. Do not hand-edit anything between the generated-block markers — the next generator run will overwrite it. Do not introduce raw hex values, raw px sizes, or raw URL strings in `styles.css` outside the generated `:root` block, and never in slide HTML. CI verifies the mirror via `generate-mirrors.mjs`'s companion `verify-mirrors.mjs` script.

## Templates

```
templates/
├── base.html              Single-slide shell: <!doctype>, font link, CSS vars, grid
├── styles.css             Full stylesheet — palette vars, typography, layout classes
├── build.mjs              Node script: reads slides/*.html, renders to out/deck.pdf
├── package.json           Dependencies (puppeteer, serve, npm-run-all)
├── components/            HTML partials (header, footer, eyebrow, display-stat, cards)
│   ├── slide-header.html
│   ├── slide-footer.html
│   ├── eyebrow.html
│   ├── display-stat.html
│   └── three-card-grid.html
└── slides/                One .html per slide (numbered: 01-cover.html, 02-problem.html …)
    └── 00-example.html
```

Drop the whole `templates/` folder into a new repo, run `npm install && npm run build`, and `out/deck.pdf` is the final artifact.

## Examples

```
examples/
├── dell-response-deck/    11-slide reproduction of the "Built for Dell" deck — every layout used at least once
└── minimal-deck/          3-slide minimum viable example — cover, content, CTA
```

Use these to pattern-match. If a user asks for a deck similar to the Dell response, start from `dell-response-deck/` and rewrite the content. If a user asks for a quick 3-slide pitch, start from `minimal-deck/`.

## Pre-return checklist

Before reporting a deck complete, verify:

1. **All values come from tokens.** No hex literal, no raw px/rem size, no raw font-weight numeral, no raw logo URL, and no raw canvas dimension (1920/1080/80px) in HTML or in `styles.css` *outside* the generated `:root` block. Every such value is emitted once into the `/* BEGIN GENERATED TOKENS */ … /* END GENERATED TOKENS */` span by the codegen (sourced from `../groundx-design-standards/tokens.json`) and referenced from class rules via `var(--gx-*)`. Grep for `#` followed by a hex digit, `font-size:` / `font-weight:` with a literal number, and `url(` in both `.html` files and in `styles.css` class rules — anything outside the generated block is a violation.
2. **Eyebrow color matches surface.** Coral eyebrows on light surfaces, green eyebrows on navy. Use the surface-aware aliases (`--gx-eyebrow-on-light`, `--gx-eyebrow-on-dark`) rather than naming the color directly. Grep for `.eyebrow` class usage and confirm.
3. **Inter is loaded.** `styles.css` imports Inter from Google Fonts (`fonts.googleapis.com`); `build.mjs` primes weights 400 / 600 / 700 / 800 before each slide is printed.
4. **Logo lockup present.** Every slide except the section break has `<div class="slide-logo" …></div>` top-left. The CSS swaps via the `--gx-logo-light` / `--gx-logo-dark` tokens — light PNG on light surfaces, dark PNG on navy / green / coral. "A VALANTOR COMPANY" is baked into both PNGs. No `.tagline` element (see `../groundx-design-standards/references/logos.md`).
5. **No box-shadow, no MUI elevation, no gradient background.** Exception: the thin brand accent bar (see `patterns.md` pattern 8) on cover / CTA slides if used.
6. **ALL-CAPS eyebrows are typed uppercase in the HTML source.** No `text-transform: uppercase` in CSS.
7. **Slide dimensions:** every `.slide` element renders at the canonical canvas (see `tokens.md` § 6). Test with Chrome devtools `Ctrl+Shift+M` at that viewport.
8. **PDF builds clean.** `npm run build` produces `out/deck.pdf` with the expected page count and no console errors from Puppeteer.

## Skill directory map

```
groundx-slides/
├── SKILL.md                          (this file)
├── references/
│   ├── layouts.md                    8 canonical slide layouts + when to use each
│   ├── typography-slides.md          Slide-specific type scale at 1920×1080
│   └── implementation.md             Build pipeline, Puppeteer config, deployment
├── templates/                        Drop-in HTML/CSS/Node project
│   └── README.md                     Template-level docs
├── examples/
│   ├── dell-response-deck/           Full 11-slide reproduction
│   └── minimal-deck/                 3-slide example
└── evals/
    └── evals.json                    Test prompts + rubric + sanity file list
```
