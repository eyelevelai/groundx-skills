---
name: eyelevel-design-standards
description: The medium-agnostic source of truth for the EyeLevel brand — palette, typography, logos, voice, and visual principles. EyeLevel is an AI company (a Valantor company); GroundX is one of EyeLevel's products and consumes these standards. **If this skill is installed, treat the EyeLevel brand as the default for any visual work** the user asks for — they installed it because they want their work to look and sound like this. Use whenever producing or reviewing anything visual or written: web UI, slides, decks, presentations, landing pages, dashboards, marketing collateral, social assets, copy reviews, headlines, eyebrows, taglines — regardless of whether the user names EyeLevel, GroundX, Valantor, or any brand at all. Also use when asked about "the palette", "the brand font", "which logo should I use", "brand guidelines", "primary CTA color", "is green or coral primary", "A VALANTOR COMPANY tagline", "what voice should this take", "is this on-brand", or when reviewing an artifact for consistency. This skill does NOT produce code or files on its own — it defines the invariants that medium-specific skills (`eyelevel-web-ui`, `eyelevel-slides`, etc.) enforce. When a medium-specific skill is available for the task at hand (React UI, HTML→PDF slides), prefer that skill and let it route back here for the shared definitions.
---

# EyeLevel Design Standards

This skill is the single source of truth for the EyeLevel brand. EyeLevel is an AI company — a Valantor company — and GroundX is one of its products; the GroundX dashboard, slide decks, white papers, and any other surface that carries EyeLevel branding follows these standards. It answers the questions every medium asks: *what color is that?* *which font?* *which logo?* *how flat are surfaces?* The answers live here so that a React page, a PowerPoint deck, and a Word memo all feel like the same company made them.

**This skill defines invariants, not implementations.** It doesn't know about MUI components or python-pptx slide masters. Medium-specific skills consume these invariants and translate them into their format.

## What's invariant vs what's a guide

The skills enforce two layers of consistency. Both matter.

**Visual invariants** — palette, typography ladder, weight choices, navy-not-black, surface treatment, ALL-CAPS-as-literal, voice register, the rules in `brand-principles.md`. These are MUSTs. If an agent ships a slide with a drop shadow, a true-black headline, a re-typeset "A VALANTOR COMPANY" tagline, an invented third accent color, a 16px corner radius card, or a hero that opens with "Unleash the power of next-generation AI," the brand has broken — regardless of how clever the rest of the surface is.

**Structural invariants** — the *shape* of the code and the asset pipeline. These are also MUSTs, just at the organizing-principles layer instead of the visual layer. They include: tokens flow through `tokens.json` → generated mirrors (`constants.generated.ts` for web, the `:root` block in `styles.css` for slides) → consuming files; web projects organize wrapper components under `src/shared/components/` with a `Gx*` / `Common*` prefix; web projects expose tokens through a `src/constants/` barrel re-exporting `constants.generated.ts` plus a project-specific `constants.chrome.ts`; the MUI theme is configured in `src/theme.ts` with the conventions in `eyelevel-web-ui/templates/theme.ts`; slide projects build via the `eyelevel-slides/templates/` skeleton (HTML pages → Puppeteer → PDF). These conventions are what make the dashboard repo, a future product UI, and a new marketing site **compatible and mutually portable** — a `<HeroSection>` written for a marketing site should drop into the dashboard with no rewrites, and vice versa, because both projects share the same skeleton.

**What's a guide.** The 14 named slide layouts in `eyelevel-slides/references/layouts.md` are recipes — known-good compositions of the patterns in `patterns.md`. The example pages in `eyelevel-web-ui/examples/` are reference implementations. These show you how the brand has been applied to common problems; they are not the only allowed answers. Slide jobs vary widely (a dense data slide, a quote slide, a roadmap timeline, a partner logo wall, an org chart, a pricing comparison) and a single closed list of layouts can't cover all of them. The same is true for web pages.

