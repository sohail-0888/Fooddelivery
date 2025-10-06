import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     fullName:{
         require:true
     },
     email:{
         type:String,
         required:true,
         unique:true
     },

     password:{
        type:String
     },

    PhoneNo:{
        type:String,
        required:true,
     },

     role:{
        type:String,
        enum:["user","owner","deliveryBoy"],
        required:true
     }

     
    
},{timeStamps:true})