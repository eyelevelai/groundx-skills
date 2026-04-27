import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import CopyToClipboard from "./CopyToClipboard";

describe("CopyToClipboard", () => {
  let writeText: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("has a default aria-label", () => {
    render(<CopyToClipboard value="abc" />);
    expect(screen.getByRole("button", { name: /copy to clipboard/i })).toBeInTheDocument();
  });

  it("writes the value to the clipboard when clicked", async () => {
    render(<CopyToClipboard value="api_key_xyz" />);
    await userEvent.click(screen.getByRole("button"));
    expect(writeText).toHaveBeenCalledWith("api_key_xyz");
  });

  it("shows the check (copied) state and resets after the configured duration", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(<CopyToClipboard value="x" copiedDurationMs={500} />);
    const button = screen.getByRole("button");

    // The reset goes through a setTimeout — we need to wait for the resolved
    // clipboard promise + the state update before the timer fires.
    await user.click(button);
    await waitFor(() => {
      expect(button.querySelector('svg[data-testid="CheckIcon"]')).toBeInTheDocument();
    });

    vi.advanceTimersByTime(600);
    await waitFor(() => {
      expect(button.querySelector('svg[data-testid="ContentCopyIcon"]')).toBeInTheDocument();
    });
  });
});
