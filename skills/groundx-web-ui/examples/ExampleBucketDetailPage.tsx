/**
 * ExampleBucketDetailPage — canonical reconstruction of the Buckets/SelectedBucket view.
 *
 * Demonstrates:
 *   - The "< Back" breadcrumb using the `gx-back-button` theme variant.
 *   - A collapsible help card (same pattern as TutorialCard on the dashboard).
 *   - A bucket header with bucket name + action pills (Delete / Chat / Retrievals / Add Content).
 *   - A data table with checkbox selection, row hover, X-RAY pill, copyable document ID.
 *   - A "Rows per page" pagination control.
 */

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import CommonSubmitButton from "../templates/components/CommonSubmitButton";
import GxCard from "../templates/components/GxCard";
import GxPill from "../templates/components/GxPill";

import {
  BORDER_RADIUS,
  CORAL_ORANGE,
  LIGHT_GREY_2,
  MAIN_BLACK,
  MAIN_CONTENT_PADDING,
  MAIN_CONTENT_TOP_MARGIN,
  PADDING,
  ROW_SELECTED_BG,
} from "../templates/constants";

interface DocRow {
  id: string;
  name: string;
  docId: string;
  tokens: number;
}

const ROWS: DocRow[] = [
  { id: "1", name: "Untitled presentation.pdf", docId: "d25b...1a", tokens: 103_160 },
];

export function ExampleBucketDetailPage() {
  return (
    <Box
      sx={{
        marginTop: (t) => t.spacing(MAIN_CONTENT_TOP_MARGIN),
        padding: (t) => t.spacing(MAIN_CONTENT_PADDING),
      }}
    >
      <Stack spacing={3}>
        <Button variant="gx-back-button" startIcon={<NavigateBeforeIcon />}>
          Back
        </Button>

        <HelpAccordion />
        <BucketHeader bucketName="Dell" />
        <DocumentTable rows={ROWS} />
      </Stack>
    </Box>
  );
}

// ──────────────────────────────────────────────────────────────────────────

function HelpAccordion() {
  return (
    <Accordion
      square
      sx={{
        borderRadius: 3,
        boxShadow: "none",
        border: `1px solid ${LIGHT_GREY_2}`,
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: CORAL_ORANGE }} />}>
        <Typography sx={{ color: MAIN_BLACK, fontWeight: 600 }}>
          What can I do inside a content bucket?
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" sx={{ color: MAIN_BLACK }}>
          Upload, chat with, and search your documents. Use the X-RAY action to
          inspect how GroundX parsed a file.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

// ──────────────────────────────────────────────────────────────────────────

function BucketHeader({ bucketName }: { bucketName: string }) {
  return (
    <GxCard sx={{ backgroundColor: LIGHT_GREY_2 }}>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        alignItems={{ xs: "flex-start", lg: "center" }}
        justifyContent="space-between"
        spacing={2}
      >
        <Typography sx={{ color: MAIN_BLACK, fontWeight: 600, fontSize: "1.05rem" }}>
          {bucketName}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <CommonSubmitButton startIcon={<DeleteIcon />}>Delete</CommonSubmitButton>
          <CommonSubmitButton>Chat</CommonSubmitButton>
          <CommonSubmitButton>Retrievals</CommonSubmitButton>
          <CommonSubmitButton startIcon={<AddIcon />}>Add Content</CommonSubmitButton>
        </Stack>
      </Stack>
    </GxCard>
  );
}

// ──────────────────────────────────────────────────────────────────────────

function DocumentTable({ rows }: { rows: DocRow[] }) {
  return (
    <GxCard noPadding>
      <TableContainer sx={{ borderRadius: BORDER_RADIUS }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Document ID</TableCell>
              <TableCell align="right">Tokens</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow
                key={r.id}
                hover
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    backgroundColor: ROW_SELECTED_BG,
                  },
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell sx={{ color: CORAL_ORANGE, fontWeight: 500 }}>
                  {r.name}
                </TableCell>
                <TableCell align="right">
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={1}
                  >
                    <Typography variant="body2" sx={{ color: MAIN_BLACK }}>
                      {r.docId}
                    </Typography>
                    <IconButton size="small" aria-label="copy document id">
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
                <TableCell align="right">{r.tokens.toLocaleString()}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton size="small" aria-label="download">
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                    <GxPill dense>X-RAY</GxPill>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ px: PADDING, py: 0.5 }}>
          <TablePagination
            component="div"
            count={rows.length}
            page={0}
            rowsPerPage={10}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
          />
        </Box>
      </TableContainer>
    </GxCard>
  );
}

export default ExampleBucketDetailPage;
