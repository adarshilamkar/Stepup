import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import orderModel from "./models/orderModel.js";
import cors from "cors";
import { requireSignIn } from "./middlewares/authMiddleware.js";

dotenv.config({ path: "../.env" });

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
// database connection
connectDB();
// middlewares
app.use(express.json());

// routes
// cart
app.post("/api/v1/cart", requireSignIn, async (req, res) => {
  try {
    const { products, user, amount, status } = req.body;
    const order = await new orderModel({
      products,
      user,
      amount,
      status,
    }).save();
    if (!order) {
      return res.status(400).send({
        success: false,
        message: "Failed to add order",
      });
    }
    console.log(order);
    res.status(201).send({
      success: true,
      message: "Order added successfully!",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Cannot create order",
    });
  }
});
// orders
app.post("/api/v1/myorders", async (req, res) => {
  try {
    const { user } = req.body;
    // Assuming `orderModel` is your Mongoose model for orders
    const orders = await orderModel.find({ user: user });
    res.status(200).send({
      message: "Got all orders of the user",
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Ecom.",
  });
});
app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}`);
});
