/**
 * GroundX MUI v5 theme — canonical, drop-in replacement for `src/theme.ts`.
 *
 * Corrections applied vs. the original:
 *   1. `palette.primary.main` now points at CORAL_ORANGE (was an unused #1976d2).
 *   2. `palette.secondary.main` is set to MAIN_BLACK so `color="secondary"`
 *      gives you the navy accent without hex literals.
 *   3. Typography's default fontFamily is Inter at the theme root, so raw
 *      <span>/<div> text inherits the brand font (not only <Typography>).
 *   4. CssBaseline applies the font to `body` as a belt-and-suspenders backup.
 *   5. Component defaults for MuiCard, MuiPaper, MuiDivider, MuiTableCell, and
 *      MuiChip push the app's actual design choices (no elevation, 1px LIGHT_GREY_2
 *      borders, BORDER_RADIUS_3X rounding) into the theme so call sites can stop
 *      restating them in `sx`.
 *   6. Explicit typography variant ladder (h1…h6, body1, body2, caption, overline,
 *      button) replaces MUI's default scale, which was too loud at the top (h1=96px)
 *      and too tight in the middle (body and h6 only 4px apart). See the
 *      typography block below for the rationale.
 */

import { createTheme } from "@mui/material/styles";
import {
  ACTIVE_GREEN,
  BODY_TEXT,
  CORAL_ORANGE,
  DARK_GREY,
  FONT_FAMILY,
  LIGHT_GREY_2,
  MAIN_BACKGROUND,
  MAIN_BLACK,
  PALE_AQUA,
  PREMIUM_GRADIENT_FROM,
  PREMIUM_GRADIENT_TO,
  WHITE,
} from "./constants";

// ──────────────────────────────────────────────────────────────────────────
// Custom MUI Button variant typings
//
// MUI's Button supports variant extension via module augmentation. We register
// our two named variants here so `<Button variant="gx-back-button">` type-checks.
// ──────────────────────────────────────────────────────────────────────────

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    "gx-premium-button": true;
    "gx-back-button": true;
  }
}

