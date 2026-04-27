/**
 * CommonSubmitButton — the canonical EyeLevel primary action button.
 *
 * Coral fill, white text, full-pill shape (BORDER_RADIUS_PILL). On hover the
 * fill flips to green and the label flips to navy — the brand's "rest →
 * intent" convention. Pass `invert` to start in the green state (useful for
 * secondary confirm actions where you don't want to fight the primary CTA on
 * the same screen).
 *
 * Notes on behavior:
 *   - `isUppercase` controls `textTransform` (default true; pass false for
 *     sentence-case labels).
 *   - `type` defaults to "button" so use inside a <form> doesn't accidentally
 *     submit; pass `type="submit"` explicitly when you want submit semantics.
 *   - Every value comes from a brand token — no hex literals, no raw px
 *     radii.
 */

import { FC, MouseEvent, ReactNode } from "react";
import Button, { ButtonProps } from "@mui/material/Button";

import {
  BORDER_RADIUS_PILL,
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
        borderRadius: BORDER_RADIUS_PILL,
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
