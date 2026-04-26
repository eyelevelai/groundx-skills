# Tokens — canonical reference

Every color, font, size, radius, spacing unit, canvas dimension, and logo filename the brand uses is defined **once**. This file is the human-readable reference — it explains each token's role, its name across mediums, and why it exists. The machine-readable source of truth is the sibling file `tokens.json` (DTCG-flavored); a codegen script reads `tokens.json` and writes the medium-specific mirrors (`eyelevel-web-ui/templates/constants.generated.ts` and the `:root` block of `eyelevel-slides/templates/styles.css`). Medium-specific skills never *redeclare* a value — they consume the generated mirrors.

**Two files, one source of truth:**

| File | Audience | Role |
| --- | --- | --- |
| `tokens.json` | The codegen script | Machine-readable authoritative values. Edit this when a value changes. |
| `tokens.md` *(this file)* | Humans | Narrative reference. Same values, annotated with roles, surface rules, and rationale. Keep in sync with `tokens.json` by hand — when a value changes, update both. |

The generator (`scripts/generate-mirrors.mjs`) and its CI gate (`scripts/verify-mirrors.mjs`) read `tokens.json` only. Editing `tokens.md` alone does **not** propagate to any medium; editing `tokens.json` alone (and re-running the generator) does — but the narrative in `tokens.md` will then be stale. The rule is: edit both in the same commit.

**This file supersedes the value tables that used to live in `colors.md`, `typography.md`, and `typography-slides.md`.** Those files retain prose rules (weight-over-size hierarchy, eyebrow-color swap by surface, ALL-CAPS literal rule, etc.) but reference this file for the numbers.

The filename on disk is `tokens.md` (narrative) and `tokens.json` (machine), not `values.md` or `vars.md` — this is deliberate: the word "token" means "a named value with a semantic role", and that's what everything here is.

---

## 1. Colors

### 1.1 Brand palette

| Semantic name | Hex | Webflow var | Slide CSS var | Web TS const | Role |
| --- | --- | --- | --- | --- | --- |
| Navy | `#29335c` | `--primary-1` | `--gx-navy` | `NAVY` | Primary dark. Headings, links, dark surfaces, strong borders. Not true black. |
| Green | `#a1ec83` | `--primary-2` | `--gx-green` | `GREEN` | **Primary CTA and accent.** Submit buttons, success chips, hover-go-state, eyebrows on navy. |
| Cyan | `#c1e8ee` | `--primary-3` | `--gx-cyan` | `CYAN` | Secondary accent. Icon-button bg, cyan card fill, tag bg. |
| Tint | `#eff9fb` | `--primary-4` | `--gx-tint` | `TINT` | Quiet section bg. Pale cyan wash, callouts, tint cards. |
| Coral | `#f3663f` | `--primary-5` | `--gx-coral` | `CORAL` | Label / highlight accent. Section eyebrows on light surfaces, coral buttons, pull-quote highlights. *Not* the primary CTA. |
| Body Text | `#40496b` | `--text-color` | `--gx-body-text` | `BODY_TEXT` | Default body color. Paragraphs, labels, captions. A slightly-warmer navy than Navy. |
| Gray | `#f2f4f5` | `--gray` | `--gx-gray` | `GRAY` | Alt section bg. Input field fill, gray card fill, quiet list rows. |
| White | `#ffffff` | `--white` | `--gx-white` | `WHITE` | Surface fill. Cards, inputs, table cells, modal panels. |
| Border | `rgba(41, 51, 92, 0.1)` | `--border` | `--gx-border` | `BORDER` | Default hairline. Card outlines, form inputs, dividers. Navy at 10%. |

### 1.2 Support palette

Used rarely, for specific states the brand palette can't cover.

| Semantic name | Hex | Slide CSS var | Web TS const | Role |
| --- | --- | --- | --- | --- |
| Error Red | `#f70d1a` | `--gx-error-red` | `ERROR_RED` | Destructive / failure. |
| Lighter Red | `#ff7f7f` | `--gx-lighter-red` | `LIGHTER_RED` | Soft warning. |
| Blue | `#0b99ff` | `--gx-blue` | `BLUE` | Inline link accent. Rare. |
| Dark Grey | `#81879a` | `--gx-dark-grey` | `DARK_GREY` | Inactive chrome. Slide numbers, timestamps. |

