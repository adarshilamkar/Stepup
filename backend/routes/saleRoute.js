import express from "express";
import createSale from "../controllers/saleControllers/createSale.js";
import getSales from "../controllers/saleControllers/getSales.js";
import deleteSale from "../controllers/saleControllers/deleteSale.js";
const router = express.Router();

router.post("/create-sale", createSale);
router.get("/allsales", getSales);
router.get("/delete-sale/:id", deleteSale);
export default router;
