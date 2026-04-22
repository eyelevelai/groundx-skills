# Typography on Slides

The brand typography rules live in `../../groundx-design-standards/references/typography.md`. This file is the slide-specific sizing layer: the type scale for a 1920×1080 canvas, in rem, so the web and slide typography share a vocabulary.

Root is `1rem = 16px` on the slide (same as dashboard). All sizes below are in rem so the mental model ports back to web.

## Slide type scale

The scale is a clean ~1.35× modular progression. One class per role, no overlapping sizes, and **no inline font overrides in slide HTML** — if you need a new size, add a class in `styles.css` first.

| Role | Class | rem | px | Weight | Letter-spacing | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Deck title (cover) | `.headline-cover` | `7rem` | 112 | 800 | −0.025em | 1–8 words. Line-height 1.0. One brand moment per deck. |
| Section-break headline | `.headline-section` | `5.5rem` | 88 | 700 | −0.02em | Centered. Line-height 1.05. |
| Hero headline (content slide) | `.headline-hero` | `4rem` | 64 | 700 | −0.015em | Left-aligned. Line-height 1.1. Max 20ch. |
| Split-column headline | `.headline-split` | `2.75rem` | 44 | 700 | −0.01em | Peer-to-peer headline in two-column splits. Max 14ch. |
| Card headline | `.headline-card` | `1.75rem` | 28 | 700 | −0.005em | Title inside a three-card grid. |
| Subhead / lead paragraph | `.subhead` | `1.5rem` | 24 | 400 | 0 | Body text under a dominant headline. Max 52ch. |
| Body | `.body` | `1.5rem` | 24 | 400 | 0 | Default reading size. Line-height 1.5. Max 38ch. |
| Body-sm | `.body-sm` | `1.25rem` | 20 | 400 | 0 | Card bodies where space is tight. |
| Step body | `.step__body` | `1.5rem` | 24 | 400 | 0 | Right column of a numbered step. |
| Detail-item headline | `.detail-item__headline` | `1.5rem` | 24 | 700 | −0.005em | Mini-headline in the detail-grid sidebar layout. |
| Detail-item body | `.detail-item__body` | `1.125rem` | 18 | 400 | 0 | Support copy under a detail-item headline. |
| Eyebrow label | `.eyebrow` | `0.875rem` | 14 | 600 | 0.14em | Write uppercase in HTML (per the ALL-CAPS rule in design standards). CSS does not `text-transform`. |
| Stat label / step label / detail-item label | various | `0.875rem` | 14 | 600 | 0.14em | Same eyebrow rhythm. |
| Slide number | `.slide-number` | `0.75rem` | 12 | 600 | 0.12em | Bottom-right of every slide. |
| Tagline ("A VALANTOR COMPANY") | `.tagline` | `0.6875rem` | 11 | 600 | 0.14em | Paired with the logo on cover and CTA. |
| Pill / CTA button | `.pill`, `.cta` | `0.75–0.875rem` | 12–14 | 600 | 0.08–0.14em | Uppercase. |

### Why the scale tightened

The earlier scale had a 1.86× jump from body (28px) to split headline (52px) with nothing between — headlines dominated, body felt blocky, and the overall feel was bombastic. The current scale fixes three problems:

1. **Smaller jumps** — 24 → 28 → 44 → 64 → 88 → 112 flows. No tier is orphaned.
2. **Narrower weight ladder** — 400 / 600 / 700 / 800. Weight 900 is gone; it reads as poster-style on THICCCBOI.
3. **Tighter tracking on display sizes** — negative letter-spacing at 44px+ makes headlines look intentional rather than loose.

## Display-stat sizes

See `../../groundx-design-standards/references/typography.md` § display-stat pattern for the rule. Slide-specific sizes:

| Context | Numeral | Label |
| --- | --- | --- |
| Stat row on a cover or hero slide (3-up) | `5.5rem` / 800 / −0.025em | `0.875rem` / 600 / 0.14em |
| Dedicated display-stat slide | `13rem` / 800 / −0.03em | `1.125rem` / 600 / 0.16em |
| Sidebar stat (stacked on detail-grid-with-sidebar) | `3.5rem` / 700 / −0.02em | `0.75rem` / 600 / 0.16em |

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
@import url("https://cdn.eyelevel.ai/thicccboi/thicccboi.css");

:root {
  --gx-font: "THICCCBOI", system-ui, sans-serif;
}
```

Puppeteer in `templates/build.mjs` waits for the webfont to fully load before printing each slide — otherwise the PDF can ship with the fallback `system-ui` in place of THICCCBOI. See `implementation.md` for the exact wait logic.

## Don'ts on slides

Inherits all the don'ts from `../../groundx-design-standards/references/typography.md` plus:

- **Don't inline-override `font-size`, `font-weight`, or `color`** on slide HTML. Every override bypasses the scale; bugs that surface later (weight drift between split columns, label sizes out of sync) almost always trace back to an inline override.
- **Don't size down body text to fit more words on a slide.** If it doesn't fit at `1.5rem`, the slide has too many words — cut.
- **Don't use weight 500 or 900.** The ladder is 400 / 600 / 700 / 800.
- **Don't center-align paragraphs** (more than one line of body). Only single-line headlines center cleanly; paragraphs center-align badly.
- **Don't rotate text.** Ever.
- **Don't use text outlines or strokes** to "make text pop on a photo". Use a semi-transparent dark panel behind the text instead.
