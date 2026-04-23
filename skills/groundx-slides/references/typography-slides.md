# Typography on Slides

The brand typography rules live in `../../groundx-design-standards/references/typography.md`. This file is the slide-specific sizing layer: the type scale for a 1920×1080 canvas, in rem, so the web and slide typography share a vocabulary.

Root is `1rem = 16px` on the slide (same as dashboard). All sizes below are in rem so the mental model ports back to web.

## The unified label rule

Every uppercase "section label" on the slide — slide-level eyebrows ("HOW IT WORKS"), card eyebrows ("SCALE", "SECURITY", "SPEED"), step labels ("CONNECT", "INGEST", "RETRIEVE"), day labels ("DAY 1-2"), section-break eyebrows ("PART TWO") — uses **one size**: `2rem` / 32px / 600 / 0.12em tracking. Only the color changes by context:

- **Coral** on light surfaces (default `.eyebrow`, `.detail-item__label`)
- **Green** on navy slides (`.slide--navy .eyebrow` and friends)
- **Navy** on light surfaces paired with a green numeral (`.step__label`)

Labels inside a white card nested on a navy slide revert to coral — the card is a light surface.

Buttons (`.cta`) also sit on this tier (32px / 600). An action label is a label.

## The unified metric rule

Any numeral + label pair — a 3-up stat row on a cover or hero, the display-stat slide, the stat stack in a detail-grid sidebar — follows a **1:4 ratio**. The label is exactly one-quarter the size of the numeral:

| Context | Numeral | Label |
| --- | --- | --- |
| Display stat (dedicated slide) | 240 | 60 |
| Standard 3-up (cover, hero, sidebar) | 88 | 22 |

The sidebar used to be 56/12. Unifying at 88/22 means every metric on a slide reads with the same rhythm regardless of where it appears.

## Slide type scale

The scale is a clean ~1.35× modular progression on the headline side. One class per role, no overlapping sizes, and **no inline font overrides in slide HTML** — if you need a new size, add a class in `styles.css` first.

The body / subhead / eyebrow tiers are deliberately **layout-scoped** rather than a single global size, because a 24px paragraph that reads well next to a 28px card title looks lost next to an 88px section headline. Subheads target roughly **half** of their paired headline; eyebrows target roughly **one quarter**, with a 16px floor (below that, uppercase letters stop resolving at slide reading distance).

### Headlines

| Role | Class | rem | px | Weight | Letter-spacing | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Deck title (cover) | `.headline-cover` | `5.5rem` | 88 | 800 | −0.025em | Matches the section-break size; separated from it by weight (800 vs 700). Line-height 1.0. One brand moment per deck. |
| Section-break headline | `.headline-section` | `5.5rem` | 88 | 700 | −0.02em | Centered. Line-height 1.05. |
| Hero headline (content slide) | `.headline-hero` | `4rem` | 64 | 700 | −0.015em | Left-aligned. Line-height 1.1. Max 20ch. |
| Split-column headline | `.headline-split` | `2.75rem` | 44 | 700 | −0.01em | Peer-to-peer headline in two-column splits. Max 14ch. |
| Card headline | `.headline-card` | `1.75rem` | 28 | 700 | −0.005em | Title inside a three-card grid. |

### Subhead / body (paired with the headline above)

| Paired with | Class(es) | rem | px | Weight | Notes |
| --- | --- | --- | --- | --- | --- |
| Section-break (88) | `.subhead`, `.subhead--center` in `.slide--section-break` | `2.75rem` | 44 | 400 | Half of headline. |
| Cover (88) | `.subhead` in `.slide--cover` | `2.75rem` | 44 | 400 | Half of headline. |
| Hero (64), CTA | `.subhead`, `.body` in `.slide--hero-with-stats` / `.slide--cta` | `2rem` | 32 | 400 | Half of headline. |
| Split (44) | `.subhead`, `.body` in `.slide--split` | `1.75rem` | 28 | 400 | Sits above step body in the rhythm. |
| Step (inside `.slide--numbered-steps`) | `.step__body` | `1.75rem` | 28 | 400 | Right column of a numbered step. Max 48ch. |
| Card body (inside `.slide--three-card-grid`) | `.body-sm` | `1.5rem` | 24 | 400 | Card column is third-width — don't push larger. |
| Detail-item body | `.detail-item__body` | `1.125rem` | 18 | 400 | Bounded layout; lines are short. |
| Detail-item headline | `.detail-item__headline` | `1.5rem` | 24 | 700 | Mini-headline in the detail-grid sidebar layout. |
| Default body (outside a scoped layout) | `.body` | `1.5rem` | 24 | 400 | Fallback. Max 38ch. |
| Default body-sm | `.body-sm` | `1.25rem` | 20 | 400 | Fallback for cards outside the three-card grid. |

