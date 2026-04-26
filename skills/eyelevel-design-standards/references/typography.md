# Typography

One typeface, one weight ladder, one set of rules. Applied consistently across web, slides, print, and email, the typography does most of the work of looking like EyeLevel.

This file explains the **rules** for type use. The **values** (font family, weights, sizes for each role, feature settings) live in `tokens.md`.

> **Tokens:** see `tokens.md` § 2 (font family, weights, feature settings), § 3 (slide size scale), § 4 (web size scale). When in doubt, `tokens.md` wins.

## Typeface: Inter

A humanist sans-serif designed for screen UI at small sizes and display work at large sizes. Inter is the brand typeface across every surface — dashboard, slides, white papers, email — chosen for enterprise legibility and a refined, professional feel.

Distinguishing features:

- **Designed for screens first.** Optical adjustments at 11–16px make it read cleanly in dashboards and data tables.
- **Full weight range** (100–900) with real, designed weights — not synthesized interpolations.
- **OpenType features** for subtle refinement. The brand applies `ss01` (single-story `a`), `cv11` (straight-leg `R`), `cv01` (lowercase `l` with tail) at the body level. See `tokens.md` § 2.3.
- **Neutral personality.** Inter doesn't "compete" with the content — it disappears and lets the palette and layout carry the voice.

Source: Google Fonts (`fonts.googleapis.com`) in all web and slide contexts. No self-hosting. Fallback stack: system sans. See `tokens.md` § 2.1 for the full family string.

Never fall back to a *different* display font — if Inter isn't available, plain sans-serif is better than `Gill Sans` or similar.

## Weight ladder

The practical ladder is **400 / 600 / 700 / 800**. Weight 500 is indecisive; 900 is retired.

- **400 Regular** — default body, paragraphs, subheads, most UI text.
- **600 SemiBold** — labels, CTAs, table headers, active nav, eyebrows, stat labels. The workhorse "this is important" weight.
- **700 Bold** — all web headings (H1–H6), slide headlines (card → section), emphasized inline words.
- **800 ExtraBold** — cover-slide headline, display-stat numerals. Reserved for brand moments — one or two per deck.

Rule of thumb: most in-app text lives at 400 or 600. You shouldn't need more than three weights on a given page.

Semantic aliases in CSS (`--gx-weight-body` / `--gx-weight-label` / `--gx-weight-headline` / `--gx-weight-display`) keep stylesheets talking about roles rather than raw numbers.

## Type hierarchy — weight over size

Hierarchy comes primarily from **weight**, not size. Within a given tier, weight does the heavy lifting. Don't reach for a bigger size when a weight bump will do.

The web size ladder is a clean ~1.2× modular progression (16 → 18 → 22 → 26 → 32 → 40); the slide ladder is a steeper ~1.35× progression tuned for reading at projector distance. Neither ladder uses odd sizes — everything sits on a named token.

Dashboards read at 24", slides at 10 feet; the two ladders are deliberately different sizes for the same role. See `tokens.md` § 4 for the web ladder and § 3 for the slide ladder.

If copy overflows at baseline, cut copy — don't shrink type.

## The display-stat pattern

A recurring shape across marketing collateral is a **display stat**: a huge colored numeral stacked over a small muted label. "99% accuracy", "500B parameters", "3× faster".

Structure:

- Numeral: weight 800, large, flat hex color (Coral on light, Green on navy).
- Label: weight 600, uppercase, muted, roughly **1:4** of the numeral's size (1:7 on the dedicated display-stat layout where the numeral is dominant).

Rules:

- The stat is always a short string — a percentage, a multiplier, a dollar figure, a single-digit ranking. If it's longer than ~4 characters, it isn't a display stat; it's a heading.
- Label is uppercase, literal, directly beneath the stat with tight line-height (1.0–1.1×).
- Never gradient-fill the numeral. Use the eyebrow-swap rule in `colors.md` § 5 for color.
- On a 3-up stat row (the most common arrangement), equal column widths and numerals aligned to a common baseline.

