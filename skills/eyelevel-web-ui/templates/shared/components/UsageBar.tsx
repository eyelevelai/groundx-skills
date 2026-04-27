/**
 * UsageBar — a single "X of Y used" progress bar.
 *
 * Pulled out of GxUsageCard so the same bar can be used standalone for
 * storage meters, quota panels, billing readouts, or any other usage strip.
 *
 * Defaults assume the bar sits on a dark surface (navy card, sidebar
 * callout): CORAL fill on a translucent white track. Override `trackColor`
 * for a light-surface variant (e.g., `BORDER` for a hairline-track look).
 */

import { Box, LinearProgress, Typography } from "@mui/material";

import {
  BORDER_RADIUS_SM,
  CORAL,
  FONT_WEIGHT_LABEL,
  PROGRESS_TRACK_ON_DARK,
} from "../../constants";

interface UsageBarProps {
  /** 0–100 fill percentage. Values outside the range are clamped. */
  percent: number;
  /** Optional label rendered above the bar. */
  label?: string;
  /** Bar fill color. Defaults to CORAL. */
  color?: string;
  /** Bar track color. Defaults to PROGRESS_TRACK_ON_DARK (white at 15%). */
  trackColor?: string;
  /** Bar height in px. Defaults to 6. */
  height?: number;
}

export function UsageBar({
  percent,
  label,
  color = CORAL,
  trackColor = PROGRESS_TRACK_ON_DARK,
  height = 6,
}: UsageBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <Box>
      {label && (
        <Typography variant="caption" sx={{ fontWeight: FONT_WEIGHT_LABEL }}>
          {label}
        </Typography>
      )}
      <LinearProgress
        variant="determinate"
        value={clamped}
        sx={{
          mt: label ? 0.25 : 0,
          height,
          borderRadius: BORDER_RADIUS_SM,
          backgroundColor: trackColor,
          "& .MuiLinearProgress-bar": { backgroundColor: color },
        }}
      />
    </Box>
  );
}

export default UsageBar;
