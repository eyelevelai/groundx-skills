/**
 * ExampleDashboardPage — canonical reconstruction of the GroundX Home view.
 *
 * Everything here uses only the skill's primitives and token imports. No hex
 * literals. No hardcoded media queries. No raw <Card>.
 *
 * Read this file when building a new page — it demonstrates:
 *   - The standard page shell (margin-top to clear AppBar, responsive padding)
 *   - A collapsible help card using MUI Accordion styled via GxCard
 *   - A "section header + action" row via GxSectionHeader
 *   - A grid of bucket cards with asymmetric radii (desktop) that square up
 *     on mobile — using theme.breakpoints rather than hardcoded px
 *   - A split RETRIEVALS | CHAT button via GxButtonGroup
 */

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import CommonSubmitButton from "../templates/shared/components/CommonSubmitButton";
import GxButtonGroup from "../templates/shared/components/GxButtonGroup";
import GxCard from "../templates/shared/components/GxCard";
import GxSectionHeader from "../templates/shared/components/GxSectionHeader";

import {
  BORDER,
  BORDER_RADIUS_CARD,
  CORAL,
  FONT_WEIGHT_LABEL,
  LETTER_SPACING_CHIP,
  MAIN_CONTENT_PADDING,
  MAIN_CONTENT_TOP_MARGIN,
  NAVY,
  PADDING,
} from "../templates/constants";

interface Bucket {
  id: string;
  name: string;
  files: number;
  tokens: number;
  isEmpty: boolean;
}

const BUCKETS: Bucket[] = [
  { id: "27051", name: "Dell", files: 1, tokens: 103_160, isEmpty: false },
  { id: "26790", name: "Test", files: 5, tokens: 110_708, isEmpty: false },
  { id: "26780", name: "Upload", files: 4, tokens: 6_380, isEmpty: true },
];

export function ExampleDashboardPage() {
  return (
    <Box
      sx={{
        // Responsive padding: generous on desktop, tight on mobile. Uses
        // theme.breakpoints — never hardcode @media (max-width: Xpx).
        marginTop: (t) => t.spacing(MAIN_CONTENT_TOP_MARGIN),
        padding: (t) => t.spacing(MAIN_CONTENT_PADDING),
        [(t) => t.breakpoints.down("md")]: {
          padding: (t) => t.spacing(2),
        },
      }}
    >
      <Stack spacing={3}>
        <TutorialCard />
        <ContentSection buckets={BUCKETS} />
      </Stack>
    </Box>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Collapsible tutorial card
// ──────────────────────────────────────────────────────────────────────────

function TutorialCard() {
  return (
    <Accordion
      defaultExpanded
      square
      sx={{
        borderRadius: BORDER_RADIUS_CARD,
        boxShadow: "none",
        border: `1px solid ${BORDER}`,
        "&:before": { display: "none" }, // remove MUI's top border divider
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: CORAL }} />}>
        <Typography
          sx={{
            color: NAVY,
            fontWeight: FONT_WEIGHT_LABEL,
            letterSpacing: LETTER_SPACING_CHIP,
          }}
        >
          TUTORIAL
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          alignItems="flex-start"
        >
          <Box sx={{ flex: 1 }}>
            <Typography component="ol" sx={{ pl: 2, color: NAVY }}>
              <li>GroundX stores your content in buckets.</li>
              <li>Upload files in 10 formats.</li>
              <li>100MB per upload. 750 pages or 20MB per document.</li>
              <li>
                Click chat to "talk" to the docs in your bucket. Click retrievals
                to see what GroundX returns during search.
              </li>
              <li>Or use our APIs to load docs: Ingest</li>
            </Typography>
          </Box>
          <Box
            component="video"
            controls
            sx={{
              width: { xs: "100%", sm: 320 },
              borderRadius: BORDER_RADIUS_CARD,
              border: `1px solid ${BORDER}`,
            }}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// "CONTENT" section header + bucket grid
// ──────────────────────────────────────────────────────────────────────────

function ContentSection({ buckets }: { buckets: Bucket[] }) {
  return (
    <Stack spacing={2}>
      <GxCard>
        <GxSectionHeader
          label="CONTENT"
          action={
            <CommonSubmitButton startIcon={<AddIcon />} sx={{ px: 2.5 }}>
              New Bucket
            </CommonSubmitButton>
          }
        />
      </GxCard>

      <Stack spacing={2}>
        {buckets.map((b) => (
          <BucketRow key={b.id} bucket={b} />
        ))}
      </Stack>
    </Stack>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Individual bucket row (info card + upload zone)
// ──────────────────────────────────────────────────────────────────────────

function BucketRow({ bucket }: { bucket: Bucket }) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      sx={{ width: "100%" }}
    >
      {/* Left: bucket info card (rounded left on desktop, fully rounded on mobile) */}
      <Box
        sx={{
          width: { xs: "100%", md: 320 },
          backgroundColor: "background.paper",
          border: `1px solid ${BORDER}`,
          p: PADDING,
          boxShadow: "none",
          borderRadius: {
            xs: BORDER_RADIUS_CARD,
            md: `${BORDER_RADIUS_CARD}px 0 0 ${BORDER_RADIUS_CARD}px`,
          },
        }}
      >
        <Typography sx={{ color: CORAL, fontWeight: FONT_WEIGHT_LABEL, mb: 1 }}>
          {bucket.name} ›
        </Typography>
        <Typography variant="body2" sx={{ color: NAVY, mb: 0.5 }}>
          <b>ID:</b> {bucket.id}
          <IconButton size="small" sx={{ ml: 0.5 }} aria-label="copy bucket id">
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Typography>
        <Typography variant="body2" sx={{ color: NAVY, mb: 0.5 }}>
          <b>Files:</b> {bucket.files}
        </Typography>
        <Typography variant="body2" sx={{ color: NAVY, mb: 1.5 }}>
          <b>Tokens:</b> {bucket.tokens.toLocaleString()}
        </Typography>
        <GxButtonGroup variant="outlined" aria-label="bucket actions">
          <Button>Retrievals</Button>
          <Button>Chat</Button>
        </GxButtonGroup>
      </Box>

      {/* Right: upload zone */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          backgroundColor: "background.paper",
          border: `1px solid ${BORDER}`,
          borderLeft: { md: "none" },
          borderTop: { xs: "none", md: `1px solid ${BORDER}` },
          p: PADDING,
          minHeight: 120,
          borderRadius: {
            xs: BORDER_RADIUS_CARD,
            md: `0 ${BORDER_RADIUS_CARD}px ${BORDER_RADIUS_CARD}px 0`,
          },
        }}
      >
        <Typography sx={{ color: NAVY, fontWeight: FONT_WEIGHT_LABEL }}>
          Drag files here
        </Typography>
        <CloudUploadIcon fontSize="large" sx={{ color: CORAL }} />
      </Box>
    </Stack>
  );
}

export default ExampleDashboardPage;
