/**
 * GxCard — the canonical GroundX surface.
 *
 * The dashboard uses a flat white surface with a 1px LIGHT_GREY_2 border,
 * no shadow, and BORDER_RADIUS_3X rounding. Throughout the codebase this
 * was expressed inconsistently — sometimes via MUI `<Card>`, sometimes via
 * `<Box>` with an inline `sx` block. Always use this wrapper instead.
 *
 * Pass a `radius` of "lg" (18px, default) for top-level cards, or "sm" (6px)
 * for nested sub-surfaces like inner table wrappers.
 *
 * Pass `interactive` to get a subtle hover lift for clickable cards.
 */

import { Box, BoxProps } from "@mui/material";
import { forwardRef } from "react";

import {
  BORDER_RADIUS,
  BORDER_RADIUS_3X,
  LIGHT_GREY_2,
  PADDING,
  WHITE,
} from "../constants";

export interface GxCardProps extends BoxProps {
  /** Corner rounding. "lg" = top-level card, "sm" = nested surface. */
  radius?: "lg" | "sm";
  /** Adds a hover state for clickable cards. */
  interactive?: boolean;
  /** Remove inner padding (use when you fully control the inside). */
  noPadding?: boolean;
}

export const GxCard = forwardRef<HTMLDivElement, GxCardProps>(function GxCard(
  { radius = "lg", interactive = false, noPadding = false, sx, children, ...rest },
  ref,
) {
  const borderRadius = radius === "lg" ? BORDER_RADIUS_3X : BORDER_RADIUS;

  return (
    <Box
      ref={ref}
      sx={{
        backgroundColor: WHITE,
        border: `1px solid ${LIGHT_GREY_2}`,
        borderRadius,
        boxShadow: "none",
        padding: noPadding ? 0 : PADDING,
        ...(interactive && {
          cursor: "pointer",
          transition: "border-color 160ms ease, transform 160ms ease",
          "&:hover": {
            borderColor: "primary.main",
          },
        }),
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
});

export default GxCard;
