import mongoose from "mongoose";

const Shema = mongoose.Schema;

const bookingSchema = new Shema({
  movie: {
    type:  mongoose.Types.ObjectId,
    required : true,
    ref: "Movie"
  },
  date: {
    type: Date,
    required : true,
  },
  seatNumber: {
    type: String,
    required : true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export default mongoose.model("Booking", bookingSchema);