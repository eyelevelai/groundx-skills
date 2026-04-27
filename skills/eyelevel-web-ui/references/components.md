# Component Library

EyeLevel's de-facto component library is a small set of wrappers around MUI primitives — `GxCard`, `GxPill`, `GxSectionHeader`, `GxButtonGroup`, `GxUsageCard`, `CommonSubmitButton`, `CommonCancelButton`, `CommonTextField`, plus a handful of accessory components. This document lists each wrapper, what it's for, and what to reach for *instead* if you're tempted to build something new.

These wrappers ship in `templates/shared/components/` of this skill and live at `src/shared/components/` in every project the skill produces. The set is shared across every project — dashboard, marketing site, internal tool, demo, product UI — so a component built for one project drops into another without rewrites. If a wrapper isn't in the project yet, port it from `templates/shared/components/` before using it; don't re-spell its styles inline.

**Brand contract sections** under each wrapper describe what the wrapper actually does at the brand layer (white fill, 1px hairline, 20px radius, etc.). That's useful when you're reading the wrapper to understand it, when you're verifying that a port from `templates/` landed correctly, or when you're reviewing existing code for drift. It is **not** an invitation to skip the wrapper and re-implement its contract inline — always use the wrapper.

**Rule of thumb**: if you're about to write the word `Card`, `Button`, `Chip`, or `Paper` from MUI directly, stop and check this list first.

The wrappers below are grouped by purpose, not by where they originated. Some were first abstracted in this skill, some predate it in the dashboard repo; the canonical implementation lives in `templates/shared/components/` either way, and every project — dashboard or otherwise — should be using that canonical version.

## Surface primitives

Wrappers that define the brand's flat-surface treatment.

### `GxCard`

The canonical EyeLevel surface — a white `Box` with a 1px `BORDER` hairline, `BORDER_RADIUS_CARD` rounding, no shadow, and `PADDING` inside.

**Brand contract:** white fill, `1px solid rgba(41,51,92,0.1)` hairline border, 20px corner radius, no shadow, internal padding from the spacing scale.

Use `GxCard` for every card-shaped surface in every project — a dashboard card, a feature tile on a landing page, a pricing tier, a testimonial block, a docs sidebar tree wrapper. Don't use raw `<Card>`, don't re-spell this in inline `sx`. If `GxCard` isn't in the project yet, port `templates/shared/components/GxCard.tsx` to `src/shared/components/GxCard.tsx` first, then use it. Variants:

- `radius="lg"` (default) — top-level cards.
- `radius="sm"` — inner/nested surfaces like table wrappers.
- `interactive` — adds a hover state for clickable cards.
- `noPadding` — when you want to control the inside yourself (common for tables).

### `GxSectionHeader`

A label + optional action row, used anywhere a region of a page needs a header — section title on the left, optional action (usually a button) on the right. Renders the label literally — pass it UPPERCASE in the caller. Examples: `TUTORIAL`, `CONTENT`, `YOUR BUCKETS`, `FEATURES`, `PRICING`, `RECENT ACTIVITY`.

### `GxUsageCard`

A composite card that pairs usage progress bars with an upgrade CTA. Composed from `LinearProgress` + typography + a pill `<Button>`. Originally built for a "Your plan allows…" sidebar callout but the same composition works for any "X of Y used" surface — storage meters, quota panels, plan-tier readouts.

## Action wrappers

Wrappers that codify the brand's button / pill / segmented-control patterns.

### `CommonSubmitButton`

The coral-fill primary action. On hover the fill flips to green and the label color flips to navy. Props: `invert` (start in the flipped state), `isUppercase` (defaults to `true`). Use for any primary CTA in any project.

**Brand contract:** coral fill at rest, green fill on hover (the EyeLevel convention). Label is uppercase and literal. Fully rounded (pill radius). No shadow. On the green hover state, label color is navy.

Reach for it when —

- Form submit buttons.
- Pill-shaped create-entity actions (`+ NEW BUCKET`, `+ ADD CONTENT`, `+ NEW PROJECT`, `+ INVITE TEAMMATE`) — pass `sx={{ px: 2.5 }}` for a wider affordance (the pill shape is already the default).
- Action rows on entity headers (delete / chat / share / export and similar).
- Marketing-site and landing-page CTAs (`Talk to Sales`, `Start free`, `Book a demo`).

If `CommonSubmitButton` isn't in the project yet, port `templates/shared/components/CommonSubmitButton.tsx` to `src/shared/components/`. **Don't substitute a green-rest button** or a different hover color anywhere, including on marketing surfaces — coral-rest, green-hover, navy text on the hover state is the EyeLevel convention everywhere, and mutual portability depends on it.

### `CommonCancelButton`

The secondary text-style action paired with `CommonSubmitButton` in modal footers. Grey label that lifts to green on hover. Don't use it alone — if you need a single secondary button, use a plain `<Button variant="outlined">` with the coral colors documented in `buttons.md`.

### `GxButtonGroup`

