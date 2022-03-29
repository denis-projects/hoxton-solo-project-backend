import express from "express"
import User from "../models/User.js"

const router = express.Router()

router.post("/register", async (req, res) => {
    // @ts-ignore
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const user = await newUser.save()
        res.status(200).send(user)
    } catch (err) {
        console.log(err);

    }
})

export default router
