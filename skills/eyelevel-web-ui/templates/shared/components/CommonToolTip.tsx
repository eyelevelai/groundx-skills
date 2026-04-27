/**
 * CommonToolTip — styled MUI Tooltip with EyeLevel chrome.
 *
 * Navy fill, white text, hairline corner radius, no shadow. Use anywhere a
 * hover-triggered explanatory tooltip is needed (an info icon next to a
 * field label, a truncated cell explaining the full value, a settings hint).
 *
 * Drop-in replacement for `<Tooltip>` from @mui/material — same prop API.
 */

import { Tooltip, TooltipProps, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  BORDER_RADIUS,
  FONT_SIZE_CAPTION,
  FONT_WEIGHT_BODY,
  NAVY,
  WHITE,
} from "../../constants";

export const CommonToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: NAVY,
    color: WHITE,
    fontSize: FONT_SIZE_CAPTION,
    fontWeight: FONT_WEIGHT_BODY,
    borderRadius: BORDER_RADIUS,
    padding: "6px 10px",
    boxShadow: "none",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: NAVY,
  },
}));

export default CommonToolTip;
