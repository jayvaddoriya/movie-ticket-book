import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user-route";
import adminRoute from "./routes/admin-route";
import movieRoute from "./routes/movie-route";
import bookingRoute from "./routes/booking.route";
dotenv.config();
const app = express();

app.use(express.json())
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/movie", movieRoute);
app.use("/booking", bookingRoute);

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.spq201t.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(5000, () => {
      console.log("connected to database and server is running");
    })
  )
  .catch((e) => console.log(e));
