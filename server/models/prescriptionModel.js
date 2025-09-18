import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
    appointmentid:{type:mongoose.Schema.Types.ObjectId,ref:"bkadappointments",required:true},
    doctorid:{type:mongoose.Schema.Types.ObjectId,ref:"bkadusers",required:true},
    patientid:{types:mongoose.Schema.Types.ObjectId,ref:"bkadusers",required:true},
    medication:{type:String,required:true},
    notes:{type:String}
},{timestamps:true})

const prescriptionModel = mongoose.model("bkadprescriptions",prescriptionSchema)

export default prescriptionModel
