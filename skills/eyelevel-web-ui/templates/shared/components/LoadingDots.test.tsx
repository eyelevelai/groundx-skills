import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import LoadingDots from "./LoadingDots";

describe("LoadingDots", () => {
  it("has role=\"status\" and a default aria-label", () => {
    render(<LoadingDots />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("accepts a custom aria-label", () => {
    render(<LoadingDots aria-label="Sending message…" />);
    expect(screen.getByRole("status", { name: "Sending message…" })).toBeInTheDocument();
  });
});
