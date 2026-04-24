# Slide Layouts

Eight canonical layouts. Each is a specific arrangement of patterns from `../../groundx-design-standards/references/patterns.md` onto the slide canvas (see `tokens.md` § 6 for dimensions). Pick the one that matches the slide's job — don't invent new layouts for one-off slides.

> **Tokens:** every color, size, and canvas dimension this file names maps to a token in `../../groundx-design-standards/references/tokens.md` (narrative) / `tokens.json` (machine source of truth). The slide CSS reads the values from the generated `:root` block in `styles.css` (auto-emitted by `groundx-design-standards/scripts/generate-mirrors.mjs`); this file names classes and roles, not hex or px. When you see a class name here (e.g., `.headline-cover`), look up its size in `tokens.md` § 3.5.

All eight layouts share the same outer chrome:

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

## Pairing layouts

A deck usually flows: cover → hero-with-stats (opening proposition) → [section-break] → split or three-card grid (content) → detail-grid or numbered-steps (deep dive) → display-stat (punch line) → cta (close). You don't need all eight in every deck — pick what the story wants.
