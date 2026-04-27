/**
 * VideoPlayer — `<video>` wrapped in the brand surface treatment.
 *
 * Card radius, hairline border, navy letterbox fallback (true black is
 * never correct in the brand — see colors.md). Native browser controls are
 * on by default; override with `controls={false}` for an autoplaying
 * background loop.
 */

import { Box, BoxProps } from "@mui/material";

import { BORDER, BORDER_RADIUS_CARD, NAVY } from "../../constants";

interface VideoPlayerProps extends Omit<BoxProps<"video">, "component" | "src"> {
  /** Video URL. */
  src: string;
  /** Optional poster image shown before play. */
  poster?: string;
  /** Show native browser controls. Defaults to true. */
  controls?: boolean;
}

export function VideoPlayer({
  src,
  poster,
  controls = true,
  sx,
  ...rest
}: VideoPlayerProps) {
  return (
    <Box
      component="video"
      src={src}
      poster={poster}
      controls={controls}
      sx={{
        borderRadius: BORDER_RADIUS_CARD,
        border: `1px solid ${BORDER}`,
        backgroundColor: NAVY,
        width: "100%",
        ...sx,
      }}
      {...rest}
    />
  );
}

export default VideoPlayer;
