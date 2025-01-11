import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static("public"))
app.use(cookieParser())    

import userRouter from "../backend/routes/user.routes.js"
import captainRouter from  "../backend/routes/captain.routes.js"
app.use("/api/v1/user",userRouter)
app.use("/api/v1/captain",captainRouter)
export {
    app
 };
