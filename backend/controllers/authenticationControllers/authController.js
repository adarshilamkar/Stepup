import userModel from '../../models/userModel.js'
import {hashPassword,comparePassword} from '../../helpers/authHelper.js'
import dotenv from 'dotenv'
import JWT from 'jsonwebtoken';

dotenv.config({path:'../../.env'})


const registerController= async(req,res)=>{
    try {
        const {name,email,password,phone,address}=req.body;
        // validations
        if(!name||!email||!password||!phone||!address){
            return res.send({message:"Please enter all credentials",success:false});
        }
        // checking existing user
        const user=await userModel.findOne({email});
        if(user){
            return res.status(200).send({
                success:false,
                message:"User already registered"
            })
        }
        // registering user
           // hashing password
        const passwordHash=await hashPassword(password);
        // saving user
        const newuser=new userModel({name,email,phone,address,password:passwordHash});
        await newuser.save();
        res.status(201).send({
            success:true,
            message:"User registered Successfully",
            newuser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error in Registration",
            success:false,
            error
        })
    }

}
const loginController=async(req,res)=>{
    try{
        const {email,password}=req.body;
        // validations
        if(!email||!password){
            return res.status(400).send({
                success:false,
                message:"Enter valid email or Password"
            })
        }
        else{
            // checking a user with given email exists or not
            let user = await userModel.findOne({email});
            if(!user){
                // no user found
                return res.status(404).send({
                    success:false,
                    message:"User with given email does not exit"
                })
            }
            else{
                // now check that the password is valid or not
                const match=await comparePassword(password,user.password);
                if(!match){
                    // passwords not match
                    return res.status(200).send({
                        success:false,
                        message:"Invalid Password"
                    })
                }
                else{
                    // password matched 
                    // now generate token
                    const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
                    res.status(200).send({
                        success:true,
                        message:"Logged in Successfully",
                        user:{
                            name:user.name,
                            email:user.email,
                            phone:user.phone,
                            address:user.address
                        },
                        token
                    })

                }
            }
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Login"
        })
        
    }
}
const protectedroute=async(req,res)=>{
    return res.status(200).json({
        message:"Hello admin welcome to protected routes"
    })
}


export {registerController,loginController,protectedroute}