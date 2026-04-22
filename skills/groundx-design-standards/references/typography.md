# Typography

One typeface, one weight scale, one set of rules. Applied consistently across web, slides, print, and email, the typography does most of the work of looking like GroundX.

## Typeface: THICCCBOI

A geometric sans-serif with a full weight range. The distinguishing features are:

- **Wide weight range** — 100 (thin) through 900/950 (ultra-heavy). Full scale available below.
- **Rounded letterforms** with restrained personality — recognizable without being eccentric.
- **High x-height** — reads comfortably at small sizes (captions, table cells).

Source: available as webfont from `cdn.eyelevel.ai` for browser use, and as `.ttf` / `.otf` files in `../assets/fonts/` for non-browser mediums (PowerPoint, Word, print).

**Fallback**: `sans-serif`. System default. Never fall back to a *different* display font — if THICCCBOI isn't available, a plain sans-serif is better than `Gill Sans` or similar.

## Weight scale

The full THICCCBOI family contains 9 weights:

| Weight | Name | Use |
| --- | --- | --- |
| 100 | Thin | Not used. Too fragile at body sizes. |
| 200 | ExtraLight | Not used. |
| 300 | Light | Quiet captions, timestamp text. Rare. |
| **400** | **Regular** | **Default body weight.** Paragraphs, most UI text. |
| 500 | Medium | Subtle emphasis. Use sparingly — prefer 400 or 600. |
| **600** | **SemiBold** | **Labels, CTAs, table headers, active nav.** The workhorse "this is important" weight. |
| **700** | **Bold** | **All web headings (H1–H6), slide headlines (card → section), emphasized inline words.** |
| **800** | **ExtraBold** | **Cover-slide headline and display-stat numerals. Reserved for brand moments.** |
| 900 / 950 | Black | Retired from the system — reads poster-heavy at display sizes. Don't use. |

Rule of thumb: most in-app text lives at **400** or **600**. You shouldn't need more than three weights on a given page.

## Type hierarchy

Hierarchy comes primarily from **weight**, not size. The heading ladder on web is a clean ~1.2× modular progression (16 → 18 → 22 → 26 → 32 → 40); within a given tier, weight does the heavy lifting. Don't reach for a bigger size when a weight bump will do.

| Role | Size (web baseline) | Weight | Notes |
| --- | --- | --- | --- |
| Display heading (hero / cover) | 2.5rem (40px) | 700 | Rare in-app. Marketing surfaces and slide covers use 64–112px — see `groundx-slides`. |
| Page heading (H2) | 2rem (32px) | 700 | Top of a route — "Home", "Buckets", "Settings". |
| Section heading (H3) | 1.625rem (26px) | 700 | A region inside a page — "Your Plan", "Recent Activity". |
| Subsection (H4) | 1.375rem (22px) | 700 | Third-level heading inside a section. |
| Card heading (H5) | 1.125rem (18px) | 700 | The title row of a card. |
| Card subhead (H6) | 1rem (16px) | 700 | A heading at body size; separated by weight. |
| Body | 1rem (16px) | 400 | Paragraphs. The reading default. |
| Body-sm | 0.875rem (14px) | 400 | Secondary body, table cells. |
| Metadata / caption | 0.8125rem (13px) | 400 | Timestamps, inline help, muted navy color. |
| Small label (section label: "TUTORIAL") | 0.75rem (12px) | 700 | Uppercase. Tracked 0.12em. |

Size values above are **web** baselines; slides scale the same ladder up (see `groundx-slides/references/typography-slides.md`). The web ladder is compressed deliberately — dashboard reading happens at 24", not 10 feet.

**Slide baselines (1920×1080).** Web body reads comfortably at 16px; slide body does not. Slides use a proportional scale tuned for projector and PDF reading:

| Role | Slide baseline |
| --- | --- |
| Body copy (`.body`, `.subhead`, `.step__body`) | **24px (1.5rem)** |
| Card body (`.body-sm`) | **20px (1.25rem)** |
| Detail-item body | **18px (1.125rem)** — bounded layout; lines are short |
| Eyebrow / uppercase label / stat label | **14px (0.875rem)** — tracked 0.14em, uppercase in source |
| Slide number | **12px (0.75rem)** — tracked 0.12em |
| Tagline | **11px (0.6875rem)** — paired with logo; tracked 0.14em |

If copy overflows at baseline, cut copy — don't shrink type. Sizes here should match the scale in `groundx-slides/references/typography-slides.md` exactly.

## The display-stat pattern

