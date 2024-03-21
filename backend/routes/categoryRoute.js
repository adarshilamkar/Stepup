import express from 'express'
import createCategoryController from '../controllers/categoryControllers/createCategoryController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import updateCategoryController from '../controllers/categoryControllers/updateCategoryController.js';
import getAllCategoryController from '../controllers/categoryControllers/getAllCategoryController.js';
import singleCategoryController from '../controllers/categoryControllers/singleCategoryController.js'
import deleteCategoryController from '../controllers/categoryControllers/deleteCategoryController.js';
const router=express.Router();

// routes
// creating a new category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController);
// updating a category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);
// show all categories
router.get('/all-categories',requireSignIn,isAdmin,getAllCategoryController);
// single category
router.get('/single-category/:id',requireSignIn,isAdmin,singleCategoryController);
// delete category
router.get('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)


export default router;