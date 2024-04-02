import express from "express";
import getOrders from "../controllers/orderControllers/getOrders.js";
import createOrder from "../controllers/orderControllers/createOrder.js";
import deleteOrder from "../controllers/orderControllers/deleteOrder.js"

const router = express.Router();

router.post("/myorders", getOrders);
router.post("/cart", createOrder);
router.get('/delete/:id',deleteOrder);

export default router;
