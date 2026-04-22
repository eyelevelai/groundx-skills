/**
 * GxPill — status pill used for indicators like "X-RAY" on bucket files.
 *
 * In the existing codebase this pattern was implemented by pressing
 * CommonSubmitButton into service as a non-interactive status badge, which
 * conflated "button" and "label" semantically. GxPill replaces that usage.
 *
 * Variants:
 *   - "default"   coral fill with white text (the current X-RAY look)
 *   - "success"   green fill, navy text — completed states
 *   - "warning"   gradient fill — in-progress states
 *   - "error"     red fill — failed states
 *   - "info"      navy fill with white text — neutral metadata
 *
 * Rendered as a <span> by default. Pass `onClick` to get a <button>.
 */

import { Box, ButtonBase } from "@mui/material";
import { MouseEventHandler, ReactNode } from "react";

import {
  ACTIVE_GREEN,
  CORAL_ORANGE,
  ERROR_RED,
  MAIN_BLACK,
  WHITE,
} from "../constants";

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
  default: { bg: CORAL_ORANGE, fg: WHITE },
  success: { bg: ACTIVE_GREEN, fg: MAIN_BLACK },
  warning: { bg: "#FFB45C", fg: MAIN_BLACK },
  error: { bg: ERROR_RED, fg: WHITE },
  info: { bg: MAIN_BLACK, fg: WHITE },
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
        fontSize: dense ? "0.7rem" : "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        px: dense ? 1 : 1.25,
        py: dense ? 0.25 : 0.5,
        borderRadius: 999, // fully pilled
        lineHeight: 1.4,
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