### Eyebrows / labels

| Role | Class | rem | px | Weight | Letter-spacing | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Section-break eyebrow | `.eyebrow` in `.slide--section-break` | `2rem` | 32 | 600 | 0.12em | Co-lead element with the 88px title — about 1/3 of the headline. |
| Default eyebrow | `.eyebrow` | `1rem` | 16 | 600 | 0.14em | Hero eyebrow, card eyebrow, split eyebrow, CTA eyebrow. 1/4 of a 64px hero headline; serves as the 16px floor for smaller headlines. |
| Step label | `.step__label` | `1rem` | 16 | 600 | 0.14em | Matches default eyebrow. |
| Stat label (3-up on cover / hero) | `.stat .stat-label` | `1.375rem` | 22 | 600 | 0.12em | 1/4 of the 88px stat numeral. |
| Detail-item label | `.detail-item__label` | `0.875rem` | 14 | 600 | 0.14em | Bounded sidebar layout; stays at 14. |
| Slide number | `.slide-number` | `0.75rem` | 12 | 600 | 0.12em | Bottom-right of every slide. |
| Pill | `.pill` | `0.75–0.875rem` | 12–14 | 600 | 0.08–0.14em | Uppercase. |
| Slide CTA button (default) | `.cta` | `1.375rem` | 22 | 600 | 0.08em | One tier below the default label; readable from the back row without competing with the hero copy. |
| Slide CTA button (small) | `.cta.cta--sm` | `1.125rem` | 18 | 600 | 0.08em | Secondary/inline actions. |
| Slide CTA button (large) | `.cta.cta--lg` | `1.75rem` | 28 | 600 | 0.08em | Use sparingly — a single primary action on a CTA slide. |

**No `.tagline` class.** "A VALANTOR COMPANY" is baked into the logo PNG (`eyelevel-logo-white.png` / `eyelevel-logo-color.png`). Don't add a sibling `<span class="tagline">` next to `.slide-logo`; the lockup already contains it.

All eyebrows are **written uppercase in HTML** per the ALL-CAPS rule in design standards. CSS does not `text-transform`.

### Why the scale was lifted

An earlier iteration held eyebrows and subheads at a single small global size (14px / 24px). At 1920×1080, that left the supporting copy looking tiny next to 64–88px headlines — eyebrows and subheads read as decoration rather than as partners to the lead. The current scale corrects this by pairing each supporting tier to its headline:

1. **Subheads target half the headline.** 88 → 44, 64 → 32, 44 → 28. Readable without imitating the headline.
2. **Eyebrows target one-quarter of the headline, with a 16px floor.** 88 → 32 (section-break), 88 → 22 (stat labels), 64 → 16 (hero / step / CTA). Card-grid and split eyebrows hit the floor at 16.
3. **The weight ladder stays narrow** — 400 / 600 / 700 / 800. Weight 900 remains retired.

## Display-stat sizes

See `../../groundx-design-standards/references/typography.md` § display-stat pattern for the rule. Slide-specific sizes:

| Context | Numeral | Label |
| --- | --- | --- |
| Stat row on a cover or hero slide (3-up) | `5.5rem` / 88px / 800 / −0.025em | `1.375rem` / 22px / 600 / 0.12em |
| Dedicated display-stat slide | `15rem` / 240px / 800 / −0.03em | `2rem` / 32px / 600 / 0.14em |
| Sidebar stat (stacked on detail-grid-with-sidebar) | `3.5rem` / 56px / 700 / −0.02em | `0.75rem` / 12px / 600 / 0.16em |

