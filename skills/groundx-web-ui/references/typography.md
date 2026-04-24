# Typography (web)

**This document covers how to *apply* typography in the React + MUI codebase.** For the brand-level rules — which typeface, which weights exist, the ALL-CAPS-as-literal rule, type hierarchy — read `../../groundx-design-standards/references/typography.md` first. For the canonical numbers (size ladder, weights, letter-spacing, line-heights) see `../../groundx-design-standards/references/tokens.md` § 2 (typography) and § 4 (web size scale). Don't duplicate those values here.

## Font wiring

Inter is loaded from Google Fonts via an `@import` in `templates/fonts.css`. The `GxThemeProvider` imports that CSS once at app boot.

The theme applies `fontFamily: FONT_FAMILY` at `<body>` via `MuiCssBaseline`, so every text node — `<Typography>`, raw `<span>`, `<div>`, `<td>` — inherits Inter automatically. The OpenType feature tuning (`ss01`, `cv11`, `cv01`) is applied globally by `fonts.css` on `body`, so stylistic-set settings cascade to every text node without per-component configuration.

```tsx
// src/main.tsx (already wired by GxThemeProvider)
<GxThemeProvider>
  <App />
</GxThemeProvider>
```

You do **not** need to set `fontFamily` in individual components. If you're inside a `styled()` that resets inherited styles, import `FONT_FAMILY` from `@/constants` and apply it explicitly.

## Web type scale — why it's compressed

The canonical scale lives in `tokens.md` § 4. The web ladder is intentionally compressed relative to the slide ladder (see `../../groundx-slides/references/typography-slides.md`) — display sizes on a 1920×1080 canvas that's 10 feet away want 64–112px headlines; a dashboard viewed at arm's length does not. H1 caps at 40px, and subhead tiers sit close to body size so hierarchy comes from **weight**, not giant size jumps — consistent with brand principle #6.

H6 is deliberately the same pixel size as body (16px / `FONT_SIZE_H6` = `FONT_SIZE_BODY`) — it's a "heading at body size", differentiated by its 700 weight (`FONT_WEIGHT_HEADLINE`). Reach for this pattern when a card's title needs to announce itself without dominating the content beneath it.

## MUI `<Typography>` variants

Prefer `<Typography variant="…">` over raw `<h1>` / `<p>` for in-app text, because:

- The theme maps variants to the right size / weight / line-height / letter-spacing automatically.
- Variant changes (e.g., bumping the h2 weight) propagate without a global find-and-replace.

Variant → role mapping (all values baked into `templates/theme.ts`, which pulls from `FONT_SIZE_*`, `FONT_WEIGHT_*`, `LINE_HEIGHT_*`, `LETTER_SPACING_*` constants):

| MUI variant | Role |
| --- | --- |
| `variant="h1"` | Display heading (rare in-app marketing moment) |
| `variant="h2"` | Page heading — dashboard route title |
| `variant="h3"` | Section heading — top of a major card or region |
| `variant="h4"` | Subsection |
| `variant="h5"` | Card heading |
| `variant="h6"` | Card subhead (heading at body size) |
| `variant="body1"` | Default body / reading size |
| `variant="body2"` | Body-sm — secondary paragraphs, table rows |
| `variant="caption"` | Metadata — timestamps, row counts, inline help |
| `variant="overline"` | Uppercase label / eyebrow |
| `variant="button"` | Button label (or the button component itself) |

For the actual rem / weight / letter-spacing numbers behind each variant, see `tokens.md` § 4. The dashboard's convention is to reach for `variant="body1"` + a `fontWeight` override liberally, rather than ginning up custom variants. That's fine — just don't hardcode pixel sizes.

## Weight overrides

Use `fontWeight` prop on `<Typography>` or in `sx` — but pass a named constant, not a literal:

```tsx
import { FONT_WEIGHT_LABEL } from "@/constants";

<Typography variant="body1" fontWeight={FONT_WEIGHT_LABEL}>Important label</Typography>
<Box sx={{ fontWeight: FONT_WEIGHT_LABEL }}>Label</Box>
```

