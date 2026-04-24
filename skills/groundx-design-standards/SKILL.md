---
name: groundx-design-standards
description: The medium-agnostic source of truth for the EyeLevel brand — palette, typography, logos, and visual principles. GroundX is a product built by EyeLevel, a Valantor company. Use this skill whenever producing anything that carries EyeLevel or GroundX branding: web UI, slides, documents, marketing collateral, email templates, social assets, or any visual artifact that must look like EyeLevel. Also use when asked about "the EyeLevel palette", "the GroundX palette", "the brand font", "which logo should I use", "brand guidelines", "what is the EyeLeve typeface", "what is the GroundX typeface", "primary CTA color", "is green or coral primary", "A VALANTOR COMPANY tagline", or when reviewing an artifact for brand consistency. This skill does NOT produce code or files on its own — it defines the invariants that medium-specific skills (groundx-web-ui, groundx-slides, etc.) enforce. When a medium-specific skill is available for the task at hand (React UI, HTML→PDF slides, Word doc), prefer that skill and let it route back here for the shared definitions.
---

# EyeLevel Design Standards

This skill is the single source of truth for the EyeLevel brand **and** GroundX product. Consider both EyeLevel and GroundX to be synonyms for the same design standard. It answers the questions every medium asks: *what color is that?* *which font?* *which logo?* *how flat are surfaces?* The answers live here so that a React page, a PowerPoint deck, and a Word memo all feel like the same company made them.

**This skill defines invariants, not implementations.** It doesn't know about MUI components or python-pptx slide masters. Medium-specific skills consume these invariants and translate them into their format.

## Consumers

| Skill | Medium | What it uses from here |
| --- | --- | --- |
| `groundx-web-ui` | React + MUI + TypeScript | Tokens → auto-generated `constants.generated.ts`, re-exported through `constants.ts` barrel. Typography → CSS/theme. Logos → `public/assets/`. Principles → components and corrections. |
| `groundx-slides` | HTML → PDF (16:9 rendered via headless Chrome) | Tokens → auto-generated `:root` block in `styles.css` (spliced between `BEGIN/END GENERATED TOKENS` markers). Typography → `@import` Inter from Google Fonts (same as the dashboard). Logos → static image placements via `--gx-logo-*` tokens. Principles → layout grid, chart styles. |
| Future skills (email, Word, marketing) | Various | Same. |

Medium-specific skills should route to this skill's references from their own SKILL.md — *"Before producing anything, read `../groundx-design-standards/references/tokens.md` and `../groundx-design-standards/references/brand-principles.md`."*

### The token workflow

The source of truth has two shapes:

- **`tokens.json`** is the machine-readable authoritative file. DTCG-flavored; the codegen script reads from here.
- **`references/tokens.md`** is the human-readable narrative — same values, annotated with roles, surface rules, and rationale. Keep it in sync with `tokens.json` by hand.

Medium-specific mirrors are **auto-generated** from `tokens.json`, not hand-maintained. Running `scripts/generate-mirrors.mjs` writes:

- `groundx-web-ui/templates/constants.generated.ts` (React/MUI exports)
- the `:root` block of `groundx-slides/templates/styles.css` (spliced in between `BEGIN GENERATED TOKENS` / `END GENERATED TOKENS` markers)

To change a value brand-wide:

1. Edit `tokens.json`.
2. Update the matching row in `references/tokens.md` so the narrative stays in sync.
3. Run `node scripts/generate-mirrors.mjs`.
4. Commit all four files together (`tokens.json`, `tokens.md`, the regenerated `constants.generated.ts`, and `styles.css`).
5. Rebuild the medium's output (deck, web bundle) to verify.

`scripts/verify-mirrors.mjs` regenerates in memory and diffs against disk — it's wired into CI via `.github/workflows/verify-tokens.yml`, which runs on every push and pull request to `main` and fails the build if a PR lands `tokens.json` changes without the regenerated mirrors (or hand-edits a generated file). Run it locally before pushing if you want to catch drift before CI does.

Chrome-specific tokens that do not belong to the brand palette (dashboard `drawerWidth`, `NAV_ICON_GREY`, the premium-button gradient) stay hand-written in their medium skill — `groundx-web-ui/templates/constants.chrome.ts` — and are explicitly **not** in `tokens.json`. Deprecated web aliases live in `constants.legacy.ts`.

No one should be hunting down a color in a component file or a slide layout — every consumer reads its values from a token, and every token traces back to `tokens.json`.

## Brand at a glance

