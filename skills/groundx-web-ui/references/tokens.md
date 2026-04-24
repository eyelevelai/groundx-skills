# Design Tokens (TypeScript)

Every value in the GroundX UI — colors, radii, spacing, breakpoints, typography — comes from a token you import from `@/constants` (the barrel that re-exports `constants.generated.ts`, `constants.chrome.ts`, and `constants.legacy.ts`). Never write a hex literal, a hardcoded px radius, a magic-number media query, or a font-size literal in a component file. If a value doesn't exist yet as a constant, add it upstream (see "Editing workflow" below) — don't invent a local one.

**Brand-level tokens (colors, typography, radii, slide dimensions, logo filenames) live in the standards skill as `tokens.json` (machine-readable source of truth) plus `references/tokens.md` (human-readable narrative).** A codegen script reads `tokens.json` and writes `templates/constants.generated.ts`. The brand-level hex values, weight numbers, sizes, radii, letter-spacings, and line-heights you see in `constants.generated.ts` are produced by that script — do not edit them by hand. When a new brand-level color, weight, or size is needed, add it to `tokens.json` and `tokens.md` first, then re-run the generator.

> **Canonical tokens:** `tokens.json` (machine) and `../../groundx-design-standards/references/tokens.md` (narrative). When in doubt, those files win.

## File layout of the mirror

| File | Edit by hand? | Contents |
| --- | --- | --- |
| `templates/constants.ts` | No (barrel — just re-exports) | `export * from "./constants.generated"; export * from "./constants.chrome"; export * from "./constants.legacy";` |
| `templates/constants.generated.ts` | **No** (auto-generated) | Every brand token (colors, typography, web size scale, radii, spacing, durations). Header declares the file AUTO-GENERATED. |
| `templates/constants.chrome.ts` | Yes | Dashboard-only chrome (`drawerWidth`, `NAV_ICON_GREY`, `DISABLED_GREY`, `ROW_SELECTED_BG`, `WARNING_AMBER`, premium-button gradient, `TRANSPARENT`). Not part of the brand palette. |
| `templates/constants.legacy.ts` | Yes (to remove aliases) | Deprecated names kept for back-compat. Each entry re-exports a canonical token under its old name. |

## What the generated mirror includes

The auto-generated constants fall into these groups. For the actual values, see the sections of `tokens.md` cited below — the numbers are not repeated here, and they flow from `tokens.json`.

| Group | tokens.md section | Example constants |
| --- | --- | --- |
| Brand colors | § 1.1 | `NAVY`, `GREEN`, `CYAN`, `TINT`, `CORAL`, `BODY_TEXT`, `GRAY`, `WHITE`, `BORDER` |
| Support colors | § 1.2 | `ERROR_RED`, `LIGHTER_RED`, `BLUE`, `DARK_GREY` |
| Font family / features | § 2.1 | `FONT_FAMILY`, `FONT_FEATURE_SETTINGS` |
| Weight ladder (400 / 600 / 700 / 800) | § 2.2 | `FONT_WEIGHT_BODY`, `FONT_WEIGHT_LABEL`, `FONT_WEIGHT_HEADLINE`, `FONT_WEIGHT_DISPLAY` |
| Letter-spacing tiers | § 2.3 | `LETTER_SPACING_LABEL`, `LETTER_SPACING_BUTTON`, `LETTER_SPACING_CHIP`, `LETTER_SPACING_DISPLAY_TIGHT`, `LETTER_SPACING_HEADING_TIGHT` |
| Line-height tiers | § 2.5 | `LINE_HEIGHT_DISPLAY`, `LINE_HEIGHT_HEADING`, `LINE_HEIGHT_SECTION`, `LINE_HEIGHT_SUBSECTION`, `LINE_HEIGHT_CARD_HEADING`, `LINE_HEIGHT_CARD_SUBHEAD`, `LINE_HEIGHT_TIGHT_BODY`, `LINE_HEIGHT_BODY` |
| Web size scale | § 4 | `FONT_SIZE_H1` … `FONT_SIZE_H6`, `FONT_SIZE_BODY`, `FONT_SIZE_BODY_SM`, `FONT_SIZE_CAPTION`, `FONT_SIZE_LABEL`, `FONT_SIZE_LABEL_DENSE` |
| Border radii | § 5 | `BORDER_RADIUS_SM`, `BORDER_RADIUS`, `BORDER_RADIUS_2X`, `BORDER_RADIUS_CARD`, `BORDER_RADIUS_PILL` |

Every `export` in `constants.generated.ts` carries a JSDoc comment with the px equivalent and a short role description, so the file is readable on its own even though it's machine-produced.

## Web-only chrome (not part of the brand palette)

A handful of values are scoped to the dashboard and live in `constants.chrome.ts` — **not** in `tokens.json`, because they have no equivalent on slides or other mediums:

- `NAV_ICON_GREY` (`#5a5a5b`) — sidebar icons for non-current routes.
- `DISABLED_GREY` (`#e8eaee`) — inert table chips, disabled-input backgrounds.
- `ROW_SELECTED_BG` (`rgba(79, 53, 197, 0.1)`) — selected-row highlight in tables.
- `WARNING_AMBER` (`#ffb45c`) — in-progress pill fill (used by `GxPill` warning variant).
- `drawerWidth` (`270`) — sidebar width.
- `TRANSPARENT`, `PREMIUM_GRADIENT_FROM`, `PREMIUM_GRADIENT_TO`.

