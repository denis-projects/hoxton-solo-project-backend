import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./routes/users.js"
import authRouter from "./routes/auth.js"
import messageRouter from "./routes/messages.js"



const app = express();

// making a secure connection 
dotenv.config()

mongoose.connect(process.env.MONGO_URL, () => {
    console.log(`Connected`);
});



// set the env to use the dependencies we installed

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
const PORT = 4000

// creating homepage Endpoint

app.use("/api/users", userRouter)

app.use("/api/auth", authRouter)

app.use("/api/messages", messageRouter)




// testing messages Endpoint

// app.get("/messages", (req, res) =>
//     res.status(200).send('this is messages endpoint')
// )




app.listen(PORT, () => {
    console.log(`Server up: http://localhost:${PORT}`)
})