const theme = createTheme({
  // ────────────────────────────────────────────────────────────────────────
  // Breakpoints — `md` is bumped from MUI's default 900 → 1100 to match the
  // point at which the dashboard sidebar collapses.
  // ────────────────────────────────────────────────────────────────────────
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1100,
      lg: 1200,
      xl: 1536,
    },
  },

  // ────────────────────────────────────────────────────────────────────────
  // Palette
  // ────────────────────────────────────────────────────────────────────────
  palette: {
    mode: "light",
    primary: {
      main: CORAL_ORANGE,
      dark: MAIN_BLACK,
      contrastText: WHITE,
    },
    secondary: {
      main: MAIN_BLACK,
      contrastText: WHITE,
    },
    background: {
      default: MAIN_BACKGROUND,
      paper: WHITE,
    },
    text: {
      primary: MAIN_BLACK,
      secondary: DARK_GREY,
    },
    divider: LIGHT_GREY_2,
  },

  // ────────────────────────────────────────────────────────────────────────
  // Typography — Inter everywhere, and an explicit variant ladder.
  //
  // The web ladder is intentionally compressed relative to the slide ladder
  // (see groundx-slides/references/typography-slides.md). Display text on a
  // 1920×1080 canvas wants 64–112px headlines; a dashboard viewed at 24"
  // reading distance does not. H1 caps at 40px; subhead tiers (h5/h6) sit
  // close to body size so hierarchy comes from weight rather than giant
  // size jumps — consistent with brand principle #6 ("hierarchy through
  // weight, not size jumps").
  //
  // Sizes are rem (root = 16px). Pixel values are shown for reference only.
  // ────────────────────────────────────────────────────────────────────────
  typography: {
    fontFamily: FONT_FAMILY,

    // Display heading — page-level marketing moment (rare in-app).
    h1: {
      fontSize: "2.5rem", // 40px
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: "-0.01em",
      color: MAIN_BLACK,
    },
    // Page heading — the title of a dashboard route (e.g. "Buckets").
    h2: {
      fontSize: "2rem", // 32px
      fontWeight: 700,
      lineHeight: 1.15,
      letterSpacing: "-0.005em",
      color: MAIN_BLACK,
    },
    // Section heading — the top of a major card or region.
    h3: {
      fontSize: "1.625rem", // 26px
      fontWeight: 700,
      lineHeight: 1.2,
      color: MAIN_BLACK,
    },
    // Subsection — a second-level heading inside a section.
    h4: {
      fontSize: "1.375rem", // 22px
      fontWeight: 700,
      lineHeight: 1.25,
      color: MAIN_BLACK,
    },
    // Card heading — the title of a GxCard.
    h5: {
      fontSize: "1.125rem", // 18px
      fontWeight: 700,
      lineHeight: 1.3,
      color: MAIN_BLACK,
    },
    // Card subhead — a small heading at body size; separated by weight.
    h6: {
      fontSize: "1rem", // 16px
      fontWeight: 700,
      lineHeight: 1.4,
      color: MAIN_BLACK,
    },
    // Body — the default reading size for the dashboard.
    body1: {
      fontSize: "1rem", // 16px
      fontWeight: 400,
      lineHeight: 1.6,
      color: BODY_TEXT,
    },
    // Body-sm — secondary paragraphs, table rows.
    body2: {
      fontSize: "0.875rem", // 14px
      fontWeight: 400,
      lineHeight: 1.5,
      color: BODY_TEXT,
    },
    // Metadata — timestamps, row counts, inline help.
    caption: {
      fontSize: "0.8125rem", // 13px
      fontWeight: 400,
      lineHeight: 1.5,
      color: DARK_GREY,
    },
    // Eyebrow / section label. Write the string uppercase; do NOT text-transform.
    overline: {
      fontSize: "0.75rem", // 12px
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "0.12em",
      textTransform: "none", // explicit: content is literal uppercase
    },
    // Button label — inherited by the button component's internal Typography.
    button: {
      fontSize: "0.875rem", // 14px
      fontWeight: 600,
      lineHeight: 1,
      letterSpacing: "0.04em",
      textTransform: "none", // CommonSubmitButton uppercases its own label
    },
  },

  // ────────────────────────────────────────────────────────────────────────
  // Component defaults
  // ────────────────────────────────────────────────────────────────────────
  components: {
    // Apply the brand font globally so non-Typography text inherits it.
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: FONT_FAMILY,
          backgroundColor: MAIN_BACKGROUND,
        },
      },
    },

    // Surfaces — codify "flat white card with 1px LIGHT_GREY_2 border".
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: `1px solid ${LIGHT_GREY_2}`,
          borderRadius: 18,
          backgroundColor: WHITE,
          boxShadow: "none",
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: "none", // disable MUI's dark-mode overlay paint
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: LIGHT_GREY_2,
        },
      },
    },

    // Tables — match the subtle border treatment used in SelectedBucketTable.
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${LIGHT_GREY_2}`,
          fontFamily: FONT_FAMILY,
        },
        head: {
          fontWeight: 600,
          color: MAIN_BLACK,
        },
      },
    },

    // Chips default to the brand feel: compact, 600 weight, pill-shaped.
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: FONT_FAMILY,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        },
      },
    },

    // Icon buttons — keep the pale-aqua-with-green-hover behaviour the app
    // already relied on.
    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: PALE_AQUA,
          "&:hover": {
            backgroundColor: ACTIVE_GREEN,
          },
        },
      },
    },

    // Buttons — named variants only. Base MuiButton styling is deliberately
    // minimal; primary/secondary actions should go through CommonSubmitButton
    // / CommonCancelButton so their hover behaviour stays consistent.
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      variants: [
        {
          props: { variant: "gx-premium-button" },
          style: {
            padding: 8,
            color: WHITE,
            fontWeight: 600,
            position: "relative",
            borderRadius: 20,
            backgroundColor: "transparent",
            zIndex: 1,
            "&:before": {
              content: '""',
              position: "absolute",
              inset: 0,
              zIndex: -1,
              borderRadius: "inherit",
              background: `linear-gradient(45deg, ${PREMIUM_GRADIENT_FROM} 30%, ${PREMIUM_GRADIENT_TO} 90%)`,
            },
            "&:hover:before": {
              background: `linear-gradient(45deg, ${PREMIUM_GRADIENT_TO} 30%, ${PREMIUM_GRADIENT_FROM} 90%)`,
            },
          },
        },
        {
          props: { variant: "gx-back-button" },
          style: {
            color: CORAL_ORANGE,
            textTransform: "none",
            fontWeight: 600,
          },
        },
      ],
    },
  },
});

export default theme;
