import React, { useState } from "react";
import * as yup from "yup";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import SignUp from "../SignUp";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [signUpOpen, setSignUpOpen] = useState(false);
  const handleOnSignUp = () => {
    navigate("/signup");
    setOpen(false);
    setSignUpOpen(true);
  };
  const handleClose = () => {
    navigate("/login");
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log({
        email: values.email,
        password: values.password,
      });
      formik.resetForm();
      setOpen(false);
      navigate("/");
    },
  });
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle textAlign="center">Log In</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              name="password"
              label="Password"
              type="text"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </DialogContent>
          <DialogActions>
            <Fab
              type="submit"
              variant="extended"
              color="primary"
              size="medium"
              sx={{ width: "100%" }}
            >
              LogIn
            </Fab>
          </DialogActions>
        </form>
        <Box m={5} sx={{ textAlign: "center" }}>
          <Link
            color="blue"
            underline="none"
            component="button"
            variant="h7"
            onClick={handleOnSignUp}
          >
            SWITCH TO SIGNUP
          </Link>
        </Box>
      </Dialog>
      <SignUp signUpOpen={signUpOpen} setSignUpOpen={setSignUpOpen} setOpen={setOpen} />
    </>
  );
};

export default Login;
