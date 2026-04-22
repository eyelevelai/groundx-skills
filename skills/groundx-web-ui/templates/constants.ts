/**
 * GroundX design tokens — single source of truth.
 *
 * This file is the canonical, drop-in replacement for `src/constants/index.ts`
 * in the groundx-ai-dashboard repo. It preserves every existing export name
 * (so imports don't break) and adds named constants for hex values that were
 * previously hardcoded in component files.
 *
 * The palette is defined in ../../groundx-design-standards/references/colors.md
 * and mirrors the authoritative Eyelevel webflow CSS. Change the upstream spec
 * first; mirror the new hex here.
 *
 * If you find yourself typing a hex literal in a component, add it here instead.
 */

// ──────────────────────────────────────────────────────────────────────────
// Layout measurements
// ──────────────────────────────────────────────────────────────────────────

/** Width of the left sidebar drawer when fully expanded. */
export const drawerWidth = 270;

// ──────────────────────────────────────────────────────────────────────────
// Spacing (MUI theme.spacing units — multiply by 8 for px)
// ──────────────────────────────────────────────────────────────────────────

/** Default inner padding for cards and surfaces. 16px. */
export const PADDING = 2;

/** Main content pane padding on desktop. 40px. */
export const MAIN_CONTENT_PADDING = 5;

/** Top margin for main content to clear the fixed AppBar. 56px. */
export const MAIN_CONTENT_TOP_MARGIN = 7;

// ──────────────────────────────────────────────────────────────────────────
// Border radii (webflow scale: 4 / 6 / 12 / 20 / 200)
// ──────────────────────────────────────────────────────────────────────────

/** 4px — tight inner shapes (divider wraps, inline chips). */
export const BORDER_RADIUS_SM = "4px";
/** 6px — used for nested surfaces (inner table wrappers, inputs, code blocks). */
export const BORDER_RADIUS = "6px";
/** 12px — dropdown menus, toast, medium-surface containers. */
export const BORDER_RADIUS_2X = "12px";
/** 20px — the default for top-level cards and accordion surfaces. */
export const BORDER_RADIUS_CARD = "20px";
/** 200px — fully-pill shape for buttons, pills, tags. */
export const BORDER_RADIUS_PILL = "200px";

// Legacy aliases — keep existing imports working. Migrate call sites opportunistically.
/** @deprecated Cards are now 20px. Use BORDER_RADIUS_CARD. */
export const BORDER_RADIUS_3X = BORDER_RADIUS_CARD;
/** @deprecated Standalone pill CTAs are now fully rounded. Use BORDER_RADIUS_PILL. */
export const BORDER_RADIUS_4X = BORDER_RADIUS_PILL;
/** @deprecated Pass BORDER_RADIUS_CARD directly. */
export const CARD_BORDER_RADIUS = 3;

// ──────────────────────────────────────────────────────────────────────────
// Durations
// ──────────────────────────────────────────────────────────────────────────

/** Auto-dismiss time for message bars in ms. */
export const MESSAGE_BAR_DURATION = 20000;

// ──────────────────────────────────────────────────────────────────────────
// Colors — authoritative palette
//
// Every color in the UI should come from this list. If you need a new shade,
// add it to ../../groundx-design-standards/references/colors.md FIRST, then
// mirror it here with a semantic name.
// ──────────────────────────────────────────────────────────────────────────

/** Primary dark — headings, links, dark surfaces, strong borders. */
export const NAVY = "#29335c";

/** Primary CTA fill — submit buttons, success chips, hover-go-state, eyebrows on navy. */
export const GREEN = "#a1ec83";

/** Secondary accent — icon-button bg, tag bg, cyan card fill. */
export const CYAN = "#c1e8ee";

/** Quiet section bg — pale cyan wash on alternating sections, callouts. */
export const TINT = "#eff9fb";

/** Label / highlight accent — eyebrows on light surfaces, highlight pills, alt-CTA. */
export const CORAL = "#f3663f";

/** Default body text color — paragraphs, labels, captions. Slightly-warmer navy. */
export const BODY_TEXT = "#40496b";

/** Alt section background / input field fill. */
export const GRAY = "#f2f4f5";

/** Surface fill — cards, inputs, table cells, modal panels. */
export const WHITE = "#ffffff";

/** Default 1px hairline border — navy at 10% opacity. */
export const BORDER = "rgba(41, 51, 92, 0.1)";

/** Full transparency. */
export const TRANSPARENT = "transparent";

// ──────────────────────────────────────────────────────────────────────────
// Support palette (rarely used, specific states)
// ──────────────────────────────────────────────────────────────────────────

/** Destructive / failure — ingest failures, delete confirmation. */
export const ERROR_RED = "#f70d1a";

/** Soft warning — non-critical expiry / attention. */
export const LIGHTER_RED = "#ff7f7f";

/** Inline link accent — secondary links. Rare. */
export const BLUE = "#0b99ff";

/** Inactive chrome — muted text, slide numbers, timestamps, disabled-ish states. */
export const DARK_GREY = "#81879a";

/** Inactive nav icon — sidebar icons for non-current routes. */
export const NAV_ICON_GREY = "#5a5a5b";

/** Disabled surface — inert table chips, disabled-input backgrounds. */
export const DISABLED_GREY = "#e8eaee";

/** Row highlight background for selected table rows. */
export const ROW_SELECTED_BG = "rgba(79, 53, 197, 0.1)";

// ──────────────────────────────────────────────────────────────────────────
// Legacy aliases — keep existing imports working.
//
// The palette values changed in the 2026 webflow alignment. These aliases
// point the old names at the new hexes so existing code keeps compiling.
// Migrate to the canonical names above as a side effect of any edit.
// ──────────────────────────────────────────────────────────────────────────

/** @deprecated Use CORAL. */
export const CORAL_ORANGE = CORAL;
/** @deprecated Use NAVY. */
export const MAIN_BLACK = NAVY;
/** @deprecated Use TINT. */
export const MAIN_BACKGROUND = TINT;
/** @deprecated Use GRAY. */
export const LIGHT_GREY = GRAY;
/** @deprecated The solid-grey border is retired. Use BORDER (10% navy hairline). */
export const LIGHT_GREY_2 = BORDER;
/** @deprecated Use BODY_TEXT. */
export const MEDIUM_GREY = BODY_TEXT;
/** @deprecated Use GREEN. */
export const ACTIVE_GREEN = GREEN;
/** @deprecated Use CYAN. */
export const PALE_AQUA = CYAN;
/** @deprecated Merges into TINT. */
export const LIGHT_PALE_AQUA = TINT;
/** @deprecated Use LIGHTER_RED. */
export const LIGHTER_SHADE_OF_RED = LIGHTER_RED;

// ──────────────────────────────────────────────────────────────────────────
// Premium button gradient (used only by the `gx-premium-button` variant)
// ──────────────────────────────────────────────────────────────────────────

export const PREMIUM_GRADIENT_FROM = "#fe6b8b";
export const PREMIUM_GRADIENT_TO = "#ff8e53";

// ──────────────────────────────────────────────────────────────────────────
// Typography
// ──────────────────────────────────────────────────────────────────────────

/** The GroundX brand font. Self-hosted at cdn.eyelevel.ai. */
export const FONT_FAMILY = "THICCCBOI, sans-serif";
