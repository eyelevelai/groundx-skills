# Design Tokens (TypeScript)

Every value in the GroundX UI — colors, radii, spacing, breakpoints — comes from `templates/constants.ts`. Never write a hex literal, a hardcoded px radius, or a magic-number media query in a component file. If a value doesn't exist yet, add it to `constants.ts` with a semantic name and use it from there.

**The palette itself is defined in `../../groundx-design-standards/references/colors.md`.** This file is the TypeScript-specific mirror — same hex values, exported as named `const`s for the MUI theme and components to consume. When a new color is needed brand-wide, add it to the standards skill's `colors.md` first, then mirror the token into `constants.ts`.

## Colors

The palette is small and opinionated. Every UI color falls into one of these roles.

| Token | Hex | Role | Use when |
| --- | --- | --- | --- |
| `NAVY` | `#29335c` | Primary dark | Headings, links, sidebar bg, strong borders. The brand navy. |
| `GREEN` | `#a1ec83` | **Primary CTA / accent** | Primary buttons, success chips, hover-go-state, eyebrows on navy. This is the "go" color. |
| `CYAN` | `#c1e8ee` | Secondary accent | Icon-button bg, tag bg, cyan card fill. |
| `TINT` | `#eff9fb` | Quiet section bg | The pale cyan section wash; callouts; info panels. |
| `CORAL` | `#f3663f` | Label / highlight accent | Eyebrows on light surfaces, highlight pills, secondary (alt) CTA. **Not** the primary CTA — that's Green. |
| `BODY_TEXT` | `#40496b` | Default body color | Paragraphs, labels, captions. A slightly-warmer navy than `NAVY` — tuned for running text. |
| `GRAY` | `#f2f4f5` | Alt section bg / input fill | Input field fill, gray card fill, quiet list rows. |
| `WHITE` | `#ffffff` | Surface | Cards, inputs, table cells, modal backgrounds. |
| `BORDER` | `rgba(41, 51, 92, 0.1)` | Default hairline | The 1px border on every card and surface. Navy at 10%. |

Rules of thumb:

- **Primary CTA is `GREEN`.** If you reach for `CORAL` on a submit button, stop — Coral is for eyebrows and highlight accents. See `buttons.md`.
- **Text defaults.** Body is `BODY_TEXT`; headings are `NAVY`; muted labels are `DARK_GREY` (support palette). Never `#000`.
- **Border rule.** Cards use `1px solid BORDER` (the 10%-navy hairline). Never `2px`, never a solid light-grey like `#d9d9d9` (retired).

### Support palette

Used rarely, for specific states the primary palette can't cover.

| Token | Hex | Role |
| --- | --- | --- |
| `ERROR_RED` | `#f70d1a` | Destructive / failure. Ingest failures, delete confirmation. |
| `LIGHTER_RED` | `#ff7f7f` | Soft warning. Non-critical expiry / attention. |
| `BLUE` | `#0b99ff` | Inline link accent. Secondary links. Rare. |
| `DARK_GREY` | `#81879a` | Inactive chrome. Slide numbers, timestamps, disabled-ish states. |
| `NAV_ICON_GREY` | `#5a5a5b` | Inactive nav icon. Sidebar icons for non-current routes. |
| `DISABLED_GREY` | `#e8eaee` | Disabled surface. Inert table chips, disabled-input backgrounds. |
| `ROW_SELECTED_BG` | `rgba(79, 53, 197, 0.1)` | Table row selection highlight. |

### Legacy aliases (deprecated — do not use in new code)

The old palette is kept as aliases so existing call sites keep compiling. New code uses the names above.

| Old name | Maps to | Notes |
| --- | --- | --- |
| `CORAL_ORANGE` | `CORAL` | Old coral `#e26f4b` retired; use webflow `#f3663f`. |
| `MAIN_BLACK` | `NAVY` | Old navy `#2c3359` retired; use webflow `#29335c`. |
| `MAIN_BACKGROUND` | `TINT` | Old tint `#eef7f9` retired; use webflow `#eff9fb`. |
| `LIGHT_GREY_2` | `BORDER` | The old `#d9d9d9` solid border is deprecated; the new hairline is 10% navy. |
| `LIGHT_GREY` | `GRAY` | Old `#f5f5f5` retired; use webflow `#f2f4f5`. |
| `PALE_AQUA` | `CYAN` | Old cyan `#c8e7ed` retired; use webflow `#c1e8ee`. |
| `LIGHT_PALE_AQUA` | `TINT` | Merges into the new `TINT` token. |
| `ACTIVE_GREEN` | `GREEN` | Old green `#b1ea8f` retired; use webflow `#a1ec83`. |
| `MEDIUM_GREY` | `BODY_TEXT` | Use `BODY_TEXT` for paragraphs. |

If you find a file still referencing an old name, migrate it as a side effect of any edit you make to that file.

## Border Radii

Webflow's scale: `4 / 6 / 12 / 20 / 200`. Five values; everything the UI needs sits on one of them.

| Token | Value | Where it's used |
| --- | --- | --- |
| `BORDER_RADIUS_SM` | `4px` | Tight inner shapes — hairline divider wraps, inline chips. |
| `BORDER_RADIUS` | `6px` | Inner / nested surfaces — inside-table wrappers, inline code blocks, small inputs. |
| `BORDER_RADIUS_2X` | `12px` | Medium surfaces — dropdown menus, toast, form field containers. |
| `BORDER_RADIUS_CARD` | `20px` | **The default for top-level cards and accordions.** Use this unless you have a reason not to. |
| `BORDER_RADIUS_PILL` | `200px` | Buttons (primary + secondary), pills, tags, segmented button ends. The full-pill shape. |

Deprecated:

- `BORDER_RADIUS_3X` (18px) — retired. Cards are now 20px. Alias points to `BORDER_RADIUS_CARD`.
- `BORDER_RADIUS_4X` (24px) — retired. Standalone pill CTAs are now `BORDER_RADIUS_PILL` (200px, i.e., fully rounded). Alias points there.
- `CARD_BORDER_RADIUS` (12px as a spacing unit) — retired. Pass `BORDER_RADIUS_CARD` directly where a value is needed.

For status pills and tags, `BORDER_RADIUS_PILL` replaces the old `999` magic number.

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

## Typography constants

| Token | Value | Use |
| --- | --- | --- |
| `FONT_FAMILY` | `"THICCCBOI, sans-serif"` | Reference when setting font on raw `<span>`/`<div>` elements; `<Typography>` inherits it from the theme automatically. |

See `typography.md` for the full typography guide.

## Other measurements

| Token | Value | Use |
| --- | --- | --- |
| `drawerWidth` | `270` | Full-width sidebar on desktop. Collapsed states are `64`, `40`, and `drawerWidth - 80 = 190`. |
| `MESSAGE_BAR_DURATION` | `20000` | Auto-dismiss ms for toast/message bar. |
