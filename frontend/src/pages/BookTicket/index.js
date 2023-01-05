import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/system";
import { Alert, AlertTitle, Fab, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
const validationSchema = yup.object({
  seatNo: yup.string("Enter your seat no").required("Email is required"),
  date: yup.string("enter date").nullable(),
});

const BookTicket = () => {
  const {
    state: { bookMovie },
  } = useLocation();
  const [alert, setAlert] = useState(false);
  const formik = useFormik({
    initialValues: {
      seatNo: "",
      date: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log({
        seatNo: values.seatNo,
        date: moment(values.date).format("YYYY-MM-DD"),
      });
      formik.resetForm();
      setAlert(true);
    },
  });

  useEffect(() => {
    if (!alert) {
      setInterval(() => {
        setAlert(false);
      }, 3000);
    }
  }, [alert]);

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography m={5} variant="h3" component="div">
          Book Tiketes Of {bookMovie.title}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <Box>
          <Card sx={{ maxWidth: 700 }}>
            <CardMedia
              component="img"
              height="300"
              image={bookMovie.image}
              alt={bookMovie.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {bookMovie.title}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
              <Typography variant="h6" color="primary">
                Starrer : R. Madhavan
              </Typography>
              <Typography variant="h6" color="primary">
                Release Date : {bookMovie.date}
              </Typography>
            </CardContent>
          </Card>
          {alert && (
            <Alert onClose={() => setAlert(false)} severity="success">
              <AlertTitle>Success</AlertTitle>
              Booked Ticket
            </Alert>
          )}
        </Box>
        <Box>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <TextField
              required
              margin="dense"
              name="seatNo"
              label="Seat Number"
              type="text"
              fullWidth
              value={formik.values.seatNo}
              onChange={formik.handleChange}
              error={formik.touched.seatNo && Boolean(formik.errors.seatNo)}
              helperText={formik.touched.seatNo && formik.errors.seatNo}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Helper text example"
                onChange={(value) => formik.setFieldValue("date", value)}
                value={formik.values.date}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={Boolean(formik.touched.date && formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date}
                    label="Date"
                    margin="dense"
                    name="date"
                    fullWidth
                  />
                )}
              />
            </LocalizationProvider>
            <Fab
              type="submit"
              variant="extended"
              color="primary"
              size="medium"
              sx={{ width: "100%" }}
            >
              book ticket
            </Fab>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default BookTicket;
