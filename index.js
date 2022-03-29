import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import helmet from "helmet";
import morgan from "morgan";

const app = express();

// making a secure connection 
dotenv.config()

mongoose.connect(process.env.MONGO_URL, () => {
    console.log(`Connected`);
});


// set the env to use the dependencies we installed

app.use(express())
app.use(helmet())
app.use(morgan("common"))


app.listen(6666, () => {
    console.log(`Server is running`);
})