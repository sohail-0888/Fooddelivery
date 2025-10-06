import express from 'express';
import dotenv from 'dotenv';
import connectdb from './Config/db.js';
dotenv.config()
const app = express();


app.get('/home', async(req,res) => {
     res.json({message:"this the app"})
})

 

app.listen( process.env.PORT , () =>{
      connectdb()
    console.log(`Server run on Port ${process.env.PORT}`);
    
})