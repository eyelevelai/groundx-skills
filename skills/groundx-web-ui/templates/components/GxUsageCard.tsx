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
  ACTIVE_GREEN,
  BORDER_RADIUS_3X,
  CORAL_ORANGE,
  LIGHT_GREY_2,
  MAIN_BLACK,
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
        borderRadius: BORDER_RADIUS_3X,
        backgroundColor: MAIN_BLACK,
        border: `1px solid ${LIGHT_GREY_2}`,
        padding: PADDING,
        color: WHITE,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.4 }}>
        {planSummary}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {ingestLabel}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={Math.min(100, Math.max(0, ingestPercent))}
            sx={{
              mt: 0.25,
              height: 6,
              borderRadius: 3,
              backgroundColor: "rgba(255,255,255,0.15)",
              "& .MuiLinearProgress-bar": { backgroundColor: CORAL_ORANGE },
            }}
          />
        </Box>
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {searchLabel}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={Math.min(100, Math.max(0, searchPercent))}
            sx={{
              mt: 0.25,
              height: 6,
              borderRadius: 3,
              backgroundColor: "rgba(255,255,255,0.15)",
              "& .MuiLinearProgress-bar": { backgroundColor: CORAL_ORANGE },
            }}
          />
        </Box>
      </Box>

      <Button
        fullWidth
        onClick={onUpgradeClick}
        sx={{
          color: CORAL_ORANGE,
          backgroundColor: "transparent",
          border: `2px solid ${CORAL_ORANGE}`,
          fontWeight: 700,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          borderRadius: 999,
          "&:hover": {
            color: MAIN_BLACK,
            backgroundColor: ACTIVE_GREEN,
            borderColor: ACTIVE_GREEN,
          },
        }}
      >
        Upgrade
      </Button>
    </Box>
  );
}

export default GxUsageCard;
