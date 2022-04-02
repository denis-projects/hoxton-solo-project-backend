import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: String,
    username: String,
    timestamp: String
})

export default mongoose.model('messages', messageSchema)
