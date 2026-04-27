import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import DropdownMenu from "./DropdownMenu";

describe("DropdownMenu", () => {
  it("opens when the trigger fires", async () => {
    render(
      <DropdownMenu
        trigger={({ onClick }) => (
          <button onClick={onClick}>Open</button>
        )}
        items={[{ label: "Edit", onClick: () => {} }]}
      />,
    );
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("fires the item's onClick when clicked", async () => {
    const onEdit = vi.fn();
    render(
      <DropdownMenu
        trigger={({ onClick }) => <button onClick={onClick}>Open</button>}
        items={[{ label: "Edit", onClick: onEdit }]}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await userEvent.click(screen.getByText("Edit"));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("renders disabled items as disabled menu items", async () => {
    render(
      <DropdownMenu
        trigger={({ onClick }) => <button onClick={onClick}>Open</button>}
        items={[{ label: "Disabled", onClick: () => {}, disabled: true }]}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("menuitem", { name: "Disabled" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });
});
