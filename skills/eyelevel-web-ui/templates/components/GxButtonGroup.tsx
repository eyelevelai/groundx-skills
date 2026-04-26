/**
 * GxButtonGroup — the "RETRIEVALS | CHAT" segmented button.
 *
 * Navy 1px outline, white background, inner buttons share a vertical divider,
 * and each button flips to coral on hover. The current dashboard defines this
 * inline inside Home/Buckets.tsx as a `CustomButtonGroup`; this is the
 * canonical, reusable version.
 */

import { ButtonGroup, ButtonGroupProps, styled } from "@mui/material";

import {
  BORDER_RADIUS_2X,
  CORAL,
  FONT_WEIGHT_LABEL,
  LETTER_SPACING_CHIP,
  NAVY,
  WHITE,
} from "../constants";

export const GxButtonGroup = styled(ButtonGroup)<ButtonGroupProps>(() => ({
  border: `1px solid ${NAVY}`,
  borderRadius: BORDER_RADIUS_2X,
  background: WHITE,
  boxShadow: "none",
  overflow: "hidden",

  // Inner buttons: no individual borders, share a divider via the group's
  // middle separator pseudo-element.
  "& .MuiButtonGroup-grouped": {
    border: "none",
    borderRadius: 0,
    color: NAVY,
    fontWeight: FONT_WEIGHT_LABEL,
    textTransform: "uppercase",
    letterSpacing: LETTER_SPACING_CHIP,
    padding: "6px 16px",

    "&:not(:last-of-type)": {
      borderRight: `1px solid ${NAVY}`,
    },

    "&:hover": {
      backgroundColor: CORAL,
      color: WHITE,
    },
  },
}));

export default GxButtonGroup;
