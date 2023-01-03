import express from "express";
import { deleteBooking, getBookingById, newBook } from "../controller/booking-controller";

const bookingRoute = express.Router()

bookingRoute.post("/",newBook)
bookingRoute.get("/:id",getBookingById)
bookingRoute.delete("/:id",deleteBooking)

export default bookingRoute;