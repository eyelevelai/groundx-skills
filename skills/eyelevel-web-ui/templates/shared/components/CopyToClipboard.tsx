/**
 * CopyToClipboard — IconButton that copies a string to the clipboard.
 *
 * Pairs naturally with any inline value the user might want to copy: an API
 * key, a record ID, a code sample, an email address. Shows a brief check
 * glyph after a successful copy so the user knows the action landed.
 *
 * The IconButton inherits the theme's CYAN background + GREEN hover from
 * the MuiIconButton override in templates/theme.ts.
 */

import { IconButton, IconButtonProps } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

import CommonToolTip from "./CommonToolTip";

interface CopyToClipboardProps extends Omit<IconButtonProps, "onClick"> {
  /** The string to copy when the icon is clicked. */
  value: string;
  /** Accessible label. Defaults to "Copy to clipboard". */
  "aria-label"?: string;
  /** How long to show the check state, in ms. Defaults to 1500. */
  copiedDurationMs?: number;
}

export function CopyToClipboard({
  value,
  "aria-label": ariaLabel = "Copy to clipboard",
  copiedDurationMs = 1500,
  size = "small",
  ...props
}: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), copiedDurationMs);
    } catch {
      // navigator.clipboard fails in non-secure contexts (e.g., some embeds);
      // silently no-op rather than throw.
    }
  };

  return (
    <CommonToolTip title={copied ? "Copied" : "Copy"} placement="top">
      <IconButton
        onClick={handleClick}
        aria-label={ariaLabel}
        size={size}
        {...props}
      >
        {copied ? (
          <CheckIcon fontSize="small" />
        ) : (
          <ContentCopyIcon fontSize="small" />
        )}
      </IconButton>
    </CommonToolTip>
  );
}

export default CopyToClipboard;
