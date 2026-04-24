/**
 * CommonCancelButton — secondary/cancel action counterpart to CommonSubmitButton.
 *
 * Text-style button in dark grey that lifts to green on hover. Always pairs
 * with CommonSubmitButton in modal footers.
 *
 * Corrections applied vs. the original:
 *   - Hover text color is now NAVY (was WHITE, which was low-contrast on
 *     the green hover background).
 *   - borderRadius reads from BORDER_RADIUS_PILL (the retired BORDER_RADIUS_4X
 *     alias is no longer used — standalone pill CTAs are now fully rounded).
 *   - The invisible 1px white border is retained intentionally — it reserves
 *     the hit target size so the button doesn't reflow on hover state changes.
 */

import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { FC, ReactNode } from "react";

import {
  BORDER_RADIUS_PILL,
  DARK_GREY,
  FONT_WEIGHT_LABEL,
  GREEN,
  NAVY,
  WHITE,
} from "../../constants";

const CancelButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: DARK_GREY,
  fontWeight: FONT_WEIGHT_LABEL,
  borderRadius: BORDER_RADIUS_PILL,
  border: `1px solid ${WHITE}`,
  margin: theme.spacing(1),
  boxShadow: "none",
  textTransform: "none",
  "&:hover": {
    color: NAVY,
    backgroundColor: GREEN,
    boxShadow: "none",
  },
}));

interface CommonCancelButtonProps extends ButtonProps {
  children: ReactNode;
}

export const CommonCancelButton: FC<CommonCancelButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <CancelButton variant="text" type="button" {...props}>
      {children}
    </CancelButton>
  );
};

export default CommonCancelButton;
