import express from "express";
import getPincodeController from "../controllers/pincodeControllers/getPincodeController.js";

const router = express.Router();
router.get("/:code", getPincodeController);

export default router;
