import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import DownloadButton from "./DownloadButton";

describe("DownloadButton", () => {
  it("renders as an <a> when href is provided", () => {
    render(<DownloadButton aria-label="download" href="/file.pdf" download="file.pdf" />);
    const el = screen.getByRole("link", { name: "download" });
    expect(el.tagName.toLowerCase()).toBe("a");
    expect(el).toHaveAttribute("href", "/file.pdf");
    expect(el).toHaveAttribute("download", "file.pdf");
  });

  it("renders as a <button> when no href is provided", () => {
    render(<DownloadButton aria-label="download" onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "download" })).toBeInTheDocument();
  });

  it("fires onClick in button mode", async () => {
    const onClick = vi.fn();
    render(<DownloadButton aria-label="download" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