Web-UI also defines a handful of project-specific chrome-only neutrals and state colors (`NAV_ICON_GREY`, `DISABLED_GREY`, `ROW_SELECTED_BG`, `WARNING_AMBER`) that never appear on slides; those stay scoped to the web-ui skill's `constants.chrome.ts`, where each project owns its own. See `eyelevel-web-ui/references/tokens.md` for the full set.

### 1.3 Surface-aware aliases

Semantic aliases that resolve to one of the palette entries above, used so a rule like "eyebrow color by surface" has one name regardless of canvas.

| Alias | Resolves to | Used for |
| --- | --- | --- |
| `--gx-eyebrow-on-light` | `--gx-coral` | Default eyebrow color on white / gray / tint / cyan / green surfaces. |
| `--gx-eyebrow-on-dark` | `--gx-green` | Eyebrow color on navy surfaces. |
| `--gx-body-on-light` | `--gx-body-text` | Body / subhead on light surfaces. |
| `--gx-body-on-dark` | `rgba(255,255,255,0.82)` | Body / subhead on navy. |
| `--gx-muted-on-light` | `rgba(64,73,107,0.7)` | Stat labels, muted captions on light. |
| `--gx-muted-on-dark` | `rgba(255,255,255,0.65)` | Stat labels, muted captions on navy. |

### 1.4 Hex values are sacred

Never round, re-derive, or "convert to sRGB". `#a1ec83` is `#a1ec83` in every medium. If a palette color fails a contrast check, fall back to a different palette color (e.g., navy text on a tint surface) rather than adjust the hex.

---

## 2. Typography — one font, five weights, known feature settings

### 2.1 Font family

| Token | Value |
| --- | --- |
| `--gx-font` (CSS) / `FONT_FAMILY` (TS) | `"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` |

Source: Google Fonts (`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap`). No self-hosting.

### 2.2 Weight ladder

Weight 500 is indecisive; 900 is poster-heavy. Neither appears in finished work.

| Weight | Name | Role |
| --- | --- | --- |
| `400` | Regular | Body copy, subheads, most UI text. |
| `600` | SemiBold | Labels, eyebrows, CTAs, table headers. |
| `700` | Bold | Headlines (card → section), emphasized inline words. |
| `800` | ExtraBold | Cover-slide headline, display-stat numerals. One or two per deck. |

Semantic aliases used inside `styles.css`:

| Semantic token | Weight |
| --- | --- |
| `--gx-weight-body` | `400` |
| `--gx-weight-label` | `600` |
| `--gx-weight-headline` | `700` |
| `--gx-weight-display` | `800` |

### 2.3 OpenType feature settings

| Token | Value | Notes |
| --- | --- | --- |
| `--gx-font-features` (CSS) / `FONT_FEATURE_SETTINGS` (TS) | `"ss01", "cv11", "cv01"` | Single-story `a` (ss01), straight-leg `R` (cv11), tailed `l` (cv01). Applied on `body`. Don't opt into others. |

---

## 3. Size scale (slide canvas, 1920×1080)

Root is `1rem = 16px` on the slide. Values below are in rem so web developers can read them; px is the rendered output.

Named in semantic tiers so a rename of a tier's value applies to every class that consumes it.

### 3.1 Chrome (small functional text)

| Token | rem | px | Used by |
| --- | --- | --- | --- |
| `--gx-size-chrome-sm` | `0.75rem` | 12 | `.slide-number`, `.pill` |
| `--gx-size-chrome-md` | `0.875rem` | 14 | `.cover-context` |

### 3.2 Body scale

| Token | rem | px | Used by |
| --- | --- | --- | --- |
| `--gx-size-body-sm` | `1.25rem` | 20 | `.body-sm` (default, outside layout overrides) |
| `--gx-size-body-card` | `1.375rem` | 22 | `.three-card-grid .card .body-sm`, `.detail-item__body` |
| `--gx-size-body` | `1.5rem` | 24 | `.body`, `.subhead`, `.step__body` (3-up), `.display-stat__note` |

### 3.3 Subhead scale (paired with a dominant headline)

Subheads target roughly half the paired headline, scoped to the layout class that holds the headline.

