/**
 * ExampleEmptyState — the "Drag files here" dropzone pattern.
 *
 * Minimal visual: dashed border only on hover/active state (solid 1px at rest),
 * centered icon + label, optional secondary "browse files" link. Uses GxCard
 * as the underlying surface for consistent rounding.
 */

import { Box, Link, Stack, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ReactNode, useState } from "react";

import GxCard from "../templates/components/GxCard";
import { CORAL_ORANGE, LIGHT_GREY_2, MAIN_BLACK } from "../templates/constants";

export interface ExampleEmptyStateProps {
  /** Primary instruction. Defaults to "Drag files here". */
  label?: string;
  /** Optional footer — typically a "browse files" link. */
  footer?: ReactNode;
  onFilesDropped?: (files: FileList) => void;
}

export function ExampleEmptyState({
  label = "Drag files here",
  footer,
  onFilesDropped,
}: ExampleEmptyStateProps) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <GxCard
      onDragEnter={(e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDragOver={(e: React.DragEvent) => e.preventDefault()}
      onDrop={(e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (onFilesDropped && e.dataTransfer.files) {
          onFilesDropped(e.dataTransfer.files);
        }
      }}
      sx={{
        // Accent the border when dragging; everything else stays at rest.
        borderColor: isDragging ? CORAL_ORANGE : LIGHT_GREY_2,
        borderStyle: isDragging ? "dashed" : "solid",
        transition: "border-color 120ms ease",
      }}
    >
      <Stack alignItems="center" spacing={1} sx={{ py: 3 }}>
        <CloudUploadIcon sx={{ color: CORAL_ORANGE, fontSize: 32 }} />
        <Typography sx={{ color: MAIN_BLACK, fontWeight: 500 }}>{label}</Typography>
        {footer ?? (
          <Box sx={{ color: MAIN_BLACK, fontSize: "0.85rem" }}>
            or{" "}
            <Link component="button" sx={{ color: CORAL_ORANGE, fontWeight: 600 }}>
              browse files
            </Link>{" "}
            or{" "}
            <Link component="button" sx={{ color: CORAL_ORANGE, fontWeight: 600 }}>
              browse folders
            </Link>
          </Box>
        )}
      </Stack>
    </GxCard>
  );
}

export default ExampleEmptyState;
