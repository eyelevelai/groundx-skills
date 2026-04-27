/**
 * CommonTextField — wrapped MUI TextField with the EyeLevel form defaults.
 *
 * White input background, outlined variant, BORDER_RADIUS (6px) corners
 * matching the brand's input radius (see surfaces-and-cards.md and the
 * webflow snapshot at eyelevel-design-standards/references/styleguide.html).
 * Top margin matches the rhythm used in modal forms — pass `dense` to drop
 * it when composing in a Stack with explicit gap spacing.
 *
 * Font family is set explicitly so the native <input> picks up Inter even
 * if the global body-level override doesn't cascade through MUI's outlined
 * variant.
 */

import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import { FC } from "react";

import { BORDER_RADIUS, FONT_FAMILY, WHITE } from "../../constants";

export interface CommonTextFieldProps extends OutlinedTextFieldProps {
  /** Drop the default top margin (use inside explicit-spacing layouts). */
  dense?: boolean;
}

export const CommonTextField: FC<CommonTextFieldProps> = ({
  dense = false,
  ...props
}) => {
  return (
    <TextField
      variant="outlined"
      {...props}
      sx={{
        mt: dense ? 0 : 2,
        input: {
          background: WHITE,
          fontFamily: FONT_FAMILY,
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: BORDER_RADIUS,
          backgroundColor: WHITE,
        },
        ...props.sx,
      }}
    />
  );
};

export default CommonTextField;
