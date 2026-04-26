# Typography on Slides

The brand-level typography rules live in `../../eyelevel-design-standards/references/typography.md`. The **slide-specific size scale** (1920×1080 canvas, in rem and px) lives in `../../eyelevel-design-standards/references/tokens.md` § 3.

This file explains the *slide-specific rules* — unified label tier, surface-dependent color swaps, the 1:4 stat ratio, scoped subheads per layout — that those tokens encode. When a rule below cites a size by role, look up the exact value in `tokens.md` § 3.

Root is `1rem = 16px` on the slide (same as dashboard). All slide sizes are expressed in rem so the mental model ports back to web.

## The unified label rule

Every uppercase "section label" on the slide — slide-level eyebrows ("HOW IT WORKS"), card eyebrows ("SCALE", "SECURITY", "SPEED"), step labels ("CONNECT", "INGEST", "RETRIEVE"), day labels ("DAY 1-2"), section-break eyebrows ("PART TWO") — uses **one size tier**, tracked at 0.12em with weight 600.

See `tokens.md` § 3.4 for the canonical value (`--gx-size-label`).

Only the color changes by context:

- **Coral** on light surfaces (default `.eyebrow`, `.detail-item__label`)
- **Green** on navy slides (`.slide--navy .eyebrow` and friends)
- **Navy** on light surfaces paired with a green numeral (`.step__label`)

Labels inside a white card nested on a navy slide revert to coral — the card is a light surface.

## The unified metric rule

Any numeral + label pair — a 3-up stat row on a cover or hero, the display-stat slide, the stat stack in a detail-grid sidebar — follows a **1:4 ratio** (numeral : label) for the 3-up arrangement. The dedicated display-stat slide widens this to roughly 1:7 (288 numeral, 40 label) because the numeral is the whole slide.

All four numeral + label values live in `tokens.md` § 3.6 as `--gx-size-stat-numeral`, `--gx-size-stat-label`, `--gx-size-stat-numeral-display`, `--gx-size-stat-label-display`. Every stat on every slide references those four tokens; there are no context-specific overrides.

The sidebar stat used to be 56/12. Unifying at 88/22 means every metric on a slide reads with the same rhythm regardless of where it appears.

## Slide type scale

The scale is a clean ~1.35× modular progression on the headline side. One class per role, no overlapping sizes, and **no inline font overrides in slide HTML** — if you need a new size, add a new size token to `tokens.json` (and a matching row in `tokens.md`) first, re-run `eyelevel-design-standards/scripts/generate-mirrors.mjs` so it appears as a new `--gx-*` in the generated `:root` block, then reference it from a class in `styles.css`.

The body / subhead / eyebrow tiers are deliberately **layout-scoped** rather than a single global size, because a 24px paragraph that reads well next to a 28px card title looks lost next to an 88px section headline. Subheads target roughly **half** of their paired headline; eyebrows target roughly **one quarter** via the unified label tier.

### Headlines

Five headline tiers:

- **Deck title (cover)** — weight 800, letter-spacing −0.025em, line-height 1.0. Matches the section-break size; separated from it by weight. One brand moment per deck.
- **Section-break headline** — centered, weight 700, letter-spacing −0.02em, line-height 1.05.
- **Hero headline** — left-aligned, weight 700, letter-spacing −0.015em, line-height 1.1.
- **Split-column headline** — peer-to-peer headline in two-column splits, weight 700.
- **Card headline** — title inside a three-card grid or the detail-item layout. Weight 700.

Tokens: `--gx-size-headline-cover`, `--gx-size-headline-section`, `--gx-size-headline-hero`, `--gx-size-headline-split`, `--gx-size-headline-card` (see `tokens.md` § 3.5).

### Subhead / body paired with the headline

Scoped overrides on the layout class (`.slide--cover`, `.slide--hero-with-stats`, `.slide--split`, etc.) lift the body tier to match the dominant headline. The three scoped sizes:

- **xl** — paired with 88px cover / section-break headlines.
- **lg** — paired with 64px hero or CTA headlines.
- **md** — paired with 44px split headlines.

Tokens: `--gx-size-subhead-xl`, `--gx-size-subhead-lg`, `--gx-size-subhead-md` (see `tokens.md` § 3.3).

The default body tier (`--gx-size-body`, 24px) applies wherever those layout scopes don't trigger; card bodies use the smaller `--gx-size-body-card` (22px) so three-up grids stay readable at column widths.

### Eyebrows / labels

All eyebrow-like labels share the single `--gx-size-label` tier (32px / 600 / 0.12em). The old per-context sizing (14 / 16 / 22 / 32) has been retired; the unified tier kills drift across cards, steps, sections, and detail grids. Color changes by surface; size doesn't.

### CTA buttons

Three sizes, one tier below the label tier:

- `--gx-size-cta-sm` — 18px, for inline / secondary actions.
- `--gx-size-cta` — 22px, default.
- `--gx-size-cta-lg` — 28px, one primary action on a CTA slide.

See `tokens.md` § 3.8.

**No `.tagline` class.** "A VALANTOR COMPANY" is baked into the logo PNG. Don't add a sibling `<span class="tagline">` next to `.slide-logo`; the lockup already contains it. See `../../eyelevel-design-standards/references/logos.md`.