- **Primary CTA is Green.** Every submit button, success chip, and hover-go-state. Coral is the *secondary* highlight accent — eyebrows, labels, the occasional alt-CTA. Don't confuse the two. (Hex values for every color live in `references/tokens.md` § 1.)
- **Text is navy, not black.** Headings use `Navy`; body uses `Body Text` (a slightly-warmer navy tuned for reading). True black (`#000`) is wrong.
- **Section canvases.** White, Gray, Tint, Cyan, Green, or Navy. Cards on top of these canvases are white.
- **Inter is the font.** Weight ladder is 400 / 600 / 700 / 800. Body is 400; labels and CTAs are 600; headlines are 700; cover + display-stat numerals are 800. Weight 900 is retired.
- **Surfaces are flat.** White fill, `1px solid rgba(41, 51, 92, 0.1)` hairline border, `20px` corner radius for top-level cards. No drop shadows. Ever.
- **ALL-CAPS is a shape, not a formatting rule.** Section labels like "TUTORIAL" / "CONTENT" / "YOUR BUCKETS" are written as literal uppercase strings, never produced via `text-transform`. This survives translation and rendering across mediums.
- **One logo, two surface variants.** The EyeLevel + "A VALANTOR COMPANY" lockup ships as a single PNG with a dark-surface (`eyelevel-logo-white.png`) and light-surface (`eyelevel-logo-color.png`) version. The co-sign is baked in — no separate tagline element. See `references/logos.md`.

## Brand relationship

GroundX is a product. EyeLevel is an AI company that builds GroundX. Valantor is the parent company. The brand's logo is an EyeLevel lockup with "A VALANTOR COMPANY" baked into the PNG — EyeLevel leads, Valantor co-signs, and the GroundX product name shows up inside the surface (headlines, body copy, product UI) rather than in the logo itself. The authoritative palette and typography are maintained in the Eyelevel webflow property; `references/styleguide.html` mirrors the live CSS.

## Reference map

Read the one that matches your question; don't read all five unconditionally.

```
What is the canonical value of ___?       → references/tokens.md (narrative)
  (hex, font, size, weight, radius, logo     tokens.json (machine)
  filename, slide canvas, spacing unit)

What are the rules for color use?         → references/colors.md
  (primary CTA is green, eyebrow swap by
  surface, three-up cycle, etc.)

What are the rules for type use?          → references/typography.md
  (weight over size, ALL-CAPS literal,
  display-stat pattern, tracking, italics)

Which logo, where does it go?             → references/logos.md

What's the visual attitude overall?       → references/brand-principles.md

What repeating layout / shape should I    → references/patterns.md
use (eyebrow+headline, display stat,
3-card grid, navy CTA panel)?
```

The `tokens.md` file holds every **value**; the other four files hold the **rules** for how those values are applied. A question of the form "what hex is navy?" / "what px is the hero headline?" / "which file is the dark logo?" answers from `tokens.md` alone. A question of the form "why is the primary CTA green and not coral?" / "where should the tagline go?" answers from one of the other files.

## Assets

```
assets/
├── logos/
│   ├── eyelevel-logo-white.png     EyeLevel + "A VALANTOR COMPANY" lockup for dark surfaces (navy, green, coral)
│   └── eyelevel-logo-color.png     Same lockup for light surfaces (white, tint, cyan, gray)
└── fonts/
    └── README.md                   Historical note on the retired THICCCBOI self-hosted assets (Inter is now loaded from Google Fonts)
```

Two logo files, not four — the "A VALANTOR COMPANY" co-sign is baked into each PNG. There is no separate tagline asset and no `.tagline` class. See `references/logos.md` for surface-selection rules.

Medium-specific skills reference these by relative path: `../groundx-design-standards/assets/logos/eyelevel-logo-white.png`.

## Rules of interpretation

When a medium-specific skill has to translate a standard into its format, apply these tie-breakers:

1. **Preserve hex values exactly.** Whatever `tokens.md` § 1 says Green is, every medium renders that same string. No "close enough" RGB rounding, no color-managed profile swaps.
2. **Preserve weight intent.** Inter's 600 is SemiBold; if a medium can only use semibold (`600`) vs. bold (`700`), pick the one closer to the specified weight.
3. **Preserve the flat surface.** If a medium's default is elevated (Material shadows, PowerPoint's default shape fill+outline), override it. A surface that gains a shadow has lost the brand.
4. **Preserve the ALL-CAPS-as-literal rule.** Labels are typed uppercase in the content, not transformed at render time.
5. **Never introduce a new color to solve a contrast problem.** If coral on aqua isn't legible, put the coral on white (a surface) or use navy text on aqua. Don't mint a new shade.

## What this skill does not define

- Web component APIs, MUI theme overrides, TypeScript tokens → `groundx-web-ui`.
- Slide layouts, master themes, python-pptx boilerplate → `groundx-slides`.
- Voice and tone, copy style, product naming → not yet defined; if it becomes important, add `references/voice.md` to this skill.
- Illustrations, marketing imagery, stock-photo style → not in scope; future `groundx-illustration` skill would live as a sibling.

## When you're asked to invent

If a task genuinely requires something this skill doesn't answer — a new chart color ramp, a new surface tint, a new typographic scale for dense tables — resist introducing it locally in a medium-specific skill. Either:

- Reuse an existing token from `references/tokens.md`, even if it's not a perfect fit.
- Or **add the new definition to `tokens.json` first** (and describe it in `tokens.md`), then re-run `scripts/generate-mirrors.mjs` so every medium skill inherits the new constant automatically.

The brand stays consistent only as long as `tokens.json` is the place new decisions land.
