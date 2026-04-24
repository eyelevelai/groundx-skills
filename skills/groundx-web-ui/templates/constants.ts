/**
 * GroundX web-UI constants barrel.
 *
 * This file preserves the `import { NAVY, PADDING, ... } from "./constants"`
 * call-site convention used throughout the dashboard. It re-exports three
 * concerns from three files:
 *
 *   constants.generated.ts  — brand tokens, auto-generated from
 *                             ../../groundx-design-standards/tokens.json.
 *                             NEVER EDIT BY HAND — re-run
 *                             `node scripts/generate-mirrors.mjs` in the
 *                             standards skill and the diff lands here.
 *
 *   constants.chrome.ts     — hand-written dashboard-shell tokens that are
 *                             not part of the shared brand palette
 *                             (drawerWidth, NAV_ICON_GREY, the premium-button
 *                             gradient, etc.). Safe to edit.
 *
 *   constants.legacy.ts     — deprecated aliases kept for back-compat. Do not
 *                             add new ones. Sweep call sites and remove
 *                             entries as they hit zero usage.
 *
 * If you need a NEW brand value (a color, a weight, a radius), add it to
 * tokens.json in the standards skill and regenerate. Do not add it here.
 */

export * from "./constants.generated";
export * from "./constants.chrome";
export * from "./constants.legacy";
