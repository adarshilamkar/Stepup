import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    info: {
      type: String,
      required: true,
    },
    type: {
      type: [String],
    },
    model: {
      type: [String],
    },
    // reviews: {
    //   type: [String],
    // },
    description: {
      type: [String],
      required: true,
    },
    specifications: {
      type: [String],
      required: true,
    },
    material: {
      type: [String],
    },
    tags: {
      type: [String],
      required: true,
    },
    price: {
      type: [String],
      required: true,
    },
    discount: {
      type: [String],
      required: true,
    },
    seller: {
      type: mongoose.ObjectId,
      ref: "users",
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    otherphoto: {
      type: [String],
    },
    shipping: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
