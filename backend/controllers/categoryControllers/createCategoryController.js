import categoryModel from '../../models/categoryModels.js'
const createCategoryController=async(req,res)=>{
    try {
        const {name,image}=req.body;
        if(!name){
            return res.status(401).send({
                success:false,
                message:"name is required"
            })
        }
        if(!image){
            return res.status(401).send({
                success:false,
                message:"image is required"
            })
        }
        const existing_cat=await categoryModel.findOne({name});
        if(existing_cat){
            return res.status(200).send({
                success:true,
                message:"category already exists"
            })
        }
        const category=await new categoryModel({name,image}).save();
        res.status(201).send({
            success:true,
            message:"new category created successfully",
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in category",
            error
        })
    }

}
export default createCategoryController;