# Corrections — inconsistencies to fix on sight

The dashboard codebase evolved organically, and there are patterns that drifted out of sync with each other. When writing or modifying UI code, the canonical answer is whichever one this skill prescribes — not whichever one happens to be in the file you're editing. If you see one of the below, fix it while you're there.

This doc captures the decisions baked into the templates and reference files. Read it when you want to understand *why* the canonical answer looks different from the existing code.

## 1. `primary.main` is green, not blue

**Was**: `palette.primary.main = "#1976d2"` — MUI's default blue, which wasn't referenced anywhere in the app but made any accidental `color="primary"` paint things blue.

**Is now**: `palette.primary.main = GREEN`. Primary CTA in the brand is green (see `../../groundx-design-standards/references/colors.md` § 1 "Primary CTA is Green, not Coral"), so a bare `<Button color="primary">` or `<Typography color="primary">` now paints with the same green `CommonSubmitButton` uses.

If you see code that hard-codes `GREEN` where `color="primary"` or `theme.palette.primary.main` would work, consider simplifying during your PR.

## 2. No hex literals in component files

**Was**: `#F70D1A`, `#E8EAEE`, `#5a5a5b`, `rgb(79 53 197 / 10%)`, and friends scattered through `IngestFileStatus`, `TopDrawerNavLinks`, `SelectedBucketTable`, and elsewhere.

**Is now**: all four of those values have named constants — `ERROR_RED` lives in `constants.generated.ts` (brand palette), while `DISABLED_GREY`, `NAV_ICON_GREY`, `ROW_SELECTED_BG` live in `constants.chrome.ts` (dashboard-only chrome). Both files are re-exported through the `constants.ts` barrel, so import from `@/constants`.

When adding a new color, decide first where it belongs: a brand-level color goes into `../../groundx-design-standards/tokens.json` (re-run the generator to emit `constants.generated.ts`); a dashboard-only chrome color goes straight into `constants.chrome.ts`. Either way, it ends up exported through the barrel. If you catch yourself typing `#` in a component file, stop.

## 3. `GxCard`, not `<Card>` or inline `<Box sx={{…}}>`

**Was**: surface styling was inconsistent — some places used `<Card>`, others used `<Box>` with a copy-pasted `sx` block repeating the border/radius/padding values.

**Is now**: `GxCard` is the only correct way to make a card-shaped surface. If you find `<Card>` in a file you're editing, replace it.

## 4. `GxPill`, not `CommonSubmitButton` for status labels

**Was**: the X-RAY "button" on file rows was actually a `CommonSubmitButton` styled into a non-interactive pill — semantically confusing (is it a button? is it a label?) and accessibility-unfriendly.

**Is now**: `GxPill` for non-interactive status labels. `CommonSubmitButton` is only for real actions.

## 5. Breakpoints use the theme, not hardcoded px

**Was**: `@media (max-width: 799px)`, `@media (max-width: 1320px)`, and other arbitrary pixel thresholds embedded in `sx` blocks.

**Is now**: always use `theme.breakpoints.up()` / `.down()` or sx's responsive object syntax (`sx={{ padding: { xs: 1, md: 5 } }}`). If you need a threshold the theme doesn't define, add a new named breakpoint to the theme — don't hardcode.

The 799px cases were clearly meant to be `md` (1100) — they pre-date the md bump. The 1320px case was for the action-row stacking on bucket detail; accept `lg` (1200) or add a new named breakpoint.

## 6. Button `textTransform` comes from intent, not coincidence

**Was**: `CommonSubmitButton`'s `isUppercase` prop didn't actually affect rendering — the button was always uppercase regardless of the prop value. Meanwhile `textTransform` was applied inconsistently across buttons and labels.

**Is now**:

- `CommonSubmitButton` — uppercase by default; pass `isUppercase={false}` for sentence-case CTAs.
- `CommonCancelButton` — never uppercase.
- `gx-back-button` — never uppercase (`textTransform: "none"`).
- Section labels (TUTORIAL, CONTENT) — **literal UPPERCASE strings** in JSX, no `textTransform`. This keeps translation pipelines honest.

## 7. Icon sizes use MUI tokens, not px

**Was**: a mix of `fontSize="small"`, `fontSize="medium"`, and hardcoded `fontSize: "16px"`, `sx={{ fontSize: 20 }}`.

**Is now**: always `fontSize="small" | "medium" | "large"`. If you need a specific size outside those tokens, the icon is probably playing a different role — consider if it should be an image or a hero graphic instead.

## 8. Inter is applied at `<body>`, not only at `<Typography>`

**Was**: theme override forced `fontFamily: "THICCCBOI"` on `MuiTypography` only. Raw `<span>`/`<div>` text fell back to the system default, causing subtle inconsistencies in table cells and custom spans. (The typeface itself has since changed to Inter — see the historical note in `../../groundx-design-standards/references/typography.md`.)

**Is now**: theme's `MuiCssBaseline` override applies `fontFamily: FONT_FAMILY` to `body`, so every text node inherits Inter unless explicitly overridden. `MuiTypography` retains the override as a belt-and-suspenders safeguard.

If you want to be explicit (e.g. inside a `styled()` that resets all inherited styles), import `FONT_FAMILY` from `@/constants` and apply it directly.

## 9. `disableElevation` is the default

**Was**: contained buttons emitted a box-shadow by default, which we'd then override inline to `boxShadow: "none"`.

**Is now**: theme's `MuiButton.defaultProps` sets `disableElevation: true`. You can stop writing `boxShadow: "none"` on buttons.

## 10. Surfaces have one border treatment

**Was**: some surfaces used `1px solid LIGHT_GREY_2`, others used `2px solid`, others used `borderBottom` only with the color set via inline `theme.palette.divider`.

**Is now**: **all surfaces use `1px solid BORDER`.** The theme sets `palette.divider = BORDER` so `<Divider />` and any component that reads `theme.palette.divider` get the same color.

## Summary table

| # | Was | Is now |
| --- | --- | --- |
| 1 | `primary.main = #1976d2` | `primary.main = GREEN` |
| 2 | Hex literals in components | Named constants imported from `@/constants` |
| 3 | `Card` and `Box` both used | `GxCard` only |
| 4 | X-RAY is a `CommonSubmitButton` | X-RAY is a `GxPill` |
| 5 | `@media (max-width: Xpx)` | `theme.breakpoints` |
| 6 | Mixed `textTransform` | Codified per-component rules |
| 7 | Icon sizes mixed | MUI size tokens only |
| 8 | Font only on `<Typography>` | Font on `<body>` via `CssBaseline` |
| 9 | `boxShadow: "none"` everywhere | `disableElevation: true` on theme |
| 10 | Inconsistent border treatment | `1px solid BORDER` everywhere |
