import express from "express";
import updateUserController from "../controllers/userControllers/updateUserController.js";
const router = express.Router();

router.put("/update-user/:id", updateUserController);
export default router;
