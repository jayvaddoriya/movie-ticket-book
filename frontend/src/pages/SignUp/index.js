import React from "react";
import * as yup from "yup";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Link,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const SignUp = ({ signUpOpen, setSignUpOpen, setOpen }) => {
  const navigate = useNavigate();
  const handleOnLogin = () => {
    navigate("/login");
    setSignUpOpen(false);
    setOpen(true);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      formik.resetForm();
      setOpen(false);
      setSignUpOpen(false);
      navigate("/");
    },
  });
  return (
    <Dialog open={signUpOpen} fullWidth sx={{borderRadius:"50px"}}> 
      <DialogTitle textAlign="center">Sign Up</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
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
            SignUp
          </Fab>
        </DialogActions>
      </form>
      <Box m={5} sx={{ textAlign: "center" }}>
        <Link
          color="blue"
          underline="none"
          component="button"
          variant="h7"
          onClick={handleOnLogin}
        >
          BACK TO LOGIN
        </Link>
      </Box>
    </Dialog>
  );
};

export default SignUp;