A recurring shape across marketing collateral (slides, white papers, landing pages) is a **display stat**: a huge colored numeral stacked over a small muted label. Think "99% accuracy", "500B parameters", "3× faster". The pattern is:

| Element | Weight | Size (slide baseline) | Color |
| --- | --- | --- | --- |
| Numeral / stat (3-up row) | 800 | 88px (5.5rem) | Coral Orange on light surfaces, Active Green on navy surfaces |
| Numeral / stat (display-stat slide) | 800 | 208px (13rem) | Same |
| Label underneath | 600 | 14px (0.875rem), 0.14em tracking | Navy-muted on light, White 70% on navy |

Rules:

- The stat is always a short string — a percentage, a multiplier, a dollar figure, a single-digit ranking. If it's longer than ~4 characters, it isn't a display stat; it's a heading.
- Label is uppercase, literal, and sits directly beneath the stat with tight line-height (1.0–1.1×).
- Never gradient-fill the numeral. The color is flat hex — see the eyebrow-swap rule in `colors.md`.
- On a 3-up stat row (the most common arrangement), use equal column widths and let the numerals align to a common baseline.

## Weight ceiling is 800

The practical ladder is **400 / 600 / 700 / 800**. Weight 900 (Black) is available in the typeface but retired from the system — at display sizes on THICCCBOI it reads as poster-heavy rather than assertive, and no current slide or web surface needs it. Weight 800 (ExtraBold) is reserved for the single brand moment per deck — the cover headline — and for display-stat numerals where the mass is doing deliberate work.

Rule of thumb: if a person would pause reading to look at the text, 700 or 800 is appropriate. If they're scanning for information, use 600 or lower.

## The ALL-CAPS label rule

Section labels — "TUTORIAL", "CONTENT", "YOUR BUCKETS", "X-RAY", "ACTIVE" — are rendered uppercase. **Write them uppercase in the source content. Never achieve uppercase via `text-transform` / `font-caps` / medium-native casing transforms.**

Why:

- Content portability. A label typed as "TUTORIAL" survives export from web to slide to PDF unchanged. A label typed as "tutorial" with CSS `text-transform: uppercase` becomes "tutorial" the moment the CSS is stripped.
- Translations. Many non-Latin scripts don't have case; `text-transform` breaks them.
- Screen readers. Some read `text-transform: uppercase` text letter-by-letter.

The exception is *button components* whose whole purpose is a styled CTA — `CommonSubmitButton` on web uppercases its label internally by default. That's a component-level decision, not a stylesheet-level one.

## Italics

THICCCBOI does not ship an italic style. Don't apply artificial obliquing (`font-style: italic` forces a synthetic slant, which looks bad). Use weight, color, or spacing to emphasize words inline.

For quoted or referenced text where italics would be typographically conventional (book titles, legal citations), use quotation marks or a dedicated style (slightly lighter weight, slightly muted color).

## Line height and spacing

- **Body line-height**: 1.5× — comfortable reading density.
- **Headings line-height**: 1.2×–1.3× — tighter.
- **Paragraph spacing**: one line of vertical space between paragraphs, not two.
- **Letter-spacing (tracking)**: 0 by default. For small uppercase labels (0.75rem), add `letter-spacing: 0.04em` to improve legibility.

## Don'ts

- **Don't introduce a second typeface.** No pairing THICCCBOI with a serif for headings, no "code font" swap for body (monospace is fine for actual code blocks).
- **Don't use weight 500 as a default.** It reads indecisive between 400 and 600. Pick one.
- **Don't size up to create hierarchy.** If you feel the need to make a paragraph 20px to distinguish it from surrounding 16px text, you're probably missing a weight change or a structural element (a card, a section break).
- **Don't force italic** (no synthetic obliquing).
- **Don't `text-transform: uppercase`** — write uppercase.
- **Don't fall back to a different display font.** Plain sans-serif is fine; `Gill Sans`, `Futura`, etc. are wrong.

## Medium-specific implementation

- **`groundx-web-ui`**: `@font-face` declarations in `templates/fonts.css` pointing at `cdn.eyelevel.ai`. `FONT_FAMILY = "THICCCBOI, sans-serif"` applied at `<body>` via `MuiCssBaseline`. MUI `<Typography>` retains the override as a belt-and-suspenders safeguard.
- **`groundx-slides` (planned)**: embed `.ttf` in the `.pptx` slide master, or require users to install THICCCBOI locally; set the master theme font to THICCCBOI.
- **Email / print**: embed or system-install; use PostScript name where required (`THICCCBOI-Regular`, `THICCCBOI-SemiBold`, etc.).

The font files themselves live at `../assets/fonts/` — see that folder's README for format details.
