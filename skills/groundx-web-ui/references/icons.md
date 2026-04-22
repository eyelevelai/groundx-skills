# Icons (web)

All standard UI icons come from `@mui/icons-material`. Custom app icons (file-type glyphs, brand marks for empty states) live in `src/shared/icons/`.

**For logo and brand-mark placement** see the standards skill's `logos.md`. This document covers UI icons only.

## MUI icons

Always import icon components; never inline SVG:

```tsx
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
```

Common usage in the dashboard:

| Icon | Where |
| --- | --- |
| `AddIcon` | "+ NEW BUCKET", "+ ADD CONTENT" pill CTAs |
| `NavigateBeforeIcon` | Back button |
| `ExpandMoreIcon` | Accordion expander (use `sx={{ color: CORAL_ORANGE }}`) |
| `ContentCopyIcon` | Copy bucket/document IDs |
| `DownloadIcon` | File download in table rows |
| `DeleteIcon` | Destructive actions |
| `CloudUploadIcon` | Upload zones |
| `MoreVertIcon` | Row/card context menu |
| `ChevronLeftIcon` | Drawer collapse toggle |
| `CloseIcon` | Modal close (inside DialogTitle) |
| `PlayCircleOutlineIcon` | Tutorials nav link |
| `Inventory2Icon` | Content / Buckets nav link |
| `HomeIcon` | Home nav link |

## Custom SVG icons

Custom SVGs live in `src/shared/icons/`:

| File | Purpose |
| --- | --- |
| `BucketsSVG.tsx` | Bucket glyph — used in empty states. |
| `CodeSVG.tsx` | Code / API glyph. |
| `HeartbeatSvg.tsx` | Service health indicator. |
| `FileTypeSVG/*.tsx` | Per-format file icons (PDF, DOCX, JPG, PNG, XLSX, CSV, JSON, PPTX, TSV, TXT). |

Rules:

- **Check `src/shared/icons/FileTypeSVG/` first** when you need a file-type icon — don't import a generic document icon.
- **Don't inline SVG markup** in a component. Promote it to `src/shared/icons/` with a proper component export.
- **Icon fill colors** should come from palette tokens (passed via props), not hardcoded inside the SVG.

## Sizing

Use MUI size tokens, never hardcoded px:

| Size | When |
| --- | --- |
| `fontSize="small"` | Inside table rows, adjacent to text labels. |
| `fontSize="medium"` | Default — most nav and button icons. |
| `fontSize="large"` | Empty-state hero icons, dropzone icons. |

Don't pass raw `fontSize: "16px"` or `fontSize: 20`. Stick to the named tokens so density is consistent.

## Color

Icons inherit `currentColor` by default — they'll pick up the text color of their parent. To color an icon explicitly, pass `sx={{ color: CORAL_ORANGE }}` (or another token). Never use a hex literal.

For the `ExpandMoreIcon` on accordions, the dashboard convention is `sx={{ color: CORAL_ORANGE }}` so the expander reads as a brand accent.

## IconButton wrapper

Use MUI `<IconButton>` for clickable icons. The theme override sets a `PALE_AQUA` background with `ACTIVE_GREEN` hover — works out of the box.

```tsx
<IconButton size="small" aria-label="copy bucket id">
  <ContentCopyIcon fontSize="small" />
</IconButton>
```

Always include `aria-label`. Icon sizes inside an `IconButton`: `small` in dense table rows, `medium` default.

## Accessibility

- **Every interactive icon needs `aria-label`.** An `IconButton` with no visible text must have one, or the button is invisible to screen readers.
- **Decorative icons** (inside a button that already has a text label, like `startIcon={<AddIcon />}` on `<CommonSubmitButton>New Bucket</CommonSubmitButton>`) should be marked `aria-hidden="true"` — or trust MUI's built-in handling for `startIcon`/`endIcon`.
- **Color is never the only signal.** A red pill that says "failed" also contains the word "Failed".

## Favicon

The app's favicon is referenced from `index.html`. If you're adding a new public-facing page, the default favicon wiring already handles it — no per-page override needed. See the standards skill's `logos.md` for favicon/app-icon guidance (cropped-G convention).

## Don'ts

- **Don't inline SVG** in a component file. Promote it to `src/shared/icons/`.
- **Don't hardcode pixel fontSize** on icons. Use `small|medium|large`.
- **Don't import a generic document icon** when a file-type variant exists in `FileTypeSVG/`.
- **Don't skip `aria-label`** on IconButton.
- **Don't hardcode fill colors inside SVG files**. Accept `color` as a prop and default to `currentColor`.
