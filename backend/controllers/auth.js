import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import genToken from "../utils/token.js";


 export const signup = async(req,res) =>{
     try {

         const{fullName,email,password,phoneNo,role} = req.body;
           
          const user = await User.findOne({email});
          if(user)
          {
            return res.status(400).json({message:" user already Exist"})
          }

          if(password <6)
          {
            return res.status(400).json({message: "Password must at least 6 character"})
          }

          if(phoneNo.length <10)
          {
               return res.status(400).json({message: "PhoneNo must be at least 10"})
          }

            let salt = await bcrypt.getSalt(10)

          let hashpasssword = await bcrypt.hash(password,salt)
           
           user = await User.create({
            fullName,
            email,
            password:hashpasssword,
            phoneNo,
            role
           })

         const token = genToken(User._id)
        
         res.cookies("token",token,{
           secure:false,
           samesite:"strict",
           maxAge:7*24*60*60*1000,
           httpOnly:true
         })

         return res.status(201).json(User)

        
     } catch (error) {
         return res.status(500).json({message:`${error}`})
     }
}

export const signIn = async(req,res) =>{
   try {
      const {email,password} = req.body;
      const user = await User.findOne({email})

      if(!user)
      {
           return res.status(400).json({message:"User does not exit"})
      }

    
      const isMatch = await bcrypt.compare(password,user.password)
       if(!isMatch)
       {
        return res.status(400).json({message:"incorrect Password"})
       }

       const token = await genToken(user._id)
       res.cookie("token",token,{
          secure:false,
          samesite:"strict",
          maxAge:7*24*60*60*1000,
          httpOnly:true

       })

       return res.status(200).json(user)
      
   } catch (error) {
     return res.status(500).json(`SignIn  error ${error}`)
   } 
}


export const signout = async(req,res) =>{
  try {
     res.clearCookie("token")
     return res.status(200).json({message:"logout successfully"})
  } catch (error) {
      return res.status(500).json(`SignOut error ${error}`)
  }
}