All eyebrows are **written uppercase in HTML** per the ALL-CAPS rule in design standards. CSS does not `text-transform`.

### Why the scale was lifted

An earlier iteration held eyebrows and subheads at a single small global size (14px / 24px). At 1920×1080, that left the supporting copy looking tiny next to 64–88px headlines — eyebrows and subheads read as decoration rather than as partners to the lead. The current scale corrects this by:

1. **Subheads target half the headline.** 88 → 44, 64 → 32, 44 → 28. Readable without imitating the headline.
2. **All eyebrows sit on the unified 32/600 tier.** Hierarchy comes from color and context, not from per-location sizing.
3. **The weight ladder stays narrow** — 400 / 600 / 700 / 800. Weight 900 remains retired.

## Color mapping by surface

| Element | On white / gray / tint / cyan | On navy |
| --- | --- | --- |
| Eyebrow | Coral | Green |
| Eyebrow inside a white card on navy | Coral | Coral (the card is the surface) |
| Headline | Navy | White |
| Body / subhead | Body Text (on light) | White at 82% |
| Display-stat numeral (single) | Coral | Green |
| Display-stat numeral (3-up, cycling) | Coral × 3 (cycling fails contrast on light) | Green → Cyan → Coral |
| Display-stat label | Navy-muted (70%) | White at 70% |
| Slide number | Dark Grey | White at 55% |

Hex values for each role live in `tokens.md` § 1.1 and § 1.3.

## Spacing rhythm

A 4px base unit; 8px minor step; 12 / 20 / 24 major steps inside a type block.

| Gap | Use |
| --- | --- |
| 12px | eyebrow → headline |
| 20px | headline → body |
| 24px | body → next peer block |
| 40–48px | between primary content blocks on the slide |
| 72–80px | split-column gutter, stat-row gutter |

`margin-bottom` values are baked into the type-scale classes so spacing is consistent regardless of markup. Don't wrap classes in `stack-*` utility divs between eyebrow → headline → body — let the classes' own margins do the work.

## Alignment

- **Split layouts** use `.split-wrap` as an absolute-positioned vertical-center wrapper around the `.split` grid. Columns inside are top-aligned (`align-items: start`) so both columns' eyebrows share a baseline. Never vertically center each column independently — if the two columns have different content heights, independent centering will misalign the eyebrows.
- **Hero-style content** (single block with eyebrow + headline + subhead) uses the `.hero-block` class or the `.slide-centerblock` absolute wrapper.
- **Centered content** (section-break, display-stat) uses `.section-break-content` or `.display-stat` which already handle flex centering.

## Letter-spacing

- Cover / section / hero / split / card headlines: negative tracking (−0.025 → −0.005em) scaled to size.
- Body and subhead: 0.
- Eyebrows and uppercase labels: 0.12em (captured as `--gx-track-label` in `tokens.md` § 3.4).
- Stat labels on display-stat slide: 0.14em (extra air because the numeral is huge).

## Line-height

- Cover title: 1.0.
- Section-break: 1.05.
- Hero headline: 1.1.
- Split / card headlines: 1.15–1.2.
- Body / subhead: 1.5 (1.3–1.4 on layout-scoped larger subheads where density needs lifting).
- Stats: 1.0 (numeral and label read as one object).

## Text wrap

All headlines from `.headline-card` up use `text-wrap: balance` so lines break cleanly instead of leaving a runt last line. Requires Chromium 114+; Puppeteer in `build.mjs` satisfies this.

## Font loading

`templates/styles.css` imports Inter from Google Fonts at the four working weights (400 / 600 / 700 / 800). Puppeteer in `templates/build.mjs` then waits for the webfont to fully load before printing each slide, explicitly priming the weights that appear on the deck:

```js
await page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all([
    document.fonts.load("400 16px Inter"),
    document.fonts.load("600 16px Inter"),
    document.fonts.load("700 64px Inter"),
    document.fonts.load("800 88px Inter"),
  ]);
});
```

Without the per-weight wait, Google Fonts' per-weight file delivery can race ahead of the print call and a slide headline ships in the system fallback.

See `implementation.md` for the full build pipeline.

## Don'ts on slides

Inherits all the don'ts from `../../eyelevel-design-standards/references/typography.md` plus:

- **Don't inline-override `font-size`, `font-weight`, or `color`** on slide HTML. Every override bypasses the scale; bugs that surface later (weight drift between split columns, label sizes out of sync) almost always trace back to an inline override.
- **Don't declare a raw `font-size` literal in `styles.css`** either. Class rules reference size tokens in the generated `:root` block; those tokens flow from `tokens.json` via the generator. A literal `2.5rem` anywhere outside the generated `:root` block is a bug.
- **Don't size down body text to fit more words on a slide.** If it doesn't fit at the body tier, the slide has too many words — cut.
- **Don't use weight 500 or 900.** The ladder is 400 / 600 / 700 / 800.
- **Don't center-align paragraphs** (more than one line of body). Only single-line headlines center cleanly; paragraphs center-align badly.
- **Don't rotate text.** Ever.
- **Don't use text outlines or strokes** to "make text pop on a photo". Use a semi-transparent dark panel behind the text instead.
