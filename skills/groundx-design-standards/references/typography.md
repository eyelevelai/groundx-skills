# Typography

One typeface, one weight scale, one set of rules. Applied consistently across web, slides, print, and email, the typography does most of the work of looking like EyeLevel.

## Typeface: Inter

A humanist sans-serif designed for screen UI at small sizes and display work at large sizes. Inter is the brand typeface across every surface — dashboard, slides, white papers, email — chosen for enterprise legibility and a refined, professional feel.

The distinguishing features are:

- **Designed for screens first.** Optical adjustments at 11–16px make it read cleanly in dashboards and data tables.
- **Full weight range** (100–900) with real, designed weights — not synthesized interpolations.
- **OpenType features** for subtle refinement: `ss01` (single-story `a`), `cv11` (straight `R`), `cv01` (lowercase `l` with tail). The brand applies these at the body level.
- **Neutral personality.** Inter does not "compete" with the content — it disappears and lets the palette and layout carry the voice.

Source: served from Google Fonts (`fonts.googleapis.com`) in all web and slide contexts. No self-hosting required.

**Fallback stack**: `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. The system sans stack renders comparably enough that an Inter miss doesn't visibly break the brand. Never fall back to a *different* display font — if Inter isn't available, a plain sans-serif is better than `Gill Sans` or similar.

## Weight scale

The practical ladder is **400 / 500 / 600 / 700 / 800** — five designed weights that cover every role in the system.

| Weight | Name | Use |
| --- | --- | --- |
| **400** | **Regular** | **Default body weight.** Paragraphs, subheads, most UI text. |
| 500 | Medium | Subtle emphasis in running text. Use sparingly. |
| **600** | **SemiBold** | **Labels, CTAs, table headers, active nav, eyebrows, stat labels.** The workhorse "this is important" weight. |
| **700** | **Bold** | **All web headings (H1–H6), slide headlines (card → section), emphasized inline words.** |
| **800** | **ExtraBold** | **Cover-slide headline, display-stat numerals.** Reserved for brand moments — one or two per deck. |

Weights 100/200/300 and 900 are available in Inter but unused in the system. Rule of thumb: most in-app text lives at **400** or **600**. You shouldn't need more than three weights on a given page.

## OpenType feature tuning

The brand enables three stylistic sets globally (`font-feature-settings: "ss01", "cv11", "cv01"`):

- **ss01** — single-story `a`. Reads more geometric and modern than the default double-story.
- **cv11** — straight-leg `R`. Avoids the curled-leg form that reads dated.
- **cv01** — lowercase `l` with a subtle terminal tail. Disambiguates from `I` / `1` in data-dense UI.

These are applied on `body` in both `groundx-slides/templates/styles.css` and `groundx-web-ui/templates/fonts.css` so every surface inherits them. Do not enable additional features (like `ss02`, alternate ampersands, etc.) — the brand look depends on consistency.

## Type hierarchy

Hierarchy comes primarily from **weight**, not size. The heading ladder on web is a clean ~1.2× modular progression (16 → 18 → 22 → 26 → 32 → 40); within a given tier, weight does the heavy lifting. Don't reach for a bigger size when a weight bump will do.

| Role | Size (web baseline) | Weight | Notes |
| --- | --- | --- | --- |
| Display heading (hero / cover) | 2.5rem (40px) | 700 | Rare in-app. Marketing surfaces and slide covers use 64–88px — see `groundx-slides`. |
| Page heading (H2) | 2rem (32px) | 700 | Top of a route — "Home", "Buckets", "Settings". |
| Section heading (H3) | 1.625rem (26px) | 700 | A region inside a page — "Your Plan", "Recent Activity". |
| Subsection (H4) | 1.375rem (22px) | 700 | Third-level heading inside a section. |
| Card heading (H5) | 1.125rem (18px) | 700 | The title row of a card. |
| Card subhead (H6) | 1rem (16px) | 700 | A heading at body size; separated by weight. |
| Body | 1rem (16px) | 400 | Paragraphs. The reading default. |
| Body-sm | 0.875rem (14px) | 400 | Secondary body, table cells. |
| Metadata / caption | 0.8125rem (13px) | 400 | Timestamps, inline help, muted navy color. |
| Small label (section label: "TUTORIAL") | 0.75rem (12px) | 600 | Uppercase. Tracked 0.12em. |

Size values above are **web** baselines; slides scale the same ladder up (see `groundx-slides/references/typography-slides.md`). The web ladder is compressed deliberately — dashboard reading happens at 24", not 10 feet.

**Slide baselines (1920×1080).** Web body reads comfortably at 16px; slide body does not. Slides use a proportional scale tuned for projector and PDF reading. See `groundx-slides/references/typography-slides.md` for the full slide ladder.

If copy overflows at baseline, cut copy — don't shrink type.

## The display-stat pattern

A recurring shape across marketing collateral (slides, white papers, landing pages) is a **display stat**: a huge colored numeral stacked over a small muted label. Think "99% accuracy", "500B parameters", "3× faster". The pattern is:

| Element | Weight | Size (slide baseline) | Color |
| --- | --- | --- | --- |
| Numeral / stat (3-up row) | 800 | 88px (5.5rem) | Coral Orange on light surfaces, Active Green on navy surfaces |
| Numeral / stat (display-stat slide) | 800 | 288px (18rem) | Same |
| Label underneath | 600 | 22px (1.375rem) — 1:4 of the 88px numeral, or 40px in the display-stat layout | Navy-muted on light, White 75% on navy |

Rules:

- The stat is always a short string — a percentage, a multiplier, a dollar figure, a single-digit ranking. If it's longer than ~4 characters, it isn't a display stat; it's a heading.
- Label is uppercase, literal, and sits directly beneath the stat with tight line-height (1.0–1.1×).
- Never gradient-fill the numeral. The color is flat hex — see the eyebrow-swap rule in `colors.md`.
- On a 3-up stat row (the most common arrangement), use equal column widths and let the numerals align to a common baseline.

## Weight ceiling is 800

The practical ladder is **400 / 500 / 600 / 700 / 800**. Weight 900 (Black) is available in Inter but retired from the system — at display sizes it reads as poster-heavy rather than assertive, and no current slide or web surface needs it. Weight 800 (ExtraBold) is reserved for the single brand moment per deck — the cover headline — and for display-stat numerals where the mass is doing deliberate work.

Rule of thumb: if a person would pause reading to look at the text, 700 or 800 is appropriate. If they're scanning for information, use 600 or lower.

## The ALL-CAPS label rule

Section labels — "TUTORIAL", "CONTENT", "YOUR BUCKETS", "X-RAY", "ACTIVE" — are rendered uppercase. **Write them uppercase in the source content. Never achieve uppercase via `text-transform` / `font-caps` / medium-native casing transforms.**

Why:

- Content portability. A label typed as "TUTORIAL" survives export from web to slide to PDF unchanged. A label typed as "tutorial" with CSS `text-transform: uppercase` becomes "tutorial" the moment the CSS is stripped.
- Translations. Many non-Latin scripts don't have case; `text-transform` breaks them.
- Screen readers. Some read `text-transform: uppercase` text letter-by-letter.

The exception is *button components* whose whole purpose is a styled CTA — `CommonSubmitButton` on web uppercases its label internally by default. That's a component-level decision, not a stylesheet-level one.

## Italics

Inter ships italic styles, but the brand does not use them. Use weight, color, or spacing to emphasize words inline.

For quoted or referenced text where italics would be typographically conventional (book titles, legal citations), use quotation marks or a dedicated style (slightly lighter weight, slightly muted color).

## Line height and spacing

- **Body line-height**: 1.5× — comfortable reading density.
- **Headings line-height**: 1.1×–1.3× — tighter.
- **Paragraph spacing**: one line of vertical space between paragraphs, not two.
- **Letter-spacing (tracking)**: 0 by default for body. Headlines at 44px+ apply a subtle negative tracking (-0.01em to -0.025em) to counteract Inter's slightly loose default. Uppercase labels add +0.12–0.18em.

## Don'ts

- **Don't introduce a second typeface.** No pairing Inter with a serif for headings, no "code font" swap for body (monospace is fine for actual code blocks).
- **Don't use weight 500 as a default.** It reads indecisive between 400 and 600. Pick one.
- **Don't size up to create hierarchy.** If you feel the need to make a paragraph 20px to distinguish it from surrounding 16px text, you're probably missing a weight change or a structural element (a card, a section break).
- **Don't force italic.**
- **Don't `text-transform: uppercase`** — write uppercase.
- **Don't fall back to a different display font.** Plain sans-serif is fine; `Gill Sans`, `Futura`, etc. are wrong.

## Medium-specific implementation

- **`groundx-web-ui`**: `@import` from Google Fonts in `templates/fonts.css`. `FONT_FAMILY` constant (see `templates/constants.ts`) is applied at `<body>` via `MuiCssBaseline` and at the MUI theme root. The OpenType feature settings (`ss01`, `cv11`, `cv01`) apply globally via the body rule in `fonts.css`.
- **`groundx-slides`**: same Google Fonts `@import` in `templates/styles.css`. The build script (`build.mjs`) primes weights 400 / 600 / 700 / 800 before rendering each slide to PDF so headlines don't ship in the system fallback.
- **Email / print**: use the system fallback. Inter is widely pre-installed on modern systems; for print production, download the weights from fonts.google.com or rsms.me/inter and embed in the PDF.

Historical note: the brand previously used THICCCBOI (self-hosted at cdn.eyelevel.ai). That typeface has been retired in favor of Inter for a more professional, enterprise-legible feel. Old references to THICCCBOI in third-party material should be migrated.
