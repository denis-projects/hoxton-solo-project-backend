import express from "express"
import Post from "../models/Post.js"
import User from "../models/User.js"

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

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if (post.userId === req.body.userId) {
            await post.deleteOne()
            res.status(200).send("deleted post")
        } else {
            res.status(403).send("You can delete only your post")
        }
    } catch (err) {
        res.status(500).send(err)
    }

})

// like a post or dislike a post

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post.like.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).send("the post is liked")
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).send("the post is disliked")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).send(post);
    } catch (err) {
        res.status(500).send(err);
    }
});

//get timeline posts

router.get("/timeline/all", async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.send(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router