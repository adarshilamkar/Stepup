import express from "express";
const router = express.Router();
import createReviewController from "../controllers/reviewControllers/createReviewController.js";

// routes
// creating a new category
router.post("/add-review/:id", createReviewController);
export default router;
