/**
 * GxUsageCard — the navy "Your plan allows…" card in the sidebar.
 *
 * Composes: plan-copy + two usage bars + an Upgrade button.
 *
 * The bars are dumb presentational components — pass in the fill percentage
 * (0–100) and an optional label. The upgrade button is a callback.
 */

import { Box, Button, LinearProgress, Typography } from "@mui/material";

import {
  BORDER,
  BORDER_RADIUS_CARD,
  BORDER_RADIUS_PILL,
  BORDER_RADIUS_SM,
  CORAL,
  FONT_WEIGHT_HEADLINE,
  FONT_WEIGHT_LABEL,
  GREEN,
  LETTER_SPACING_CHIP,
  LINE_HEIGHT_CARD_SUBHEAD,
  NAVY,
  PADDING,
  WHITE,
} from "../constants";

export interface GxUsageCardProps {
  /** Human-readable copy, e.g. "Your plan allows 5M tokens and 500 searches/mo." */
  planSummary: string;
  /** Ingest usage as a 0–100 number. */
  ingestPercent: number;
  /** Search usage as a 0–100 number. */
  searchPercent: number;
  /** Label for the ingest bar, e.g. "Ingest: 5%". */
  ingestLabel: string;
  /** Label for the search bar, e.g. "Search: 5%". */
  searchLabel: string;
  onUpgradeClick?: () => void;
  /** Hide the whole card on collapsed sidebars. */
  hidden?: boolean;
}

export function GxUsageCard({
  planSummary,
  ingestPercent,
  searchPercent,
  ingestLabel,
  searchLabel,
  onUpgradeClick,
  hidden = false,
}: GxUsageCardProps) {
  if (hidden) return null;

  return (
    <Box
      sx={{
        borderRadius: BORDER_RADIUS_CARD,
        backgroundColor: NAVY,
        border: `1px solid ${BORDER}`,
        padding: PADDING,
        color: WHITE,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: FONT_WEIGHT_LABEL,
          lineHeight: LINE_HEIGHT_CARD_SUBHEAD,
        }}
      >
        {planSummary}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
        <Box>
          <Typography variant="caption" sx={{ fontWeight: FONT_WEIGHT_LABEL }}>
            {ingestLabel}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={Math.min(100, Math.max(0, ingestPercent))}
            sx={{
              mt: 0.25,
              height: 6,
              borderRadius: BORDER_RADIUS_SM,
              backgroundColor: "rgba(255,255,255,0.15)",
              "& .MuiLinearProgress-bar": { backgroundColor: CORAL },
            }}
          />
        </Box>
        <Box>
          <Typography variant="caption" sx={{ fontWeight: FONT_WEIGHT_LABEL }}>
            {searchLabel}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={Math.min(100, Math.max(0, searchPercent))}
            sx={{
              mt: 0.25,
              height: 6,
              borderRadius: BORDER_RADIUS_SM,
              backgroundColor: "rgba(255,255,255,0.15)",
              "& .MuiLinearProgress-bar": { backgroundColor: CORAL },
            }}
          />
        </Box>
      </Box>

      <Button
        fullWidth
        onClick={onUpgradeClick}
        sx={{
          color: CORAL,
          backgroundColor: "transparent",
          border: `1px solid ${CORAL}`,
          fontWeight: FONT_WEIGHT_HEADLINE,
          letterSpacing: LETTER_SPACING_CHIP,
          textTransform: "uppercase",
          borderRadius: BORDER_RADIUS_PILL,
          "&:hover": {
            color: NAVY,
            backgroundColor: GREEN,
            borderColor: GREEN,
          },
        }}
      >
        Upgrade
      </Button>
    </Box>
  );
}

export default GxUsageCard;
