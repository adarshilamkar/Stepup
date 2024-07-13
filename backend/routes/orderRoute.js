import express from "express";
import getOrders from "../controllers/orderControllers/getOrders.js";
import createOrder from "../controllers/orderControllers/createOrder.js";
import deleteOrder from "../controllers/orderControllers/deleteOrder.js";
import getAllOrdersAdmin from "../controllers/orderControllers/getAllOrdersAdmin.js";
import updateOrderStatus from "../controllers/orderControllers/updateOrderController.js";

const router = express.Router();

router.post("/myorders", getOrders);
router.post("/cart", createOrder);
router.get("/delete/:id", deleteOrder);
router.get("/get-all-orders", getAllOrdersAdmin);
// Route to update order status
router.put("/update-status/:orderId", updateOrderStatus);

export default router;
