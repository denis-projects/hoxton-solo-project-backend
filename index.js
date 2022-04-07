import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import helmet from "helmet";
import morgan from "morgan";
// import Pusher from "pusher";
import Cors from "cors"

import userRouter from "./routes/users.js"
import authRouter from "./routes/auth.js"
import postRouter from "./routes/posts.js"
import messageRouter from "./routes/messages.js"
import commentRoute from "./routes/comments.js"
import conversationRoute from "./routes/conversations.js"


const app = express();

// const pusher = new Pusher({
//     appId: "1371536",
//     key: "1fc284867e78ec93a20a",
//     secret: "1750fcaa8ffe6c0e0145",
//     cluster: "eu",
//     useTLS: true
// });

// making a secure connection 
dotenv.config()

mongoose.connect(process.env.MONGO_URL, () => {
    console.log(`Connected`);
});

//whatching real-time changes

// const db = mongoose.connection

// db.once("open", () => {
//     console.log("DB connected");

//     const msgCollection = db.collection
//         ("messages");
//     const changeStream = msgCollection.watch()

//     changeStream.on("change", (change) => {
//         console.log("changed", change);

//         if (change.operationType === "insert") {
//             const messageDetails = change.fullDocument;
//             pusher.trigger("messages", "inserted", {
//                 name: messageDetails.username,
//                 message: messageDetails.message
//             })
//         } else {
//             console.log("error on pusher");
//         }
//     })
// })



// set the env to use the dependencies we installed

app.use(express.json())
app.use(Cors())
app.use(helmet())
app.use(morgan("common"))


// creating homepage Endpoint

app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)
app.use("/api/posts", postRouter)
app.use("/api/conversations", conversationRoute)
app.use("/api/comments", commentRoute)



// testing messages Endpoint

// app.get("/messages", (req, res) =>
//     res.status(200).send('this is messages endpoint')
// )

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Server is listening on port ${port} ...`)
})