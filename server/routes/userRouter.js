import express from "express"
import { upload } from "../config/Cloudinary.js"

const userRouter = express.Router()

userRouter.post('/profile',upload.single("profile"),async(req,res)=>{
    if(!req.file)return res.json({error:"no file was uploaded"})
     
    const {path,filename} = req.file    
    res.json({path,filename})
})



export default userRouter