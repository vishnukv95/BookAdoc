import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,enum:["patient","doctor","admin"]},
    specialization:{type:String,required:() => {return this.role === "doctor"}},
    availability:{type:String,required:()=>{return this.role === "doctor"}},
    contactinfo:{tupe:String,required:true}
})

const userModel = mongoose.model("bkadusers",userSchema)

export default userModel