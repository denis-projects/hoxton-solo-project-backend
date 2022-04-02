import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./routes/users.js"
import authRouter from "./routes/auth.js"
import messageRouter from "./routes/messages.js"
import Pusher from "pusher";



const app = express();

const pusher = new Pusher({
    appId: "1371536",
    key: "1fc284867e78ec93a20a",
    secret: "1750fcaa8ffe6c0e0145",
    cluster: "eu",
    useTLS: true
});

// making a secure connection 
dotenv.config()

mongoose.connect(process.env.MONGO_URL, () => {
    console.log(`Connected`);
});

//whatching real-time changes

const db = mongoose.connection

db.once("open", () => {
    console.log("DB connected");

    const msgCollection = db.collection
        ("messages");
    const changeStream = msgCollection.watch()

    changeStream.on("change", (change) => {
        console.log("changed", change);

        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                name: messageDetails.username,
                message: messageDetails.message
            })
        } else {
            console.log("error on pusher");
        }
    })
})



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