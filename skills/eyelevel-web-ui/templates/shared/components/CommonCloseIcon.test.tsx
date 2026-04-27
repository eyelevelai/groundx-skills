import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import CommonCloseIcon from "./CommonCloseIcon";

describe("CommonCloseIcon", () => {
  it("has aria-label=\"close\" by default", () => {
    render(<CommonCloseIcon />);
    expect(screen.getByRole("button", { name: "close" })).toBeInTheDocument();
  });

  it("accepts a custom aria-label", () => {
    render(<CommonCloseIcon aria-label="dismiss panel" />);
    expect(screen.getByRole("button", { name: "dismiss panel" })).toBeInTheDocument();
  });

  it("fires onClick", async () => {
    const onClick = vi.fn();
    render(<CommonCloseIcon onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
