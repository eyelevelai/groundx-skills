/**
 * DropdownMenu — generic anchored menu (account menu, sort menu, action overflow).
 *
 * The caller supplies a `trigger` render function that wires the open handler
 * to whatever element launches the menu (typically an IconButton with
 * <MoreVertIcon/> or a labelled button). Each item runs its `onClick`, then
 * the menu closes automatically.
 *
 * Brand chrome: white surface, BORDER hairline, BORDER_RADIUS_2X corners,
 * navy item text, no shadow.
 */

import { Box, Menu, MenuItem, MenuProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MouseEvent, ReactNode, useState } from "react";

import {
  BORDER,
  BORDER_RADIUS_2X,
  NAVY,
  WHITE,
} from "../../constants";

const StyledMenu = styled(Menu)(() => ({
  "& .MuiPaper-root": {
    backgroundColor: WHITE,
    border: `1px solid ${BORDER}`,
    borderRadius: BORDER_RADIUS_2X,
    boxShadow: "none",
    color: NAVY,
    minWidth: 180,
  },
  "& .MuiMenuItem-root": {
    color: NAVY,
  },
}));

export interface DropdownMenuItemConfig {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface DropdownMenuProps extends Omit<MenuProps, "open" | "anchorEl"> {
  trigger: (controls: {
    onClick: (e: MouseEvent<HTMLElement>) => void;
    open: boolean;
  }) => ReactNode;
  items: DropdownMenuItemConfig[];
}

export function DropdownMenu({ trigger, items, ...menuProps }: DropdownMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      {trigger({
        onClick: (e) => setAnchorEl(e.currentTarget),
        open,
      })}
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        {...menuProps}
      >
        {items.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              item.onClick();
              setAnchorEl(null);
            }}
            disabled={item.disabled}
          >
            {item.icon && (
              <Box
                component="span"
                sx={{
                  mr: 1,
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                {item.icon}
              </Box>
            )}
            {item.label}
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
}

export default DropdownMenu;
