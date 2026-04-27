# Layout

EyeLevel-styled web projects use one of two layout vocabularies depending on what they are: an **app shell** for authenticated product UIs (the GroundX dashboard, internal tools, admin panels), and a **public-page layout** for marketing sites, landing pages, docs sites, and other unauthenticated surfaces. Both share the brand's tokens, wrappers, breakpoints, and typography — they differ only in the chrome that wraps the content.

This file documents the canonical version of each. If a project mixes both (a marketing site that includes an authenticated app), each surface picks the layout that fits its job.

```
Layout decision
├── Authenticated product / dashboard / admin / internal tool   → § App shell
├── Marketing site / landing page / docs site / public product page  → § Public-page layout
└── Auth screens, modals, embeds                                → neither (their own conventions)
```

## App shell

Authenticated product UIs use a classic three-piece shell: a persistent left **Drawer**, a fixed top **AppBar**, and a scrollable **Content** pane. The GroundX dashboard is the canonical reference; every authenticated page in the dashboard composes inside this shell, and a new product UI styled by this skill should use the same shape.

### Shell anatomy

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

### Drawer (left sidebar)

- **Background**: `NAVY`. White logo, light text, green active state (green eyebrow rule on dark surfaces; see `../../eyelevel-design-standards/references/colors.md` rule 5).
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

### AppBar (top)

- **Position**: `fixed`, width derived from the open state: `calc(100% - ${open ? drawerWidth : 0}px)`.
- **Background**: `WHITE`. Elevation `0` — no shadow, no bottom border.
- **Contents**: hamburger toggle (when drawer closed), page title in the center-left, user avatar dropdown on the right.
- The page title reflects the current route (e.g. "Dashboard", "Selected Bucket: 27051"). Use `react-helmet-async` for the document `<title>` and pass the display string to the AppBar via props or context — don't hardcode.

### Content pane

- **Top margin**: `theme.spacing(MAIN_CONTENT_TOP_MARGIN)` = 56px to clear the fixed AppBar.
- **Padding**: responsive, decreasing on smaller screens:

```tsx
padding: theme.spacing(MAIN_CONTENT_PADDING),      // 40px on desktop
[theme.breakpoints.down("md")]: { padding: theme.spacing(2) }, // 16px on tablet
[theme.breakpoints.down("sm")]: { padding: theme.spacing(1) }, // 8px on mobile
```

- **Background**: `TINT`. Cards inside the pane supply the white surfaces.
- **Height trick**: the app uses a `--vh` CSS custom property for iOS Safari viewport height correctness. Preserve the existing `html { height: calc(var(--vh, 1vh) * 100); }` rule when building new pages — it's not something you need to opt into, but don't accidentally override it.

### When to use the shell

**Do** use the shell for any authenticated in-app page in a product UI. In practice that means composing the page inside the route's `<Outlet />` (e.g., the dashboard puts its `<Outlet />` inside `views/CoreLayouts/Dashboard.tsx`; a different project would put it wherever its router renders the per-route view).

**Don't** use the shell for:

- Auth screens (sign in, reset password). Those have their own auth layout.
- Public marketing / pricing / landing pages — those use the public-page layout below.
- Modals and dialogs. Those float above the shell.
- Standalone artifacts or embed-style screens.

### Composition pattern (in-shell pages)

A new in-shell page is typically a single component rendered inside the `Content` pane:

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

### Back navigation

Sub-pages (a specific record, a detail view) use the `gx-back-button` theme variant at the top of the content pane, *above* the first card:

```tsx
<Button variant="gx-back-button" startIcon={<NavigateBeforeIcon />}>
  Back
</Button>
```

Do not put the back button inside a card. It's a page-level affordance, not content.

### Responsive behavior (shell)

- **≥ md (1100px)**: sidebar open, AppBar shifted right, in-page card grids side-by-side.
- **sm–md (600–1099px)**: sidebar collapses to 190px (or icon rail when fully closed). Main padding drops to 16px. Card grids still side-by-side but narrower.
- **< sm (< 600px)**: sidebar goes to 40px icon rail. Main padding is 8px. Card grids stack vertically with fully rounded corners.

Use `useThemeScreenDimensions()` (or inline `useMediaQuery(theme.breakpoints.down('md'))`) to branch in JS. Never hardcode `@media (max-width: 799px)` — migrate to the theme breakpoints.

## Public-page layout

Marketing sites, landing pages, docs sites, and other unauthenticated public surfaces use a different chrome — a top header bar, full-bleed sections, a footer — but the same brand vocabulary inside (Inter, the palette, `GxCard`, `CommonSubmitButton`).

### Page anatomy

```
┌─────────────────────────────────────────────────────┐
│  Header bar  (logo · nav links · primary CTA)       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Hero section  (full-bleed, often colored canvas)   │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Content sections  (alternating canvases, cards)    │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Footer  (logo · column nav · co-sign · legal)      │
└─────────────────────────────────────────────────────┘
```

### Header bar

