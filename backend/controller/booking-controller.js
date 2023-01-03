import mongoose from "mongoose";
import Booking from "../models/Booking";
import Movie from "../models/Movie";
import User from "../models/User";

export const newBook = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;

  let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (error) {
    return next(error);
  }
  if (!existingMovie) {
    return res
      .status(500)
      .json({ message: "movie not found with given by id" });
  }
  if (!user) {
    return res.status(500).json({ message: "user not found with given by id" });
  }

  let newBooking;
  try {
    newBooking = new Booking({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings?.push(newBooking);
    existingMovie.bookings?.push(newBooking);
    await existingUser.save({ session });
    await existingMovie.save({ session });
    await newBooking.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return next(err);
  }
  if (!newBooking) {
    return res.status(500).json({ message: "unable to create a booking" });
  }
  return res.status(200).json({ newBooking });
};

export const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let newBookings;
  try {
    newBookings = await Booking.findById(id);
  } catch (err) {
    return next(err);
  }
  if (!newBookings) {
    return res.status(500).json({ message: "unexpected error ocured" });
  }
  return res.status(200).json({ newBookings });
};

export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let newBookings;
  try {
    newBookings = await Booking.findByIdAndRemove(id).populate("user movie");
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBookings.user.bookings?.pull(newBookings);
    await newBookings.movie.bookings?.pull(newBookings);
    await newBookings.user.save({ session });
    await newBookings.movie.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return next(err);
  }

  if (!newBookings) {
    return res.status(500).json({ message: "unexpected error ocured" });
  }
  return res.status(200).json({ newBookings });
};

export const getBookingsUsers = async (req, res, next) => {
  const id = req.params.id;
  let newBookings;
  try {
    newBookings = await Booking.find({ user: id });
  } catch (err) {
    return next(err);
  }

  if (!newBookings) {
    return res.status(500).json({ message: "unexpected error ocured" });
  }
  return res.status(200).json({ newBookings });
};
