import express from 'express'
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'

dotenv.config();

const PORT=process.env.PORT || 8000;

const app=express();
// database connection
connectDB();
// middlewares
app.use(express.json());

// routes
app.use('/api/ver1/auth',authRoute);

app.get('/',(req,res)=>{
    res.send({
        message:"hello ",
        route:"/"
    })
})
app.listen(PORT,()=>{
    console.log(`Listening at PORT ${PORT}`);
})