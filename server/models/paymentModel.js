import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    appointmentid:{type:mongoose.Schema.Types.ObjectId,ref:"bkadappointments"},
    amount:{type:String,required:true},
    status:{type:String,enum:["pending","completed","cancelled"],default:"pending"},
    method:{type:String,enum:["credit card","debitcard","bank transfer","upi"],required:true}
},{timestamps:true})

const paymentModel = mongoose.model("bkadpayments",paymentSchema)


export default paymentModel