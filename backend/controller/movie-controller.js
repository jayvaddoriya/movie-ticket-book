import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../models/Admin";
import Movie from "../models/Movie";

export const addMovie = async (req, res, next) => {
  const extractToken = req.headers.authorization.split(" ")[1];
  if (!extractToken && !extractToken.trim() === "") {
    return res.status(500).json({ message: "Token not found" });
  }
  console.log(extractToken);

  let adminId;
  jwt.verify(extractToken, process.env.SECRET_KEY, (err, decryed) => {
    if (err) {
      return res.status(500).json({ message: `${err.message}` });
    } else {
      adminId = decryed.id;
      return;
    }
  });
  const { title, description, releaseDate, posterUrl, featured, actors } =
    req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(400).json({ message: "invalid inputs" });
  }
  let movie;
  try {
    movie = new Movie({
      title,
      description,
      releaseDate: new Date(`${releaseDate}`),
      actors,
      featured,
      posterUrl,
      admin: adminId,
    });
    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction()
    await movie.save({ session });
    adminUser.addedMovie.push(movie);
    await adminUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return next(err);
  }
  if (!movie) {
    return res.status(500).json({ message: "Request fail" });
  }
  return res.status(200).json({ movie });
};

export const getAllMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find();
  } catch (err) {
    return next(err);
  }

  if (!movies) {
    return res.status(500).json({ message: "unexpected error ocured" });
  }
  return res.status(200).json({ movies });
};

export const getMovieById = async (req, res, next) => {
  const id = req.params.id;
  let movies;
  try {
    movies = await Movie.findById(id);
  } catch (err) {
    return next(err);
  }

  if (!movies) {
    return res.status(500).json({ message: "unexpected error ocured" });
  }
  return res.status(200).json({ movies });
};
