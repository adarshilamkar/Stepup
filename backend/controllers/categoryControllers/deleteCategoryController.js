import categoryModels from "../../models/categoryModels.js";

const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params;
        const category=categoryModels.findByIdAndDelete(id);
        if(!category){
            res.status(500).send({
                message:"cannot delete category",
                success:false
            })
        }
        else{
            res.status(201).send({
                message:"Category deleted successfully",
                success:true,
                category
            })
        }
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in deleting category"
        })
    }
}
export default deleteCategoryController;