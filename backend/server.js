import express from 'express'
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import cors from 'cors'

dotenv.config({path:'../.env'});

const PORT=process.env.PORT || 8000;

const app=express();
app.use(cors());
// database connection
connectDB();
// middlewares
app.use(express.json());

// routes
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/product',productRoute);

app.get('/',(req,res)=>{
    res.send({
        message:"Welcome to Ecom.",
    })
})
app.listen(PORT,()=>{
    console.log(`Listening at PORT ${PORT}`);
})