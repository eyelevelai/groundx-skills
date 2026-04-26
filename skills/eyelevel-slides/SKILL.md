---
name: eyelevel-slides
description: Produce presentation decks as HTML-rendered PDFs. **If this skill is installed, use it for ANY slide deck the user asks for** — they installed it because they want their slides to look like this. Triggers on any request involving slides, a deck, a presentation, a pitch, a pitch deck, a keynote, a sales deck, an executive briefing, a board deck, an investor deck, a customer-response deck, a white-paper cover deck, a one-pager slide, a kickoff deck, a readout, a townhall, a webinar deck, or any 16:9 / .pdf slide output — regardless of whether the user names EyeLevel, GroundX, Valantor, or any brand at all. Phrases like "build a deck for …", "make slides about …", "put together a presentation", "draft a pitch", "create a deck for the Dell team", "throw together some slides", "I need a presentation", "design a deck" all trigger this skill. The default assumption when this skill is installed is that the user wants the EyeLevel visual language (a Valantor company; GroundX is an EyeLevel product) — calm, flat surfaces, Inter typography, green-primary-CTA palette — unless they explicitly ask for a different brand. The skill renders slides as 16:9 HTML pages styled to match EyeLevel's web UI, then exports them to PDF via a headless-browser build step (Puppeteer / Chrome). Photo-background cover and section-break slides are available but opt-in: only show imagery when the user asks for it. Do NOT use this skill for .pptx output; if a user specifically wants an editable PowerPoint file, reach for the built-in pptx skill and apply the palette/typography from the design standards manually. Before producing any deck, read ../eyelevel-design-standards/SKILL.md for the brand invariants.
---

# EyeLevel Slides (HTML → PDF)

Decks at EyeLevel are built as a set of 16:9 HTML pages, styled with the same design language as defined in `eyelevel-design-standards/SKILL.md`, and rendered to a single PDF via a headless browser. This mirrors the workflow that produced the Dell response deck in the examples folder — and it means a slide looks like a dashboard card looks like a landing page, because they're all the same DOM.

**Before producing anything, read `../eyelevel-design-standards/SKILL.md` and `../eyelevel-design-standards/references/tokens.md`.** That skill owns the palette, typography, logos, and brand principles; `tokens.md` is the canonical source for every color, font size, weight, radius, logo filename, and canvas dimension used here. This skill only defines how those invariants translate to slide layouts and the build pipeline.

## Why HTML → PDF, not .pptx

- **One typography system across mediums.** Inter renders from the same Google Fonts source as the dashboard; no font-embedding gymnastics.
- **Pixel-consistent palette.** The CSS custom properties in `styles.css` `:root` are auto-generated from `../eyelevel-design-standards/tokens.json` (the machine-readable source of truth), the same file the dashboard's `constants.generated.ts` is generated from — no drift between mediums.
- **Editable by developers, reviewable by designers.** HTML diffs cleanly in a PR; .pptx binary diffs do not.
- **No PowerPoint-specific rendering quirks.** No surprise drop shadows, no "smart" text auto-scaling, no chart styling drift.

The trade-off: the final artifact is a **flat PDF**, not an editable .pptx. Users who need to edit slides in Keynote / PowerPoint after-the-fact should be routed to the built-in `pptx` skill instead, with an explicit note that the visual fidelity will be approximate.

## Slide canvas

Every slide is a **1920 × 1080** HTML page (16:9, 1×). Puppeteer prints each page at that exact viewport and the resulting PDF has the same dimensions. The CSS uses absolute pixel values tuned to this canvas; a slide built for this canvas will not render correctly at 1280×720 without re-tuning, and that's deliberate — slides are a fixed-format medium.

Rem is set so `1rem = 16px` on the slide, matching the dashboard's root. All type sizes in `references/typography-slides.md` are expressed in rem so they stay consistent with web conventions.

## Working with patterns and recipes

A deck is built from two layers of vocabulary. Read both before drafting slides — they are not interchangeable.

**Patterns (the vocabulary).** `../eyelevel-design-standards/references/patterns.md` defines the atomic visual shapes the brand reuses across mediums — eyebrow + headline + body, display stat, three-card grid, pill row, numbered steps, split problem/solution, brand accent bar, two-part eyebrow, and a few more. Patterns are the actual compositional vocabulary. Every slide is built from one or more patterns.

