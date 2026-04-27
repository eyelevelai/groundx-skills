/**
 * DownloadButton — IconButton wrapping a DownloadIcon glyph.
 *
 * Two modes:
 *   - With `href`: renders as an `<a>` element with `download` attribute, so
 *     the browser handles the download natively (preferred for static assets
 *     with a known URL).
 *   - With only `onClick`: renders as a normal IconButton, callback supplies
 *     the file (typical for blob-from-API or computed-file flows).
 *
 * The IconButton inherits the theme's CYAN background + GREEN hover.
 */

import { IconButton, IconButtonProps } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

interface DownloadButtonProps extends IconButtonProps {
  /** Href for native browser download. If provided, renders as an <a>. */
  href?: string;
  /** Suggested filename for the download. */
  download?: string;
  /** Accessible label — required for IconButtons. */
  "aria-label": string;
}

export function DownloadButton({
  href,
  download,
  "aria-label": ariaLabel,
  size = "small",
  ...props
}: DownloadButtonProps) {
  if (href) {
    return (
      <IconButton
        component="a"
        href={href}
        download={download}
        aria-label={ariaLabel}
        size={size}
        {...props}
      >
        <DownloadIcon fontSize="small" />
      </IconButton>
    );
  }
  return (
    <IconButton aria-label={ariaLabel} size={size} {...props}>
      <DownloadIcon fontSize="small" />
    </IconButton>
  );
}

export default DownloadButton;
