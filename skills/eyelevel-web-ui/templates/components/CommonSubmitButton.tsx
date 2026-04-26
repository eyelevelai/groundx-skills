/**
 * CommonSubmitButton — the canonical EyeLevel primary action button.
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
  BORDER_RADIUS_2X,
  CORAL,
  FONT_WEIGHT_LABEL,
  GREEN,
  LETTER_SPACING_CHIP,
  NAVY,
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
        backgroundColor: invert ? GREEN : CORAL,
        color: invert ? NAVY : WHITE,
        fontWeight: FONT_WEIGHT_LABEL,
        borderRadius: BORDER_RADIUS_2X,
        boxShadow: "none",
        textTransform: isUppercase ? "uppercase" : "none",
        letterSpacing: isUppercase ? LETTER_SPACING_CHIP : undefined,
        "&:hover": {
          backgroundColor: invert ? CORAL : GREEN,
          color: invert ? WHITE : NAVY,
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
