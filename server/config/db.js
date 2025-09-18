import mongoose from "mongoose"

const connectDb = async ()=>{
    try {
      await  mongoose.connect(process.env.MONGO_URI)
        console.log("Database connection successfull")
    } catch (error) {
        console.error(error.message || "Database connection error")
    }
}

export default connectDb