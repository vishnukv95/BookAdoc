import {v2 as cloudinary} from "cloudinary"
import multer from "multer"
import dotenv from "dotenv"
import {CloudinaryStorage} from "multer-storage-cloudinary"
dotenv.config()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})



const storage = new CloudinaryStorage({cloudinary,params:{
    folder:"profiles",
    allowed_formats:["jpg","png","jpeg"]
}})

export const upload = multer({storage})