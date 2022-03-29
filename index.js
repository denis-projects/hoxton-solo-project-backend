import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import helmet from "helmet";
import morgan from "morgan";

const app = express();
dotenv.config()

mongoose.connect('mongodb://localhost:27017/myapp');

app.listen(6666, () => {
    console.log(`Server is running`);
})