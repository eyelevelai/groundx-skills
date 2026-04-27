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

import GxCard from "../templates/shared/components/GxCard";
import {
  BORDER,
  CORAL,
  FONT_SIZE_BODY_SM,
  FONT_WEIGHT_LABEL,
  NAVY,
} from "../templates/constants";

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
        borderColor: isDragging ? CORAL : BORDER,
        borderStyle: isDragging ? "dashed" : "solid",
        transition: "border-color 120ms ease",
      }}
    >
      <Stack alignItems="center" spacing={1} sx={{ py: 3 }}>
        <CloudUploadIcon fontSize="large" sx={{ color: CORAL }} />
        <Typography sx={{ color: NAVY, fontWeight: FONT_WEIGHT_LABEL }}>{label}</Typography>
        {footer ?? (
          <Box sx={{ color: NAVY, fontSize: FONT_SIZE_BODY_SM }}>
            or{" "}
            <Link component="button" sx={{ color: CORAL, fontWeight: FONT_WEIGHT_LABEL }}>
              browse files
            </Link>{" "}
            or{" "}
            <Link component="button" sx={{ color: CORAL, fontWeight: FONT_WEIGHT_LABEL }}>
              browse folders
            </Link>
          </Box>
        )}
      </Stack>
    </GxCard>
  );
}

export default ExampleEmptyState;