A segmented control for 2–3 mutually-navigational actions inside a card — examples include `RETRIEVALS | CHAT`, `MONTHLY | YEARLY` toggles on a pricing card, `OVERVIEW | ACTIVITY | SETTINGS` tabs inside a detail surface. For 4+ actions, just stack `CommonSubmitButton`s in a `<Stack direction="row">` instead — the segmented group gets unreadable.

### `GxPill`

A non-interactive status indicator. Variants: `default | success | warning | error | info`. Pass `dense` for table-row density. Examples: a file's processing state on a row in a buckets table, a plan tier on an account card, a status badge on a deployment list, a category tag on a blog post card.

**Brand contract:** fully rounded (200px / `9999px`), small uppercase label (literal), color comes from the semantic palette (success-green, warning-amber, error-red, info-cyan). Never used as a button — color is not the only signal; the label states the status word.

## Form wrappers

### `CommonTextField`

Outlined TextField wrapped with EyeLevel form defaults (white background, 6px radius matching the input radius from the standards' `BORDER_RADIUS` token, 16px top margin). Pass `dense` to drop the top margin when composing with `<Stack spacing={2}>`.

## Accessory components

A second tier of small wrappers — tooltips, copy-to-clipboard icons, download buttons, dropdown menus, loading dots, and similar. They ship canonically in `templates/shared/components/` alongside the `Gx*` / `Common*` set above; port them into a new project's `src/shared/components/` the same way you port the rest of the wrapper layer. Each is short (15–80 lines) and follows the same brand contracts: tokens from `@/constants`, no hex literals, MUI size tokens on icons, `aria-label`s on every interactive element.

| Component | Purpose |
| --- | --- |
| `CommonToolTip` | Styled MUI Tooltip with navy fill + white text. Drop-in replacement for `<Tooltip>` — same prop API. |
| `CommonCloseIcon` | Pre-labelled close-icon `IconButton`. Defaults to `size="small"` and `aria-label="close"`. |
| `DialogTitle` | Modal title row with built-in close button. Pair with MUI's `Dialog` + `DialogContent` + `DialogActions`. Pass title text as children + an `onClose` callback. |
| `DropdownMenu` | Generic anchored menu (account menu, sort menu, action overflow). Pass a `trigger` render function and an `items` array. |
| `CopyToClipboard` | Copy-to-clipboard `IconButton` with check-glyph feedback after a successful copy. Use beside any inline ID, code, or value. |
| `DownloadButton` | Download `IconButton`. With `href`, renders as a native `<a>` download; without, runs an `onClick` handler. |
| `LoadingDots` | Three pulsing dots for inline loading affordances. Coral by default; pass `color` for a context override. Carries `role="status"`. |
| `UsageBar` | Single "X of Y used" progress bar. Used inside `GxUsageCard`, also fine standalone for storage / quota / billing strips. |
| `VideoPlayer` | `<video>` wrapped in the brand surface treatment — card radius, hairline border, navy letterbox fallback. |
| `CodeSnippet` | Multi-tab code-example viewer (cURL / JavaScript / Python / etc.) with built-in copy-to-clipboard. Use on API documentation screens. |

## What to build vs. what to compose

Build new components freely — projects vary widely and most pages need shapes that don't exist in the small `Gx*` / `Common*` set. A marketing site needs hero sections, feature grids, pricing tables, testimonial blocks, footers; a docs site needs a sidebar tree, code-sample tabs, breadcrumb headers; an internal tool needs whatever it needs. Build them.

The composition rule is unchanged across project types:

1. **Compose first.** If the new shape can be assembled from existing wrappers (`GxCard` + `GxSectionHeader` + `CommonSubmitButton`), do that — even if the call-site is verbose. Composition is what keeps the brand consistent.
2. **Promote to a wrapper when it repeats.** If a composition appears in ≥ 3 places and the inline JSX is more than ~10 lines, file it as a new component under `src/shared/components/` with a `Gx*` prefix (for primitives reusable across projects) or a descriptive name (for surface-specific composites like `HeroSection`, `PricingTable`, `FooterCallout`). Then add it to this doc so the next agent finds it.
3. **The brand contracts hold either way.** A new `HeroSection` still uses Inter, still picks colors from the EyeLevel palette via `@/constants`, still uses `GxCard` (or the same surface contract) where surfaces are needed, still follows the voice register from `eyelevel-design-standards/references/voice.md`, still passes the SKILL.md pre-return checklist.

The point isn't that everything must be `GxCard`. The point is that everything that *is* a card-shaped surface goes through `GxCard` — so if a designer changes the card radius from 20px to 18px brand-wide, one wrapper change updates every card in every project at once.

## Icons

Use `@mui/icons-material` for all standard icons. For custom glyphs (file type icons, logo marks), check `src/shared/icons/` first — most of what you need is there.

Do **not** embed raw SVG markup inline. If a custom SVG is needed, add it as a new file in `src/shared/icons/` and import.

## Forms

Form stack is Formik + Yup. See `examples/ExampleFormModal.tsx` for the canonical shape: Dialog wrapper, Formik with a Yup schema, `CommonTextField` fields in a `<Stack spacing={2}>`, footer with `CommonCancelButton` + `CommonSubmitButton`. The dashboard's modals at `views/*/Modal/*.tsx` follow this same shape — match either reference.
