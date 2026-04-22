# Patterns

These are the repeating visual shapes that appear across web, slides, white papers, and email. They're built from the palette + typography + principles already defined elsewhere in this skill — this file names them and specifies their proportions so a slide, a landing page, and a card all arrange the same ingredients the same way.

A pattern is not a component. Medium-specific skills implement patterns with their own primitives: the web UI realizes the display-stat pattern with a `<Typography>` pair, the slides skill realizes it with a two-line HTML layout. The pattern fixes *what it looks like*, not *how it's built*.

## 1. Eyebrow + headline + body

The most common text stack across surfaces. Three elements, top-to-bottom:

1. **Eyebrow** — a small uppercase label (e.g., "SUPPLY CHAIN INTELLIGENCE"). 600 weight, 0.14em letter-spacing, coral on light surfaces / green on navy (see `colors.md` rule 5).
2. **Headline** — the proposition. 700–800 weight depending on the surface. Navy on light, white on navy. Tight line-height (1.15×).
3. **Body** — one to three sentences of supporting copy. 400 weight. Navy or muted-navy on light, white at 80% opacity on navy. Line-height 1.5×.

Spacing: eyebrow sits 8–12px above the headline; body sits 16–24px below it. The headline and eyebrow share the same left edge; the body typically shares it too.

Use when a section, a slide, or a hero panel needs to announce itself. This is the single most-reused text pattern in the brand.

## 2. Display stat

A short, colored numeral stacked over a small uppercase label. Canonical examples: `99% · ACCURACY`, `500B · PARAMETERS`, `3× · FASTER`. Defined in detail in `typography.md` under *display-stat pattern*. Use on:

- Slide covers and section breaks as a headline-adjacent proof point.
- White-paper hero pages as a trio of numbers establishing scale.
- Marketing landing pages in a "by the numbers" strip.

When three stats appear in a row **on navy**, the numerals cycle GREEN → CYAN → CORAL left to right (see `colors.md` rule 6). On a light canvas, three stats stay coral — cyan on tint and green on tint both fail contrast. A single stat on its own uses the primary accent for its surface: coral on light, green on navy.

Never used in in-app UI — display stats are a marketing/collateral pattern, not a dashboard pattern.

## 3. Three-card summary grid

Three equal-width cards in a single row, each card being a self-contained mini pattern (usually eyebrow + headline + one sentence or stat). The canonical framing is "Built for the ___ / Built for the ___ / Built for the ___" or "The Problem / The Solution / The Outcome".

Rules:

- **Three cards, not four.** Four reads as a bento grid; three reads as a proposition. If you have four items, either drop one or use a different pattern.
- **Equal widths, equal heights.** The cards lock to the same height even if their content lengths differ — shorter content floats to the top of its card.
- **Same surface treatment as any other card:** white fill, `1px solid var(--gx-border)` (10% navy), `20px` radius. On a navy slide, use white cards on the navy — *not* navy-on-navy with a border.
- **Gap between cards:** ~24px web, ~0.3" slides.
- **Eyebrow color.** Default: coral on light-surface cards, green on navy cards. Cycling (GREEN → CYAN → CORAL across the three) is reserved for navy-surface cards — white cards keep coral eyebrows to preserve contrast. See `colors.md` rule 6.

When to use: any time you're listing three parallel items that deserve roughly equal weight. Problems, solutions, deliverables, phases, differentiators.

## 4. Pill row

A horizontal row of `GxPill`s (see web-ui `components.md`) acting as a tag strip, status bar, or metadata header. Used in:

- Row headers above a table ("ALL · 12 · ACTIVE · 3 · FAILED · 1").
- Feature callout strips on a landing page ("Enterprise-grade · SOC2 · HIPAA").
- Status belts on a slide showing what a product supports.

Rules:

- All pills in a row share the same height and radius (999).
- Inert pills use `LIGHT_GREY` fill + navy text. Status pills use their semantic color (success-green, error-red, warning-red-light). Count/filter pills use white fill with a hairline border.
- Gap is 8px on web, ~0.1" on slides. Pills don't wrap mid-sentence — if they don't fit, wrap to the next row with the same gap.

## 5. Navy CTA panel (full-bleed end page)

A full-bleed navy section that closes a white paper, a landing page, or a deck. Contains:

- A short, heavy-weight white headline ("Let's Build This Together", "Talk to the Team").
- 1–2 supporting sentences in white at 80% opacity.
- One to two CTA buttons: primary is green (`#a1ec83`) with navy text; optional secondary is a white outlined button. Coral is reserved for eyebrows / highlight accents, not the primary CTA.

Rules:

- The panel takes the full width and at least 40% of the vertical space on the surface it closes.
- The GroundX wordmark sits in a corner (top-left on slides, bottom-left on the web) with the "A VALANTOR COMPANY" tagline below it.
- No illustration bleed, no hero image. The panel is color, type, and one or two CTAs.

## 6. Numbered steps row

A horizontal or vertical sequence of 3–5 numbered steps, each step being a large coral numeral (on light surfaces) or green numeral (on navy) followed by a short label and one supporting sentence. Used in:

- "Next Steps" sections of a deck or white paper.
- Onboarding strips on a landing page.
- Process diagrams in product copy.

Rules:

- When three steps appear **on navy**, the numerals cycle GREEN → CYAN → CORAL (see `colors.md` rule 6). Three steps on a light canvas stay coral; four-or-five-step rows always use the primary accent for all numerals — coral on light, green on navy.
- Numerals are weight 800, 1.5–2× the size of their label.
- Labels are 600 weight, uppercase literal.
- Exactly 3–5 steps. Fewer reads as a short list; more reads as noise.

## 7. Split problem / solution layout

A two-column slide or section where the left column frames a problem (or a current state) and the right column frames the solution (or the future state). Contrast is communicated by **surface color**, not by decoration:

- **Light/light:** the two columns are both white on tint, separated by a hairline vertical divider or just a gap. Weight difference on the headlines carries the contrast.
- **Light/dark:** the left column is white, the right is navy. The navy side has green eyebrows; the light side has coral eyebrows. Used for strong "before/after" narratives.

Rules:

- Column widths are equal (50/50) unless one side is a single visual (image, stat, icon), in which case the visual column can be 40%.
- Each column uses the **eyebrow + headline + body** pattern (#1).
- Never use a background gradient, pattern, or illustration to signal the split — use surface color and whitespace.

## 8. Brand accent bar

A thin horizontal gradient bar that runs across the top or bottom edge of a marketing surface (cover slide, white-paper cover, landing page hero). Green → Cyan → Coral. See `brand-principles.md` rule 10 for the rules — this file just names the pattern.

Never used on in-app surfaces.

## 9. Logo lockup + tagline

When the GroundX wordmark is the primary brand element on a surface, it's paired with the "A VALANTOR COMPANY" tagline (`assets/logos/valantor-tagline.png`). The two together are a **lockup**:

- Wordmark on top, tagline centered directly beneath, or
- Wordmark on the left, tagline to its right at ~40% the wordmark's height, baseline-aligned to the wordmark's descender.

See `logos.md` for selection rules and `brand-principles.md` rule 11 for the co-branding principle.

## When to add a new pattern

A pattern earns a spot in this file when it has appeared at least twice across two different mediums and the proportions are worth locking down so the third usage doesn't drift. Don't add speculative patterns — add patterns that have already proven they repeat.
