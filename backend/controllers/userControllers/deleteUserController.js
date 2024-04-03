import userModel from "../../models/userModel.js";
const deleteUserController=async(req,res)=>{
    const {id}=req.params;
    const response=await userModel.findByIdAndDelete(id);
    if(response){
        res.status(201).send({
            success:true,
            message:"Deleted SuccessfullY",
            user:response
        })
    }
}
export default deleteUserController;