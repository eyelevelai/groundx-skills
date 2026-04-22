# GroundX Skills

A Claude Code plugin marketplace that teaches agents to follow the GroundX brand across mediums. One medium-agnostic source of truth plus a skill per medium, so a dashboard card, a pitch deck, and a white paper feel like the same company made them.

> **Brand relationship.** GroundX is the product. It's built by EyeLevel, an AI company that joined the Valantor family. The primary wordmark is "groundX.ai"; the co-brand tagline under the wordmark reads "A VALANTOR COMPANY." Source-of-truth palette and typography tokens come from the Eyelevel webflow style guide — mirrored in `skills/groundx-design-standards/references/styleguide.html`.

## The three skills

| Skill | Does | Triggers on |
| --- | --- | --- |
| `groundx-design-standards` | Palette, typography, logos, brand principles, cross-medium patterns. Single source of truth — doesn't produce code. | "What's the GroundX palette?", "Which logo on dark?", "GroundX brand principles" |
| `groundx-web-ui` | React + MUI v5 + TypeScript. Drop-in theme tokens and components for the `groundx-ai-dashboard` repo. | "Build a React component for …", "Style this page to match GroundX" |
| `groundx-slides` | HTML → PDF 16:9 slide decks rendered via headless Chrome. Same palette and typography as the web UI. | "Make me a deck for …", "Build a pitch deck about …" |

Medium-specific skills route to the standards skill for any brand-level question, so installing a web-ui or slides skill pulls the standards skill with it.

## Plugins

Three bundles so you install exactly what you need:

| Plugin | What you get |
| --- | --- |
| `groundx-design` | Standards + web UI (dashboard work) |
| `groundx-presentations` | Standards + slides (decks) |
| `groundx-all` | Standards + web UI + slides (everything) |

## Use with Claude Code / Cowork

Register the marketplace once, then install a plugin:

```
/plugin marketplace add benjaminfletcher/groundx-skills
/plugin install groundx-all@groundx-design
```

Swap `groundx-all` for `groundx-design` or `groundx-presentations` if you only want one medium. The skills trigger automatically when you ask for GroundX-flavored work — no extra setup.

## Use with Replit

The slides skill's templates are a self-contained Node project, so Replit (or any environment with Node + Chromium) can run the pipeline directly:

1. Create a Node Replit and clone this repo, or copy `skills/groundx-slides/templates/` into a new Replit.
2. `npm install` — Puppeteer downloads Chromium automatically.
3. Edit the HTML files in `slides/`, then `npm run build`.
4. Open `out/deck.pdf`.

For brand guidance inside Replit AI (or Cursor, Continue, etc.), paste the contents of `skills/groundx-design-standards/SKILL.md` into the agent's context — it's the same brand tour the skills route to. The web UI skill's `templates/` folder is drop-in for the `groundx-ai-dashboard` repo and can be copied into any React+MUI Replit the same way.

## Repository layout

```
.claude-plugin/marketplace.json     Plugin manifest
skills/
  groundx-design-standards/        SKILL.md + references/ + assets/ (logos, fonts)
  groundx-web-ui/                  SKILL.md + references/ + templates/ + examples/ + evals/
  groundx-slides/                  SKILL.md + references/ + templates/ + examples/ + evals/
```

Each skill has its own `evals/evals.json` with test prompts and a file-sanity checklist.

## HTML → PDF, not .pptx

The slides skill renders 16:9 HTML pages to a single `deck.pdf` via headless Chrome. That buys one typography system across mediums (THICCCBOI from the same webfont CDN as the dashboard), pixel-consistent palette tokens, and PRs that diff cleanly. The trade-off is a flat PDF, not an editable `.pptx` — if someone needs to edit in PowerPoint afterward, use the built-in `pptx` skill and apply the palette/typography from the standards skill manually.

## What's deliberately not here

No `boxShadow`, no `elevation`, no gradients except the premium-tier button and the thin brand accent bar on marketing surfaces. No hardcoded hex in components — everything flows through `constants.ts` or CSS variables. No second typeface. No true black — navy `#29335c`. Primary CTA is green `#a1ec83`, not coral. These aren't opinions to debate per-PR; they're the brand's shape. See `skills/groundx-design-standards/references/brand-principles.md` for why.

## License

MIT License. Copyright (c) 2026 Valantor Inc. See `LICENSE`.
