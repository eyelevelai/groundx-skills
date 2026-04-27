import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import UsageBar from "./UsageBar";

describe("UsageBar", () => {
  it("renders the label when provided", () => {
    render(<UsageBar percent={42} label="Storage: 42%" />);
    expect(screen.getByText("Storage: 42%")).toBeInTheDocument();
  });

  it("clamps a negative percent to 0", () => {
    render(<UsageBar percent={-10} label="x" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "0");
  });

  it("clamps a percent above 100 down to 100", () => {
    render(<UsageBar percent={150} label="x" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "100");
  });

  it("renders without a label", () => {
    render(<UsageBar percent={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
