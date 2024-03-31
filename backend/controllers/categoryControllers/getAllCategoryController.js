import categoryModels from "../../models/categoryModels.js";

const getAllCategoryController=async(req,res)=>{
    try {
        const categories=await categoryModels.find();
        if(!categories){
            res.status(500).send({
                success:false,
                message:"Error in getting categories"
            })
        }
        else{
            res.status(200).send({
                success:true,
                message:"Get all categories",
                categories
            })
        }
        
    } catch (error) {
       console.log(error); 
       res.status(500).send({
        success:false,
        message:"Cannot get categories"
       })
    }


}
export default getAllCategoryController;