import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./config/db.js"

dotenv.config()
connectDb()

const app = express()
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173" }))

app.listen(process.env.PORT,()=>{
    console.log("server started")
})