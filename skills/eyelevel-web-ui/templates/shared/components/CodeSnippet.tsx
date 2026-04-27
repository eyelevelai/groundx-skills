/**
 * CodeSnippet — multi-tab code example viewer (cURL / JavaScript / Python /
 * etc.).
 *
 * Used on API documentation screens, getting-started cards, and anywhere a
 * single snippet needs to ship in multiple languages. Each tab carries a
 * pre-formatted code body; the viewer handles tab switching, copy-to-clipboard,
 * and brand chrome.
 *
 * Brand chrome: white surface, BORDER hairline, BORDER_RADIUS_CARD corners,
 * gray tab strip with a coral active indicator, navy code in a monospace
 * font, copy icon in the top-right of the tab strip.
 */

import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

import {
  BODY_TEXT,
  BORDER,
  BORDER_RADIUS_CARD,
  CORAL,
  FONT_SIZE_BODY_SM,
  FONT_WEIGHT_LABEL,
  GRAY,
  NAVY,
  PADDING,
  WHITE,
} from "../../constants";

import CopyToClipboard from "./CopyToClipboard";

export interface CodeSnippetTab {
  /** Tab label — e.g. "cURL", "JavaScript", "Python". */
  label: string;
  /** Code body. Rendered as plain monospaced text — provide pre-formatted output. */
  code: string;
}

interface CodeSnippetProps {
  /** One tab per language. */
  tabs: CodeSnippetTab[];
}

export function CodeSnippet({ tabs }: CodeSnippetProps) {
  const [active, setActive] = useState(0);
  const current = tabs[active] ?? tabs[0];

  return (
    <Box
      sx={{
        backgroundColor: WHITE,
        border: `1px solid ${BORDER}`,
        borderRadius: BORDER_RADIUS_CARD,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: GRAY,
          borderBottom: `1px solid ${BORDER}`,
          pr: 1,
        }}
      >
        <Tabs
          value={active}
          onChange={(_e, v) => setActive(v)}
          TabIndicatorProps={{ sx: { backgroundColor: CORAL, height: 2 } }}
          sx={{ minHeight: 0 }}
        >
          {tabs.map((tab, i) => (
            <Tab
              key={tab.label}
              label={tab.label}
              sx={{
                color: i === active ? NAVY : BODY_TEXT,
                fontWeight: FONT_WEIGHT_LABEL,
                fontSize: FONT_SIZE_BODY_SM,
                textTransform: "none",
                minHeight: 36,
              }}
            />
          ))}
        </Tabs>
        <CopyToClipboard
          value={current?.code ?? ""}
          aria-label={`Copy ${current?.label ?? "code"} snippet`}
        />
      </Box>
      <Box
        component="pre"
        sx={{
          margin: 0,
          padding: PADDING,
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: FONT_SIZE_BODY_SM,
          color: NAVY,
          overflow: "auto",
          whiteSpace: "pre",
        }}
      >
        {current?.code}
      </Box>
    </Box>
  );
}

export default CodeSnippet;
