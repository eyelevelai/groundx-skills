/**
 * EyeLevel web-UI constants barrel.
 *
 * This file preserves the `import { NAVY, PADDING, ... } from "./constants"`
 * call-site convention shared across every EyeLevel-styled web project. It
 * re-exports two concerns from two files:
 *
 *   constants.generated.ts  — brand tokens, auto-generated from
 *                             ../../eyelevel-design-standards/tokens.json.
 *                             NEVER EDIT BY HAND — re-run
 *                             `node scripts/generate-mirrors.mjs` in the
 *                             standards skill and the diff lands here.
 *                             Identical across every project.
 *
 *   constants.chrome.ts     — project-specific chrome tokens that are not
 *                             part of the shared brand palette. The
 *                             dashboard's version holds drawerWidth,
 *                             NAV_ICON_GREY, the premium-button gradient,
 *                             etc.; another project's version may hold
 *                             different chrome (max content widths, footer
 *                             column counts) — or be empty. Each project
 *                             owns its own. Safe to edit.
 *
 * If you need a NEW brand value (a color, a weight, a radius), add it to
 * tokens.json in the standards skill and regenerate. Do not add it here.
 */

export * from "./constants.generated";
export * from "./constants.chrome";
