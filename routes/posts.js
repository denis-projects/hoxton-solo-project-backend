import express from "express"
import Post from "../models/Post.js"
import User from "../models/User.js"

const router = express.Router()

// create a post

router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).send(savedPost)
    } catch (error) {
        res.status(500).send(error)
    }
})

// update a post

router.patch("/:id", async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        if (post.userId === req.body.userId) {
            await Post.findOneAndUpdate({
                _id: req.params.id
            },
                {
                    $set: req.body
                },
                { new: true, runValidators: true }
            )
            res.status(200).send("the post has been updated")
        }
        else {
            res.status(403).send("you can update only your post")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

// delete a post

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        if (post.userId === req.body.userId) {
            await Post.findOneAndDelete({
                _id: req.params.id
            })
            res.status(200).send("the post has been deleted")
        }
        else {
            res.status(403).send("you can delete only your post")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

// like a post

router.patch("/:id/like", async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        if (post.userId !== req.body.userId) {
            if (!post.likes.includes(req.body.userId)) {
                await Post.findByIdAndUpdate(
                    {
                        _id: req.params.id
                    },
                    {
                        $push: {
                            likes: req.body.userId
                        }
                    }
                )
                res.status(200).send("you liked the post")
            }
            else {
                await Post.findByIdAndUpdate(
                    {
                        _id: req.params.id
                    },
                    {
                        $pull: {
                            likes: req.body.userId
                        }
                    }
                )
                res.status(200).send("you unliked the post")
            }
        }
        else {
            res.status(403).send("you can't like your own post ")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

// get a post

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        res.status(200).send(post)
    } catch (error) {
        res.status(500).send(error)
    }
})

// get timeline posts

router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.params.userId })
        const userPosts = await Post.find({
            userId: currentUser._id
        })
        const friendPosts = await Promise.all(
            currentUser.following.map(friendId => {
                return Post.find({ userId: friendId })
            })
        )
        res.status(200).send(userPosts.concat(...friendPosts))
    } catch (error) {
        res.status(500).send(error)
    }
})


// get user's all posts

router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
        const posts = await Post.find({ userId: user._id })
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router