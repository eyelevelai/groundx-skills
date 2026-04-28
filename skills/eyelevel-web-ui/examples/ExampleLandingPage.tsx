/**
 * ExampleLandingPage — canonical reconstruction of a marketing landing page.
 *
 * Exercises the public-page-layout vocabulary documented in
 * `references/layout.md` § Public-page layout: header bar with logo + nav
 * + primary CTA; full-bleed hero on a navy canvas; feature grid on tint;
 * navy footer with column nav and a copyright row.
 *
 * Read this file when building any public surface — a marketing landing
 * page, a product page, a pricing page, a docs site shell. The same
 * brand contracts hold as for dashboard work: tokens from `@/constants`,
 * no hex literals, GxCard for surfaces, CommonSubmitButton for primary
 * CTAs, eyebrows written as literal uppercase strings (green on navy,
 * coral on light), Inter typography inherited from `<body>`.
 *
 * The page is intentionally standalone — every import resolves to the
 * project's own `src/` (or here, the templates/ skeleton). Nothing
 * reaches into a sibling repo. A new project that ports
 * `templates/shared/components/` and `templates/constants/` can drop
 * this file in unchanged.
 */

import { Box, Stack, Typography } from "@mui/material";

import CommonSubmitButton from "../templates/shared/components/CommonSubmitButton";
import GxCard from "../templates/shared/components/GxCard";

import {
  BORDER,
  CORAL,
  FONT_SIZE_BODY,
  FONT_SIZE_BODY_SM,
  FONT_SIZE_CAPTION,
  FONT_SIZE_H1,
  FONT_SIZE_H3,
  FONT_SIZE_H5,
  FONT_SIZE_LABEL,
  FONT_WEIGHT_BODY,
  FONT_WEIGHT_DISPLAY,
  FONT_WEIGHT_HEADLINE,
  FONT_WEIGHT_LABEL,
  GRAY,
  GREEN,
  LETTER_SPACING_LABEL,
  LINE_HEIGHT_BODY,
  LINE_HEIGHT_DISPLAY,
  NAVY,
  TINT,
  WHITE,
} from "../templates/constants";

// ──────────────────────────────────────────────────────────────────────────
// Shared section primitives
//
// Every section below uses the same shape: full-bleed canvas, with inner
// content centered and capped at MAX_CONTENT_WIDTH. We define the cap as
// a const so a reader can see the public-page width contract in one place
// (the dashboard's app shell uses the route content pane instead, so
// nothing equivalent ships from `@/constants` today; if a project's
// `constants.chrome.ts` adds a MAX_CONTENT_WIDTH, swap to that import).
// ──────────────────────────────────────────────────────────────────────────

const MAX_CONTENT_WIDTH = 1280;

