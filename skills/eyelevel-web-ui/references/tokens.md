# Design Tokens (TypeScript)

Every value in an EyeLevel UI — colors, radii, spacing, breakpoints, typography — comes from a token you import from `@/constants` (the barrel that re-exports `constants.generated.ts` and `constants.chrome.ts`). Never write a hex literal, a hardcoded px radius, a magic-number media query, or a font-size literal in a component file. If a value doesn't exist yet as a constant, add it upstream (see "Editing workflow" below) — don't invent a local one.

**Brand-level tokens (colors, typography, radii, slide dimensions, logo filenames) live in the standards skill as `tokens.json` (machine-readable source of truth) plus `references/tokens.md` (human-readable narrative).** A codegen script reads `tokens.json` and writes `templates/constants.generated.ts`. The brand-level hex values, weight numbers, sizes, radii, letter-spacings, and line-heights you see in `constants.generated.ts` are produced by that script — do not edit them by hand. When a new brand-level color, weight, or size is needed, add it to `tokens.json` and `tokens.md` first, then re-run the generator.

> **Canonical tokens:** `tokens.json` (machine) and `../../eyelevel-design-standards/references/tokens.md` (narrative). When in doubt, those files win.

## File layout of the mirror

| File | Edit by hand? | Contents |
| --- | --- | --- |
| `templates/constants.ts` | No (barrel — just re-exports) | `export * from "./constants.generated"; export * from "./constants.chrome";` |
| `templates/constants.generated.ts` | **No** (auto-generated) | Every brand token (colors, typography, web size scale, radii, spacing, durations). Header declares the file AUTO-GENERATED. |
| `templates/constants.chrome.ts` | Yes | Project-specific chrome — values that aren't part of the brand palette and don't belong in `tokens.json` because they only mean something inside one project. The dashboard's version holds `drawerWidth`, `NAV_ICON_GREY`, `DISABLED_GREY`, `ROW_SELECTED_BG`, `WARNING_AMBER`, the premium-button gradient, `TRANSPARENT`. A marketing site's version may hold different chrome (max content widths, footer column counts) — or may be empty. Each project owns its own. |

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

## Project-specific chrome (not part of the brand palette)

Values that only mean something inside one project — sidebar widths for an app shell, named greys for chrome states, premium-button gradients — live in `constants.chrome.ts` rather than in `tokens.json`. They have no equivalent on slides or other mediums and they may differ from project to project.

The dashboard's `constants.chrome.ts` ships these (illustrative — a different project's file may hold different chrome, or may be empty):

- `NAV_ICON_GREY` (`#5a5a5b`) — sidebar icons for non-current routes.
- `DISABLED_GREY` (`#e8eaee`) — inert table chips, disabled-input backgrounds.
- `ROW_SELECTED_BG` (`rgba(79, 53, 197, 0.1)`) — selected-row highlight in tables.
- `WARNING_AMBER` (`#ffb45c`) — in-progress pill fill (used by `GxPill` warning variant).
- `drawerWidth` (`270`) — app-shell sidebar width.
- `TRANSPARENT`, `PREMIUM_GRADIENT_FROM`, `PREMIUM_GRADIENT_TO`.

A marketing site's `constants.chrome.ts` might instead hold a `MAX_CONTENT_WIDTH` (the page's max-width), a `FOOTER_COLUMN_COUNT`, or nothing at all if the project's chrome lives entirely in inline `sx` against brand tokens. The rule is the same either way: if a value is only meaningful in this project, it belongs in `constants.chrome.ts`, not in `tokens.json`.

## Rules of thumb

- **Primary CTA is `GREEN`.** If you reach for `CORAL` on a submit button, stop — Coral is for eyebrows and highlight accents. See `buttons.md`.
- **Text defaults.** Body is `BODY_TEXT`; headings are `NAVY`; muted labels are `DARK_GREY`. Never `#000`.
- **Border rule.** Cards use `1px solid BORDER` (the 10%-navy hairline). Never `2px`, never `#d9d9d9` (retired).

## Spacing

Spacing uses MUI's `theme.spacing()` helper where 1 unit = 8px. Named constants:

| Token | Value | Px | Use |
| --- | --- | --- | --- |
| `PADDING` | `2` | 16 | Default inner padding on `GxCard` and most surfaces. |
| `MAIN_CONTENT_PADDING` | `5` | 40 | Outer padding on the main content pane (desktop). |
| `MAIN_CONTENT_TOP_MARGIN` | `7` | 56 | Top margin on main content to clear the fixed AppBar. |

For ad-hoc spacing, use `theme.spacing()` / the `sx` numeric shorthand (`{ p: 2, mt: 3 }`) — never hardcoded px.

## Breakpoints

The theme customizes `md` from MUI's default 900 → **1100**. Every EyeLevel project uses the same breakpoint definitions — `md` is the primary desktop threshold brand-wide. (The bump originated in the dashboard, where it's the threshold at which the app shell's sidebar collapses and in-page card grids stack, but it applies to every project so a `<HeroSection>` written for a marketing site drops into the dashboard without re-tuning.)

| Token | Min width |
| --- | --- |
| `xs` | 0 |
| `sm` | 600 |
| `md` | **1100** |
| `lg` | 1200 |
| `xl` | 1536 |

Always use `theme.breakpoints.up('md')` / `theme.breakpoints.down('md')` rather than hardcoded `@media (max-width: Xpx)`. If you need a breakpoint the theme doesn't define, add it to the theme rather than hardcoding.

## Other web-only measurements

These two are web-only but widely useful enough that they're imported through `@/constants` rather than scoped per-project. The dashboard ships both via `constants.chrome.ts`; another project ports whichever it needs.

| Token | Value | Use |
| --- | --- | --- |
| `drawerWidth` | `270` | App-shell sidebar width on desktop. Collapsed states are `64`, `40`, and `drawerWidth - 80 = 190`. Used by any project that builds an app shell; a marketing site won't import it. |
| `MESSAGE_BAR_DURATION` | `20000` | Auto-dismiss ms for toast/message bar. |

If a measurement is only meaningful inside one project's chrome, it lives in that project's `constants.chrome.ts` — not in the design-standards `tokens.md`. The design-standards file is brand-wide; the chrome file is project-scoped.

## Editing workflow

1. **Brand-level value changed** (e.g., Navy hex, a new size in the ladder): edit `../../eyelevel-design-standards/tokens.json` (machine source of truth) and `../../eyelevel-design-standards/references/tokens.md` (narrative) first, then run `node ../../eyelevel-design-standards/scripts/generate-mirrors.mjs` to re-emit `constants.generated.ts`. Never hand-edit `constants.generated.ts` — the generator will overwrite your changes on the next run.
2. **Web-only chrome value changed** (e.g., sidebar width, a new warning color scoped to the dashboard): edit `constants.chrome.ts` directly; no brand-wide update required and no generator run needed.
3. **New consumer pattern** (e.g., a new card variant): use existing tokens. If the pattern needs a value that doesn't exist yet, go through step 1 first — don't mint ad-hoc literals in a component.
4. **Verify the mirror is in sync.** Run `node ../../eyelevel-design-standards/scripts/verify-mirrors.mjs` — it regenerates `constants.generated.ts` in memory and diffs against the file on disk, exiting non-zero if they drift. CI runs this on every PR.