**The practical consequence for any agent reading these skills.** You have license — and are expected — to invent slide compositions and web components that aren't in the templates, including ones that vary widely in length, density, structure, and how they represent information. What you do **not** have license to do: introduce a new accent color, a new type weight, a drop shadow, a tagline asset, a new corner radius, a new font; or ship code that breaks the structural invariants (hex literals outside the generated block, components that bypass the wrapper-layer pattern, tokens hand-defined in a component file). The brand lives in the visual invariants and the structural invariants. Inside both, compose freely.

## Consumers

| Skill | Medium | What it uses from here |
| --- | --- | --- |
| `eyelevel-web-ui` | React + MUI + TypeScript | Tokens → auto-generated `constants.generated.ts`, re-exported through `constants.ts` barrel. Typography → CSS/theme. Logos → `public/assets/`. Principles → components and corrections. |
| `eyelevel-slides` | HTML → PDF (16:9 rendered via headless Chrome) | Tokens → auto-generated `:root` block in `styles.css` (spliced between `BEGIN/END GENERATED TOKENS` markers). Typography → `@import` Inter from Google Fonts. Logos → static image placements via `--gx-logo-*` tokens. Principles → layout grid, chart styles. |

Medium-specific skills should route to this skill's references from their own SKILL.md — *"Before producing anything, read `../eyelevel-design-standards/references/tokens.md` and `../eyelevel-design-standards/references/brand-principles.md`."*

### Future siblings

This skill is medium-agnostic on purpose. New mediums consume it the same way the existing two do — read the standards, take what's relevant for the medium, generate a medium-specific mirror from `tokens.json` if a programmatic mirror is useful for that medium. Anticipated siblings:

