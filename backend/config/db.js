import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();
const MONGO_URI=process.env.MONGO_URI;
const connectDB=async ()=>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to Database");
    } catch (error) {
        console.log(`Error in connecting DB ${error}`);
    }
}
export default connectDB;