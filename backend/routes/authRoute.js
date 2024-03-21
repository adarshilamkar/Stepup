import express from 'express'
import {registerController,loginController,protectedroute} from '../controllers/authenticationControllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// router
const router=express.Router();

// routing 
router.post('/register',registerController);
router.post('/login',loginController)
router.get('/test',requireSignIn,isAdmin,protectedroute);
// user protected routes
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})
// admin protected routes
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

// exporting router
export default router;