| Token | rem | px | Paired headline | Used by |
| --- | --- | --- | --- | --- |
| `--gx-size-subhead-md` | `1.75rem` | 28 | 44px split headline | `.slide--split .subhead / .body`, `.steps--stack .step__body` |
| `--gx-size-subhead-lg` | `2rem` | 32 | 64px hero / CTA headline | `.slide--hero-with-stats .subhead / .body`, `.slide--cta .subhead / .body` |
| `--gx-size-subhead-xl` | `2.75rem` | 44 | 88px cover / section-break headline | `.slide--cover .subhead`, `.slide--section-break .subhead` |

### 3.4 Labels (unified; single tier)

Every uppercase section label — slide eyebrow, card eyebrow, step label, day label, detail-item label — shares one size. Only the color varies by surface.

| Token | rem | px | Weight | Tracking | Used by |
| --- | --- | --- | --- | --- | --- |
| `--gx-size-label` | `2rem` | 32 | 600 | `0.12em` | `.eyebrow`, `.step__label`, `.detail-item__label` |

### 3.5 Headlines

Headline tier names map to the layout that uses them. Weights follow the ladder (700 for most; 800 only for cover).

| Token | rem | px | Weight | Used by |
| --- | --- | --- | --- | --- |
| `--gx-size-headline-card` | `2.25rem` | 36 | 700 | `.headline-card`, `.detail-item__headline` |
| `--gx-size-headline-split` | `2.75rem` | 44 | 700 | `.headline-split` |
| `--gx-size-headline-hero` | `4rem` | 64 | 700 | `.headline-hero` |
| `--gx-size-headline-section` | `5.5rem` | 88 | 700 | `.headline-section` (section-break slide) |
| `--gx-size-headline-cover` | `5.5rem` | 88 | 800 | `.headline-cover` (cover slide, once per deck) |

Cover and section-break share the 88 size; the 800 vs 700 weight is what distinguishes them. Hierarchy through weight, not size.

### 3.6 Stats (numeral + label, 1:4 ratio)

| Context | Numeral token | px | Label token | px | Used by |
| --- | --- | --- | --- | --- | --- |
| 3-up (cover, hero, sidebar) | `--gx-size-stat-numeral` | 88 | `--gx-size-stat-label` | 22 | `.stat .stat-numeral` / `.stat-label`, `.detail-grid-sidebar__sidebar .stat …` |
| Display-stat slide | `--gx-size-stat-numeral-display` | 288 | `--gx-size-stat-label-display` | 40 | `.display-stat .stat-numeral` / `.stat-label` |

Both contexts respect the numeral:label rhythm — roughly 1:4 for 3-up, 1:7 for display (a wider label reads better under the dominant 288px numeral).

### 3.7 Step numerals

| Token | rem | px | Weight | Used by |
| --- | --- | --- | --- | --- |
| `--gx-size-step-numeral` | `4rem` | 64 | 700 | `.step__numeral` |

### 3.8 CTA buttons

CTAs sit one tier below labels — a button is a call to action, not a section headline.

| Token | rem | px | Padding | Used by |
| --- | --- | --- | --- | --- |
| `--gx-size-cta-sm` | `1.125rem` | 18 | `10px 24px` | `.cta.cta--sm` |
| `--gx-size-cta` | `1.375rem` | 22 | `14px 32px` | `.cta` (default) |
| `--gx-size-cta-lg` | `1.75rem` | 28 | `20px 44px` | `.cta.cta--lg` |

---

## 4. Size scale (web baseline)

Web reading happens at 24", not 10 feet. The web ladder is compressed relative to the slide ladder.

| Role | rem | px | Weight |
| --- | --- | --- | --- |
| Display heading (hero, cover) | `2.5rem` | 40 | 700 |
| Page heading (H2) | `2rem` | 32 | 700 |
| Section heading (H3) | `1.625rem` | 26 | 700 |
| Subsection (H4) | `1.375rem` | 22 | 700 |
| Card heading (H5) | `1.125rem` | 18 | 700 |
| Card subhead (H6) | `1rem` | 16 | 700 |
| Body | `1rem` | 16 | 400 |
| Body-sm | `0.875rem` | 14 | 400 |
| Metadata / caption | `0.8125rem` | 13 | 400 |
| Small label ("TUTORIAL") | `0.75rem` | 12 | 600 (uppercased) |

The web ladder is what marketing surfaces and the dashboard use. Slides use the 3.1–3.8 tokens instead — don't render a 16px paragraph on a 1920×1080 slide.

---

## 5. Radii (webflow scale)