Allowed weights: `FONT_WEIGHT_BODY` (400) / `FONT_WEIGHT_LABEL` (600) / `FONT_WEIGHT_HEADLINE` (700) / `FONT_WEIGHT_DISPLAY` (800). The ladder is narrow on purpose — 500 reads indecisive, 900 is retired. `FONT_WEIGHT_DISPLAY` is reserved for cover headlines and display-stat numerals, not general UI. See `tokens.md` § 2.2 for the full ladder and rationale.

## Uppercase labels (reminder)

Section labels like "TUTORIAL", "CONTENT", "YOUR BUCKETS" are **literal uppercase strings** in JSX:

```tsx
<Typography variant="overline">TUTORIAL</Typography>                                    // ✓
<Typography variant="overline" sx={{ textTransform: "uppercase" }}>tutorial</Typography>  // ✗
```

See the standards skill's `typography.md` for why. The `overline` variant gives you the right size + weight + letter-spacing, but does **not** `text-transform` the content — you write the string uppercase.

**Exception**: `CommonSubmitButton` uppercases its label internally by default (via its component code). That's a component decision, not a styling one — you pass the button a mixed-case label and trust the component.

## Italic

Inter ships italic styles, but the brand does not use them. Don't use `<i>`, `<em>` with italic styling, `font-style: italic`, or `sx={{ fontStyle: "italic" }}`. For inline emphasis, use a weight bump (`FONT_WEIGHT_BODY` → `FONT_WEIGHT_LABEL`) or a color change.

## Font-smoothing

The theme's `MuiCssBaseline` override sets `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` globally. Don't override these per-component. If Inter is looking chunky on a particular screen, the fix is the weight choice, not the smoothing.

## Letter-spacing

Uppercase labels need tracking. The theme's `overline` variant includes `LETTER_SPACING_LABEL` (0.12em). If you're applying uppercase outside `<Typography variant="overline">`, add `letterSpacing: LETTER_SPACING_LABEL` manually via sx.

Button labels use tighter tracking (`LETTER_SPACING_BUTTON`, 0.04em). Legacy chip / pill chrome uses `LETTER_SPACING_CHIP` (0.5px), kept for continuity with the existing UI.

## Line height

The theme sets per-variant line-heights from the `LINE_HEIGHT_*` ladder in `constants.generated.ts` (auto-generated from `tokens.json`, mirrored from `tokens.md` § 2.5) — body1 uses `LINE_HEIGHT_BODY`, body2/caption use `LINE_HEIGHT_TIGHT_BODY`, headings tighten as the size grows. If a paragraph feels too tight or too loose, adjust at the component level with a named constant (`sx={{ lineHeight: LINE_HEIGHT_BODY }}`) rather than mutating the theme.

## Don'ts

- **Don't set `fontFamily` in components.** It's inherited from `<body>`.
- **Don't hardcode `fontSize: "14px"`** or `fontSize: "0.875rem"`. Use a `<Typography variant>` or import `FONT_SIZE_BODY_SM`.
- **Don't hardcode weights, letter-spacing, or line-heights.** Use the `FONT_WEIGHT_*`, `LETTER_SPACING_*`, `LINE_HEIGHT_*` constants.
- **Don't use `text-transform: uppercase`** for section labels.
- **Don't use weight 500 or 900.** The ladder is 400 / 600 / 700 / 800.
- **Don't introduce a second typeface** (no serif pairing, no "code font" swap for body — monospace is fine for actual code blocks).
- **Don't force italic.**
- **Don't override `font-smoothing`** per-component.

## Further reading

- `../../groundx-design-standards/references/tokens.md` § 2, § 4 — canonical size / weight / letter-spacing / line-height values.
- `../../groundx-design-standards/references/typography.md` — brand-level type rules and hierarchy.
- `templates/constants.ts` — the barrel that re-exports `constants.generated.ts` (auto-generated brand tokens), `constants.chrome.ts` (hand-written dashboard chrome), and `constants.legacy.ts` (deprecated aliases). Components import every named constant from `@/constants`.
- `templates/fonts.css` — the actual `@font-face` declarations.
- `templates/theme.ts` — where the MUI variants wire the constants into the theme.
