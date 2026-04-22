# Colors

The palette is small, semantic, and identical across every medium — web, slides, print, email. A color's role is fixed, so translating it from web to slides to print is a matter of dropping the same hex into a different theme file.

> **Source of truth.** This file mirrors `references/styleguide.html`, which was extracted from the live Eyelevel Webflow CSS. When the two disagree, the style guide wins and this file is out of date.

## Palette

| Name | Hex | Webflow var | Role |
| --- | --- | --- | --- |
| Navy | `#29335c` | `--primary-1` | **Primary dark.** Headings, links, dark surfaces, strong borders. Not true black. |
| Green | `#a1ec83` | `--primary-2` | **Primary CTA and accent.** The default button fill, success chips, navy-surface eyebrows, the "alive/go" color. |
| Cyan | `#c1e8ee` | `--primary-3` | **Secondary accent.** Icon-button backgrounds, cyan card fill, tag backgrounds. |
| Tint | `#eff9fb` | `--primary-4` | **Quiet section background.** The pale cyan wash on alternating sections; callouts; tint cards. |
| Coral | `#f3663f` | `--primary-5` | **Label / highlight accent.** Section eyebrows on light surfaces, coral buttons (secondary CTA), pull-quote highlights. *Not* the primary CTA — that's Green. |
| Body Text | `#40496b` | `--text-color` | **Default body color.** Paragraphs, labels, captions. A slightly-warmer navy than `#29335c` — tuned for legible running text. |
| Gray | `#f2f4f5` | `--gray` | **Alt section background.** Input field fill, gray card fill, quiet list rows. |
| White | `#ffffff` | `--white` | **Surface fill.** Cards, inputs, table cells, modal panels. |
| Border | `rgba(41, 51, 92, 0.1)` | `--border` | **Default hairline.** Card outlines, form inputs, dividers. Derived from navy @ 10%. |

### Support palette

Used rarely, for specific states that the primary palette can't cover.

| Name | Hex | Role |
| --- | --- | --- |
| Error Red | `#f70d1a` | **Destructive / failure.** Ingest failures, delete confirmation. |
| Lighter Red | `#ff7f7f` | **Soft warning.** Non-critical expiry / attention. |
| Blue | `#0b99ff` | **Inline link accent.** Secondary links. Rare. |
| Dark Grey | `#81879a` | **Inactive chrome.** Slide numbers, timestamps. |

## Background surfaces

The style guide codifies six canonical section backgrounds. Pick one per section — don't invent new ones.

| Surface | Background | Text |
| --- | --- | --- |
| White | `#ffffff` | Navy headings, Body Text paragraphs |
| Gray | `#f2f4f5` | Navy headings, Body Text paragraphs |
| Tint | `#eff9fb` | Navy headings, Body Text paragraphs |
| Green | `#a1ec83` | Navy headings **and** body |
| Cyan | `#c1e8ee` | Navy headings and body |
| Navy | `#29335c` | White body; **Green** eyebrows |

## Color combinations that work

| Background | Text / Accent | Use case |
| --- | --- | --- |
| White | Navy heading, Body Text body, Coral eyebrow | Standard card — the default. |
| Gray | Navy heading, Body Text body, Coral eyebrow | Alt section bg to break long white pages. |
| Tint | Navy heading, Body Text body, Coral eyebrow | Callouts, tutorial hints, alternating sections. |
| Green | Navy text (header + body) | Primary CTA at rest; success chip; feature card. |
| Cyan | Navy text | Secondary accent panel or icon background. |
| Navy | White body, Green eyebrow, Green/Coral CTAs | Sidebar, emphasis cards, dark section. |
| Coral | White text | Secondary CTA, highlight pill. |

## Rules

### 1. Primary CTA is Green, not Coral

`#a1ec83` fills the primary call-to-action at every touchpoint — web buttons, slide CTAs, form submits, hover-go-state chips. Coral is a **secondary** accent: eyebrows, labels, highlight pills, the occasional alt-CTA where green would collide with surrounding green. If a page already has a coral eyebrow nearby, a coral button is wrong — use navy or outline.

### 2. Text defaults to Body Text, headings to Navy

Paragraphs: `#40496b` (Body Text). Headings: `#29335c` (Navy). Muted / timestamp: `#81879a` (Dark Grey). True black (`#000`) is never correct. The Body Text color is a deliberately-chosen not-quite-navy — don't substitute navy at 80% opacity for it.

