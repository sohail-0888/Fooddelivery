import express from 'express'
import { signIn, signout, signup } from '../controllers/auth.js'


const authRouter = express.Router()

authRouter.post("/signup", signup)
authRouter.post("/signIn", signIn)
authRouter.get("/signout",signout)

export default authRouter