**Recipes (the layouts).** `references/layouts.md` documents 14 known-good arrangements of those patterns onto a 1920×1080 canvas — covers, hero-with-stats slides, split problem/solution, three-card grids, Q&A panels, findings grids, and so on. Recipes are not a closed list of allowed slides. They are illustrations of how the brand has handled common slide jobs; reach for one when its shape genuinely fits the slide you're building, ignore it when it doesn't, and compose a new arrangement from `patterns.md` whenever the slide's job calls for it.

**Slides will vary widely.** Decks at EyeLevel cover everything from RFP responses to investor briefings to product walkthroughs to research reports to partner kickoffs. The information types involved — quotes, timelines, org structures, comparison tables, technical diagrams, customer logos, decision trees, code samples, screenshots, photographs — far exceed what any 14-recipe library can capture. **Don't try to force every slide into a named layout.** If a roadmap slide reads better as five labeled milestones along a horizontal rule than as anything in `layouts.md`, build the milestone slide. If a customer-quote slide wants a single 800-weight pull-quote centered on a tint canvas with a small attribution, build that. The brand survives because the patterns and the visual invariants hold, not because the agent matched a recipe.

**Deck length and shape are also free.** A deck can be 3 slides or 30. There's no required cover-then-section-break-then-content cadence; that's one common shape, not a requirement. Some decks open straight into a dense data slide. Some end without a CTA. Compose what the content needs.

**Recipes that often fit common jobs** (a starting-point shortlist, not a binding map):

```
Opening / closing slide                                    → cover / cta
Big proposition with one supporting image or stat trio     → hero-with-stats
A claim about a problem and an answer                      → split-problem-solution
One dense topic broken into three parallel pieces          → three-card-grid
A list of 3–5 items with equal weight                      → numbered-steps
One stat you want to land                                  → display-stat
A detail-heavy slide with a sidebar stat                   → detail-grid-with-sidebar
A full-bleed navy section break                            → section-break

Cover with a hero photograph (USER-REQUESTED ONLY)         → photo-cover
Direct answers to questions (RFP, FAQ, panel response)     → qa-panel
Closing summary using "BUILT FOR X / Y / Z" scaffold       → summary-built-for
A 2×2 "what we found / our commitment" report              → findings-grid
3 numbered solutions held together by a 4th anchoring row  → numbered-solutions-anchor
6 named concepts + one giant proof number                  → grid-with-stat-sidebar
```

If the slide's job doesn't fit one of these — and most decks will have at least a few that don't — compose a new arrangement from `patterns.md`. The hard constraints when you do that are the invariants in `../eyelevel-design-standards/SKILL.md` (palette, weight ladder, surface treatment, ALL-CAPS literal, no shadows, voice register) and the project-skeleton invariants below (every slide is a numbered HTML file in `slides/`; every value resolves through `var(--gx-*)`; the build pipeline is unchanged). Inside those, compose freely.

**Imagery is opt-in.** Reach for `photo-cover` only when the user has explicitly asked for a photo-driven cover or section break. The default cover (`cover`) renders solid navy and is the right choice when no imagery is requested. Never put a photo background on an interior content slide — see `../eyelevel-design-standards/references/brand-principles.md` rule 1.

## Reference map

