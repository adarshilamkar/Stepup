import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
    product: {
      type: mongoose.ObjectId,
      ref: "Products",
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("reviews", reviewSchema);
