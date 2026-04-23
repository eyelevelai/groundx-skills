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
| `groundx-web-ui` | React + MUI + TypeScript | Palette → `constants.ts` hex values. Typography → CSS/theme. Logos → `public/assets/`. Principles → components and corrections. |
| `groundx-slides` | HTML → PDF (16:9 rendered via headless Chrome) | Palette → CSS `:root` vars in `styles.css`. Typography → `@import` Inter from Google Fonts (same as the dashboard). Logos → static image placements. Principles → layout grid, chart styles. |
| Future skills (email, Word, marketing) | Various | Same. |

Medium-specific skills should route to this skill's references from their own SKILL.md — *"Before producing anything, read `../groundx-design-standards/references/colors.md` and `../groundx-design-standards/references/typography.md`."*

## Brand at a glance

- **Primary CTA is green `#a1ec83`.** Every submit button, success chip, and hover-go-state. Coral `#f3663f` is the *secondary* highlight accent — eyebrows, labels, the occasional alt-CTA. Don't confuse the two.
- **Text is navy, not black.** Headings `#29335c`; body `#40496b`. True black (`#000`) is wrong.
- **Section canvases.** White, Gray `#f2f4f5`, Tint `#eff9fb`, Cyan `#c1e8ee`, Green `#a1ec83`, or Navy `#29335c`. Cards on top of these canvases are white.
- **Inter is the font.** Weight ladder is 400 / 600 / 700 / 800. Body is 400; labels and CTAs are 600; headlines are 700; cover + display-stat numerals are 800. Weight 900 is retired.
- **Surfaces are flat.** White fill, `1px solid rgba(41, 51, 92, 0.1)` hairline border, `20px` corner radius for top-level cards. No drop shadows. Ever.
- **ALL-CAPS is a shape, not a formatting rule.** Section labels like "TUTORIAL" / "CONTENT" / "YOUR BUCKETS" are written as literal uppercase strings, never produced via `text-transform`. This survives translation and rendering across mediums.
- **One logo, two surface variants.** The EyeLevel + "A VALANTOR COMPANY" lockup ships as a single PNG with a dark-surface (`eyelevel-logo-white.png`) and light-surface (`eyelevel-logo-color.png`) version. The co-sign is baked in — no separate tagline element. See `references/logos.md`.

## Brand relationship

GroundX is a product. EyeLevel is an AI company that builds GroundX. Valantor is the parent company. The brand's logo is an EyeLevel lockup with "A VALANTOR COMPANY" baked into the PNG — EyeLevel leads, Valantor co-signs, and the GroundX product name shows up inside the surface (headlines, body copy, product UI) rather than in the logo itself. The authoritative palette and typography are maintained in the Eyelevel webflow property; `references/styleguide.html` mirrors the live CSS.

## Reference map

Read the one that matches your question; don't read all four unconditionally.

```
What color is …?                          → references/colors.md
What font / weight / size / label rule?   → references/typography.md
Which logo, where does it go?             → references/logos.md
What's the visual attitude overall?       → references/brand-principles.md
What repeating layout / shape should I    → references/patterns.md
use (eyebrow+headline, display stat,
3-card grid, navy CTA panel)?
```

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

1. **Preserve hex values exactly.** `#a1ec83` is `#a1ec83` in every medium. No "close enough" RGB rounding, no color-managed profile swaps.
2. **Preserve weight intent.** Inter's 600 is SemiBold; if a medium can only use semibold (`600`) vs. bold (`700`), pick the one closer to the specified weight.
3. **Preserve the flat surface.** If a medium's default is elevated (Material shadows, PowerPoint's default shape fill+outline), override it. A surface that gains a shadow has lost the brand.
4. **Preserve the ALL-CAPS-as-literal rule.** Labels are typed uppercase in the content, not transformed at render time.
5. **Never introduce a new color to solve a contrast problem.** If coral on aqua isn't legible, put the coral on white (a surface) or use navy text on aqua. Don't mint `#E87A55`.

## What this skill does not define

- Web component APIs, MUI theme overrides, TypeScript tokens → `groundx-web-ui`.
- Slide layouts, master themes, python-pptx boilerplate → `groundx-slides`.
- Voice and tone, copy style, product naming → not yet defined; if it becomes important, add `references/voice.md` to this skill.
- Illustrations, marketing imagery, stock-photo style → not in scope; future `groundx-illustration` skill would live as a sibling.

## When you're asked to invent

If a task genuinely requires something this skill doesn't answer — a new chart color ramp, a new surface tint, a new typographic scale for dense tables — resist introducing it locally in a medium-specific skill. Either:

- Reuse an existing token from `references/colors.md` or `references/typography.md`, even if it's not a perfect fit.
- Or **add the new definition here first**, then consume it from the medium-specific skill. That way the next medium you add inherits the same answer.

The brand stays consistent only as long as this file is the place new decisions land.
