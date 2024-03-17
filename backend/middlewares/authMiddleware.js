import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js'

// Protected Routes token based
const requireSignIn=async(req,res,next)=>{
    try {
        const decode=await JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        // this jwt.verify function returns the id of the user present in the database
        req.user=decode;
        console.log(decode);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success:false,
            message:"Please Sign In to access this page"
        })
        
    }
}
const isAdmin=async(req,res,next)=>{
    try {
        const user=await userModel.findOne({_id:req.user._id});
        if(user.role)
        next(); 
        else
        return res.status(500).send({
        success:false,
        message:"You don't have admin rights"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:"false",
            message:"Cannot verify admin"
        })
    }
}
export {requireSignIn,isAdmin}