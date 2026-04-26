# Slide Layouts

Fourteen recipes. Each documents a specific arrangement of patterns from `../../eyelevel-design-standards/references/patterns.md` onto the 1920×1080 canvas (see `tokens.md` § 6 for dimensions) that has worked for a common slide job — covers, hero-with-stats, split problem/solution, three-card grids, Q&A panels, findings grids, and so on.

**Read this file as illustrations, not requirements.** A deck almost always has slides that don't fit any of these fourteen — a roadmap, a quote, an org chart, a screenshot, a customer logo wall, a code sample, a single dense table, a diagram. Don't force those slides into a recipe. Build them from `patterns.md` directly. The brand stays consistent because the patterns and the visual invariants hold, not because every slide matches a numbered layout in this file.

When a recipe **does** fit, by all means use it — recipes save effort and they encode small details (eyebrow color on each surface, where the slide number sits, how the stat row baselines align) that an agent reinventing the layout might miss. The point is that the recipe library is a tool, not a gate.

What's still binding when you compose a new arrangement: the visual invariants in `eyelevel-design-standards` (palette, weight ladder, surface treatment, ALL-CAPS literal, no shadows, voice register, no fonts other than Inter, no new accent colors, no new corner radii, no new tagline element) and the structural invariants of the slide project (every value resolves through `var(--gx-*)`, every slide is a numbered HTML file in `slides/`, the Puppeteer build pipeline is unchanged). Inside those, compose freely — including new layouts that aren't in this file at all.

> **Tokens:** every color, size, and canvas dimension this file names maps to a token in `../../eyelevel-design-standards/references/tokens.md` (narrative) / `tokens.json` (machine source of truth). The slide CSS reads the values from the generated `:root` block in `styles.css` (auto-emitted by `eyelevel-design-standards/scripts/generate-mirrors.mjs`); this file names classes and roles, not hex or px. When you see a class name here (e.g., `.headline-cover`), look up its size in `tokens.md` § 3.5.

All fourteen layouts share the same outer chrome:

- Canvas: `var(--gx-slide-width) × var(--gx-slide-height)` with `var(--gx-slide-padding)` on every edge.
- EyeLevel lockup at top-left, sized via `--gx-logo-width` / `--gx-logo-height`, offset from the top by `--gx-logo-top` and left edge by `--gx-logo-left`. The CSS picks `--gx-logo-dark` on navy / green / coral surfaces and `--gx-logo-light` elsewhere; the HTML (`<div class="slide-logo" …></div>`) is identical either way. "A VALANTOR COMPANY" is baked into each PNG — no separate tagline element.
- Slide number at bottom-right, same padding offset as the logo. Color is `--gx-dark-grey` on light slides, `--gx-muted-on-dark` on navy.
- Optional thin gradient accent bar along the top or bottom edge (height `--gx-accent-bar-height`) — cover and CTA slides only.

## 1. Cover (`cover`)

The first slide of every deck. Full-bleed navy (`--gx-navy`).

