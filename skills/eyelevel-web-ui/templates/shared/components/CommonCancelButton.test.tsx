import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import CommonCancelButton from "./CommonCancelButton";

describe("CommonCancelButton", () => {
  it("renders the label", () => {
    render(<CommonCancelButton>Cancel</CommonCancelButton>);
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("fires onClick", async () => {
    const onClick = vi.fn();
    render(<CommonCancelButton onClick={onClick}>Cancel</CommonCancelButton>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
