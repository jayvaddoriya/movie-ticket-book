import express from "express";
import { getBookingById } from "../controller/booking-controller";
import { deleteUsers, getAllUsers, loginUsers, signUp, updateUsers } from "../controller/user-controller";

const userRoute = express.Router()

userRoute.get("/",getAllUsers)
userRoute.post("/signUp",signUp)
userRoute.put("/:id",updateUsers)
userRoute.delete("/:id",deleteUsers)
userRoute.post("/login",loginUsers)
userRoute.post("/bookings/:id",getBookingById)

export default userRoute;
 