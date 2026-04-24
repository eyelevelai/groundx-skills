---
name: groundx-web-ui
description: Use this skill whenever writing, generating, or modifying front-end UI code for the GroundX dashboard — or any React / MUI / TypeScript interface that should match GroundX's look and feel. GroundX is a Valantor company product; its brand lives in the `groundx-design-standards` skill, which this skill translates into MUI tokens and components. Triggers on tasks that build pages, components, forms, modals, buttons, cards, tables, empty states, or any visible web UI, AND on requests to review or correct existing UI for brand consistency. Also triggers on keywords like "GroundX dashboard", "bucket", "ingest", "X-RAY", "CORAL", "GREEN primary CTA", "NAVY", "Inter", when the user references MUI (`@mui/material`), Emotion (`sx` / `styled()`), the repo at `groundx-ai-dashboard`, or files like `theme.ts`, `constants.ts`, `CommonSubmitButton`, `GxCard`. If the user asks for "a React component", "a form", "a page", "a modal", a "dashboard screen", or anything visual and doesn't name a different design system, default to this skill — matching GroundX's style is almost always the right answer. This skill depends on `groundx-design-standards` for brand invariants (palette, typography, logos). Do NOT use for HTML→PDF slides — use `groundx-slides` instead. Do NOT use for backend-only code, data pipeline work, or pure CLI tools with no UI.
---

# GroundX Web UI

This skill makes any UI you generate drop-in compatible with the GroundX dashboard — a TypeScript + React + MUI v5 app using Emotion (`sx` / `styled()`) with a custom theme, the Inter webfont (via Google Fonts), and a small set of branded wrappers around MUI primitives.

**Your job:** produce code that looks indistinguishable from the existing dashboard, using the theme tokens and canonical components in this skill. When the existing codebase has drift from these standards, the canonical answer is whichever *this skill* prescribes — see `references/corrections.md`.

## First read the standards

**Before generating any visible code, read `../groundx-design-standards/SKILL.md`** (plus any of its references you need). That skill is the source of truth for:

- The palette (hex values, semantic roles, which pairings are allowed)
- Typography (Inter, weight scale, the ALL-CAPS-as-literal rule)
- Logos (which of the 4 files to use where)
- Brand principles (flat surfaces, green primary CTA + coral accent, navy not black)

This skill translates those invariants into MUI theme tokens, TypeScript constants, and React components. If you find a conflict between this skill and the standards skill, the standards skill wins — open a correction in this skill rather than diverging.

## Brand at a glance (web framing)

The standards skill has the full brand tour. The one-paragraph web version:

Green `#a1ec83` (`GREEN`) is the primary CTA fill — submit buttons, success chips, the hover-go-state. Coral `#f3663f` (`CORAL`) is the secondary highlight accent — eyebrows, labels, occasional alt-CTA. Body text is `#40496b` (`BODY_TEXT`); headings are navy `#29335c` (`NAVY`) — never true black. Section canvases use White, Gray `#f2f4f5`, Tint `#eff9fb`, Cyan `#c1e8ee`, Green, or Navy; cards on top are white with a `1px solid rgba(41, 51, 92, 0.1)` (`BORDER`) hairline and `20px` border-radius (`BORDER_RADIUS_CARD`). Buttons and pills use `200px` radius (`BORDER_RADIUS_PILL`) — the full-pill shape. No drop shadows, no elevation. Inter is applied at `<body>` via `MuiCssBaseline`; weight ladder is 400 / 600 / 700 / 800. The primary breakpoint is `md = 1100px` — bumped from MUI's default 900 because that's where the sidebar collapses and bucket cards stack.

## What to read before writing code

Always skim `references/tokens.md` and `references/corrections.md` — they're short and they'll keep you from writing non-canonical code. Then pull additional references based on what you're building.

Decision tree:

