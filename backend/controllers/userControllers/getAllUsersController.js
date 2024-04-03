import userModel from "../../models/userModel.js";

const getAllUsersController=async(req,res)=>{
    const response=await userModel.find({});
    if(response){
        res.status(200).send({
            success:true,
            message:"Get all users",
            users:response
        })
    }


}
export default getAllUsersController
