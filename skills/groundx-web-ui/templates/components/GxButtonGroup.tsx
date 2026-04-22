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
  CORAL_ORANGE,
  MAIN_BLACK,
  WHITE,
} from "../constants";

export const GxButtonGroup = styled(ButtonGroup)<ButtonGroupProps>(() => ({
  border: `1px solid ${MAIN_BLACK}`,
  borderRadius: BORDER_RADIUS_2X,
  background: WHITE,
  boxShadow: "none",
  overflow: "hidden",

  // Inner buttons: no individual borders, share a divider via the group's
  // middle separator pseudo-element.
  "& .MuiButtonGroup-grouped": {
    border: "none",
    borderRadius: 0,
    color: MAIN_BLACK,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    padding: "6px 16px",

    "&:not(:last-of-type)": {
      borderRight: `1px solid ${MAIN_BLACK}`,
    },

    "&:hover": {
      backgroundColor: CORAL_ORANGE,
      color: WHITE,
    },
  },
}));

export default GxButtonGroup;
