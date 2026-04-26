# Buttons

Every action in an EyeLevel UI falls into one of a small number of button patterns. Pick the right one from this decision tree — don't invent a new button style.

> **Primary is Green, not Coral — at the brand layer.** The brand's primary CTA color is `GREEN` (see `../../eyelevel-design-standards/references/colors.md` rule 1; hex in `../../eyelevel-design-standards/references/tokens.md` § 1.1). Coral is the *secondary* highlight accent — eyebrows, highlight pills, the occasional alt-CTA.
>
> The way that resolves at the component layer is `CommonSubmitButton`'s **coral-fill-at-rest, green-fill-on-hover** behavior — the EyeLevel convention used in every project. The button starts coral so the eye lands on it, then flips to green at the moment of intent. The hover state is where the brand's primary-CTA color shows up, not the rest state. Don't redesign the rest state to be green-fill — the convention is shared across every EyeLevel-styled web project (dashboard, marketing site, internal tool, demo) and mutual portability depends on it.

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

**Style:** `CORAL` fill, white text, `fontWeight: 600`, uppercase, `borderRadius: BORDER_RADIUS_PILL` (the full-pill shape). On hover, the fill flips to `GREEN` and the label color flips to `NAVY`. This rest → hover behavior is the EyeLevel convention; use it everywhere — dashboard surfaces, marketing CTAs, internal tools alike.

```tsx
<CommonSubmitButton onClick={handleSubmit}>
  Save Changes
</CommonSubmitButton>
```

Common modifiers:

- **Full pill shape** for standalone CTAs: `sx={{ borderRadius: BORDER_RADIUS_PILL }}`. (The old `BORDER_RADIUS_4X` and `BORDER_RADIUS_3X` have been retired — their aliases now resolve to `BORDER_RADIUS_PILL` and `BORDER_RADIUS_CARD` respectively; migrate as you touch files.)
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
<IconButton size="small" aria-label="copy id">
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

## Pill CTA pattern (create-entity)

A standalone wide-pill action — used for create-entity affordances like `+ NEW BUCKET`, `+ ADD CONTENT`, `+ NEW PROJECT`, `+ INVITE TEAMMATE`. It's a `CommonSubmitButton` with extra rounding + an AddIcon:

```tsx
<CommonSubmitButton
  startIcon={<AddIcon />}
  sx={{ borderRadius: BORDER_RADIUS_PILL, px: 2.5 }}
>
  New Project
</CommonSubmitButton>
```

## Button sizing

MUI default sizing (`size="medium"`) is the norm. Use `size="small"` inside table rows or dense action groups. Don't use `size="large"` — the primary fill is loud enough at medium that large feels aggressive.

## Don'ts

- **Don't `MuiButton` directly** for primary actions. Use `CommonSubmitButton`.
- **Don't stack two `CommonSubmitButton`s side-by-side** unless they're semantically equivalent (e.g. a row of equally-weighted entity actions). If one is primary and one is secondary, use Cancel + Submit.
- **Don't colorize cancel buttons.** `CommonCancelButton` is grey on purpose — coloring it destroys the pairing's visual hierarchy.
- **Don't add `variant="contained"` to `CommonSubmitButton`.** It already has it.
- **Don't hardcode hex colors** in button styles. Everything comes from tokens.