Display-stat slides also have a `.display-stat__note` caption under the numeral — `1.5rem` / 24px / 400.

## Color mapping by surface

| Element | On white / gray / tint / cyan | On navy |
| --- | --- | --- |
| Eyebrow | Coral `#f3663f` | Green `#a1ec83` |
| Eyebrow inside a white card on navy | Coral | Coral (the card is the surface) |
| Headline | Navy `#29335c` | White |
| Body / subhead | Body Text `#40496b` (on light) | White at 80% |
| Display-stat numeral (single) | Coral | Green |
| Display-stat numeral (3-up, cycling) | Coral × 3 (cycling fails contrast on light) | Green → Cyan → Coral |
| Display-stat label | Navy-muted (70%) | White at 70% |
| Slide number | `#81879a` (Dark Grey) | White at 55% |

## Spacing rhythm

A 4px base unit; 8px minor step; 12/20/24 major steps inside a type block.

| Gap | Use |
| --- | --- |
| 12px | eyebrow → headline |
| 20px | headline → body |
| 24px | body → next peer block |
| 40–48px | between primary content blocks on the slide |
| 72–80px | split-column gutter, stat-row gutter |

`margin-bottom` values are baked into the type-scale classes so spacing is consistent regardless of markup. Don't add `stack-*` utility classes between eyebrow → headline → body — let the classes' own margins do the work.

## Alignment

- **Split layouts** use `.split-wrap` as an absolute-positioned vertical-center wrapper around the `.split` grid. Columns inside are top-aligned (`align-items: start`) so both columns' eyebrows share a baseline. Never vertically center each column independently — if the two columns have different content heights, independent centering will misalign the eyebrows.
- **Hero-style content** (single block with eyebrow + headline + subhead) uses the `.hero-block` class or the `.slide-centerblock` absolute wrapper.
- **Centered content** (section-break, display-stat) uses `.section-break-content` or `.display-stat` which already handle flex centering.

## Letter-spacing

- Cover / section / hero / split / card headlines: negative tracking (−0.025 → −0.005em) scaled to size.
- Body and subhead: 0.
- Eyebrows and uppercase labels: 0.14em.
- Stat labels on display-stat slide: 0.16em (extra air because the numeral is huge).

## Line-height

- Cover title: 1.0.
- Section-break: 1.05.
- Hero headline: 1.1.
- Split / card headlines: 1.15–1.2.
- Body / subhead: 1.5.
- Stats: 1.0 (numeral and label read as one object).

## Text wrap

All headlines from `.headline-card` up use `text-wrap: balance` so lines break cleanly instead of leaving a runt last line. Requires Chromium 114+; Puppeteer in `build.mjs` satisfies this.

## Font loading

`templates/styles.css` includes:

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

:root {
  --gx-font: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-feature-settings: "ss01", "cv11", "cv01";
}
```

Puppeteer in `templates/build.mjs` waits for the webfont to fully load before printing each slide, explicitly priming the weights that appear on the deck (400 / 600 / 700 / 800). Without the per-weight wait, Google Fonts' per-weight file delivery can race ahead of the print call and a slide headline ships in the system fallback.

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

See `implementation.md` for the full build pipeline.

## Don'ts on slides

Inherits all the don'ts from `../../groundx-design-standards/references/typography.md` plus:

- **Don't inline-override `font-size`, `font-weight`, or `color`** on slide HTML. Every override bypasses the scale; bugs that surface later (weight drift between split columns, label sizes out of sync) almost always trace back to an inline override.
- **Don't size down body text to fit more words on a slide.** If it doesn't fit at `1.5rem`, the slide has too many words — cut.
- **Don't use weight 500 or 900.** The ladder is 400 / 600 / 700 / 800.
- **Don't center-align paragraphs** (more than one line of body). Only single-line headlines center cleanly; paragraphs center-align badly.
- **Don't rotate text.** Ever.
- **Don't use text outlines or strokes** to "make text pop on a photo". Use a semi-transparent dark panel behind the text instead.
