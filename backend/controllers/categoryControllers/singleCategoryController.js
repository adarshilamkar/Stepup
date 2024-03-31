import categoryModels from "../../models/categoryModels.js";

const singleCategoryController=async(req,res)=>{
    try {
        const {id}=req.params;
        const category=await categoryModels.findById(id);
        if(!category){
            return res.status(500).send({
                success:false,
                message:"Cannot find category"
            })
        }
        else{
            res.status(200).send({
                success:true,
                message:"Got  Category",
                category
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in getting category"
        })
    }
}
export default singleCategoryController;