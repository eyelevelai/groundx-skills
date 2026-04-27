import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import GxCard from "./GxCard";

describe("GxCard", () => {
  it("renders children", () => {
    render(<GxCard>hello</GxCard>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("default radius is the card token (20px)", () => {
    render(<GxCard data-testid="c">x</GxCard>);
    expect(screen.getByTestId("c")).toHaveStyle({ borderRadius: "20px" });
  });

  it("radius=\"sm\" uses the inner-surface token (6px)", () => {
    render(<GxCard data-testid="c" radius="sm">x</GxCard>);
    expect(screen.getByTestId("c")).toHaveStyle({ borderRadius: "6px" });
  });

  it("noPadding removes inner padding", () => {
    render(<GxCard data-testid="c" noPadding>x</GxCard>);
    // MUI's spacing scale resolves PADDING (2) to 16px; noPadding sets it to 0.
    expect(screen.getByTestId("c")).toHaveStyle({ padding: "0px" });
  });

  it("interactive adds cursor:pointer", () => {
    render(<GxCard data-testid="c" interactive>x</GxCard>);
    expect(screen.getByTestId("c")).toHaveStyle({ cursor: "pointer" });
  });
});
