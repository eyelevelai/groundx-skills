import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import GxSectionHeader from "./GxSectionHeader";

describe("GxSectionHeader", () => {
  it("renders the label as-is (no text-transform)", () => {
    render(<GxSectionHeader label="CONTENT" />);
    expect(screen.getByText("CONTENT")).toBeInTheDocument();
  });

  it("renders the action slot when provided", () => {
    render(
      <GxSectionHeader label="FEATURES" action={<button>+ Add</button>} />,
    );
    expect(screen.getByRole("button", { name: "+ Add" })).toBeInTheDocument();
  });

  it("does not render an action slot when none is provided", () => {
    render(<GxSectionHeader label="EMPTY" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
