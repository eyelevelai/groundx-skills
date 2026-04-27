import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import GxPill from "./GxPill";

describe("GxPill", () => {
  it("renders the label literally (uppercase preserved)", () => {
    render(<GxPill>X-RAY</GxPill>);
    expect(screen.getByText("X-RAY")).toBeInTheDocument();
  });

  it("default is a non-interactive element (no role=button)", () => {
    render(<GxPill>STATUS</GxPill>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("with onClick, renders as a button (ButtonBase)", () => {
    render(<GxPill onClick={() => {}}>CLICK ME</GxPill>);
    expect(screen.getByRole("button", { name: "CLICK ME" })).toBeInTheDocument();
  });

  it("fires onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<GxPill onClick={onClick}>TAP</GxPill>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("variant=success uses navy text", () => {
    render(<GxPill variant="success">DONE</GxPill>);
    // Navy is #29335c; jsdom returns colors as rgb(...).
    expect(screen.getByText("DONE")).toHaveStyle({ color: "rgb(41, 51, 92)" });
  });
});
