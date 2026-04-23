# Typography (web)

**This document covers how to *apply* typography in the React + MUI codebase.** For the brand-level rules — which typeface, which weights exist, the ALL-CAPS-as-literal rule, type hierarchy — read `../../groundx-design-standards/references/typography.md` first. Don't duplicate those rules here.

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

## Web type scale

The web scale is intentionally compressed relative to the slide scale (see `../../groundx-slides/references/typography-slides.md`). Display sizes on a 1920×1080 canvas that's 10 feet away want 64–112px headlines; a dashboard viewed at arm's length does not. H1 caps at 40px, and subhead tiers sit close to body size so hierarchy comes from **weight**, not giant size jumps — consistent with brand principle #6.

Units are rem (root = 16px), px shown for reference. The progression is a clean ~1.2× modular ladder on the heading side (16 → 18 → 22 → 26 → 32 → 40).

| Role | Size | Weight | Line-height | Letter-spacing | Color |
| --- | --- | --- | --- | --- | --- |
| Display heading (H1) | `2.5rem` / 40px | 700 | 1.1 | −0.01em | `NAVY` |
| Page heading (H2) | `2rem` / 32px | 700 | 1.15 | −0.005em | `NAVY` |
| Section heading (H3) | `1.625rem` / 26px | 700 | 1.2 | 0 | `NAVY` |
| Subsection (H4) | `1.375rem` / 22px | 700 | 1.25 | 0 | `NAVY` |
| Card heading (H5) | `1.125rem` / 18px | 700 | 1.3 | 0 | `NAVY` |
| Card subhead (H6) | `1rem` / 16px | 700 | 1.4 | 0 | `NAVY` |
| **Body** | **`1rem` / 16px** | **400** | **1.6** | **0** | **`BODY_TEXT`** |
| Body-sm | `0.875rem` / 14px | 400 | 1.5 | 0 | `BODY_TEXT` |
| Metadata / caption | `0.8125rem` / 13px | 400 | 1.5 | 0 | `DARK_GREY` |
| **Uppercase label / eyebrow** | **`0.75rem` / 12px** | **700** | **1.2** | **0.12em** | Coral on light, Green on navy |
| Button label | `0.875rem` / 14px | 600 | 1 | 0.04em | (per variant) |

H6 is deliberately the same pixel size as body — it's a "heading at body size", differentiated by its 700 weight. This is the pattern to reach for when a card's title needs to announce itself without dominating the content beneath it.

## MUI `<Typography>` variants

Prefer `<Typography variant="…">` over raw `<h1>` / `<p>` for in-app text, because:

- The theme maps variants to the right weight and size.
- Variant changes (e.g., bumping the h2 weight) propagate without a global find-and-replace.

Mapping from the web scale above to MUI variants (all sizes baked into `templates/theme.ts`):

| Role | MUI variant | Size / weight |
| --- | --- | --- |
| Display heading | `variant="h1"` | 40px / 700 |
| Page heading | `variant="h2"` | 32px / 700 |
| Section heading | `variant="h3"` | 26px / 700 |
| Subsection | `variant="h4"` | 22px / 700 |
| Card heading | `variant="h5"` | 18px / 700 |
| Card subhead | `variant="h6"` | 16px / 700 |
| Body (default) | `variant="body1"` | 16px / 400 |
| Body-sm | `variant="body2"` | 14px / 400 |
| Metadata / caption | `variant="caption"` | 13px / 400 |
| Uppercase label / eyebrow | `variant="overline"` | 12px / 700 / 0.12em |
| Button label | `variant="button"` (or the button component itself) | 14px / 600 |

The dashboard's convention is to reach for `variant="body1"` + `fontWeight` override liberally, rather than ginning up custom variants. That's fine — just don't hardcode pixel sizes.

## Weight overrides

Use `fontWeight` prop on `<Typography>` or in `sx`:

```tsx
<Typography variant="body1" fontWeight={600}>Important label</Typography>
<Box sx={{ fontWeight: 600 }}>Label</Box>
```

Allowed weight values: **`400 | 600 | 700 | 800`**. The ladder is narrow on purpose — weight 500 reads indecisive between 400 and 600; weight 900 is retired from the system (see standards `typography.md` § "Weight ceiling is 800"). Weight 800 is reserved for cover headlines and display-stat numerals — not general UI text.

## Uppercase labels (reminder)

Section labels like "TUTORIAL", "CONTENT", "YOUR BUCKETS" are **literal uppercase strings** in JSX:

```tsx
<Typography variant="overline">TUTORIAL</Typography>                                    // ✓
<Typography variant="overline" sx={{ textTransform: "uppercase" }}>tutorial</Typography>  // ✗
```

See the standards skill's `typography.md` for why. The `overline` variant gives you the size + weight + letter-spacing (12px / 700 / 0.12em), but does **not** `text-transform` the content — you write the string uppercase.

**Exception**: `CommonSubmitButton` uppercases its label internally by default (via its component code). That's a component decision, not a styling one — you pass the button a mixed-case label and trust the component.

## Italic

Inter ships italic styles, but the brand does not use them. Don't use `<i>`, `<em>` with italic styling, `font-style: italic`, or `sx={{ fontStyle: "italic" }}`. For inline emphasis, use a weight bump (400 → 600) or color change.

## Font-smoothing

The theme's `MuiCssBaseline` override sets:

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Don't override these per-component. If Inter is looking chunky on a particular screen, the fix is the weight choice, not the smoothing.

## Letter-spacing for small uppercase labels

Small uppercase labels (12px / 0.75rem) need tracking. The theme's `overline` variant includes `letterSpacing: 0.12em`. If you're applying uppercase outside `<Typography variant="overline">`, add `letterSpacing: 0.12em` manually via sx.

Button labels (14px uppercase) use tighter tracking: `letterSpacing: 0.04em`.

## Line height

The theme's defaults:

- `body1`: `lineHeight: 1.6` (web is looser than slides — see why in standards `typography.md`)
- `body2`, `caption`: `lineHeight: 1.5`
- Headings: `lineHeight: 1.2–1.3`

If a paragraph feels too tight or too loose, adjust at the component level with `sx={{ lineHeight: 1.7 }}` rather than mutating the theme.

## Don'ts

- **Don't set `fontFamily` in components.** It's inherited from `<body>`.
- **Don't hardcode `fontSize: "14px"`.** Use a `<Typography variant>` or `theme.typography.fontSize` + rem offsets.
- **Don't use `text-transform: uppercase`** for section labels.
- **Don't use weight 500 or 900.** The ladder is 400 / 600 / 700 / 800.
- **Don't introduce a second typeface** (no serif pairing, no "code font" swap for body — monospace is fine for actual code blocks).
- **Don't force italic.**
- **Don't override `font-smoothing`** per-component.

## Further reading

- `../../groundx-design-standards/references/typography.md` — brand-level type rules and hierarchy.
- `templates/fonts.css` — the actual `@font-face` declarations.
- `templates/theme.ts` — the `MuiCssBaseline` override that applies `FONT_FAMILY` at body.
