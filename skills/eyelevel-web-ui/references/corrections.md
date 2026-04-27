# Canonical decisions — and the older patterns they replace

This file documents ten places where the EyeLevel web stack has a *single canonical answer* to a question that's commonly resolved differently — sometimes in older codebases (the GroundX dashboard's pre-template state is the recurring example, since it predates the wrapper layer), sometimes in habit, sometimes in copy-pasted MUI defaults. Each entry names the canonical answer, sketches the older / non-canonical pattern it supersedes, and points at the token / wrapper / theme decision that resolves it.

Read this when:

- You're starting a new project and want to understand the decisions baked into `templates/` (the rationale for `palette.primary.main = GREEN`, the wrapper-layer pattern, the `BORDER` divider treatment, etc.).
- You're editing existing code that uses one of the older patterns and want to know what to migrate to.
- A PR review surfaces a question of the form "why this and not that?" — the answer is usually here.

Each entry follows the same shape: **Canonical** describes the right answer (what `templates/` produces and what every project should use); **Older pattern** describes what the canonical answer supersedes, so you recognize it when you see it.

## 1. `primary.main` is green, not blue

**Canonical:** `palette.primary.main = GREEN` (set in `templates/theme.ts`). Primary CTA in the brand is green (see `../../eyelevel-design-standards/references/colors.md` § 1 "Primary CTA is Green, not Coral"), so a bare `<Button color="primary">` or `<Typography color="primary">` paints with the same green that `CommonSubmitButton` uses on its hover state.

**Older pattern:** `palette.primary.main = "#1976d2"` — MUI's default blue. Accidental `color="primary"` paints things blue and silently breaks the brand. If you find a project still on the MUI default, point its theme at `templates/theme.ts`.

If you see code that hard-codes `GREEN` where `color="primary"` or `theme.palette.primary.main` would work, simplify when you touch the file.

## 2. No hex literals in component files

**Canonical:** every color is a named constant imported from `@/constants`. Brand palette colors (`GREEN`, `CORAL`, `NAVY`, `BORDER`, `ERROR_RED`, etc.) live in `constants.generated.ts`, auto-generated from `../../eyelevel-design-standards/tokens.json`. Project-specific chrome colors (a dashboard's `DISABLED_GREY`, `NAV_ICON_GREY`, `ROW_SELECTED_BG`; a marketing site's might be different — or the file might be empty) live in `constants.chrome.ts`. Both files are re-exported through the `constants.ts` barrel.

**Older pattern:** raw hex literals in components — `#F70D1A`, `#E8EAEE`, `#5a5a5b`, `rgb(79 53 197 / 10%)` scattered through component sx blocks. The styles work but they're un-rebrand-able: a palette change has to chase every literal. If you catch yourself typing `#` in a component file, stop.

When adding a new color, decide first where it belongs: a brand-level color goes into `../../eyelevel-design-standards/tokens.json` (re-run `generate-mirrors.mjs` to emit `constants.generated.ts`); a project-specific chrome color goes straight into the project's `constants.chrome.ts`. Either way, it ends up exported through the barrel.

## 3. `GxCard`, not `<Card>` or inline `<Box sx={{…}}>`

**Canonical:** `GxCard` from `@/shared/components/` is the only way to make a card-shaped surface. The wrapper bakes in the white fill, hairline border, 20px radius, no shadow, and standard padding — change one thing in the wrapper and every card in every project updates at once.

