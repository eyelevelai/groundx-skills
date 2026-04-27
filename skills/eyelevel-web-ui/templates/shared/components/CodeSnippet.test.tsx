import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import CodeSnippet from "./CodeSnippet";

const TABS = [
  { label: "cURL",       code: "curl https://example/api" },
  { label: "JavaScript", code: "fetch('https://example/api')" },
  { label: "Python",     code: "requests.get('https://example/api')" },
];

describe("CodeSnippet", () => {
  beforeEach(() => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
  });

  it("renders the first tab's code by default", () => {
    render(<CodeSnippet tabs={TABS} />);
    expect(screen.getByText("curl https://example/api")).toBeInTheDocument();
  });

  it("switches the displayed code when another tab is clicked", async () => {
    render(<CodeSnippet tabs={TABS} />);
    await userEvent.click(screen.getByRole("tab", { name: "Python" }));
    expect(screen.getByText("requests.get('https://example/api')")).toBeInTheDocument();
    expect(screen.queryByText("curl https://example/api")).not.toBeInTheDocument();
  });

  it("the copy button copies the active tab's code", async () => {
    render(<CodeSnippet tabs={TABS} />);
    await userEvent.click(screen.getByRole("tab", { name: "JavaScript" }));
    const copy = screen.getByRole("button", { name: /copy javascript snippet/i });
    await userEvent.click(copy);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "fetch('https://example/api')",
    );
  });
});
