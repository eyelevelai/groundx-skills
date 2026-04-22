# Responsive Behavior

The dashboard targets three device classes: desktop, tablet, and mobile. Breakpoints are defined once in the theme — never reach for a hardcoded `@media (max-width: Xpx)` rule.

## Breakpoints

| Key | Min width | Device class |
| --- | --- | --- |
| `xs` | 0 | Mobile |
| `sm` | 600 | Large mobile / small tablet |
| `md` | **1100** | Tablet → desktop crossover (custom) |
| `lg` | 1200 | Desktop |
| `xl` | 1536 | Wide desktop |

The `md` breakpoint is bumped from MUI's default 900 → 1100 because that's where the sidebar collapses and bucket cards stack in the real app. Any new responsive logic should treat `md` as the primary "desktop" threshold.

## How to branch

Three approaches, in order of preference:

### 1. `sx` responsive values (preferred)

When you need different styles at different breakpoints, use sx's object-form values:

```tsx
<Box sx={{ padding: { xs: 1, md: MAIN_CONTENT_PADDING } }}>
<Stack direction={{ xs: "column", md: "row" }} spacing={2}>
```

This is declarative, colocated with the style it changes, and doesn't re-render on resize.

### 2. `useMediaQuery` (when JS needs to branch)

When you need to conditionally render different components (not just different styles):

```tsx
import { useMediaQuery, useTheme } from "@mui/material";

const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down("md"));

return isMobile ? <MobileNav /> : <DesktopNav />;
```

### 3. `useThemeScreenDimensions` (existing hook)

The dashboard has a `useThemeScreenDimensions` hook in `src/shared/hooks/` that returns named booleans for each breakpoint. Reach for it when you'd otherwise write multiple `useMediaQuery` calls:

```tsx
const { isDesktopScreen, isTabletScreen, isMobileScreen } = useThemeScreenDimensions();
```

## Standard breakpoint behaviors

### Sidebar Drawer

- **≥ md**: full 270px, open by default.
- **sm–md**: 190px when open, 64px icon rail when closed.
- **< sm**: 40px icon rail when closed; overlays the content when open.

### Content pane padding

- **≥ md**: 40px (`theme.spacing(MAIN_CONTENT_PADDING)`)
- **sm–md**: 16px (`theme.spacing(2)`)
- **< sm**: 8px (`theme.spacing(1)`)

### Bucket rows

- **≥ md**: info card (320px) + upload zone side-by-side, rounded-left corners only.
- **< md**: vertically stacked, each with full rounded corners.

### Action button rows (e.g. bucket header)

- **≥ md**: horizontal row of labeled pills (Delete / Chat / Retrievals / Add Content).
- **< md**: may wrap with `flexWrap: "wrap"` or collapse to icon-only — pick based on how crowded the row is.

### Modal width

- `fullWidth maxWidth="sm"` for most modals — MUI handles shrinking on narrow screens automatically.
- For data-heavy modals use `maxWidth="md"` and consider a mobile-only full-screen variant: `fullScreen={isMobile}`.

## Mobile-specific patterns

- **Touch targets**: minimum 44×44px hit area. For icon buttons in dense rows, prefer `size="medium"` on mobile and `size="small"` on desktop.
- **Table rows**: at `< sm` consider swapping to a card list rather than a table — wide tables with many columns don't work on phones.
- **Horizontal scroll**: acceptable for data tables and code blocks. Avoid it for primary page content.

## Viewport height

iOS Safari's `100vh` is a lie. The app uses a `--vh` CSS custom property set on window resize:

```css
body { height: calc(var(--vh, 1vh) * 100); }
```

This is set up in `main.tsx`. Preserve it — don't override `body { height: 100vh }` in a new stylesheet.

## Don'ts

- **Don't hardcode `@media (max-width: 799px)` or `@media (max-width: 1320px)`**. Migrate to `theme.breakpoints.down("md")` or add a new named breakpoint to the theme.
- **Don't conditionally render based on `window.innerWidth`** in component bodies. Use `useMediaQuery`.
- **Don't hide content on mobile without an alternative**. If an action isn't reachable on a phone, users can't use the feature — either make it responsive or hide it behind a clear "open on desktop" affordance.