interface SectionProps {
  background: string;
  textColor?: string;
  paddingY?: number; // MUI spacing units
  children: React.ReactNode;
}
function Section({ background, textColor, paddingY = 10, children }: SectionProps) {
  return (
    <Box sx={{ backgroundColor: background, color: textColor, width: "100%" }}>
      <Box
        sx={{
          maxWidth: MAX_CONTENT_WIDTH,
          mx: "auto",
          py: { xs: 6, md: paddingY },
          px: { xs: 3, md: 6 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Header bar — logo · nav · primary CTA
//
// White surface, hairline bottom border, no shadow. Lockup uses the
// light-surface variant (eyelevel-logo-color.png). Nav links read as
// literal uppercase strings; their hover state is navy. CTA is a
// CommonSubmitButton (coral-rest, green-hover by the brand convention).
// ──────────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["PRODUCT", "DOCS", "PRICING"];

// Logo paths assume the consumer has copied the brand PNGs into their
// project's `public/assets/logos/` (the convention from
// `../../eyelevel-design-standards/references/logos.md`). The source PNGs
// live in `eyelevel-design-standards/assets/logos/`; copy them once at
// project setup, then reference at runtime as `/assets/logos/<name>.png`.
const LOGO_LIGHT_SURFACE = "/assets/logos/eyelevel-logo-color.png";
const LOGO_DARK_SURFACE  = "/assets/logos/eyelevel-logo-white.png";

function HeaderBar() {
  return (
    <Box
      component="header"
      sx={{
        backgroundColor: WHITE,
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          maxWidth: MAX_CONTENT_WIDTH,
          mx: "auto",
          px: { xs: 3, md: 6 },
          py: 2,
          gap: 3,
        }}
      >
        <Box
          component="img"
          src={LOGO_LIGHT_SURFACE}
          alt="EyeLevel, a Valantor company"
          sx={{ height: 28, display: { xs: "none", sm: "block" } }}
        />
        <Stack
          component="nav"
          direction="row"
          spacing={4}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {NAV_LINKS.map((label) => (
            <Typography
              key={label}
              component="a"
              href="#"
              sx={{
                color: NAVY,
                fontWeight: FONT_WEIGHT_LABEL,
                fontSize: FONT_SIZE_BODY_SM,
                letterSpacing: LETTER_SPACING_LABEL,
                textDecoration: "none",
                "&:hover": { color: CORAL },
              }}
            >
              {label}
            </Typography>
          ))}
        </Stack>
        <CommonSubmitButton>Book a demo</CommonSubmitButton>
      </Stack>
    </Box>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Hero section — navy canvas · coral eyebrow · white display headline · CTA
//
// `eyebrow + headline + body` from patterns.md, on a navy canvas. The
// eyebrow uses the surface-luminance rule: coral wouldn't read on navy,
// so we use green. Two-part eyebrows separated by U+00B7 (middle dot)
// are typed literally — see voice.md § 3b.
// ──────────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <Section background={NAVY} textColor={WHITE} paddingY={14}>
      <Stack spacing={3} alignItems="flex-start" sx={{ maxWidth: 800 }}>
        <Typography
          component="div"
          sx={{
            color: GREEN,
            fontWeight: FONT_WEIGHT_LABEL,
            fontSize: FONT_SIZE_LABEL,
            letterSpacing: LETTER_SPACING_LABEL,
          }}
        >
          NEW · FOR ENTERPRISES
        </Typography>
        <Typography
          component="h1"
          sx={{
            color: WHITE,
            fontSize: FONT_SIZE_H1,
            fontWeight: FONT_WEIGHT_DISPLAY,
            lineHeight: LINE_HEIGHT_DISPLAY,
            // Headline-tier negative tracking is set on the theme's h1
            // variant; we don't override here since we're using sx, but
            // the size matches the brand's display heading.
          }}
        >
          Visual document understanding for the enterprise.
        </Typography>
        <Typography
          sx={{
            color: WHITE,
            opacity: 0.82,
            fontSize: FONT_SIZE_BODY,
            fontWeight: FONT_WEIGHT_BODY,
            lineHeight: LINE_HEIGHT_BODY,
          }}
        >
          GroundX turns complex documents into structurally-aware
          retrieval — tables as tables, captions bound to figures,
          sections preserving their hierarchy. Element-level provenance
          on every output.
        </Typography>
        <CommonSubmitButton sx={{ mt: 2, px: 2.5 }}>
          Schedule a working session
        </CommonSubmitButton>
      </Stack>
    </Section>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Feature grid — tint canvas · three GxCards · coral eyebrows
//
// The three-card-summary pattern from patterns.md, on a public surface.
// Each card uses the GxCard wrapper (default rounding, hairline border,
// no shadow). On `< md`, the grid drops to one column.
// ──────────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    eyebrow: "STRUCTURE",
    heading: "Reads tables as tables.",
    body: "Columns, headers, and cell relationships survive ingestion intact. No flattening to plain text.",
  },
  {
    eyebrow: "PROVENANCE",
    heading: "Every output traces back.",
    body: "Element-level provenance to the document, page, and section. Audit-ready from day one.",
  },
  {
    eyebrow: "DEPLOYMENT",
    heading: "On-prem, air-gapped, secure.",
    body: "Designed for the secure enterprise data center. No external dependencies, no data egress.",
  },
];

function FeatureGrid() {
  return (
    <Section background={TINT}>
      <Stack spacing={6}>
        <Stack spacing={2} sx={{ maxWidth: 720 }}>
          <Typography
            component="div"
            sx={{
              color: CORAL,
              fontWeight: FONT_WEIGHT_LABEL,
              fontSize: FONT_SIZE_LABEL,
              letterSpacing: LETTER_SPACING_LABEL,
            }}
          >
            CAPABILITIES
          </Typography>
          <Typography
            component="h2"
            sx={{
              color: NAVY,
              fontSize: FONT_SIZE_H3,
              fontWeight: FONT_WEIGHT_HEADLINE,
            }}
          >
            Built for the documents enterprises actually run on.
          </Typography>
        </Stack>
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          }}
        >
          {FEATURES.map((f) => (
            <GxCard key={f.eyebrow}>
              <Stack spacing={1.5} sx={{ p: 1 }}>
                <Typography
                  component="div"
                  sx={{
                    color: CORAL,
                    fontWeight: FONT_WEIGHT_LABEL,
                    fontSize: FONT_SIZE_LABEL,
                    letterSpacing: LETTER_SPACING_LABEL,
                  }}
                >
                  {f.eyebrow}
                </Typography>
                <Typography
                  component="h3"
                  sx={{
                    color: NAVY,
                    fontSize: FONT_SIZE_H5,
                    fontWeight: FONT_WEIGHT_HEADLINE,
                  }}
                >
                  {f.heading}
                </Typography>
                <Typography
                  sx={{
                    color: NAVY,
                    fontSize: FONT_SIZE_BODY,
                    fontWeight: FONT_WEIGHT_BODY,
                    lineHeight: LINE_HEIGHT_BODY,
                    opacity: 0.85,
                  }}
                >
                  {f.body}
                </Typography>
              </Stack>
            </GxCard>
          ))}
        </Box>
      </Stack>
    </Section>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Site footer — navy canvas · lockup · column nav · copyright row
//
// Eyebrows on each column heading are GREEN per the surface-luminance
// rule (coral on a navy surface reads muddy). Body links read in white
// at reduced opacity. The bottom row carries the legal mark.
// ──────────────────────────────────────────────────────────────────────────

const FOOTER_COLUMNS = [
  { heading: "PRODUCT",  links: ["Features", "Documentation", "Pricing", "Changelog"] },
  { heading: "COMPANY",  links: ["About", "Customers", "Careers", "Contact"] },
  { heading: "RESOURCES", links: ["Blog", "Case studies", "Benchmarks", "API reference"] },
  { heading: "LEGAL",    links: ["Privacy", "Terms", "Cookies"] },
];

function SiteFooter() {
  return (
    <Box component="footer" sx={{ backgroundColor: NAVY, color: WHITE }}>
      <Box
        sx={{
          maxWidth: MAX_CONTENT_WIDTH,
          mx: "auto",
          px: { xs: 3, md: 6 },
          py: { xs: 6, md: 10 },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 8 }}
          sx={{ alignItems: "flex-start" }}
        >
          <Box
            component="img"
            src={LOGO_DARK_SURFACE}
            alt="EyeLevel, a Valantor company"
            sx={{ height: 28, flexShrink: 0 }}
          />
          <Box
            sx={{
              flex: 1,
              display: "grid",
              gap: 4,
              gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            }}
          >
            {FOOTER_COLUMNS.map((col) => (
              <Stack key={col.heading} spacing={1.5}>
                <Typography
                  component="div"
                  sx={{
                    color: GREEN,
                    fontWeight: FONT_WEIGHT_LABEL,
                    fontSize: FONT_SIZE_LABEL,
                    letterSpacing: LETTER_SPACING_LABEL,
                  }}
                >
                  {col.heading}
                </Typography>
                {col.links.map((l) => (
                  <Typography
                    key={l}
                    component="a"
                    href="#"
                    sx={{
                      color: WHITE,
                      opacity: 0.8,
                      fontSize: FONT_SIZE_BODY_SM,
                      fontWeight: FONT_WEIGHT_BODY,
                      textDecoration: "none",
                      "&:hover": { opacity: 1, color: GREEN },
                    }}
                  >
                    {l}
                  </Typography>
                ))}
              </Stack>
            ))}
          </Box>
        </Stack>
        <Box sx={{ mt: { xs: 6, md: 10 }, pt: 4, borderTop: `1px solid ${BORDER}` }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            spacing={1}
          >
            <Typography
              sx={{
                color: WHITE,
                opacity: 0.6,
                fontSize: FONT_SIZE_CAPTION,
              }}
            >
              © 2026 EyeLevel · A Valantor Company
            </Typography>
            <Typography
              sx={{
                color: WHITE,
                opacity: 0.6,
                fontSize: FONT_SIZE_CAPTION,
              }}
            >
              PRIVACY · TERMS · COOKIES
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// The page — composes the four sections.
// ──────────────────────────────────────────────────────────────────────────

export function ExampleLandingPage() {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: GRAY,
        minHeight: "100vh",
      }}
    >
      <HeaderBar />
      <HeroSection />
      <FeatureGrid />
      <SiteFooter />
    </Box>
  );
}

export default ExampleLandingPage;