A horizontal row pinned to the top of the page. Composition:

- **Left:** EyeLevel lockup (the light-surface PNG, `eyelevel-logo-color.png` — see `../../eyelevel-design-standards/references/logos.md`). The lockup includes "A VALANTOR COMPANY"; never re-typeset it.
- **Center or right:** primary navigation links (`PRODUCT`, `DOCS`, `PRICING`, `COMPANY`). Labels are literal uppercase strings. Inactive: `BODY_TEXT`. Active or hover: `NAVY`.
- **Far right:** primary CTA — a `CommonSubmitButton` (e.g., `BOOK A DEMO`, `START FREE`).

Background is `WHITE` with the `1px solid BORDER` hairline along the bottom edge — same divider treatment as everywhere else. No shadow, no fixed-elevation chrome.

Sticky vs. static is a per-project call; if sticky, use `position: sticky; top: 0;` rather than `fixed` so it participates in document flow.

### Hero section

The first content section. Full-bleed (edge-to-edge) on a colored canvas — typically `WHITE`, `GRAY`, `TINT`, `CYAN`, `GREEN`, or `NAVY`. The canvas selection is a brand decision (see `../../eyelevel-design-standards/references/colors.md` for which surfaces fit which messaging). Inner content stays inside a `maxWidth` constraint (commonly `1280px` or `1440px`) and centers horizontally.

Hero composition is project-specific — a centered headline + subhead + CTA, a left-aligned headline with a hero image on the right, a stat row beneath the headline, etc. The **rule** is the brand contracts: Inter typography, no shadows, eyebrow + headline + body uses the canonical pattern (see `../../eyelevel-design-standards/references/patterns.md`), CTAs are `CommonSubmitButton`, surfaces are flat.

Imagery is opt-in. A photo background on a hero is fine when the user asks for one; a solid colored canvas is the default.

### Content sections

Subsequent sections of the page. Each section is full-bleed on a chosen canvas, with inner content constrained to the same `maxWidth`. Vertical rhythm between sections is generous — at least `theme.spacing(10)` (80px) of padding above and below the inner content on desktop, decreasing responsively on smaller viewports.

Alternate canvas colors between adjacent sections (`WHITE` → `GRAY` → `WHITE` → `TINT`) so the page reads as discrete bands rather than one continuous wall. Cards (`GxCard`) inside sections supply the white surfaces when the section's own canvas is colored.

Common content-section shapes: a feature grid (`GxCard` × N in a responsive grid), a pricing table, a testimonial wall, a logo strip, a long-form text block, a CTA panel. Build each from existing wrappers — see *components.md* for the canonical wrappers and *components.md* > "What to build vs. what to compose" for when to promote a new shape (`HeroSection`, `PricingTable`, `FooterCallout`) into `src/shared/components/`.

### Footer

A bottom band on `NAVY` (or another dark canvas if the page's brand needs it). Composition:

- **Top row:** EyeLevel lockup (the dark-surface variant — `eyelevel-logo-white.png`) on the left. Optionally a primary CTA on the right.
- **Middle rows:** column navigation — `PRODUCT`, `COMPANY`, `RESOURCES`, `LEGAL`. Each column has a green eyebrow heading (`GREEN` on navy — see eyebrow-by-surface rule in colors.md) and `BODY_ON_DARK` link rows.
- **Bottom row:** copyright line (`© <year> EyeLevel · A Valantor Company`), legal links (`PRIVACY · TERMS · COOKIES`), optional social icons. Smallest type tier on the page.

The full-width `1px solid BORDER` hairline above the footer is the same divider treatment used elsewhere — no special footer color.

### Responsive behavior (public pages)

- **≥ md (1100px)**: header is a horizontal row; content sections center their inner content at the page's `maxWidth`; feature grids run multi-column.
- **sm–md (600–1099px)**: header may collapse nav to a hamburger menu; section padding reduces; feature grids drop column counts.
- **< sm (< 600px)**: header is logo + hamburger; sections stack vertically; feature grids go single-column; footer columns stack.

Use sx responsive object syntax for the column drops (`sx={{ gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}`).

### Composition pattern (public pages)

A public page is typically a series of full-bleed section components stacked vertically, each constraining its inner content to the page's `maxWidth`:

```tsx
export function MarketingPage() {
  return (
    <>
      <HeaderBar />
      <HeroSection />
      <FeatureGrid />
      <PricingTable />
      <TestimonialWall />
      <FooterCallout />
      <SiteFooter />
    </>
  );
}
```

If the section components don't exist yet, build them — they're normal feature work, not deviations. Promote them to `src/shared/components/` once they're stable so the next page can compose from them.

## Surfaces and modals (both layouts)

Modals, dialogs, and other floating surfaces follow `surfaces-and-cards.md` — they don't pick up either layout's chrome.

Auth screens (sign in, reset password) are typically a centered `GxCard` on a tinted canvas with the EyeLevel lockup above it. Neither the shell nor the public-page layout — their own thin convention.
