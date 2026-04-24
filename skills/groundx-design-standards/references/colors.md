# Colors

This file explains the **rules** for color use — which color plays which role, when to swap by surface, where cycling is allowed. The **values** (hex, CSS var names, TS const names) live in `tokens.md` (narrative reference) and `tokens.json` (machine-readable source of truth). When a rule below cites a color by name, look it up in `tokens.md` § 1 for the canonical value.

> **Tokens:** see `tokens.md` § 1.1 (brand palette), § 1.2 (support palette), § 1.3 (surface-aware aliases), § 1.4 (legacy aliases). When in doubt, `tokens.md` / `tokens.json` win.

## Semantic roles

The palette is nine colors, each with a fixed role. The roles don't move.

- **Navy** — primary dark. Headings, links, dark surfaces, strong borders. **Not true black.**
- **Green** — **primary CTA and accent.** Submit buttons, success chips, hover-go-state, eyebrows on navy. The "alive / go" color.
- **Cyan** — secondary accent. Icon-button bg, cyan card fill, tag bg.
- **Tint** — quiet section background. Pale cyan wash, callouts, tint cards.
- **Coral** — **label / highlight accent.** Section eyebrows on light surfaces, coral buttons (secondary CTA), pull-quote highlights. *Not* the primary CTA.
- **Body Text** — default body color. Paragraphs, labels, captions. A slightly-warmer navy than Navy, tuned for running text.
- **Gray** — alt section background / input fill.
- **White** — surface fill. Cards, inputs, table cells, modal panels.
- **Border** — default hairline. Navy at 10%. 1px on every card and surface.

Support tier: **Error Red** (destructive), **Lighter Red** (soft warning), **Blue** (inline link, rare), **Dark Grey** (inactive chrome, slide numbers).

## Background surfaces

Six canonical section backgrounds. Pick one per section — don't invent new ones.

| Surface | Canvas | Typical text |
| --- | --- | --- |
| White | white | Navy headings, Body Text paragraphs |
| Gray | gray | Navy headings, Body Text paragraphs |
| Tint | tint | Navy headings, Body Text paragraphs |
| Green | green | Navy headings and body |
| Cyan | cyan | Navy headings and body |
| Navy | navy | White body; **green** eyebrows |

## Rules

### 1. Primary CTA is Green, not Coral

Every submit button, success chip, and hover-go-state uses green. Coral is a **secondary** accent — eyebrows, labels, the occasional alt-CTA where green would collide with surrounding green. If a page already has a coral eyebrow nearby, a coral button is wrong; use navy or outline.

### 2. Text defaults to Body Text, headings to Navy

Paragraphs: Body Text. Headings: Navy. Muted / timestamp: Dark Grey. True black (`#000`) is never correct. Don't substitute navy at 80% opacity for Body Text — Body Text is a deliberately-tuned not-quite-navy.

### 3. Borders are 10%-navy hairlines at 1px

The hairline border is the visual grammar of a surface. Use the `Border` token (navy at 10%). No 2px borders. No solid light-grey (`#d9d9d9` is deprecated).

### 4. Canvas and surface don't swap

Tint / Gray are section backgrounds; White is the surface on those sections. Never put tint on a card and white around it.

### 5. Eyebrows swap color by surface luminance

An eyebrow is the small uppercase label above a headline — "SUPPLY CHAIN INTELLIGENCE", "NEXT STEPS". Its color depends on what it sits on:

- **Light surface** (white, gray, tint, cyan, green) → eyebrow is **Coral**.
- **Dark surface** (navy) → eyebrow is **Green**.

Coral on navy reads muddy; green on navy reads crisp the way coral does on white. Body and headline text on a navy surface stays white — **only the eyebrow swaps.**

The surface-aware aliases in `tokens.md` § 1.3 (`--gx-eyebrow-on-light`, `--gx-eyebrow-on-dark`) encode this rule so CSS rules name the role, not the color.

### 6. Three-up accents cycle Green → Cyan → Coral (navy only)

When three parallel items sit in a row on a **navy** surface — three display stats, three numbered steps, three big numerals — the accent on each item cycles rather than all sharing the same color:

1. Green
2. Cyan
3. Coral

The cycle gives a three-up arrangement visual variety without introducing a new color. Each cycle color already lives in the palette and pulls equal weight against navy.

**The cycle is navy-only.** On light canvases pale cyan against tint or white is effectively invisible and green is only marginally better. Three-up stats on a light surface stay **all coral** — the one palette color with enough contrast against a light ground.

The cycle applies to the **numeral or icon** of each item, not its body copy. Body copy stays white (on navy) or Body Text (on light). Small eyebrows don't cycle.

Two-item and four-plus arrangements don't cycle: two uses the normal eyebrow rule, four-plus uses the primary accent for all items (introducing more colors becomes noisy).

### 7. New colors go to tokens.json first

If a new use case arises (a chart color, a warning tier), add it to `tokens.json` *before* using it — with a semantic name and a role, and a matching row in `tokens.md` § 1. Re-run `scripts/generate-mirrors.mjs` so the new value flows into `constants.generated.ts` and the `styles.css` `:root` block. Then the medium-specific skills pick up the new token automatically.

## Don'ts

- **No new oranges.** Use Coral, or a neutral.
- **No `#000`.** Navy for headings, Body Text for paragraphs.
- **No `rgba` variants** of the core palette colors. The `Border` token is the one sanctioned alpha usage.
- **No gradients on surfaces or text.** The thin brand accent bar (see `patterns.md` pattern 8) is the only gradient the system sanctions.
- **No system palette fallbacks.** On print or monochrome, use the closest neutral from this palette.
- **Don't re-declare hex values.** Every medium-specific skill reads them from auto-generated mirrors of `tokens.json` and names them identically in its native format.
