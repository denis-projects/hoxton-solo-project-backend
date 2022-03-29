import express from "express"
const router = express.Router()
import UserSchema from "../models/User.js"

router.get("/", (req, res) => {
    res.send("ok")
})

export default router