### 3. Borders are `rgba(41,51,92,0.1)` at 1px

The hairline border is the visual grammar of a surface. The style guide codifies it as 10% navy — use the `--border` token, not a grey tint. Solid `#d9d9d9` is deprecated.

### 4. Canvas and surface don't swap

Tint / Gray are section backgrounds; White is the surface on those sections. Never put tint on a card and white around it.

### 5. Eyebrows swap color by surface luminance

An "eyebrow" is the small uppercase label that sits above a headline — "SUPPLY CHAIN INTELLIGENCE", "NEXT STEPS", "WHITE PAPER · RESPONSE TO DELL". Its color depends on what it's sitting on:

- **On a light surface** (white, gray, tint, cyan, green) → eyebrow is **Coral** `#f3663f`.
- **On a dark surface** (navy) → eyebrow is **Green** `#a1ec83`.

Coral on navy reads muddy; green on navy reads crisp the way coral does on white. Swapping the accent color by surface luminance keeps the eyebrow feeling like an accent, not a body element, in both contexts.

Body and headline text on a navy surface stays white. Only the eyebrow swaps.

### 6. Three-up accents cycle Green → Cyan → Coral (on navy only)

When three parallel items sit in a single row on a **navy surface** — three display stats, three numbered steps, three big numerals — the accent on each item cycles through three brand-adjacent colors rather than all sharing the same accent:

1. Green `#a1ec83`
2. Cyan `#c1e8ee`
3. Coral `#f3663f`

Left to right. The cycle gives a three-up arrangement visual variety without introducing a new color — every color in the cycle is already in the palette, and each pulls equal weight against navy.

**The cycle is navy-only.** On light canvases pale cyan against tint or white is effectively invisible and green is only marginally better. Three-up stats on a light surface stay coral — all three the same — because coral is the one color in the palette with enough contrast against a light ground. Don't cycle on light.

This rule applies to the **numeral or icon** of each item, not to its body copy. Body copy stays white (on navy) or Body Text (on light). Small eyebrows don't cycle — cycling small text across low-contrast colors hurts legibility even on navy.

Two-item and four-plus-item arrangements don't cycle: two-item uses the normal eyebrow rule (coral on light, green on navy), four-plus-item uses the primary accent for all items because introducing more colors in a longer row becomes noisy.

### 7. New colors go here first

If a new use case arises (new chart color, warning tier), add it to this file *before* using it. Give it a semantic name and a role. Then propagate the semantic name into medium-specific token files (`constants.ts` for web, slide master RGB values for pptx, `:root` vars in `groundx-slides/templates/styles.css`).

## Medium-specific mappings

Each medium-specific skill maintains its own mapping from these colors to its native token format:

- **`groundx-web-ui`** → `templates/constants.ts` exports named TypeScript constants (`NAVY`, `GREEN`, `CORAL`, `CYAN`, `TINT`, `BODY_TEXT`, `GRAY`, `WHITE`, `BORDER`). MUI theme palette maps `primary.main = GREEN`, `text.primary = NAVY`, `text.secondary = BODY_TEXT`.
- **`groundx-slides`** → `templates/styles.css` defines `:root` CSS vars (`--gx-navy`, `--gx-green`, `--gx-coral`, `--gx-cyan`, `--gx-tint`, `--gx-body-text`, `--gx-gray`, `--gx-border`). Slides reference these everywhere; hex literals in slide HTML are forbidden.
- **Word / email** → inline style usage with the raw hex values.

The hex values are fixed in *this* file. Medium skills only change how they're referenced.

## Don'ts

- **No new oranges.** Use Coral `#f3663f`, or a neutral.
- **No `#000`.** Navy for headings, Body Text for paragraphs.
- **No `rgba` variants** of the core palette colors — the `--border` token is the one sanctioned alpha usage. Transparency compounds in nested surfaces and muddies the palette.
- **No gradients on surfaces or text.** The logo's speech-bubble frame gradient is the exception and belongs only on the logo.
- **No system palette fallbacks.** On print or monochrome, use the closest neutral from this palette.
- **Don't use the old palette values** (`#2c3359` navy, `#e26f4b` coral, `#b1ea8f` green, `#c8e7ed` pale aqua). They were close but not identical to the webflow tokens; update any code still referencing them.
