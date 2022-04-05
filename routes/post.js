import express from "express"
import Post from "../models/Post.js"

const router = express.Router()

router.get("/", (req, res) => {
    res.send("posts router")
})


// create a post

router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(201).send(savedPost)
    } catch (error) {
        res.status(500).send(error)
    }

})


// update a post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).send("updated post")
        } else {
            res.status(403).send("You can update only your post")
        }
    } catch (err) {
        res.status(500).send(err)
    }

})


// delete a post

// like a post

// get a post

// get timeline posts


export default router