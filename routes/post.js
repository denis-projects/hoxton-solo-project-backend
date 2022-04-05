import express from "express"
import Post from "../models/Post.js"

const router = express.Router()

router.get("/", (req, res) => {
    res.send("posts router")
})


export default router