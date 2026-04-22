# Slide Layouts

Eight canonical layouts. Each is a specific arrangement of patterns from `../../groundx-design-standards/references/patterns.md` onto a 1920×1080 canvas. Pick the one that matches the slide's job — don't invent new layouts for one-off slides.

All eight layouts share the same outer chrome:

- 1920×1080 white (or navy) background.
- GroundX wordmark at top-left, 80px from the edge, ~48px tall. Paired with "A VALANTOR COMPANY" tagline to its right (small) on cover / CTA slides. On content slides the wordmark is smaller (~32px) and the tagline is omitted.
- Slide number at bottom-right, 80px from edges, in `DARK_GREY` on light slides, white-60% on navy.
- Optional thin gradient accent bar along the top or bottom edge — cover and CTA slides only.

## 1. Cover (`cover`)

The first slide of every deck. Full-bleed navy (`#29335c`).

- **Top-left:** GroundX wordmark (white+coral variant — `groundx-ai-log.png`) with "A VALANTOR COMPANY" tagline beneath.
- **Top-right:** a brief context line in uppercase — e.g., `WHITE PAPER · RESPONSE TO DELL`, `PARTNER BRIEFING · Q2 2026`. Green (`#a1ec83`), 600 weight, small.
- **Center-left:** the deck title. Weight 800, `.headline-cover` (112px), white, tight line-height. 1–8 words max.
- **Center-left, below title:** 1–2 sentences of subtitle. White at 80% opacity, 400 weight, `.subhead` (24px). Left-aligned, same left edge as title.
- **Bottom-left:** optional display-stat trio across the bottom quarter of the slide — three stats in a row (see pattern #2). Numerals cycle Green → Cyan → Coral on navy; labels in white at 70% opacity.
- **Bottom edge:** optional thin gradient accent bar (~8px tall, full width).

When to use: deck openings. Never used mid-deck.

## 2. Section break (`section-break`)

Used between major parts of a long deck. Full-bleed navy, much simpler than a cover:

- Centered green eyebrow (e.g., `PART TWO`) above a centered white headline (weight 700, `.headline-section` / 88px).
- Optional single-sentence subhead beneath the headline, white at 70% opacity.
- No stats, no accent bar, no logo (the deck's established — no need to reintroduce).
- Slide number still present bottom-right.

When to use: long decks (10+ slides) that have natural act breaks. Skip for short decks.

## 3. Hero with stats (`hero-with-stats`)

A headline-driven content slide with a stat row underneath. Light (white, gray, or tint) background.

- **Top-left:** coral eyebrow + navy headline (weight 700, `.headline-hero` / 64px) + 1–2 sentence subhead in Body Text.
- **Bottom half:** a three-up row of display stats (pattern #2). Stats land on the same baseline; each stat+label pair occupies an equal column.
- Plenty of whitespace between the headline block and the stat row — this is a composed slide, not a packed one.

When to use: slides that make a single strong proposition and back it with three numeric proof points. Common as slide 2 after the cover.

## 4. Split problem / solution (`split-problem-solution`)

Two-column slide where each column frames a side of a comparison. Two variants:

### 4a. Light-light split

Both columns on tint or white canvas. Headlines are both weight 700; contrast comes from the eyebrow and copy, not a weight fight.

- **Left column (50%):** eyebrow `THE PROBLEM` (coral) + headline (navy) + body (Body Text). Optional supporting detail beneath.
- **Right column (50%):** eyebrow `THE ANSWER` (coral) + headline (navy) + body. Optional supporting detail.
- Hairline vertical divider (`var(--gx-border)`, 1px) between columns, centered on the slide.

### 4b. Light-dark split

Left column light (white / tint), right column navy full-bleed. The navy side has green eyebrows; the light side has coral eyebrows.

- Use when the "answer" side needs visual weight the light side can't carry.
- No divider needed — the color change does the job.

When to use: any before/after, problem/solution, current-state/future-state narrative.

## 5. Three-card grid (`three-card-grid`)

The three-card summary pattern (pattern #3) as a full slide.

- Optional top block: coral eyebrow + navy headline (smaller than hero — weight 700, `.headline-split` / 44px) + one-sentence lead-in.
- Three equal-width cards in a row beneath. Each card:
  - 20px radius, 1px `var(--gx-border)` hairline, white fill, 32–40px padding.
  - Coral eyebrow at the top of the card (e.g., `SCALE`, `SECURITY`, `SPEED`).
  - Navy headline (`.headline-card` / 28px, weight 700).
  - 2–3 sentences of body (Body Text, 400, `.body-sm` / 20px).
  - Optional icon (coral, MUI-style, 48px) at the top-right of the card.
- Gap between cards: 32px.

When to use: "three things you should know", "three capabilities", "three phases". Most-used layout for proposition-dense slides.

## 6. Detail grid with sidebar (`detail-grid-with-sidebar`)

A two-column asymmetric slide: a main content block on the left, a navy stat sidebar on the right. This is the most information-dense layout in the system.

- **Left column (~65%):** eyebrow + headline + a grid of 4–6 small items (each a mini eyebrow+headline+one sentence).
- **Right column (~35%):** navy panel, full slide height, with 2–3 stacked display stats. Stats use green numerals, white labels.

When to use: slides that need to say "here are the details, and here are the numbers that anchor them" — deep-dive capability slides, pricing+proof slides.

## 7. Numbered steps (`numbered-steps`)

Pattern #6 as a full slide. Three to five vertically stacked rows, each with a large numeral on the left (coral on light, green on navy; three on navy cycle Green → Cyan → Coral) and a label + sentence on the right.

- Top block: eyebrow (`NEXT STEPS`, `HOW IT WORKS`) + short headline.
- Below: 3–5 numbered rows.
  - Numeral: weight 800, `5rem`, flush-left.
  - To the right of the numeral: label (uppercase, 600, `0.875rem`, 0.14em tracking) on top of body sentence (400, `.step__body` / 24px).
  - Gap between rows: 48px.

When to use: process slides, onboarding slides, call-to-action slides.

## 8. Display stat (`display-stat`)

An entire slide dedicated to a single stat. The boldest move in the system; use sparingly.

- Centered in the slide: one huge numeral (coral on light, green on navy), weight 800, `13rem` (208px).
- Directly beneath: a single label, uppercase 600, `1.125rem`, 0.16em tracking.
- Optional one-sentence caption below that, 400, `1.125rem`, muted.
- Nothing else on the slide. No other text, no image, no logo beyond the standard top-left wordmark.

When to use: once per deck, at most. This is the "stop and read" slide — the moment the audience's heads come up. Overusing it burns its impact.

## Pairing layouts

A deck usually flows: cover → hero-with-stats (opening proposition) → [section-break] → split or three-card grid (content) → detail-grid or numbered-steps (deep dive) → display-stat (punch line) → cta (close). You don't need all eight in every deck — pick what the story wants.
