import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config();
const dbconnection  = ()=>{
    mongoose.connect("mongodb+srv://Vasu:vasuvarshney@cluster0.l24ojal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
        dbName:"Job_Portal"
    }).then(()=>{
        console.log("MongoDB connected successfully");
    }).catch((err)=>{
        console.log(`Failed to connect ${err}`);
    })
}
export default dbconnection;
