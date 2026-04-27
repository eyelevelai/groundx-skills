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
  Stack,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import CommonCancelButton from "../templates/shared/components/CommonCancelButton";
import CommonSubmitButton from "../templates/shared/components/CommonSubmitButton";
import CommonTextField from "../templates/shared/components/CommonTextField";
import DialogTitle from "../templates/shared/components/DialogTitle";

import { BORDER_RADIUS_CARD } from "../templates/constants";

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
      <DialogTitle onClose={onClose}>Invite team member</DialogTitle>

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
