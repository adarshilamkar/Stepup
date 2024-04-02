import productModels from "../../models/productModels.js";
import fs from 'fs'
const createProductController=async(req,res)=>{
    try {
        const {name,description,price,discount,category,quantity,shipping}=req.fields;
        const {photo}=req.files;
        const product=new productModels({...req.fields});
        if(photo){
            product.photo.data=fs.readFileSync(photo.path);
            product.photo.contentType=photo.type
        }
        await product.save();
        res.status(201).send({
            success:true,
            message:"Product created Successfully",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:"Error in creating product",
            success:false,
        })
    }
}
export default createProductController;