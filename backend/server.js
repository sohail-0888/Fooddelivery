import express from 'express';
import dotenv from 'dotenv';
import connectdb from './Config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routers/auth.routes.js';

dotenv.config()
const app = express();

app.use(express.json())  //global middleware  use for converting data comming from  frontend into json
app.use(cookieParser())
app.use('/api/auth', authRouter)


 

app.listen( process.env.PORT , () =>{
      connectdb()
    console.log(`Server run on Port ${process.env.PORT}`);
    
})