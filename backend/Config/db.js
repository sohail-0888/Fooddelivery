import mongoose, { mongo } from "mongoose";


const connectdb = async(req,res) =>{
       try {
         await mongoose.connect(process.env.DBURL)
         console.log("db connected");
         
       } catch (error) {
          console.log("db error");
          
       }
}

export default connectdb