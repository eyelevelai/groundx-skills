/**
 * CommonSubmitButton — the canonical GroundX primary action button.
 *
 * Coral fill with white text. On hover it flips to green with navy text — the
 * "inverted" state. Pass `invert` to start in the green state (useful for
 * destructive secondary actions that should read differently).
 *
 * Corrections applied vs. the original in src/shared/components:
 *   - `isUppercase` prop now actually controls `textTransform` (was previously
 *     always uppercase regardless of the prop value).
 *   - `type` defaults to "button" so use inside a <form> doesn't
 *     accidentally submit; pass `type="submit"` explicitly when you want that.
 *   - The 2px white border was removed — it was effectively invisible and
 *     added an unbalanced 2px of slop at button edges.
 *   - borderRadius now reads from the token file instead of a hex/number.
 */

import { FC, MouseEvent, ReactNode } from "react";
import Button, { ButtonProps } from "@mui/material/Button";

import {
  ACTIVE_GREEN,
  BORDER_RADIUS_2X,
  CORAL_ORANGE,
  MAIN_BLACK,
  WHITE,
} from "../../constants";

interface CommonSubmitButtonProps extends ButtonProps {
  fullWidth?: boolean;
  /** Start in the green-fill / navy-text "inverted" state. */
  invert?: boolean;
  /** Render label in UPPERCASE. Defaults to true because most primary CTAs use it. */
  isUppercase?: boolean;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export const CommonSubmitButton: FC<CommonSubmitButtonProps> = ({
  children,
  onClick,
  fullWidth = false,
  invert = false,
  isUppercase = true,
  type = "button",
  ...props
}) => {
  return (
    <Button
      {...props}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      variant="contained"
      sx={{
        backgroundColor: invert ? ACTIVE_GREEN : CORAL_ORANGE,
        color: invert ? MAIN_BLACK : WHITE,
        fontWeight: 600,
        borderRadius: BORDER_RADIUS_2X,
        boxShadow: "none",
        textTransform: isUppercase ? "uppercase" : "none",
        letterSpacing: isUppercase ? "0.5px" : undefined,
        "&:hover": {
          backgroundColor: invert ? CORAL_ORANGE : ACTIVE_GREEN,
          color: invert ? WHITE : MAIN_BLACK,
          boxShadow: "none",
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default CommonSubmitButton;
