import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Dialog } from "@mui/material";

import DialogTitle from "./DialogTitle";

// DialogTitle uses MUI's <DialogTitle> internally, which expects a <Dialog>
// ancestor for some context. Wrap each test in an open Dialog.
function renderInDialog(node: React.ReactNode) {
  return render(<Dialog open>{node}</Dialog>);
}

describe("DialogTitle", () => {
  it("renders the title text", () => {
    renderInDialog(<DialogTitle>Invite team member</DialogTitle>);
    expect(screen.getByText("Invite team member")).toBeInTheDocument();
  });

  it("does not render a close button when onClose is not provided", () => {
    renderInDialog(<DialogTitle>Static</DialogTitle>);
    expect(screen.queryByRole("button", { name: "close" })).not.toBeInTheDocument();
  });

  it("renders a close button when onClose is provided", () => {
    renderInDialog(<DialogTitle onClose={() => {}}>With close</DialogTitle>);
    expect(screen.getByRole("button", { name: "close" })).toBeInTheDocument();
  });

  it("fires onClose when the close button is clicked", async () => {
    const onClose = vi.fn();
    renderInDialog(<DialogTitle onClose={onClose}>X</DialogTitle>);
    await userEvent.click(screen.getByRole("button", { name: "close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
