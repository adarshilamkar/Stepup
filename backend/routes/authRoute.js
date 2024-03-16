import express from 'express'
import {registerController} from '../controllers/authController.js';

// router
const router=express.Router();

// routing 
router.post('/register',registerController);

// exporting router
export default router;