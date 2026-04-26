/**
 * EyeLevel web-UI chrome tokens — hand-written.
 *
 * These values are specific to the React/MUI dashboard shell and do not belong
 * in the shared design-system palette (tokens.json). Keeping them in a
 * separate file makes it unambiguous that editing them does not propagate to
 * the slide bundle or any other consumer.
 *
 * If a value here starts being used outside the dashboard chrome (e.g. a new
 * brand accent creeps in), promote it to tokens.json and delete it here.
 */

// ──────────────────────────────────────────────────────────────────────────
// Layout measurements
// ──────────────────────────────────────────────────────────────────────────

/** Width of the left sidebar drawer when fully expanded. */
export const drawerWidth = 270;

// ──────────────────────────────────────────────────────────────────────────
// Utility colors (not brand palette)
// ──────────────────────────────────────────────────────────────────────────

/** CSS `transparent` keyword, surfaced as a named constant for clarity. */
export const TRANSPARENT = "transparent";

/** Inactive nav icon — sidebar icons for non-current routes. */
export const NAV_ICON_GREY = "#5a5a5b";

/** Disabled surface — inert table chips, disabled-input backgrounds. */
export const DISABLED_GREY = "#e8eaee";

/** Row highlight background for selected table rows. */
export const ROW_SELECTED_BG = "rgba(79, 53, 197, 0.1)";

/** Warning-amber fill — in-progress pill states (e.g., ingest processing). */
export const WARNING_AMBER = "#ffb45c";

// ──────────────────────────────────────────────────────────────────────────
// Premium button gradient (used only by the `gx-premium-button` variant)
// ──────────────────────────────────────────────────────────────────────────

export const PREMIUM_GRADIENT_FROM = "#fe6b8b";
export const PREMIUM_GRADIENT_TO = "#ff8e53";