Five values. Everything the UI or slide needs sits on one of them.

| Token (CSS) | Token (TS) | Value | Where it's used |
| --- | --- | --- | --- |
| `--gx-radius-sm` | `BORDER_RADIUS_SM` | `4px` | Tight inner shapes — hairline divider wraps, inline chips. |
| `--gx-radius-md` / `--gx-radius-input` | `BORDER_RADIUS` | `6px` | Inner / nested surfaces, inputs. |
| `--gx-radius-lg` | `BORDER_RADIUS_2X` | `12px` | Dropdown menus, toast, form field containers. |
| `--gx-radius-card` | `BORDER_RADIUS_CARD` | `20px` | Top-level cards, accordions. The default unless a reason not to. |
| `--gx-radius-pill` | `BORDER_RADIUS_PILL` | `200px` | Buttons, pills, tags, segmented button ends. Full-pill shape. |

---

## 6. Slide canvas (physical dimensions)

| Token | Value | Role |
| --- | --- | --- |
| `--gx-slide-width` | `1920px` | 16:9 canvas width. |
| `--gx-slide-height` | `1080px` | 16:9 canvas height. |
| `--gx-slide-padding` | `80px` | Outer margin on every slide. Match on absolute-positioned wrappers (`.split-wrap`, `.slide-centerblock`, `.cover-main`, `.cover-stats`). |
| `--gx-accent-bar-height` | `8px` | Thin brand-gradient accent bar height (cover / CTA only). |

The slide dimensions are fixed; decks are a fixed-format medium. Don't attempt to render at 1280×720.

---

## 7. Logo (EyeLevel lockup)

The "A VALANTOR COMPANY" co-sign is baked into each PNG. Two files only — one for dark surfaces, one for light.

### 7.1 Asset paths

| Token | Value | Used when |
| --- | --- | --- |
| `--gx-logo-dir` (conceptual) | `assets/logos` | Filesystem directory under the slides template or web public folder. |
| `--gx-logo-dark` | `url("/assets/logos/eyelevel-logo-white.png")` | Ancestor surface is navy / green / coral. |
| `--gx-logo-light` | `url("/assets/logos/eyelevel-logo-color.png")` | Ancestor surface is white / gray / tint / cyan (default). |

Both PNGs have the same aspect ratio (~2.45:1). One sized pair works for every slide.

### 7.2 Lockup dimensions (slide)

| Token | Value | Role |
| --- | --- | --- |
| `--gx-logo-width` | `220px` | Rendered width of `.slide-logo`. |
| `--gx-logo-height` | `72px` | Rendered height. Enough space for "A VALANTOR COMPANY" to be readable. |
| `--gx-logo-top` | `56px` | Distance from top of slide to top of lockup. |
| `--gx-logo-left` | `80px` | Distance from left of slide. Matches `--gx-slide-padding`. |

No `.tagline` class anywhere. No sibling `<span>` for "A VALANTOR COMPANY". The PNG is the whole mark.

See `logos.md` for when to use which variant and the "light vs dark surface" decision tree.

---

## 8. Spacing rhythm (slide)

A 4px base unit, 8px minor step, 12/20/24 major steps inside a type block.

| Gap | Use |
| --- | --- |
| 12px | eyebrow → headline |
| 20px | headline → body |
| 24px | body → next peer block |
| 40–48px | between primary content blocks on a slide |
| 64–80px | split-column gutter, stat-row gutter |

`margin-bottom` values are baked into the type-scale classes so spacing stays consistent regardless of markup. Don't wrap classes in `stack-*` utility divs between eyebrow → headline → body.

---

## 9. How medium skills consume these tokens

### 9.1 `eyelevel-slides` (HTML → PDF)

`templates/styles.css` declares every token above in `:root`, with names matching the "Slide CSS var" column of the color table and the semantic tokens in sections 3, 5, 6, and 7. The `:root` block is **auto-generated** from `tokens.json` — it sits between `/* BEGIN GENERATED TOKENS */` and `/* END GENERATED TOKENS */` markers and is overwritten each time the generator runs. The class rules below the markers are hand-written and reference the tokens via `var(--gx-*)`. **There are no hex literals, px sizes, or URL strings scattered through the class rules.** Grep rule: the only `#` followed by a hex digit should be inside the generated `:root`, and the only `url(` should be inside the generated `:root`.