```
Generating a new page or screen
├── Need the overall shell (sidebar + appbar + content)?  → references/layout.md
├── Arranging cards, section headers, responsive stacking? → references/surfaces-and-cards.md + references/responsive.md
├── Want a worked example to pattern-match against?        → examples/ExampleDashboardPage.tsx
                                                              examples/ExampleBucketDetailPage.tsx

Building a form or modal
├── Which button should this be?                           → references/buttons.md
├── Full modal pattern (Formik + Yup + dialog chrome)      → examples/ExampleFormModal.tsx

Choosing a component
├── Is there already a Gx* or Common* wrapper for this?    → references/components.md
├── Button of any kind?                                    → references/buttons.md
├── Card, surface, divider, modal panel?                   → references/surfaces-and-cards.md
├── Status pill / badge?                                   → GxPill (references/buttons.md > Status indicator)
└── Empty state / drag-drop zone?                          → examples/ExampleEmptyState.tsx

MUI icons, custom SVGs, icon sizing (web-specific)        → references/icons.md

Typography / font application on web                        → references/typography.md  (brand rules live in standards skill)

Logos                                                       → ../groundx-design-standards/references/logos.md

Fixing or reviewing existing code that looks off           → references/corrections.md (the 10 documented drifts)
```

Don't read every reference up front. Read the one that matches the question, then write the code.

## How to use the templates

The `templates/` directory contains drop-in files that can replace (or install alongside) their counterparts in the dashboard repo:

- `templates/constants.ts` — a thin barrel that re-exports everything from `constants.generated.ts` (brand tokens, auto-generated from `../../groundx-design-standards/tokens.json`), `constants.chrome.ts` (hand-written dashboard-shell tokens — `drawerWidth`, `NAV_ICON_GREY`, `DISABLED_GREY`, `ROW_SELECTED_BG`, `WARNING_AMBER`, the premium-button gradient), and `constants.legacy.ts` (deprecated aliases — `CORAL_ORANGE`, `MAIN_BLACK`, `BORDER_RADIUS_3X`, etc.). Copy the whole set to `src/constants/` so `import { NAVY, PADDING, drawerWidth } from "@/constants"` keeps working. Never hand-edit `constants.generated.ts` — regenerate via the standards-skill script instead.
- `templates/theme.ts` — the corrected MUI theme. Copy to `src/theme.ts`. Fixes `palette.primary.main` (was an unused blue — now `GREEN`), applies `FONT_FAMILY` at `<body>` via `MuiCssBaseline`, sets `disableElevation: true` on buttons by default, sets `palette.divider = BORDER`.
- `templates/fonts.css` — `@import` of Inter from Google Fonts plus the body-level `font-family` and OpenType feature settings (`ss01`, `cv11`, `cv01`).
- `templates/ThemeProvider.tsx` — `GxThemeProvider` that wires the theme + `CssBaseline` + fonts.
- `templates/components/*.tsx` — canonical versions of `GxCard`, `GxPill`, `GxSectionHeader`, `GxButtonGroup`, `GxUsageCard` (new), plus corrected rewrites of `CommonSubmitButton`, `CommonCancelButton`, `CommonTextField`.

For a **new component you're building now**, import from the dashboard's existing paths as if these templates were already installed:

```tsx
import { CORAL, BORDER, BORDER_RADIUS_CARD, PADDING } from "@/constants";
import GxCard from "@/shared/components/GxCard";
import GxPill from "@/shared/components/GxPill";
import CommonSubmitButton from "@/shared/components/CommonSubmitButton";
```

If an import points to a component that doesn't exist in the repo yet, note that it needs to be copied from `templates/components/` in your response.

## The rules, distilled

These appear in more than one reference. Internalize them:

1. **No hex literals in component files.** Every color comes from a named token imported from `@/constants` (the barrel). If you need a new brand color, add it to the standards skill's `tokens.json` and `references/tokens.md` first, then re-run `groundx-design-standards/scripts/generate-mirrors.mjs` — it will appear as a new export in `constants.generated.ts`. Dashboard-only chrome colors that aren't part of the brand palette go in `constants.chrome.ts` directly.
2. **No hardcoded px breakpoints.** Use `theme.breakpoints.*` or sx responsive object syntax (`sx={{ p: { xs: 1, md: 5 } }}`).
3. **No `boxShadow` on surfaces.** Flat is the style. If a surface needs emphasis, change its background.
4. **No MUI `<Card>`.** Use `GxCard`. The existing codebase mixes them — replace `<Card>` when you see it.
5. **No raw `<Button>` for primary actions.** Use `CommonSubmitButton`. For segmented navigation, `GxButtonGroup`. For status labels, `GxPill` (not a button).
6. **No hardcoded `fontSize: "16px"` on icons.** Use MUI size tokens: `small | medium | large`.
7. **No literal UPPERCASE hacks via `textTransform`.** Section labels are literal uppercase strings in JSX; buttons follow the per-component rule in `references/corrections.md > 6`.
8. **Every interactive icon gets `aria-label`.** Decorative icons inside a labeled button get `aria-hidden="true"`.

