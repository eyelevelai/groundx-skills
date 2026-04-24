/**
 * GroundX web-UI legacy aliases.
 *
 * These names predate the 2026 webflow alignment. They re-export the canonical
 * tokens so older imports keep compiling. New code should never import from
 * here — use the canonical names in constants.generated.ts (re-exported by the
 * barrel constants.ts).
 *
 * Migration policy: whenever a file is touched for other reasons, sweep its
 * imports against this list and replace with the canonical name. Once call
 * sites hit zero for a given alias, delete it.
 */

import {
  CORAL,
  NAVY,
  TINT,
  GRAY,
  BORDER,
  BODY_TEXT,
  GREEN,
  CYAN,
  LIGHTER_RED,
  BORDER_RADIUS_CARD,
  BORDER_RADIUS_PILL,
} from "./constants.generated";

// ──────────────────────────────────────────────────────────────────────────
// Radii
// ──────────────────────────────────────────────────────────────────────────

/** @deprecated Cards are now 20px. Use BORDER_RADIUS_CARD. */
export const BORDER_RADIUS_3X = BORDER_RADIUS_CARD;
/** @deprecated Standalone pill CTAs are now fully rounded. Use BORDER_RADIUS_PILL. */
export const BORDER_RADIUS_4X = BORDER_RADIUS_PILL;
/** @deprecated Pass BORDER_RADIUS_CARD directly. (This was the MUI shape index, not a px value.) */
export const CARD_BORDER_RADIUS = 3;

// ──────────────────────────────────────────────────────────────────────────
// Colors
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
