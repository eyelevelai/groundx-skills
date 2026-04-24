# Component Library

GroundX's de-facto component library is a small set of wrappers around MUI primitives. This document lists every component you're allowed to introduce, what it's for, and what to reach for *instead* if you're tempted to build something new.

**Rule of thumb**: if you're about to write the word `Card`, `Button`, `Chip`, or `Paper` from MUI directly, stop and check this list first.

## New (from the skill)

These live in `templates/components/` and don't exist in the dashboard repo yet. They codify patterns that were previously open-coded inline.

### `GxCard`

The canonical GroundX surface — a white `Box` with a 1px `BORDER` hairline, `BORDER_RADIUS_CARD` rounding, no shadow, and `PADDING` inside.

Use for **every** card-shaped surface. Don't use raw `<Card>`, don't re-spell this in inline `sx`. Variants:

- `radius="lg"` (default) — top-level cards.
- `radius="sm"` — inner/nested surfaces like table wrappers.
- `interactive` — adds a hover state for clickable cards.
- `noPadding` — when you want to control the inside yourself (common for tables).

### `GxPill`

Status pill for indicators like X-RAY on bucket files. Replaces the previous anti-pattern of using `CommonSubmitButton` as a non-interactive status badge. Variants: `default | success | warning | error | info`. Pass `dense` for table-row density.

### `GxSectionHeader`

The "TUTORIAL" / "CONTENT" / "YOUR BUCKETS" row: label on the left, optional action (usually a button) on the right. Renders the label literally — pass it UPPERCASE in the caller.

### `GxButtonGroup`

The segmented RETRIEVALS | CHAT button. Use for 2–3 mutually-navigational actions inside a card. For 4+ actions, just stack `CommonSubmitButton`s in a `<Stack direction="row">` instead.

### `GxUsageCard`

The sidebar "Your plan allows…" card with usage bars and Upgrade CTA. Composed from `LinearProgress` + typography + a pill `<Button>`.

## Existing (canonical rewrites)

These exist today in `src/shared/components/`. The skill's `templates/components/` versions apply small corrections (see `corrections.md`) and can be dropped in to replace them.

### `CommonSubmitButton`

The coral-fill primary action. On hover it flips to green. Props: `invert` (start in the flipped state), `isUppercase` (defaults to `true`). Use for any primary CTA.

When to reach for it:

- Form submit buttons
- "+ NEW BUCKET", "+ ADD CONTENT" pill actions (add `sx={{ borderRadius: BORDER_RADIUS_PILL }}` for extra roundness)
- Delete / Chat / Retrievals action rows in bucket headers

### `CommonCancelButton`

The secondary text-style action paired with `CommonSubmitButton` in modal footers. Grey label that lifts to green on hover. Don't use it alone — if you need a single secondary button, use a plain `<Button variant="outlined">` with coral colors.

### `CommonTextField`

Outlined TextField wrapped with GroundX form defaults (white background, 12px radius, 16px top margin). Pass `dense` to drop the top margin when composing with `<Stack spacing={2}>`.

## Existing (reuse as-is)

These already exist in `src/shared/components/` and don't need the skill's canonical-rewrite treatment yet. Reach for them rather than reinventing:

| Component | Purpose |
| --- | --- |
| `CommonToolTip` | Styled MUI Tooltip. Use for any hover-triggered explanatory text. |
| `CommonCloseIcon` | Styled close button for modals and panels. |
| `DialogTitle` | Modal title row with close button. Pair with MUI's `Dialog` + `DialogContent` + `DialogActions`. |
| `DropdownMenu` | Account dropdown in the AppBar. |
| `CopyToClipboard` | The copy-to-clipboard icon used beside bucket IDs and document IDs. |
| `DownloadButton` | Icon button for file downloads. |
| `LoadingDots` | Animated dots for loading states. |
| `UsageBar/*` | The individual progress bars used in `GxUsageCard`. |
| `VideoPlayer` | Video embed — used in the tutorial card. |
| `CodeSnippet` | Multi-tab code example viewer (cURL / JS / Python). Use for API documentation screens. |

## What to build vs. what to compose

Before creating a new component, check the list above. Most "new" UI can be composed from `GxCard`, `GxSectionHeader`, and `CommonSubmitButton`. Create a new wrapper only when:

1. The pattern appears in ≥ 3 places, and
2. The inline `sx` block to reproduce it is longer than ~5 lines.

If you do create one, file it in `templates/components/` with a `Gx` prefix (for our primitives) or a descriptive name (for app-specific composites), and add it to this doc.

## Icons

Use `@mui/icons-material` for all standard icons. For custom glyphs (file type icons, logo marks), check `src/shared/icons/` first — most of what you need is there.

Do **not** embed raw SVG markup inline. If a custom SVG is needed, add it as a new file in `src/shared/icons/` and import.

## Forms

Form stack is Formik + Yup — match the existing pattern in `views/*/Modal/*.tsx`. See `examples/ExampleFormModal.tsx` for the canonical shape: Dialog wrapper, Formik with a Yup schema, `CommonTextField` fields in a `<Stack spacing={2}>`, footer with `CommonCancelButton` + `CommonSubmitButton`.
