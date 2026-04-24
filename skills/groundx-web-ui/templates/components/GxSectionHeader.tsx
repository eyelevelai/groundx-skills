/**
 * GxSectionHeader — the "TUTORIAL" / "CONTENT" style label used across the app.
 *
 * Visually:
 *   - UPPERCASE label in navy, fontWeight 600, with a touch of letter-spacing
 *     so the all-caps setting doesn't get claustrophobic.
 *   - Optional action slot on the right (a "+ NEW BUCKET" button, for example).
 *   - Lives inside a GxCard (or any surface); this component renders the inner
 *     label row only, so the caller controls the surrounding surface.
 *
 * Usage:
 *   <GxCard><GxSectionHeader label="CONTENT" action={<NewBucketButton />} /></GxCard>
 */

import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

import {
  FONT_SIZE_BODY,
  FONT_WEIGHT_LABEL,
  LETTER_SPACING_CHIP,
  NAVY,
} from "../constants";

export interface GxSectionHeaderProps {
  /** The section label. Passed literally — write it UPPERCASE in the caller. */
  label: string;
  /** Optional right-aligned action (usually a button). */
  action?: ReactNode;
}

export function GxSectionHeader({ label, action }: GxSectionHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Typography
        component="h2"
        sx={{
          color: NAVY,
          fontWeight: FONT_WEIGHT_LABEL,
          fontSize: FONT_SIZE_BODY,
          letterSpacing: LETTER_SPACING_CHIP,
          // We deliberately don't apply textTransform: "uppercase" here. The
          // codebase convention is to write "CONTENT" literally in JSX so that
          // translations and a11y tools can see the shouty casing.
        }}
      >
        {label}
      </Typography>
      {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
    </Box>
  );
}

export default GxSectionHeader;
