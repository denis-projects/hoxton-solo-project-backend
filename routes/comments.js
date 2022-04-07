import express from "express"

import Comment from "../models/Comment"
const router = express.Router()

// new comment

router.post("/", async (req, res) => {
    const newComment = new Comment(req.body)
    try {
        const savedComment = await newComment.save()
        res.status(200).send(savedComment)
    } catch (error) {
        res.status(500).send(error)
    }
})

// get comments

router.get("/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({
            postId: req.params.postId
        })
        res.status(200).send(comments)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router