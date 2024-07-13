import express from "express";
import updateUserController from "../controllers/userControllers/updateUserController.js";
import getAllUsersController from "../controllers/userControllers/getAllUsersController.js";
import deleteUserController from "../controllers/userControllers/deleteUserController.js";
import getSingleUserController from "../controllers/userControllers/getSingleUserController.js";
import getSellerController from "../controllers/userControllers/getSellerController.js";
const router = express.Router();

router.put("/update-user/:id", updateUserController);
router.get("/get-users", getAllUsersController);
router.get("/delete-user/:id", deleteUserController);
router.get("/get-user/:id", getSingleUserController);
router.get("/get-sellers",getSellerController);
export default router;
