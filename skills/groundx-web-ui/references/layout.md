# Layout & App Shell

The GroundX dashboard uses a classic three-piece shell: a persistent left **Drawer**, a fixed top **AppBar**, and a scrollable **Content** pane. Every authenticated page composes inside this shell.

## Shell anatomy

```
┌─────────────────────────────────────────────────────┐
│ [Drawer]                AppBar  (fixed, white)      │
│  ─ logo                                             │
│  ─ nav links           ────────────────────────     │
│  ─ usage card                                       │
│                                                     │
│  ─ bottom links         Content pane                │
│     (Docs,              (scrolls, bg=MAIN_BG)       │
│      API Keys,                                      │
│      Contact,                                       │
│      Settings)                                      │
└─────────────────────────────────────────────────────┘
```

## Drawer (left sidebar)

- **Background**: `NAVY`. White logo, light text, green active state (green eyebrow rule on dark surfaces; see `../../groundx-design-standards/references/colors.md` rule 5).
- **Width**: varies by breakpoint and open state:

| State | Width |
| --- | --- |
| Desktop (≥ md), open | `drawerWidth = 270px` |
| Tablet (< md), open | `drawerWidth − 80 = 190px` |
| Desktop, collapsed | `theme.spacing(8) = 64px` (icon-only rail) |
| Mobile (< sm), collapsed | `theme.spacing(5) = 40px` |

- **Transition**: width eases via `theme.transitions.create("width", …)`. Don't animate the individual nav items — let the drawer drive the transition.
- **Active nav state**: bold font, white icon, `backgroundColor: CORAL`. Inactive: `NAV_ICON_GREY` icons, muted label.
- **Usage card**: `GxUsageCard` sits between the top and bottom link groups. On the icon-only collapsed state it hides entirely (don't try to shrink it).

## AppBar (top)

- **Position**: `fixed`, width derived from the open state: `calc(100% - ${open ? drawerWidth : 0}px)`.
- **Background**: `WHITE`. Elevation `0` — no shadow, no bottom border.
- **Contents**: hamburger toggle (when drawer closed), page title in the center-left, user avatar dropdown on the right.
- The page title reflects the current route (e.g. "Dashboard", "Selected Bucket: 27051"). Use `react-helmet-async` for the document `<title>` and pass the display string to the AppBar via props or context — don't hardcode.

## Content pane

- **Top margin**: `theme.spacing(MAIN_CONTENT_TOP_MARGIN)` = 56px to clear the fixed AppBar.
- **Padding**: responsive, decreasing on smaller screens:

```tsx
padding: theme.spacing(MAIN_CONTENT_PADDING),      // 40px on desktop
[theme.breakpoints.down("md")]: { padding: theme.spacing(2) }, // 16px on tablet
[theme.breakpoints.down("sm")]: { padding: theme.spacing(1) }, // 8px on mobile
```

- **Background**: `TINT`. Cards inside the pane supply the white surfaces.
- **Height trick**: the app uses a `--vh` CSS custom property for iOS Safari viewport height correctness. Preserve the existing `html { height: calc(var(--vh, 1vh) * 100); }` rule when building new pages — it's not something you need to opt into, but don't accidentally override it.

## When to use the shell

**Do** use the shell for any authenticated in-app page. Compose inside the `<Outlet />` of `views/CoreLayouts/Dashboard.tsx`.

**Don't** use the shell for:

- Auth screens (sign in, reset password). Those have their own `AuthLayout`.
- Public marketing / pricing pages.
- Modals and dialogs. Those float above the shell.
- Standalone artifacts or embed-style screens.

## Composition pattern

A new page is typically a single component rendered inside the `Content` pane:

```tsx
export function MyPage() {
  return (
    <Stack spacing={3}>
      <GxCard>
        <GxSectionHeader label="MY SECTION" action={<MyAction />} />
      </GxCard>
      <GxCard>…</GxCard>
    </Stack>
  );
}
```

Vertical spacing between top-level cards is `theme.spacing(3)` (24px). Use `<Stack spacing={3}>` rather than setting `mb` on each card.

## Back navigation

Sub-pages (e.g. a specific bucket) use the `gx-back-button` theme variant at the top of the content pane, *above* the first card:

```tsx
<Button variant="gx-back-button" startIcon={<NavigateBeforeIcon />}>
  Back
</Button>
```

Do not put the back button inside a card. It's a page-level affordance, not content.

## Responsive behavior

- **≥ md (1100px)**: sidebar open, AppBar shifted right, bucket cards side-by-side.
- **sm–md (600–1099px)**: sidebar collapses to 190px (or icon rail when fully closed). Main padding drops to 16px. Bucket cards still side-by-side but narrower.
- **< sm (< 600px)**: sidebar goes to 40px icon rail. Main padding is 8px. Bucket info card + upload zone stack vertically with fully rounded corners.

Use `useThemeScreenDimensions()` (or inline `useMediaQuery(theme.breakpoints.down('md'))`) to branch in JS. Never hardcode `@media (max-width: 799px)` — migrate to the theme breakpoints.
