import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import CommonSubmitButton from "./CommonSubmitButton";

describe("CommonSubmitButton", () => {
  it("renders the label", () => {
    render(<CommonSubmitButton>Save Changes</CommonSubmitButton>);
    expect(screen.getByRole("button", { name: /save changes/i })).toBeInTheDocument();
  });

  it("uppercases the label by default (textTransform applied)", () => {
    render(<CommonSubmitButton>Save</CommonSubmitButton>);
    expect(screen.getByRole("button")).toHaveStyle({ textTransform: "uppercase" });
  });

  it("isUppercase={false} disables the textTransform", () => {
    render(<CommonSubmitButton isUppercase={false}>Save</CommonSubmitButton>);
    expect(screen.getByRole("button")).toHaveStyle({ textTransform: "none" });
  });

  it("fires onClick", async () => {
    const onClick = vi.fn();
    render(<CommonSubmitButton onClick={onClick}>Go</CommonSubmitButton>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("invert flips the rest fill from coral to green", () => {
    const { rerender } = render(<CommonSubmitButton>X</CommonSubmitButton>);
    // Default rest fill is CORAL (#f3663f → rgb(243, 102, 63)).
    expect(screen.getByRole("button")).toHaveStyle({
      backgroundColor: "rgb(243, 102, 63)",
    });
    rerender(<CommonSubmitButton invert>X</CommonSubmitButton>);
    // Inverted rest fill is GREEN (#a1ec83 → rgb(161, 236, 131)).
    expect(screen.getByRole("button")).toHaveStyle({
      backgroundColor: "rgb(161, 236, 131)",
    });
  });

  it("defaults type to 'button' so it doesn't accidentally submit forms", () => {
    render(<CommonSubmitButton>X</CommonSubmitButton>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
});