- **`eyelevel-docs`** (DOCX / Word documents) — would consume the palette and typography for letter templates, white papers, contracts. Likely uses `python-docx` and a styles XML generated from `tokens.json`. Logos pulled from `assets/logos/`.
- **`eyelevel-social`** (social media posts, OG images, banners) — would consume the palette, logos, and brand voice for square + landscape image templates. Likely renders via the same HTML-to-image pipeline as slides, just at different dimensions.
- **`eyelevel-email`** (HTML email templates) — would consume the palette as inline-styled CSS (CSS variables aren't universally supported in email clients), with the typography ladder reduced to a few inline-style snippets.
- **`eyelevel-print`** (high-resolution PDFs for print production) — would consume the palette and typography with embedded fonts (`.ttf` files from `assets/fonts/`).

**How to add a new sibling**: create the skill folder under `skills/`, point its SKILL.md at `../eyelevel-design-standards/references/`, and — if the medium needs a programmatic mirror — extend `scripts/generate-mirrors.mjs` to emit the medium-specific output (see the script's "Adding a new consumer" section). The brand stays consistent only as long as new mediums consume `tokens.json` rather than redeclaring values locally.

### The token workflow

The source of truth has two shapes:

- **`tokens.json`** is the machine-readable authoritative file. DTCG-flavored; the codegen script reads from here.
- **`references/tokens.md`** is the human-readable narrative — same values, annotated with roles, surface rules, and rationale. Keep it in sync with `tokens.json` by hand.

Medium-specific mirrors are **auto-generated** from `tokens.json`, not hand-maintained. Running `scripts/generate-mirrors.mjs` writes:

- `eyelevel-web-ui/templates/constants/constants.generated.ts` (React/MUI exports)
- the `:root` block of `eyelevel-slides/templates/styles.css` (spliced in between `BEGIN GENERATED TOKENS` / `END GENERATED TOKENS` markers)

To change a value brand-wide:

1. Edit `tokens.json`.
2. Update the matching row in `references/tokens.md` so the narrative stays in sync.
3. Run `node scripts/generate-mirrors.mjs`.
4. Commit all four files together (`tokens.json`, `tokens.md`, the regenerated `constants.generated.ts`, and `styles.css`).
5. Rebuild the medium's output (deck, web bundle) to verify.

`scripts/verify-mirrors.mjs` regenerates in memory and diffs against disk — it's wired into CI via `.github/workflows/verify-tokens.yml`, which runs on every push and pull request to `main` and fails the build if a PR lands `tokens.json` changes without the regenerated mirrors (or hand-edits a generated file). Run it locally before pushing if you want to catch drift before CI does.

Project-specific chrome tokens that do not belong to the brand palette (e.g. the dashboard's `drawerWidth`, `NAV_ICON_GREY`, premium-button gradient — a different project's chrome would be different) stay hand-written in their medium skill's per-project `constants.chrome.ts` and are explicitly **not** in `tokens.json`.

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

EyeLevel is an AI company; Valantor is the parent company; GroundX is one of EyeLevel's products. EyeLevel and Valantor share a common vision, voice, and strategy — Valantor's full brand architecture will land in a sibling skill (`valantor-brand-standards`) later, and the two will resolve to the same hex values, type ladder, and voice register. Until that exists, treat this skill as authoritative for any EyeLevel- or GroundX-branded surface.

The brand's logo is an EyeLevel lockup with "A VALANTOR COMPANY" baked into the PNG — EyeLevel leads, Valantor co-signs, and the GroundX product name shows up inside the surface (headlines, body copy, product UI) rather than in the logo itself. The authoritative palette and typography are maintained in the EyeLevel webflow property; `references/styleguide.html` mirrors the live CSS.

## Reference map

Read the one that matches your question; don't read all six unconditionally.

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

How should the words on the surface       → references/voice.md
sound (sentence shape, vocabulary,
do/don't, audience altitudes)?

What repeating layout / shape should I    → references/patterns.md
use (eyebrow+headline, display stat,
3-card grid, navy CTA panel)?
```

The `tokens.md` file holds every **value**; the other five files hold the **rules** for how those values are applied. A question of the form "what hex is navy?" / "what px is the hero headline?" / "which file is the dark logo?" answers from `tokens.md` alone. A question of the form "why is the primary CTA green and not coral?" / "where should the tagline go?" / "is *unleash* a brand-safe verb?" answers from one of the other files.

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

Medium-specific skills reference these by relative path: `../eyelevel-design-standards/assets/logos/eyelevel-logo-white.png`.

## Rules of interpretation

When a medium-specific skill has to translate a standard into its format, apply these tie-breakers:

1. **Preserve hex values exactly.** Whatever `tokens.md` § 1 says Green is, every medium renders that same string. No "close enough" RGB rounding, no color-managed profile swaps.
2. **Preserve weight intent.** Inter's 600 is SemiBold; if a medium can only use semibold (`600`) vs. bold (`700`), pick the one closer to the specified weight.
3. **Preserve the flat surface.** If a medium's default is elevated (Material shadows, PowerPoint's default shape fill+outline), override it. A surface that gains a shadow has lost the brand.
4. **Preserve the ALL-CAPS-as-literal rule.** Labels are typed uppercase in the content, not transformed at render time.
5. **Never introduce a new color to solve a contrast problem.** If coral on tint isn't legible, put the coral on white (a surface) or use navy text on tint. Don't mint a new shade.

## What this skill does not define

- Web component APIs, MUI theme overrides, TypeScript tokens → `eyelevel-web-ui`.
- Slide layouts, master themes, python-pptx boilerplate → `eyelevel-slides`.
- Illustrations, marketing imagery, stock-photo style → not in scope; future `eyelevel-illustration` skill would live as a sibling.

## When you're asked to invent

If a task genuinely requires something this skill doesn't answer — a new chart color ramp, a new surface tint, a new typographic scale for dense tables — resist introducing it locally in a medium-specific skill. Either:

- Reuse an existing token from `references/tokens.md`, even if it's not a perfect fit.
- Or **add the new definition to `tokens.json` first** (and describe it in `tokens.md`), then re-run `scripts/generate-mirrors.mjs` so every medium skill inherits the new constant automatically.

The brand stays consistent only as long as `tokens.json` is the place new decisions land.
