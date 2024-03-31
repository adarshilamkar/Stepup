import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: {
      type: Object,
      required: true,
    },
    user: {
      type: mongoose.ObjectId,
      ref: "users",
      required:true
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
