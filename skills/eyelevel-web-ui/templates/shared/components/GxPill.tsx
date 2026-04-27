/**
 * GxPill — non-interactive status indicator.
 *
 * A label that announces a state — a row's processing status, a plan tier on
 * an account card, a deployment-status badge, a category tag on a blog post
 * card. Always paired with a literal status word; color is reinforcement,
 * never the only signal.
 *
 * An older convention sometimes pressed `CommonSubmitButton` into service as
 * a non-interactive badge, which conflated "button" and "label" semantically
 * and confused screen readers. `GxPill` is the right answer for status.
 *
 * Variants:
 *   - "default"   coral fill, white text — generic accent
 *   - "success"   green fill, navy text — completed states
 *   - "warning"   amber fill — in-progress states
 *   - "error"     red fill — failed states
 *   - "info"      navy fill, white text — neutral metadata
 *
 * Rendered as a <span> by default. Pass `onClick` to get a <button>.
 */

import { Box, ButtonBase } from "@mui/material";
import { MouseEventHandler, ReactNode } from "react";

import {
  BORDER_RADIUS_PILL,
  CORAL,
  ERROR_RED,
  FONT_SIZE_LABEL,
  FONT_SIZE_LABEL_DENSE,
  FONT_WEIGHT_HEADLINE,
  GREEN,
  LETTER_SPACING_CHIP,
  LINE_HEIGHT_CARD_SUBHEAD,
  NAVY,
  WARNING_AMBER,
  WHITE,
} from "../../constants";

type GxPillVariant = "default" | "success" | "warning" | "error" | "info";

export interface GxPillProps {
  children: ReactNode;
  variant?: GxPillVariant;
  onClick?: MouseEventHandler<HTMLElement>;
  /** Smaller padding for dense table rows. */
  dense?: boolean;
}

const STYLES: Record<
  GxPillVariant,
  { bg: string; fg: string; border?: string }
> = {
  default: { bg: CORAL, fg: WHITE },
  success: { bg: GREEN, fg: NAVY },
  warning: { bg: WARNING_AMBER, fg: NAVY },
  error: { bg: ERROR_RED, fg: WHITE },
  info: { bg: NAVY, fg: WHITE },
};

export function GxPill({
  children,
  variant = "default",
  dense = false,
  onClick,
}: GxPillProps) {
  const { bg, fg } = STYLES[variant];
  const Component: typeof Box | typeof ButtonBase = onClick ? ButtonBase : Box;

  return (
    <Component
      onClick={onClick}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bg,
        color: fg,
        fontSize: dense ? FONT_SIZE_LABEL_DENSE : FONT_SIZE_LABEL,
        fontWeight: FONT_WEIGHT_HEADLINE,
        letterSpacing: LETTER_SPACING_CHIP,
        textTransform: "uppercase",
        px: dense ? 1 : 1.25,
        py: dense ? 0.25 : 0.5,
        borderRadius: BORDER_RADIUS_PILL, // fully pilled
        lineHeight: LINE_HEIGHT_CARD_SUBHEAD,
        whiteSpace: "nowrap",
        ...(onClick && {
          cursor: "pointer",
          "&:hover": { filter: "brightness(1.05)" },
        }),
      }}
    >
      {children}
    </Component>
  );
}

export default GxPill;
