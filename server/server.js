import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./config/db.js"
import userRouter from "./routes/userRouter.js"
import authRouter from "./routes/authRouter.js"
import paymentRouter from "./routes/paymentRoutes.js"
import appointmentRouter from "./routes/appointmentRouter.js"
import prescriptionRouter from "./routes/prescriptionRouter.js"

dotenv.config()
connectDb()

const app = express()
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173" }))
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/payment',paymentRouter)
app.use('/api/appointment',appointmentRouter)
app.use('/api/prescription',prescriptionRouter)



 
app.listen(process.env.PORT,()=>{
    console.log("server started")
})