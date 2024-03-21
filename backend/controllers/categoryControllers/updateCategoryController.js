import categoryModels from "../../models/categoryModels.js";
const updateCategoryController=async(req,res)=>{
    try {
        const {newname}=req.body;
        const {id}=req.params;
        console.log(newname);
        const category=await categoryModels.findByIdAndUpdate(id,{name:newname});
        // console.log("hellos");
        // console.log(category);
        if(!category){
            res.status(400).send({
                success:false,
                message:"cannot update category"
            })
        }
        else{
            res.status(201).send({
                success:true,
                message:"Category changed successfully",
                category
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in updating category",
            error
        })
    }

}
export default updateCategoryController;