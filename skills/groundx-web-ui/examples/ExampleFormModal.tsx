/**
 * ExampleFormModal — canonical create/edit modal pattern.
 *
 * Composition: MUI Dialog + custom DialogTitle (with close button) +
 * CommonTextField fields + CommonSubmitButton/CancelButton footer.
 *
 * Note the use of Formik + Yup for validation, which matches the app's form
 * stack. Swap for a lighter solution if Formik is not installed.
 */

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import CommonCancelButton from "../templates/components/CommonCancelButton";
import CommonSubmitButton from "../templates/components/CommonSubmitButton";
import CommonTextField from "../templates/components/CommonTextField";

import {
  BORDER_RADIUS_CARD,
  FONT_SIZE_H5,
  FONT_WEIGHT_LABEL,
  NAVY,
} from "../templates/constants";

interface ExampleFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { name: string; email: string }) => void;
}

const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Must be a valid email").required("Email is required"),
});

export function ExampleFormModal({ open, onClose, onSubmit }: ExampleFormModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: BORDER_RADIUS_CARD } }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography sx={{ color: NAVY, fontWeight: FONT_WEIGHT_LABEL, fontSize: FONT_SIZE_H5 }}>
          Invite team member
        </Typography>
        <IconButton onClick={onClose} aria-label="close" size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Formik
        initialValues={{ name: "", email: "" }}
        validationSchema={schema}
        onSubmit={(values) => {
          onSubmit(values);
          onClose();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <DialogContent>
              <Stack spacing={2}>
                <CommonTextField
                  name="name"
                  label="Full name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  fullWidth
                  dense
                />
                <CommonTextField
                  name="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  fullWidth
                  dense
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <CommonCancelButton onClick={onClose}>Cancel</CommonCancelButton>
              <CommonSubmitButton type="submit" disabled={isSubmitting}>
                Send Invite
              </CommonSubmitButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default ExampleFormModal;