If a measurement is only meaningful in the dashboard chrome, it belongs in `constants.chrome.ts`, not in `tokens.json`.

## Rules of thumb

- **Primary CTA is `GREEN`.** If you reach for `CORAL` on a submit button, stop — Coral is for eyebrows and highlight accents. See `buttons.md`.
- **Text defaults.** Body is `BODY_TEXT`; headings are `NAVY`; muted labels are `DARK_GREY`. Never `#000`.
- **Border rule.** Cards use `1px solid BORDER` (the 10%-navy hairline). Never `2px`, never `#d9d9d9` (retired).

## Legacy aliases (deprecated — do not use in new code)

The old palette is kept as aliases in `constants.legacy.ts` (re-exported through the `constants.ts` barrel) so existing call sites keep compiling. Each legacy name is a thin re-export of a canonical token from `constants.generated.ts`, tagged `@deprecated` in its JSDoc. New code uses the canonical names above. If you find a file still referencing an old name, migrate it as a side effect of any edit you make to that file.

| Old name | Maps to |
| --- | --- |
| `CORAL_ORANGE` | `CORAL` |
| `MAIN_BLACK` | `NAVY` |
| `MAIN_BACKGROUND` | `TINT` |
| `LIGHT_GREY` | `GRAY` |
| `LIGHT_GREY_2` | `BORDER` |
| `MEDIUM_GREY` | `BODY_TEXT` |
| `PALE_AQUA` | `CYAN` |
| `LIGHT_PALE_AQUA` | `TINT` |
| `ACTIVE_GREEN` | `GREEN` |
| `LIGHTER_SHADE_OF_RED` | `LIGHTER_RED` |
| `BORDER_RADIUS_3X` | `BORDER_RADIUS_CARD` |
| `BORDER_RADIUS_4X` | `BORDER_RADIUS_PILL` |
| `CARD_BORDER_RADIUS` | pass `BORDER_RADIUS_CARD` directly |

See `../../groundx-design-standards/references/tokens.md` § 1 for why each retirement happened (webflow alignment).

## Spacing

Spacing uses MUI's `theme.spacing()` helper where 1 unit = 8px. Named constants:

| Token | Value | Px | Use |
| --- | --- | --- | --- |
| `PADDING` | `2` | 16 | Default inner padding on `GxCard` and most surfaces. |
| `MAIN_CONTENT_PADDING` | `5` | 40 | Outer padding on the main content pane (desktop). |
| `MAIN_CONTENT_TOP_MARGIN` | `7` | 56 | Top margin on main content to clear the fixed AppBar. |

For ad-hoc spacing, use `theme.spacing()` / the `sx` numeric shorthand (`{ p: 2, mt: 3 }`) — never hardcoded px.

## Breakpoints

The theme customizes `md` from MUI's default 900 → **1100**. This is the primary breakpoint at which the sidebar collapses and bucket cards stack.

| Token | Min width |
| --- | --- |
| `xs` | 0 |
| `sm` | 600 |
| `md` | **1100** |
| `lg` | 1200 |
| `xl` | 1536 |

Always use `theme.breakpoints.up('md')` / `theme.breakpoints.down('md')` rather than hardcoded `@media (max-width: Xpx)`. If you need a breakpoint the theme doesn't define, add it to the theme rather than hardcoding.

## Other web-only measurements

| Token | Value | Use |
| --- | --- | --- |
| `drawerWidth` | `270` | Full-width sidebar on desktop. Collapsed states are `64`, `40`, and `drawerWidth - 80 = 190`. |
| `MESSAGE_BAR_DURATION` | `20000` | Auto-dismiss ms for toast/message bar. |

If a measurement is only meaningful in the dashboard chrome (sidebar width, toast duration), it lives here — not in the design-standards `tokens.md`. The design-standards file is brand-wide; this file is web-specific.

## Editing workflow

1. **Brand-level value changed** (e.g., Navy hex, a new size in the ladder): edit `../../groundx-design-standards/tokens.json` (machine source of truth) and `../../groundx-design-standards/references/tokens.md` (narrative) first, then run `node ../../groundx-design-standards/scripts/generate-mirrors.mjs` to re-emit `constants.generated.ts`. Never hand-edit `constants.generated.ts` — the generator will overwrite your changes on the next run.
2. **Web-only chrome value changed** (e.g., sidebar width, a new warning color scoped to the dashboard): edit `constants.chrome.ts` directly; no brand-wide update required and no generator run needed.
3. **Deprecation / rename** (old token → new token): add the old name to `constants.legacy.ts` as a re-export of the new canonical token, tagged `@deprecated`. Keep it exported through the barrel (`constants.ts`) so call sites keep compiling while migrations land.
4. **New consumer pattern** (e.g., a new card variant): use existing tokens. If the pattern needs a value that doesn't exist yet, go through step 1 first — don't mint ad-hoc literals in a component.
5. **Verify the mirror is in sync.** Run `node ../../groundx-design-standards/scripts/verify-mirrors.mjs` — it regenerates `constants.generated.ts` in memory and diffs against the file on disk, exiting non-zero if they drift. CI runs this on every PR.
