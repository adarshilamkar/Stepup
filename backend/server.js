import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import orderModel from "./models/orderModel.js";
import cors from "cors";
import orderRoute from "./routes/orderRoute.js";
import { requireSignIn } from "./middlewares/authMiddleware.js";
import userRoute from "./routes/userRoute.js";

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
// database connection
connectDB();
// middlewares
app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/user", userRoute);

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Ecom Web",
  });
});
app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}`);
});