## Pre-return checklist

Before you return generated code to the user, quickly verify:

- [ ] Every color is a named constant imported from `@/constants`. No `#` characters in your JSX or sx blocks.
- [ ] Every radius is a token (`BORDER_RADIUS_SM`, `BORDER_RADIUS`, `BORDER_RADIUS_2X`, `BORDER_RADIUS_CARD`, or `BORDER_RADIUS_PILL`).
- [ ] Every breakpoint is `theme.breakpoints.*` or sx responsive syntax. No `@media (max-width: Xpx)` strings.
- [ ] Buttons use the right wrapper: `CommonSubmitButton` / `CommonCancelButton` / `GxButtonGroup` / `GxPill` — see `references/buttons.md` decision tree.
- [ ] Cards use `GxCard`, not MUI `<Card>` or inline `<Box sx={{ border, borderRadius, … }}>`.
- [ ] Text doesn't set `fontFamily` explicitly unless it's inside a `styled()` that resets inherited styles. Everything inherits Inter from `<body>`.
- [ ] Icons use `fontSize="small|medium|large"`, never a px value.
- [ ] Interactive icons have `aria-label`; decorative icons have `aria-hidden="true"`.
- [ ] No `boxShadow`, no `elevation` prop, no gradient backgrounds (unless it's the `gx-premium-button` variant).
- [ ] Responsive behavior at `xs`, `md`, `lg` is sensible — the sidebar collapses at `md`, content padding drops to 16px below `md`.
- [ ] If you introduced a new component, it has `aria-*` labels where appropriate and doesn't reintroduce a pattern listed in `references/corrections.md`.
- [ ] If the work touches branding (logo placement, color choices, new type styles), it conforms to the standards skill — no local overrides.

## Skill directory map

```
groundx-web-ui/
├── SKILL.md                        ← you are here
├── references/
│   ├── tokens.md                   ← TypeScript design tokens (mirrors standards/colors.md)
│   ├── typography.md               ← web-specific font application (inherits from standards)
│   ├── layout.md                   ← sidebar + appbar + content shell
│   ├── surfaces-and-cards.md       ← the canonical GxCard pattern
│   ├── buttons.md                  ← decision tree for which button variant
│   ├── components.md               ← component inventory (new + rewrites + reuse)
│   ├── responsive.md               ← breakpoint usage, mobile patterns
│   ├── icons.md                    ← MUI icons, custom SVGs, icon sizing
│   └── corrections.md              ← 10 documented inconsistencies and their fixes
├── templates/
│   ├── constants.ts                ← barrel: re-exports generated + chrome + legacy
│   ├── constants.generated.ts      ← AUTO-GENERATED brand tokens from tokens.json
│   ├── constants.chrome.ts         ← hand-written dashboard chrome (drawerWidth, NAV_ICON_GREY, etc.)
│   ├── constants.legacy.ts         ← deprecated aliases (CORAL_ORANGE, MAIN_BLACK, etc.)
│   ├── theme.ts                    ← drop-in src/theme.ts
│   ├── fonts.css                   ← Inter @import from Google Fonts + body font rules
│   ├── ThemeProvider.tsx           ← GxThemeProvider wrapper
│   └── components/                 ← 5 new Gx* + 3 corrected Common* components
├── examples/                       ← 4 worked pages (dashboard, bucket detail, form modal, empty state)
└── evals/evals.json                ← 3 test prompts + file sanity checks
```

Logos are not duplicated here — reference them from `../groundx-design-standards/assets/logos/`.

## When in doubt

When you can't decide between two approaches, the one that results in **fewer tokens crossed into the component** and **more configuration up in the theme** is almost always correct. GroundX's visual system is calm and opinionated — aim for component files that read like plain structural JSX, with styling coming from theme overrides, sx tokens, and the Gx* wrappers.

If a pattern truly doesn't exist yet, add it to the theme or to `templates/components/` (in your response) and reference that addition — don't open-code it in a one-off sx block. If the missing pattern is a brand-level decision (a new color, a new weight), add it to the standards skill first.
