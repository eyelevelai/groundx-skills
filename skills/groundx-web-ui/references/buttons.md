# Buttons

Every action in the GroundX UI falls into one of a small number of button patterns. Pick the right one from this decision tree — don't invent a new button style.

> **Primary is Green, not Coral.** The authoritative style guide sets `GREEN #a1ec83` as the primary CTA fill with navy text (see `../../groundx-design-standards/references/colors.md` rule 1). Coral is reserved for eyebrows, highlight pills, and the occasional secondary alt-CTA. The dashboard's current `CommonSubmitButton` still ships with a coral fill + green-hover; that's a migration target, not the canonical style. New components should use green-fill-at-rest.

## Decision tree

```
Is this a primary action (submit, create, confirm)?
├── Yes → CommonSubmitButton
└── No
    Is this a secondary "cancel" paired with a primary in a modal footer?
    ├── Yes → CommonCancelButton
    └── No
        Is this "go back" / breadcrumb navigation?
        ├── Yes → <Button variant="gx-back-button">
        └── No
            Are these 2–3 mutually navigational actions in a card
            (like "Retrievals | Chat")?
            ├── Yes → GxButtonGroup
            └── No
                Is this a status indicator you want to show, not click?
                ├── Yes → GxPill (not a button)
                └── No
                    Is this the premium-tier upgrade CTA?
                    ├── Yes → <Button variant="gx-premium-button">
                    └── No → <Button variant="outlined">, navy border + coral text (secondary accent)
```

## Primary action: `CommonSubmitButton`

**Target style (new):** Green `#a1ec83` fill, navy text, fontWeight 600, uppercase, `borderRadius: 200px` (pill). Hover darkens the green ~8%.

**Current shipped component:** Coral fill, white text, hover flips to green fill with navy text. Slated for migration to the target style above; until then, both call sites continue to work against this file's decision tree.

```tsx
<CommonSubmitButton onClick={handleSubmit}>
  Save Changes
</CommonSubmitButton>
```

Common modifiers:

- **Extra-rounded pill** for standalone CTAs: `sx={{ borderRadius: BORDER_RADIUS_4X }}`.
- **Start icon**: `startIcon={<AddIcon />}`.
- **Inverted** (start in the green state): `<CommonSubmitButton invert>`. Use for secondary confirm actions where you don't want to fight the primary CTA on the same screen.
- **No uppercase**: `<CommonSubmitButton isUppercase={false}>`. Rare. Use for CTAs with long / sentence-case labels.
- **Disabled** state: relies on MUI's default disabled styling (grey). Don't override.

## Secondary / cancel: `CommonCancelButton`

```tsx
<DialogActions>
  <CommonCancelButton onClick={onClose}>Cancel</CommonCancelButton>
  <CommonSubmitButton type="submit">Save</CommonSubmitButton>
</DialogActions>
```

Use **only** when paired with a `CommonSubmitButton` in a modal footer. If you need a standalone secondary button (not a cancel), prefer `<Button variant="outlined">` with navy border + navy text; a coral variant is available for "highlight" secondary CTAs (rare — used when coral eyebrows aren't already nearby).

## Back navigation: `gx-back-button` variant

```tsx
<Button variant="gx-back-button" startIcon={<NavigateBeforeIcon />}>
  Back
</Button>
```

Coral text, no uppercase, no background. Renders at the top of sub-pages, above the first card.

## Segmented group: `GxButtonGroup`

```tsx
<GxButtonGroup variant="outlined">
  <Button>Retrievals</Button>
  <Button>Chat</Button>
</GxButtonGroup>
```

Navy 1px outline, white background, internal divider. Each inner button hovers to green. Use for 2–3 related navigational actions. If you need > 3 actions, stack individual `CommonSubmitButton`s in a `<Stack direction="row">` instead — the segmented group gets unreadable.

## Status indicator: `GxPill`

```tsx
<GxPill>X-RAY</GxPill>
<GxPill variant="success">Complete</GxPill>
<GxPill variant="warning">Processing</GxPill>
<GxPill variant="error">Failed</GxPill>
```

Not a button. A label. Pass `onClick` only when tapping the pill does something meaningful (rare).

## Icon-only buttons

Use MUI `<IconButton>`. The theme override gives it a `CYAN` background with `GREEN` hover — works out of the box.

```tsx
<IconButton size="small" aria-label="copy bucket id">
  <ContentCopyIcon fontSize="small" />
</IconButton>
```

Always include `aria-label`. Icon sizes: `small` in dense table rows, `medium` default, `large` reserved for empty-state hero icons.

## Premium gradient: `gx-premium-button`

The pink-to-orange gradient pill, used exclusively for the premium-tier Upgrade CTA:

```tsx
<Button variant="gx-premium-button">Upgrade to Premium</Button>
```

Do not use this variant for any other CTA. It's loud on purpose.

## Pill CTA pattern ("+ NEW BUCKET")

A standalone wide-pill action — used for "+ NEW BUCKET", "+ ADD CONTENT", and similar create-entity affordances. It's a `CommonSubmitButton` with extra rounding + an AddIcon:

```tsx
<CommonSubmitButton
  startIcon={<AddIcon />}
  sx={{ borderRadius: BORDER_RADIUS_4X, px: 2.5 }}
>
  New Bucket
</CommonSubmitButton>
```

## Button sizing

MUI default sizing (`size="medium"`) is the norm. Use `size="small"` inside table rows or dense action groups. Don't use `size="large"` — the primary fill is loud enough at medium that large feels aggressive.

## Don'ts

- **Don't `MuiButton` directly** for primary actions. Use `CommonSubmitButton`.
- **Don't stack two `CommonSubmitButton`s side-by-side** unless they're semantically equivalent (e.g. a set of bucket actions). If one is primary and one is secondary, use Cancel + Submit.
- **Don't colorize cancel buttons.** `CommonCancelButton` is grey on purpose — coloring it destroys the pairing's visual hierarchy.
- **Don't add `variant="contained"` to `CommonSubmitButton`.** It already has it.
- **Don't hardcode hex colors** in button styles. Everything comes from tokens.
