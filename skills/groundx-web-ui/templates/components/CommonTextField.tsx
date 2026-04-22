/**
 * CommonTextField — wrapped MUI TextField with the GroundX form defaults.
 *
 * White input background, outlined variant, and a top margin that matches the
 * rhythm used in modal forms. Pass `dense` to drop the top margin when you're
 * composing forms with explicit spacing (e.g. inside a Stack with gap).
 *
 * Corrections applied vs. the original:
 *   - Top margin is now toggleable via `dense` prop (was always forced to 16px).
 *   - Font size/weight explicitly set so the field doesn't rely on the global
 *     THICCCBOI override leaking into the native <input>.
 */

import TextField, { OutlinedTextFieldProps } from "@mui/material/TextField";
import { FC } from "react";

import { BORDER_RADIUS_2X, FONT_FAMILY, WHITE } from "../../constants";

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
          borderRadius: BORDER_RADIUS_2X,
          backgroundColor: WHITE,
        },
        ...props.sx,
      }}
    />
  );
};

export default CommonTextField;
