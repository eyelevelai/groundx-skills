# Surfaces & Cards

The GroundX visual language is **flat**. Cards sit on the tint canvas with a hairline border; there are no drop shadows, no Material elevation, and no layered z-index depth. This is intentional — the green (primary) + coral (accent) colors do the visual work, so surfaces stay calm.

## The canonical card

Every card-shaped surface looks like this:

```tsx
<Box
  sx={{
    backgroundColor: WHITE,
    border: `1px solid ${BORDER}`,        // rgba(41, 51, 92, 0.1)
    borderRadius: BORDER_RADIUS_CARD,     // 20px
    boxShadow: "none",
    padding: PADDING,                     // theme.spacing(2) = 16px
  }}
>
  …content…
</Box>
```

**Use `GxCard` instead of writing this inline.** It's the same thing with the props baked in. The inline version above is shown only so the pattern is recognizable when you see it elsewhere in the codebase.

## Why `GxCard` and not MUI `<Card>`

The dashboard's existing code uses both, inconsistently. We're standardizing on `GxCard` (which is just a `Box`) because:

1. MUI's `<Card>` carries `elevation` and `Paper` defaults that we always have to undo.
2. A `Box`-based wrapper composes better with drag-and-drop handlers, refs, and layout props.
3. Any sx override you want to add sits at the top level, not nested inside `<CardContent>`.

If you find existing code using `<Card>`, replace it during the same PR — it's a safe change.

## Radii by surface type

The ladder itself (4 / 6 / 12 / 20 / 200 px) is defined in `../../groundx-design-standards/references/tokens.md` § 5 — don't restate it; import the tokens by name. The table below just maps each surface type onto the right token.

| Surface | Token |
| --- | --- |
| Top-level card | `BORDER_RADIUS_CARD` |
| Nested surface (table wrapper inside a card) | `BORDER_RADIUS` |
| Input field | `BORDER_RADIUS` |
| Dropdown menu / toast | `BORDER_RADIUS_2X` |
| Modal (Dialog Paper) | `BORDER_RADIUS_CARD` |
| Segmented button group (outer pill, internal straight edges) | `BORDER_RADIUS_PILL` |
| Button (primary + secondary) | `BORDER_RADIUS_PILL` |
| Pill / chip / tag | `BORDER_RADIUS_PILL` |
| Tight inner shape (divider wrap, inline chip) | `BORDER_RADIUS_SM` |

## Asymmetric radii

The bucket row uses asymmetric corners: rounded on the left (where the info card lives), flat where it meets the upload zone, and fully rounded on mobile when the two stack vertically. Build this via responsive `borderRadius` in `sx`:

```tsx
borderRadius: {
  xs: BORDER_RADIUS_CARD,                  // 20px stacked
  md: `${BORDER_RADIUS_CARD} 0 0 ${BORDER_RADIUS_CARD}`,
}
```

See `examples/ExampleDashboardPage.tsx > BucketRow` for the full composition.

## Padding rules

- **Default inner padding**: `PADDING` (16px). Use this unless you have a reason.
- **Headers inside a card**: no extra padding needed; `PADDING` gives enough breathing room.
- **Tables inside a card**: set `noPadding` on `GxCard` and let the table control its own cell padding.
- **Image-only cards** (e.g. video poster frames): `p: 0`, and apply `overflow: hidden` so the image doesn't bleed past the radius.

## Stacking

Stack top-level cards with `<Stack spacing={3}>` (24px). Don't apply `mb` to cards individually — it makes the vertical rhythm fragile when you reorder.

Within a card, stack internal sections with `<Stack spacing={2}>` (16px).

## Divider lines

Use MUI `<Divider>` rather than borders. The theme sets `divider` to `BORDER` so a bare `<Divider />` just works. Don't paint divider lines with 1px borders — you'll get double lines when the adjacent card border is also `BORDER`.

## Colored / accent surfaces

Occasionally a card needs to stand out. The canonical surface variants are:

Hex values for every color below live in `../../groundx-design-standards/references/tokens.md` § 1.1.

| Variant | Background | Text | Use |
| --- | --- | --- | --- |
| Default | `WHITE` | `BODY_TEXT` paragraphs, `NAVY` headings | The default everywhere. |
| Gray | `GRAY` | `BODY_TEXT`, `NAVY` | Alt section bg to break long white pages; input field fill. |
| Tint | `TINT` | `BODY_TEXT`, `NAVY` | Callouts, tutorial hints, info panels. |
| Cyan | `CYAN` | `NAVY` (both heading and body) | Secondary accent panel, quiet feature card. |
| Green | `GREEN` | `NAVY` (both heading and body) | Primary feature card at rest; success surface. |
| Navy | `NAVY` | `WHITE` body + `GREEN` eyebrow | Dark sidebar card, emphasis panel. |

Rules:

- Keep the same border + radius rules across all variants.
- Don't introduce a new background color for one-off emphasis — pick from the six above. If none of them fits, the emphasis probably belongs in a different pattern (a pill, a stat, a different layout), not a new color.
- Eyebrows swap by surface luminance: Coral eyebrows on White / Gray / Tint / Cyan / Green; Green eyebrows on Navy. See `../../groundx-design-standards/references/colors.md` rule 5.

## Modals

Modals are surfaces too. Set `PaperProps={{ sx: { borderRadius: BORDER_RADIUS_CARD } }}` on MUI `<Dialog>` so the modal panel matches card rounding. The DialogTitle pattern from `examples/ExampleFormModal.tsx` shows the standard header + close-button layout.

## Don'ts

- **No box-shadow.** Ever. If a surface needs more emphasis, change its background (see "Colored / accent surfaces").
- **No elevation props.** `elevation={0}` is the default in the theme, but don't even pass the prop.
- **No hex literals in borderColor.** Use `BORDER` or `theme.palette.divider`.
- **No `MuiCard`.** Use `GxCard`.
- **No deprecated `#d9d9d9` border.** The hairline is `BORDER` (10% navy) — migrate any solid-grey border you encounter.
