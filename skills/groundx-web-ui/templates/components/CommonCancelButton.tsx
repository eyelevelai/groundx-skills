/**
 * CommonCancelButton — secondary/cancel action counterpart to CommonSubmitButton.
 *
 * Text-style button in dark grey that lifts to green on hover. Always pairs
 * with CommonSubmitButton in modal footers.
 *
 * Corrections applied vs. the original:
 *   - Hover text color is now MAIN_BLACK (was WHITE, which was low-contrast
 *     on the green hover background).
 *   - borderRadius reads from BORDER_RADIUS_4X instead of a hardcoded `20`.
 *   - The 2px white border is retained intentionally — it reserves the hit
 *     target size so the button doesn't reflow on hover state changes.
 */

import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { FC, ReactNode } from "react";

import {
  ACTIVE_GREEN,
  BORDER_RADIUS_4X,
  DARK_GREY,
  MAIN_BLACK,
  WHITE,
} from "../../constants";

const CancelButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: DARK_GREY,
  fontWeight: 600,
  borderRadius: BORDER_RADIUS_4X,
  border: `2px solid ${WHITE}`,
  margin: theme.spacing(1),
  boxShadow: "none",
  textTransform: "none",
  "&:hover": {
    color: MAIN_BLACK,
    backgroundColor: ACTIVE_GREEN,
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
