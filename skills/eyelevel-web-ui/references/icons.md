# Icons (web)

All standard UI icons come from `@mui/icons-material`. Custom app icons (file-type glyphs, brand marks for empty states) live in `src/shared/icons/`.

**For logo and brand-mark placement** see the standards skill's `logos.md`. This document covers UI icons only.

## MUI icons

Always import icon components; never inline SVG:

```tsx
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
```

The MUI icon library is the canonical source for standard UI icons across every EyeLevel project — a dashboard, a marketing site's nav menu, an internal tool's row actions all import the same way. The dashboard's icon vocabulary is a useful starting reference for which icon goes with which role; reuse it where the role matches:

| Icon | Where the dashboard uses it (illustrative) |
| --- | --- |
| `AddIcon` | Pill-shaped create-entity actions — "+ NEW BUCKET", "+ ADD CONTENT" — and equivalent CTAs in any project. |
| `NavigateBeforeIcon` | Back-button affordance on sub-pages. |
| `ExpandMoreIcon` | Accordion expander (use `sx={{ color: CORAL }}`). |
| `ContentCopyIcon` | Copy-to-clipboard affordance beside any inline ID, code, or value. |
| `DownloadIcon` | File download in table rows. |
| `DeleteIcon` | Destructive actions. |
| `CloudUploadIcon` | Upload zones / drag-drop targets. |
| `MoreVertIcon` | Row / card context menu (overflow). |
| `ChevronLeftIcon` | Drawer collapse toggle. |
| `CloseIcon` | Modal close (inside `DialogTitle`). |
| `PlayCircleOutlineIcon` | Video / tutorial affordance. |
| `Inventory2Icon` | A "buckets" / collection-of-records nav link in the dashboard; reusable for any analogous nav item. |
| `HomeIcon` | Home nav link. |

Other projects will need icons not listed here (a marketing-site nav menu, a docs site's table-of-contents toggle). Reach for whatever `@mui/icons-material` icon fits the role; the rule is that icons come from MUI, not from inlined SVG.

## Custom SVG icons

Custom SVGs live in `src/shared/icons/` in every project. The dashboard ships a baseline set that is illustrative of what tends to land there:

| File (in dashboard) | Purpose |
| --- | --- |
| `BucketsSVG.tsx` | A glyph for the bucket / collection concept — used in dashboard empty states. |
| `CodeSVG.tsx` | A code / API glyph. |
| `HeartbeatSvg.tsx` | Service health indicator. |
| `FileTypeSVG/*.tsx` | Per-format file icons (PDF, DOCX, JPG, PNG, XLSX, CSV, JSON, PPTX, TSV, TXT). |

A new project may bring different custom glyphs — a marketing site might add brand mark variants, partner logos, or product-tier badges; a docs site might add language or framework logos. The conventions below apply regardless of which custom SVGs land in `src/shared/icons/`.

Rules:

- **Check `src/shared/icons/` first** when you need a custom glyph — the dashboard's `FileTypeSVG/` set is portable, and earlier work in the same project may have added analogous icons.
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

Icons inherit `currentColor` by default — they'll pick up the text color of their parent. To color an icon explicitly, pass `sx={{ color: CORAL }}` (or another token). Never use a hex literal.

The convention for accordion expanders (`ExpandMoreIcon`) is `sx={{ color: CORAL }}` so the expander reads as a brand accent — apply the same convention anywhere an accordion-style affordance shows up.

## IconButton wrapper

Use MUI `<IconButton>` for clickable icons. The theme override sets a `CYAN` background with `GREEN` hover — works out of the box.

```tsx
<IconButton size="small" aria-label="copy id">
  <ContentCopyIcon fontSize="small" />
</IconButton>
```

Always include `aria-label`. Icon sizes inside an `IconButton`: `small` in dense table rows, `medium` default.

## Accessibility

- **Every interactive icon needs `aria-label`.** An `IconButton` with no visible text must have one, or the button is invisible to screen readers.
- **Decorative icons** (inside a button that already has a text label — e.g., `startIcon={<AddIcon />}` on `<CommonSubmitButton>New Project</CommonSubmitButton>`) should be marked `aria-hidden="true"` — or trust MUI's built-in handling for `startIcon`/`endIcon`.
- **Color is never the only signal.** A red pill that says "failed" also contains the word "Failed".

## Favicon

The app's favicon is referenced from `index.html`. If you're adding a new public-facing page, the default favicon wiring already handles it — no per-page override needed. See the standards skill's `logos.md` for favicon/app-icon guidance (cropped-G convention).

## Don'ts

- **Don't inline SVG** in a component file. Promote it to `src/shared/icons/`.
- **Don't hardcode pixel fontSize** on icons. Use `small|medium|large`.
- **Don't import a generic document icon** when a file-type variant exists in `FileTypeSVG/`.
- **Don't skip `aria-label`** on IconButton.
- **Don't hardcode fill colors inside SVG files**. Accept `color` as a prop and default to `currentColor`.
