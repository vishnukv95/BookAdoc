import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientid:{type:mongoose.Schema.Types.ObjectId,ref:"bkadusers",required:true,},
    doctorid:{type:mongoose.Schema.Types.ObjectId,ref:"bkadusers",required:true},
    dateTime:{type:Date,required:true},
    status:{type:String,enum:["booked","completed","cancelled"],default:"booked"},
    paymentid:{type:mongoose.Schema.Types.ObjectId,ref:"payments",required:true}
    
},{timestamps:true})


const appointmentModel = mongoose.model("bkadappointments",appointmentSchema)

export default appointmentModel