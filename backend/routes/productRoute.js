import express from "express";
import createProductController from "../controllers/productControllers/createProductController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/authMiddleware.js";
import getProductController from "../controllers/productControllers/getProductController.js";
import getSingleProductController from "../controllers/productControllers/getSingleProductController.js";
import getProductPhotoController from "../controllers/productControllers/getProductPhotoController.js";
import formidable from "express-formidable";
const router = express.Router();

// routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
// get products
router.get("/get-products", getProductController);
// get single product
router.get("/get-product/:id", getSingleProductController);
// get photo
router.get("/product-photo/:pid", getProductPhotoController);
export default router;
