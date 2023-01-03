import express from "express";
import {
  addMovie,
  getAllMovies,
  getMovieById,
} from "../controller/movie-controller";

const movieRoute = express.Router();

movieRoute.post("/", addMovie);
movieRoute.get("/", getAllMovies);
movieRoute.get("/:id", getMovieById);

export default movieRoute;