See `tokens.md` § 3.6 for stat numeral and label sizes.

## The ALL-CAPS label rule

Section labels — "TUTORIAL", "CONTENT", "YOUR BUCKETS", "X-RAY", "ACTIVE" — are rendered uppercase. **Write them uppercase in the source content. Never achieve uppercase via `text-transform` / `font-caps` / medium-native casing transforms.**

Why:

- **Content portability.** A label typed as "TUTORIAL" survives export from web to slide to PDF unchanged. A label typed as "tutorial" with CSS `text-transform: uppercase` becomes "tutorial" the moment the CSS is stripped.
- **Translations.** Many non-Latin scripts don't have case; `text-transform` breaks them.
- **Screen readers.** Some read `text-transform: uppercase` text letter-by-letter.

The exception is *button components* whose whole purpose is a styled CTA — `CommonSubmitButton` on web uppercases its label internally by default. That's a component-level decision, not a stylesheet-level one.

## Italics

Inter ships italic styles, but the brand does not use them. Use weight, color, or spacing to emphasize words inline.

For quoted or referenced text where italics would be typographically conventional (book titles, legal citations), use quotation marks or a dedicated style (slightly lighter weight, slightly muted color).

## Line height and spacing

- **Body line-height**: 1.5× — comfortable reading density.
- **Headings line-height**: 1.1× – 1.3× — tighter as size grows.
- **Paragraph spacing**: one line of vertical space between paragraphs, not two.
- **Letter-spacing (tracking)**: 0 by default for body. Headlines at 44px+ apply subtle negative tracking (−0.01em to −0.025em) to counteract Inter's slightly loose default. Uppercase labels add +0.12–0.18em.

Tracking values for labels are captured in `tokens.md` as `--gx-track-label` (0.12em), sourced from `tokens.json`. If you need a different tracking value, add it to `tokens.json` (and `tokens.md`) before using it, then re-run the generator.

## Don'ts

- **Don't introduce a second typeface.** No pairing Inter with a serif for headings, no "code font" swap for body (monospace is fine for actual code blocks).
- **Don't use weight 500 as a default.** It reads indecisive between 400 and 600. Pick one.
- **Don't size up to create hierarchy.** If you feel the need to make a paragraph 20px to distinguish it from surrounding 16px text, you're probably missing a weight change or a structural element (a card, a section break).
- **Don't force italic.**
- **Don't `text-transform: uppercase`** — write uppercase.
- **Don't fall back to a different display font.** Plain sans-serif is fine; `Gill Sans`, `Futura`, etc. are wrong.
- **Don't re-declare font-size or font-weight values.** Reference the tokens in `tokens.md` § 2–4 (values ultimately live in `tokens.json`).

## Medium-specific implementation

- **`eyelevel-web-ui`** — `@import` from Google Fonts in `templates/fonts.css`. `FONT_FAMILY` and `FONT_FEATURE_SETTINGS` live in the auto-generated `templates/constants.generated.ts` (re-exported via the `constants.ts` barrel), sourced from `tokens.json` § typography. The MUI theme's typography variants consume the web size ladder from the same generated file (`FONT_SIZE_H1`–`H6`, `FONT_SIZE_BODY`, etc.).
- **`eyelevel-slides`** — same Google Fonts `@import` in `templates/styles.css`. The `:root` block is auto-generated from `tokens.json` and contains every `--gx-size-*`, `--gx-weight-*`, `--gx-font`, and `--gx-font-features` declaration; every class rule below the generated block references them by name. The build script (`build.mjs`) primes weights 400 / 600 / 700 / 800 before rendering each slide to PDF so headlines don't ship in the system fallback.
- **Email / print** — use the system fallback. Inter is widely pre-installed on modern systems; for print production, download the weights from fonts.google.com or rsms.me/inter and embed in the PDF.

Historical note: the brand previously used THICCCBOI (self-hosted at cdn.eyelevel.ai). That typeface has been retired in favor of Inter for a more professional, enterprise-legible feel. Old references to THICCCBOI in third-party material should be migrated.
