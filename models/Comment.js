import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    postId: {
        type: String
    },
    commenterId: {
        type: String
    },
    text: {
        type: String
    }
},
    { timestamps: true }
)

export default mongoose.model('Comment', CommentSchema)