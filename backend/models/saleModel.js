import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});

const saleModel = mongoose.model("Sale", saleSchema);

export default saleModel;