- **Top-left:** EyeLevel lockup (dark-surface variant — resolved via `--gx-logo-dark` by the navy surface class).
- **Top-right:** a brief context line in uppercase — e.g., `WHITE PAPER · RESPONSE TO DELL`, `PARTNER BRIEFING · Q2 2026`. Color `--gx-eyebrow-on-dark`, weight `--gx-weight-label`, size `--gx-size-chrome-md`.
- **Center-left:** the deck title. Class `.headline-cover` (size `--gx-size-headline-cover`, weight `--gx-weight-display`), white, tight line-height. 1–8 words max. One brand moment per deck.
- **Center-left, below title:** 1–2 sentences of subtitle. Color `--gx-body-on-dark`, weight `--gx-weight-body`, scoped to `--gx-size-subhead-xl` by the `.slide--cover` layout rule. Left-aligned, same left edge as title.
- **Bottom-left:** optional display-stat trio across the bottom quarter of the slide — three stats in a row (see pattern #2). Numerals cycle `--gx-green` → `--gx-cyan` → `--gx-coral` on navy (see `colors.md` § 6); labels in `--gx-muted-on-dark`.
- **Bottom edge:** optional thin gradient accent bar (`--gx-accent-bar-height`, full width).

When to use: deck openings. Never used mid-deck.

## 2. Section break (`section-break`)

Used between major parts of a long deck. Full-bleed navy, much simpler than a cover:

- Centered green eyebrow (e.g., `PART TWO`) above a centered white headline. Class `.headline-section` (size `--gx-size-headline-section`, weight `--gx-weight-headline`).
- Optional single-sentence subhead beneath the headline, color `--gx-muted-on-dark`.
- No stats, no accent bar, no logo (the deck's established — no need to reintroduce).
- Slide number still present bottom-right.

Cover and section-break share one headline size; the only difference is weight (`--gx-weight-display` vs. `--gx-weight-headline`). Hierarchy through weight, not size.

When to use: long decks (10+ slides) that have natural act breaks. Skip for short decks.

## 3. Hero with stats (`hero-with-stats`)

A headline-driven content slide with a stat row underneath. Light (white, gray, or tint) background.

- **Top-left:** `--gx-eyebrow-on-light` eyebrow + `--gx-navy` headline (class `.headline-hero`, size `--gx-size-headline-hero`, weight `--gx-weight-headline`) + 1–2 sentence subhead in `--gx-body-on-light` scoped to `--gx-size-subhead-lg`.
- **Bottom half:** a three-up row of display stats (pattern #2). Numerals use `--gx-size-stat-numeral`, labels use `--gx-size-stat-label`. Stats land on the same baseline; each stat+label pair occupies an equal column.
- Plenty of whitespace between the headline block and the stat row — this is a composed slide, not a packed one.

When to use: slides that make a single strong proposition and back it with three numeric proof points. Common as slide 2 after the cover.

## 4. Split problem / solution (`split-problem-solution`)

Two-column slide where each column frames a side of a comparison. Two variants:

### 4a. Light-light split

Both columns on tint or white canvas. Headlines are both `--gx-weight-headline`; contrast comes from the eyebrow and copy, not a weight fight.

- **Left column (50%):** eyebrow `THE PROBLEM` (`--gx-eyebrow-on-light`) + headline (class `.headline-split`, `--gx-navy`) + body (`--gx-body-on-light`). Optional supporting detail beneath.
- **Right column (50%):** eyebrow `THE ANSWER` (`--gx-eyebrow-on-light`) + headline + body. Optional supporting detail.
- Hairline vertical divider (`--gx-border`, 1px) between columns, centered on the slide.

### 4b. Light-dark split

Left column light (white / tint), right column navy full-bleed. The navy side has `--gx-eyebrow-on-dark` eyebrows; the light side has `--gx-eyebrow-on-light` eyebrows.

- Use when the "answer" side needs visual weight the light side can't carry.
- No divider needed — the color change does the job.

When to use: any before/after, problem/solution, current-state/future-state narrative.

## 5. Three-card grid (`three-card-grid`)

The three-card summary pattern (pattern #3) as a full slide.

- Optional top block: eyebrow + `.headline-split` (size `--gx-size-headline-split`) + one-sentence lead-in.
- Three equal-width cards in a row beneath. Each card:
  - `--gx-radius-card` corners, `1px solid var(--gx-border)` hairline, `--gx-white` fill.
  - Eyebrow at the top of the card (e.g., `SCALE`, `SECURITY`, `SPEED`) — `--gx-size-label`, color `--gx-eyebrow-on-light`.
  - Navy headline (class `.headline-card`, size `--gx-size-headline-card`, weight `--gx-weight-headline`).
  - 2–3 sentences of body — size `--gx-size-body-card`, weight `--gx-weight-body`, color `--gx-body-on-light`.
  - Optional icon (`--gx-coral`, MUI-style) at the top-right of the card.

When to use: "three things you should know", "three capabilities", "three phases". Most-used layout for proposition-dense slides.

## 6. Detail grid with sidebar (`detail-grid-with-sidebar`)

A two-column asymmetric slide: a main content block on the left, a navy stat sidebar on the right. This is the most information-dense layout in the system.

- **Left column (~65%):** eyebrow + headline + a grid of 4–6 small items (each a mini eyebrow+headline+one sentence — eyebrows share `--gx-size-label`, headlines use `.headline-card`, body uses `.detail-item__body` at `--gx-size-body-card`).
- **Right column (~35%):** navy panel, full slide height, with 2–3 stacked display stats. Stats use the unified 3-up numeral/label tokens (`--gx-size-stat-numeral` / `--gx-size-stat-label`), green numerals, white labels.

When to use: slides that need to say "here are the details, and here are the numbers that anchor them" — deep-dive capability slides, pricing+proof slides.

## 7. Numbered steps (`numbered-steps`)

Pattern #6 as a full slide. Three to five vertically stacked rows, each with a large numeral on the left (`--gx-coral` on light, `--gx-green` on navy; three on navy cycle green → cyan → coral) and a label + sentence on the right.

- Top block: eyebrow (`NEXT STEPS`, `HOW IT WORKS`) + short headline.
- Below: 3–5 numbered rows.
  - Numeral: class `.step__numeral`, size `--gx-size-step-numeral`, weight `--gx-weight-headline`, flush-left.
  - To the right of the numeral: label (class `.step__label`, uppercase, `--gx-size-label`, weight `--gx-weight-label`, tracking `--gx-track-label`) on top of body sentence (class `.step__body`, `--gx-weight-body`, size per layout scope).

When to use: process slides, onboarding slides, call-to-action slides.

## 8. Display stat (`display-stat`)

An entire slide dedicated to a single stat. The boldest move in the system; use sparingly.

- Centered in the slide: one huge numeral (`--gx-coral` on light, `--gx-green` on navy), weight `--gx-weight-display`, size `--gx-size-stat-numeral-display`.
- Directly beneath: a single label, uppercase `--gx-weight-label`, size `--gx-size-stat-label-display`, tracking slightly wider than default labels (captured in `styles.css` since the dominant numeral asks for more air).
- Optional one-sentence caption below that, weight `--gx-weight-body`, muted color.
- Nothing else on the slide. No other text, no image, no logo beyond the standard top-left wordmark.

When to use: once per deck, at most. This is the "stop and read" slide — the moment the audience's heads come up. Overusing it burns its impact.

## 9. Photo cover (`photo-cover`)

A cover variant with a full-bleed photographic background. **Imagery is opt-in** — do not reach for this layout proactively. Use only when the user has explicitly asked for a photo-driven cover, hero image, or section break (e.g., "make the cover a photo of a data center", "open with a customer image"). The default cover is layout 1; that is the right choice when no imagery is requested.

- **Background:** `.photo-cover__image` is an absolutely-positioned background-image-cover element. Caller provides the image at `/assets/images/<filename>` and references it inline.
- **Scrim:** `.photo-cover__scrim` applies a flat `rgba(41, 51, 92, 0.72)` overlay (navy at 72%) so white headline text holds contrast. **Never** swap the scrim for a gradient — gradients are not part of the brand language (see `brand-principles.md` rule 1).
- **Tri-corner header strip:** optional. Three uppercase labels at the top edge — `eyelevel.ai · CONFIDENTIAL · partner name`. Type literally; no `text-transform`.
- **Headline + subhead:** identical to layout 1 (cover). The headline class is `.headline-cover` (`--gx-weight-display`).
- **Optional bottom stats:** identical to layout 1.
- **Surface scope:** cover, section-break, or closing slides only. **Never** on an interior content slide. Imagery on a content slide loses the calm-not-loud posture (`brand-principles.md` rule 1).

When to use: deck openings or section breaks where the user has asked for imagery. Skip otherwise.

## 10. Q&A panel (`qa-panel`)

A slide that directly answers a question — RFP responses, FAQ slides, panel-style executive briefings.

- **Eyebrow:** two-part with a U+00B7 middle dot, written literally — e.g., `DIFFERENTIATION · CAPABILITIES`, `SCOPE · FULL PIPELINE`. The two halves name the topic and the angle.
- **Question:** italicized. Class `.qa-cell__question`, weight `--gx-weight-body`. Italics here are the **only** italics in the slide system — they mark the text as "a question being quoted, not a claim being made". Do not use italics elsewhere.
- **Answer:** bold body. Class `.qa-cell__answer`, weight `--gx-weight-label`, larger than the question. The answer is what the audience leaves with.
- **Grid:** `.qa-grid` (2×2) for four cells; `.qa-grid--single` (1-up) for three or fewer.
- **Optional sidebar variant:** `.qa-with-sidebar` — 65% Q&A grid + 35% navy stat panel. Use when the answers are anchored by numeric proof (production scale, accuracy benchmarks).
- **Default surface:** navy.

When to use: customer-response decks, RFP slides, panel-style briefings where the question is part of the content.

## 11. Summary "Built For" (`summary-built-for`)

A closing slide that turns three capabilities into three parallel commitments using the `BUILT FOR <X>` eyebrow scaffold.

- **Three cards:** equal width. Each card has a `BUILT FOR <X>` eyebrow, a one-sentence headline, and a 2-sentence body.
- **2 + 1 rhythm:** the middle card carries the strongest claim — render it as `.card--navy` so the row reads as 2 light + 1 navy. **Do not** render all three cards the same; the alternation is the point.
- **Eyebrow scaffold:** the parallelism — `BUILT FOR YOUR ENVIRONMENT`, `BUILT FOR THE PROBLEM`, `BUILT FOR THE SCALE` — names three commitments held under one promise. See `voice.md` for the rhetorical pattern.

When to use: once per deck, near the close. Pairs naturally with a CTA slide (layout 7) immediately after.

## 12. Findings grid (`findings-grid`)

A 2×2 grid of cells reporting back what was found in a document review, customer interview, or audit, paired with a commitment.

- **Meta-headers above the grid:** `WHAT WE FOUND` / `OUR COMMITMENT` (or analogous pair). Two meta-labels in a 1:1 column split, sitting above the grid like row headers.
- **Cells:** each has an eyebrow-style headline (sentence-case, not all-caps), a **standalone em-dash divider**, and a body sentence. The em-dash is written literally as `—` inside `<div class="findings-cell__rule">` — never inserted via CSS `content`, never an `<hr>`. The em-dash is a quiet vertical pause inside each cell.
- **Two-column grouping:** typically the left column is "what we found", the right column is "our commitment", but cells can also be paired diagonally — the meta-headers tell the audience how to read it.

When to use: any "we reviewed your documents and here's what we saw" slide; any audit / discovery / readout.

## 13. Numbered solutions, anchored (`numbered-solutions-anchor`)

Three numbered columns over a full-width fourth row that anchors the slide.

- **Index strings:** written together as a single literal — `01 — PURPOSE-BUILT`, `02 — UNIQUE INGESTION`, `03 — INTEGRATED SEARCH`. Numeral and label share one element (`.numbered-anchor__index`); do **not** split into two visual elements.
- **Three columns:** each is a numbered card-shaped block (no card chrome — flat on the surface) with index → headline → body.
- **Anchor row:** the fourth row sits below a hairline divider and runs the full slide width. It carries the load-bearing claim that holds the three columns together (e.g., "Built for On-Prem"). Style is identical to a column but full-width and laid out as `1fr 2fr` (label / body).
- **Default surface:** navy. Index strings render in `--gx-eyebrow-on-dark` (green); on light slides they render in navy.

When to use: a "the solution has three parts and one foundation" slide. Stronger than layout 5 (numbered steps) when you need a fourth claim that sits *under* the three rather than alongside them.

## 14. Grid with stat sidebar (`grid-with-stat-sidebar`)

A 2×3 card grid (six concept cells) plus a green-filled stat panel that anchors one corner of the slide.

- **Main grid (~62%):** six cards, each with an eyebrow + 2-sentence body. No headlines on the cards — the eyebrow is the headline. Cards use tighter padding (32px) than the standard 40px to fit six on the slide.
- **Stat panel (~38%):** `.grid-with-sidebar__stat` — green fill, navy text, holding one giant numeral (display-stat scale, `--gx-size-stat-numeral-display`) over a sub-grid of two-to-four supporting metrics. The giant numeral is the slide's brand moment.
- **Eyebrow vocabulary:** named-concept eyebrows work best here (`DUAL-MODEL ARCHITECTURE`, `PROPRIETARY HYBRID SEARCH`, `SEMANTIC OBJECTS, NOT TEXT CHUNKS`). Each card stakes out one named idea.

When to use: capability-dense slides where six concepts each need a sentence and one of them deserves a numeric anchor. Most-information-dense layout in the system — use sparingly.

## Pairing layouts

A deck usually flows: cover → hero-with-stats (opening proposition) → [section-break] → split or three-card grid (content) → detail-grid or numbered-steps (deep dive) → display-stat (punch line) → cta (close). You don't need all fourteen in every deck — pick what the story wants.

For customer-response decks specifically, the Dell-deck pattern is a useful reference: cover (1 or 9) → split-problem-solution (4) → findings-grid (12) → numbered-solutions-anchor (13) → grid-with-stat-sidebar (14) → qa-panel (10) → qa-panel sidebar variant (10) → summary-built-for (11) → cta (7).
