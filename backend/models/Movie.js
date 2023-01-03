import mongoose from "mongoose";

const Shema = mongoose.Schema;

const movieSchema = new Shema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actors: [
    {
      type: String,
      required: true,
    },
  ],
  releaseDate: {
    type: Date,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
  },
  bookings: [
    {
      type: mongoose.Types.ObjectId,
      ref:"Booking"
    },
  ],
  admin: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Admin",
  },
});

export default mongoose.model("Movie", movieSchema);