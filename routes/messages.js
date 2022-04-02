import express from "express"
import Messages from "../models/Messagesdb.js"

const router = express.Router()

router.get("/", (req, res) => {
    res.send("ok messages")
})

export default router