**Older pattern:** mixed surface styling — some places use MUI `<Card>` (which carries elevation and `Paper` defaults you'd then have to undo), others use `<Box>` with a copy-pasted `sx` block repeating the border / radius / padding values. Either way, the inline version drifts as soon as someone tweaks one without the other. If you find this pattern in a file you're editing, replace it with `GxCard`.

## 4. `GxPill`, not `CommonSubmitButton` for status labels

**Canonical:** `GxPill` for non-interactive status labels (a file's processing state, an account's plan tier, a row's read/unread badge). `CommonSubmitButton` is for real actions only — clicking it does something.

**Older pattern:** a status pill rendered as a `CommonSubmitButton` styled into a non-interactive shape (the dashboard's `X-RAY` indicator on file rows is the canonical example). Semantically confusing — is it a button or a label? — and bad for screen readers, since the element announces as "button" but doesn't do anything.

## 5. Breakpoints use the theme, not hardcoded px

**Canonical:** `theme.breakpoints.up()` / `.down()` or sx's responsive object syntax (`sx={{ padding: { xs: 1, md: 5 } }}`). The theme defines `xs / sm / md / lg / xl` — and crucially `md = 1100` (bumped from MUI's default 900). If you need a threshold the theme doesn't define, add a new named breakpoint to the theme.

**Older pattern:** raw `@media (max-width: 799px)`, `@media (max-width: 1320px)`, and other arbitrary pixel thresholds in `sx` blocks. The 799px cases predate the `md` bump — they were clearly meant to be `md`. Arbitrary thresholds for one-off layouts (action rows, dense tables) should land as named breakpoints, not as inline pixel literals.

## 6. Button `textTransform` comes from intent, not coincidence

**Canonical:** uppercase decisions are explicit per component, not coincidental.

- `CommonSubmitButton` — uppercase by default; pass `isUppercase={false}` for sentence-case CTAs.
- `CommonCancelButton` — never uppercase.
- `gx-back-button` — never uppercase (`textTransform: "none"`).
- Section labels (TUTORIAL, CONTENT, FEATURES, PRICING) — **literal UPPERCASE strings** in JSX, no `textTransform`. This keeps translation pipelines honest and matches the brand's "ALL-CAPS is a shape, not a formatting rule" principle.

**Older pattern:** mixed `textTransform` rules across buttons and labels, plus props that don't actually affect rendering. If `CommonSubmitButton`'s `isUppercase={false}` doesn't downcase the label in your project, port the corrected wrapper from `templates/shared/components/CommonSubmitButton.tsx`.

## 7. Icon sizes use MUI tokens, not px

**Canonical:** always `fontSize="small" | "medium" | "large"` on icons. The size tokens map to consistent visual weights across the app.

**Older pattern:** mixed `fontSize="small"`, hardcoded `fontSize: "16px"`, `sx={{ fontSize: 20 }}`. If you need a specific size outside the three tokens, the icon is probably playing a different role — consider whether it should be an image, a hero graphic, or a custom SVG instead.

## 8. Inter is applied at `<body>`, not only at `<Typography>`

**Canonical:** theme's `MuiCssBaseline` override applies `fontFamily: FONT_FAMILY` to `body`, so every text node — `<Typography>`, raw `<span>`, `<div>`, `<td>` — inherits Inter unless explicitly overridden. `MuiTypography` retains the override as a belt-and-suspenders safeguard.

**Older pattern:** font-family applied only to `MuiTypography`, leaving raw `<span>` / `<div>` text falling back to the system default. Subtle but real inconsistencies appear in table cells, custom spans, and any text that isn't wrapped in `<Typography>`. (Historical note: the typeface used to be THICCCBOI before the Inter switch — see `../../eyelevel-design-standards/references/typography.md`.)

If you want to be explicit (e.g., inside a `styled()` that resets all inherited styles), import `FONT_FAMILY` from `@/constants` and apply it directly.

## 9. `disableElevation` is the default

**Canonical:** theme's `MuiButton.defaultProps` sets `disableElevation: true`. Buttons render flat by default — no inline `boxShadow: "none"` needed.

**Older pattern:** contained buttons emitting a box-shadow by default with an inline `boxShadow: "none"` override on every call site. Annoying boilerplate that any new contributor forgets.

## 10. Surfaces have one border treatment

**Canonical:** **all surfaces use `1px solid BORDER`** (`rgba(41, 51, 92, 0.1)`). The theme sets `palette.divider = BORDER` so `<Divider />` and any component that reads `theme.palette.divider` get the same color automatically.

**Older pattern:** some surfaces use `1px solid LIGHT_GREY_2`, others `2px solid`, others `borderBottom` only with the color set via inline `theme.palette.divider`. The inconsistency is usually invisible — until two surfaces sit next to each other and the border weights don't match.

## Summary table

| # | Older pattern | Canonical |
| --- | --- | --- |
| 1 | `primary.main = #1976d2` | `primary.main = GREEN` |
| 2 | Hex literals in components | Named constants imported from `@/constants` |
| 3 | `Card` and `Box` both used | `GxCard` only |
| 4 | Status pill rendered as a `CommonSubmitButton` | `GxPill` for non-interactive labels |
| 5 | `@media (max-width: Xpx)` | `theme.breakpoints` |
| 6 | Mixed `textTransform` | Codified per-component rules |
| 7 | Icon sizes mixed | MUI size tokens only |
| 8 | Font only on `<Typography>` | Font on `<body>` via `CssBaseline` |
| 9 | `boxShadow: "none"` everywhere | `disableElevation: true` on theme |
| 10 | Inconsistent border treatment | `1px solid BORDER` everywhere |