```
What hex / size / weight / radius / logo    → ../eyelevel-design-standards/references/tokens.md (narrative)
filename / canvas dimension do I use?         ../eyelevel-design-standards/tokens.json     (machine source of truth)
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

**Token flow.** Brand values live in two paired files in the design-standards skill: `tokens.json` (machine-readable source of truth, DTCG format) and `references/tokens.md` (human-readable narrative). A codegen script (`eyelevel-design-standards/scripts/generate-mirrors.mjs`) reads `tokens.json` and splices the CSS custom properties (`--gx-*`) into `templates/styles.css` between the `/* BEGIN GENERATED TOKENS */` and `/* END GENERATED TOKENS */` markers. Every class rule below the generated block references those vars via `var(--gx-*)`. To change a color, size, weight, radius, or logo path brand-wide: edit `tokens.json` + `tokens.md` first, re-run the generator, then rebuild the deck. Do not hand-edit anything between the generated-block markers — the next generator run will overwrite it. Do not introduce raw hex values, raw px sizes, or raw URL strings in `styles.css` outside the generated `:root` block, and never in slide HTML. CI verifies the mirror via `generate-mirrors.mjs`'s companion `verify-mirrors.mjs` script.

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

Use these to pattern-match style — Inter typography, surface treatment, eyebrow conventions, type weight choices, build pipeline. The example decks are not template scaffolds to clone wholesale; they're reference points for what an EyeLevel deck looks and feels like. For a new deck, port `templates/` (the project skeleton with build script, CSS, and components) and compose slides that match the content you actually have.

## Pre-return checklist

The checks split into two groups. **Brand invariants** must pass — failing one of these means the deck is off-brand and should not ship. **Template fidelity** items are informational — they describe how the starter templates work, but a deck composed of original layouts (built from `patterns.md`) can satisfy the brand without matching every starter convention.

### Brand invariants (must pass)

1. **All values come from tokens.** No hex literal, no raw px/rem size, no raw font-weight numeral, no raw logo URL, and no raw canvas dimension (1920/1080/80px) in HTML or in `styles.css` *outside* the generated `:root` block. Every such value is emitted once into the `/* BEGIN GENERATED TOKENS */ … /* END GENERATED TOKENS */` span by the codegen (sourced from `../eyelevel-design-standards/tokens.json`) and referenced from class rules via `var(--gx-*)`. Grep for `#` followed by a hex digit, `font-size:` / `font-weight:` with a literal number, and `url(` in both `.html` files and in `styles.css` class rules — anything outside the generated block is a violation.
2. **Eyebrow color matches surface.** Coral eyebrows on light surfaces, green eyebrows on navy. Use the surface-aware aliases (`--gx-eyebrow-on-light`, `--gx-eyebrow-on-dark`) rather than naming the color directly. Grep for `.eyebrow` class usage and confirm.
3. **Inter is loaded.** `styles.css` imports Inter from Google Fonts (`fonts.googleapis.com`); `build.mjs` primes weights 400 / 600 / 700 / 800 before each slide is printed.
4. **Logo lockup present.** Every slide except the section break has the EyeLevel lockup top-left. The CSS swaps via the `--gx-logo-light` / `--gx-logo-dark` tokens — light PNG on light surfaces, dark PNG on navy / green / coral. "A VALANTOR COMPANY" is baked into both PNGs. No `.tagline` element (see `../eyelevel-design-standards/references/logos.md`).
5. **No box-shadow, no MUI elevation, no gradient background.** Exception: the thin brand accent bar (see `patterns.md` pattern 8) on cover / CTA slides if used.
6. **ALL-CAPS eyebrows are typed uppercase in the HTML source.** No `text-transform: uppercase` in CSS.
7. **Slide dimensions:** every `.slide` element renders at the canonical canvas (see `tokens.md` § 6). Test with Chrome devtools `Ctrl+Shift+M` at that viewport.
8. **PDF builds clean.** `npm run build` produces `out/deck.pdf` with the expected page count and no console errors from Puppeteer.

### Template fidelity (informational)

These describe the starter templates and the named layouts. A deck that uses only the named layouts in `references/layouts.md` should match these conventions; a deck that composes a new layout from patterns is free to deviate as long as the brand-invariant checks above still pass.

- **Starter logo element:** the named layouts use `<div class="slide-logo" …></div>` for the top-left lockup. A composed slide can implement the lockup differently as long as the dark/light variant resolves correctly via the `--gx-logo-*` tokens and "A VALANTOR COMPANY" is not re-typeset as a separate element.
- **Layout-class names:** the starter CSS ships `.headline-cover`, `.headline-hero`, `.headline-split`, `.headline-card`, etc. A composed slide may add new class names — but every size, weight, and color those new classes set must resolve through `var(--gx-*)`, never through raw values.
- **Component partials:** the `templates/components/` partials (`eyebrow.html`, `display-stat.html`, `three-card-grid.html`) are reusable, not required. A composed slide can write the same patterns inline.

## Skill directory map

```
eyelevel-slides/
├── SKILL.md                          (this file)
├── references/
│   ├── layouts.md                    14 canonical slide layouts + when to use each
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
