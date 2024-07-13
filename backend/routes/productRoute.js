import express from "express";
import createProductController from "../controllers/productControllers/createProductController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/authMiddleware.js";
import getProductController from "../controllers/productControllers/getProductController.js";
import getSingleProductController from "../controllers/productControllers/getSingleProductController.js";
import getProductPhotoController from "../controllers/productControllers/getProductPhotoController.js";
import formidable from "express-formidable";
import productFiltersController from "../controllers/productControllers/productFiltersController.js";
import getDealsController from "../controllers/productControllers/getDealsController.js";
import deleteProductController from "../controllers/productControllers/deleteProductController.js";
import getReviewController from "../controllers/reviewControllers/getReviewController.js";
import getPincodeController from "../controllers/pincodeControllers/getPincodeController.js";
import editProduct from "../controllers/productControllers/editProduct.js";
import productModels from "../models/productModels.js";
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
router.get("/delete/:id", deleteProductController);
// filter product
router.post("/product-filters", productFiltersController);
router.get("/deals", getDealsController);
// get reviews
router.get("/reviews/:id", getReviewController);
router.put("/update/:id", editProduct);
export default router;
