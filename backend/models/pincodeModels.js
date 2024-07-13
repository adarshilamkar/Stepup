import mongoose from "mongoose";

const pincodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Pincode", pincodeSchema);
