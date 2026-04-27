/**
 * GxButtonGroup — segmented control for 2–3 mutually navigational actions.
 *
 * Navy 1px outline, white background, inner buttons share a vertical divider,
 * and each inner button flips to GREEN on hover (the brand's hover-go-state)
 * with navy text. Used wherever a small set of related navigations sits next
 * to each other — `RETRIEVALS | CHAT` toggles on a dashboard card,
 * `MONTHLY | YEARLY` switches on a pricing tile, `OVERVIEW | ACTIVITY` tabs
 * on a detail surface.
 *
 * For 4+ actions, stack `CommonSubmitButton`s in a Stack instead — a
 * segmented group with too many segments stops being readable.
 */

import { ButtonGroup, ButtonGroupProps, styled } from "@mui/material";

import {
  BORDER_RADIUS_PILL,
  FONT_WEIGHT_LABEL,
  GREEN,
  LETTER_SPACING_CHIP,
  NAVY,
  WHITE,
} from "../../constants";

export const GxButtonGroup = styled(ButtonGroup)<ButtonGroupProps>(() => ({
  border: `1px solid ${NAVY}`,
  borderRadius: BORDER_RADIUS_PILL,
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

    // Inner-button hover lifts to GREEN (the brand's hover-go-state) with
    // navy text, matching CommonSubmitButton's coral-rest → green-hover
    // convention. See buttons.md.
    "&:hover": {
      backgroundColor: GREEN,
      color: NAVY,
    },
  },
}));

export default GxButtonGroup;
