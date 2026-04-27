# EyeLevel Skills

A Claude Code plugin marketplace that teaches agents to follow the EyeLevel brand across mediums. One medium-agnostic source of truth plus a skill per medium, so a dashboard card, a pitch deck, and a white paper feel like the same company made them.

> **Brand relationship.** EyeLevel is an AI company; Valantor is the parent — EyeLevel is "a Valantor company." GroundX is one of EyeLevel's products and consumes these standards. The primary brand mark is the **EyeLevel + "A VALANTOR COMPANY" lockup** — shipped as a single PNG in dark-surface and light-surface variants. The Valantor co-sign is baked into the file, not rendered as a separate tagline. Source-of-truth palette and typography tokens live in `skills/eyelevel-design-standards/tokens.json` (machine-readable, DTCG format) with a narrative mirror at `references/tokens.md`; the original EyeLevel webflow style guide is archived at `references/styleguide.html` for reference.

A sibling `valantor-brand-standards` skill will land later for parent-brand surfaces; until then, this skill is authoritative for any EyeLevel- or GroundX-branded artifact. Other medium-specific siblings — `eyelevel-docs` (Word documents), `eyelevel-social` (social media posts and OG images), `eyelevel-email` (HTML email), `eyelevel-print` (print-ready PDFs) — would land alongside `eyelevel-web-ui` and `eyelevel-slides`, each consuming the same `tokens.json` source of truth. See `skills/eyelevel-design-standards/SKILL.md > Future siblings` for the pattern.

## The three skills

| Skill | Does | Triggers on |
| --- | --- | --- |
| `eyelevel-design-standards` | Palette, typography, logos, brand principles, cross-medium patterns. Single source of truth — doesn't produce code. | "What's the EyeLevel palette?", "Which logo on dark?", "EyeLevel brand principles" |
| `eyelevel-web-ui` | React + MUI v5 + TypeScript. Drop-in theme tokens and components for any EyeLevel-styled web surface — dashboards, marketing sites, landing pages, internal tools, demos. The GroundX dashboard is one current consumer. | "Build a React component for …", "Make a landing page", "Style this page to match EyeLevel" |
| `eyelevel-slides` | HTML → PDF 16:9 slide decks rendered via headless Chrome. Same palette and typography as the web UI. | "Make me a deck for …", "Build a pitch deck about …" |

Medium-specific skills route to the standards skill for any brand-level question, so installing a web-ui or slides skill pulls the standards skill with it.

## Plugins

Three bundles so you install exactly what you need:

| Plugin | What you get |
| --- | --- |
| `eyelevel-design` | Standards + web UI (dashboard work) |
| `eyelevel-presentations` | Standards + slides (decks) |
| `eyelevel-all` | Standards + web UI + slides (everything) |

## Use with Claude Code / Cowork

Register the marketplace once, then install a plugin:

```
/plugin marketplace add benjaminfletcher/eyelevel-skills
/plugin install eyelevel-all@eyelevel-skills
```

Swap `eyelevel-all` for `eyelevel-design` or `eyelevel-presentations` if you only want one medium. The skills trigger automatically when you ask for EyeLevel- or GroundX-flavored work — no extra setup.

## Use with Replit

The slides skill's templates are a self-contained Node project, so Replit (or any environment with Node + Chromium) can run the pipeline directly:

1. Create a Node Replit and clone this repo, or copy `skills/eyelevel-slides/templates/` into a new Replit.
2. `npm install` — Puppeteer downloads Chromium automatically.
3. Edit the HTML files in `slides/`, then `npm run build`.
4. Open `out/deck.pdf`.

For brand guidance inside Replit AI (or Cursor, Continue, etc.), paste the contents of `skills/eyelevel-design-standards/SKILL.md` into the agent's context — it's the same brand tour the skills route to. The web UI skill's `templates/` folder is a self-contained drop-in for any EyeLevel-styled React+MUI project — a new marketing site, an internal tool, a demo app, or an existing product repo (the GroundX dashboard is one current consumer). Copy it into any React+MUI Replit the same way.

## Repository layout

```
.claude-plugin/marketplace.json     Plugin manifest
skills/
  eyelevel-design-standards/        SKILL.md + references/ + assets/ (logos, fonts) + tokens.json + scripts/
  eyelevel-web-ui/                  SKILL.md + references/ + templates/ + examples/ + evals/
  eyelevel-slides/                  SKILL.md + references/ + templates/ + examples/ + evals/
```

The design-standards skill ships a `tokens.json` (machine-readable source of truth, DTCG format) plus `scripts/generate-mirrors.mjs` (emits the web-ui `constants.generated.ts` and splices the slides `styles.css` `:root` block) and `scripts/verify-mirrors.mjs` (drift check). Run the generator after any `tokens.json` edit; run the verifier to confirm both mirrors are in sync. `.github/workflows/verify-tokens.yml` runs the verifier on every push and pull request to `main`, so a PR that lands `tokens.json` changes without the regenerated mirrors fails the build.

Each skill has its own `evals/evals.json` with test prompts and a file-sanity checklist.

## HTML → PDF, not .pptx

The slides skill renders 16:9 HTML pages to a single `deck.pdf` via headless Chrome. That buys one typography system across mediums (Inter from Google Fonts, same as the dashboard), pixel-consistent palette tokens, and PRs that diff cleanly. The trade-off is a flat PDF, not an editable `.pptx` — if someone needs to edit in PowerPoint afterward, use the built-in `pptx` skill and apply the palette/typography from the standards skill manually.

## What's deliberately not here

No `boxShadow`, no `elevation`, no gradients except the premium-tier button and the thin brand accent bar on marketing surfaces. No hardcoded hex in components — everything flows from `tokens.json` through auto-generated mirrors (`constants.generated.ts` for web, the `:root` block in `styles.css` for slides), with a CI-checked drift detector (`scripts/verify-mirrors.mjs`) to keep mediums in lockstep. No second typeface. No true black — navy `#29335c`. Primary CTA is green `#a1ec83`, not coral. These aren't opinions to debate per-PR; they're the brand's shape. See `skills/eyelevel-design-standards/references/brand-principles.md` for why.

## License

MIT License. Copyright (c) 2026 Valantor Inc. See `LICENSE`.
