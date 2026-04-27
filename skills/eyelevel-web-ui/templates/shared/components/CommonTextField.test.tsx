import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import CommonTextField from "./CommonTextField";

describe("CommonTextField", () => {
  it("renders an input with the label", () => {
    render(<CommonTextField label="Email" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("accepts user input", async () => {
    render(<CommonTextField label="Name" />);
    const input = screen.getByLabelText(/name/i);
    await userEvent.type(input, "Ben");
    expect(input).toHaveValue("Ben");
  });

  it("does not require callers to pass `variant` (wrapper hardcodes outlined)", () => {
    // If `variant` were still required, this would be a TS error caught by tsc.
    // The runtime assertion here is just that it renders.
    render(<CommonTextField label="X" />);
    expect(screen.getByLabelText("X")).toBeInTheDocument();
  });
});
