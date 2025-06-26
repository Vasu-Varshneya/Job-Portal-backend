import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config();
const dbconnection  = ()=>{
    mongoose.connect(process.env.DB_URL,{
        dbName:"Job_Portal"
    }).then(()=>{
        console.log("MongoDB connected successfully");
    }).catch((err)=>{
        console.log(`Failed to connect ${err}`);
    })
}
export default dbconnection;
