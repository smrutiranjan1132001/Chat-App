import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.route.js"
import userRoutes from "./routes/user.routes.js"


import conncetToMongoDb from "./db/connectToMongoDb.js";
import { app,server } from "./socket/socket.js"

const PORT = process.env.PORT || 5000;


dotenv.config();

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)


app.get("/",(req,res) => {
    res.send("Hello Sushmita!")
})


server.listen(PORT,() => {
    conncetToMongoDb()
    console.log(`Server running on port ${PORT}`)
})