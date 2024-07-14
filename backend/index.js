import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
import orderRoute from "./routes/orderRoute.js";
import userRoute from "./routes/userRoute.js";
import pinRoute from "./routes/pinRoute.js";
import saleRoute from "./routes/saleRoute.js";
import Razorpay from "razorpay";
import reviewRoute from "./routes/reviewRoute.js";
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
app.use("/api/v1/pin", pinRoute);
app.use("/api/v1/sale", saleRoute);
app.use("/api/v1/review", reviewRoute);

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Stepup Shoes Backend",
  });
});

// Initialize Razorpay instance with your Razorpay key and secret
const razorpay = new Razorpay({
  key_id: "rzp_test_YablPwPJuBNAjh",
  key_secret: "5c7bXPfNr75Vco3nrRzVOM1n",
});

// Endpoint to create a new order
app.post("/api/v1/payment/:amount", async (req, res) => {
  const { amount } = req.params; // Get amount from URL parameters
  const currency = "INR"; // Assuming Indian Rupees

  // Validate amount
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  const options = {
    amount: parseInt(amount) * 100, // Convert amount to smallest currency unit (e.g., paise for INR)
    currency,
    receipt: `receipt_order_${Date.now()}`, // Generate a unique receipt ID
    payment_capture: 1, // Auto capture payment
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}`);
});