Slide HTML files never declare colors or sizes inline. A slide's job is to pick a layout class and drop content into it.

### 9.2 `eyelevel-web-ui` (React + MUI + TypeScript)

The web-ui consumes brand tokens via two files under `templates/`:

- `constants.generated.ts` — auto-generated from `tokens.json`. Contains every brand-level named `const` matching the "Web TS const" column of each table (NAVY, GREEN, FONT_WEIGHT_*, FONT_SIZE_*, BORDER_RADIUS_*, LETTER_SPACING_*, LINE_HEIGHT_*, PADDING, etc.). Never edit by hand — re-run the generator instead.
- `constants.chrome.ts` — project-specific chrome tokens that are *not* brand palette. The dashboard's version holds `drawerWidth`, `NAV_ICON_GREY`, `DISABLED_GREY`, `ROW_SELECTED_BG`, `WARNING_AMBER`, the premium-button gradient. A different project (a marketing site, internal tool, demo) holds different values, or none — each project owns its own chrome file.

`templates/constants.ts` is a thin barrel: `export * from "./constants.generated"; export * from "./constants.chrome";` so `import { NAVY } from "./constants"` keeps working everywhere.

`templates/fonts.css` declares the font family + feature settings at the `body` level. The MUI theme maps `primary.main = GREEN`, `text.primary = NAVY`, `text.secondary = BODY_TEXT`, breakpoints per section 4's breakpoint table (in tokens but spec'd further in the web-ui skill), radii per section 5.

React components never declare a hex literal, a hardcoded radius, or a magic-number media query. If a value doesn't exist yet, add it to `tokens.json` (and note it here in `tokens.md`) first, then re-run the generator so it shows up in `constants.generated.ts`.

### 9.3 Future skills (email, Word, print)

Same pattern: inline the hex values for email (CSS variables aren't universally supported in email clients), or resolve to theme colors for Word. The hex values stay fixed.

---

## 10. Editing this file

### 10.1 Changing a value

1. Edit the value in `tokens.json` (machine-readable source).
2. Edit the matching row in the table above in `tokens.md` so the narrative stays in sync.
3. Run the codegen: `cd skills/eyelevel-design-standards && node scripts/generate-mirrors.mjs`. This overwrites `eyelevel-web-ui/templates/constants.generated.ts` and re-splices the `:root` block of `eyelevel-slides/templates/styles.css`.
4. Commit the three changed files together — `tokens.json`, `tokens.md`, and the regenerated mirrors.
5. Run `eyelevel-slides` build (`cd templates && npm run build`) to verify the deck still looks right.
6. If the value appears in a prose explanation in `colors.md` / `typography.md` / `typography-slides.md`, update the cited example there too. The prose in those files is allowed to *reference* the number — but the authoritative table lives here.

### 10.2 Adding a new value

New colors, size tiers, or radii land **in `tokens.json` first**, with a semantic name and a stated role. Mirror the addition in the table above, then re-run the generator. Medium-specific skills pick up the new constant automatically (`constants.generated.ts` gets a new export; `styles.css :root` gets a new `--gx-*`). A value that only ever needs to exist in one medium (e.g., `NAV_ICON_GREY` for the web sidebar) stays scoped to that skill's hand-written file — `constants.chrome.ts` in the web-ui case — and does *not* land in `tokens.json`.

### 10.3 Retiring a value

Remove the row from the tables above and from `tokens.json`, then re-run the generator so the constant disappears from `constants.generated.ts` and from the slides `:root` block. Sweep call sites in the same change. (The skill carries no back-compat layer — there are no consumers locked to old names.)

### 10.4 CI drift check

`scripts/verify-mirrors.mjs` regenerates the mirrors in memory and diffs against the on-disk files. Run it after any edit to `tokens.json`; wire it into pre-commit or CI so a PR fails loudly when someone forgets step 3 above.

---

## 11. Why this file exists

The brand stays consistent only as long as **one source** decides what a color or a size means. When the slides skill and the web-ui skill each maintain their own authoritative color table, those tables drift — even carefully-maintained ones. `tokens.json` is the single upstream value store; `tokens.md` is its human-readable companion; the medium skills consume generated mirrors, they don't redefine.

If you're writing a skill review checklist: "Does this skill's value table cite `tokens.md` / `tokens.json`, or does it redeclare the numbers?" is the one question that catches drift.
