import express from "express"
const router = express.Router()
import UserSchema from "../models/User.js"

router.get("/", (req, res) => {
    // @ts-ignore
    // const user = await new UserSchema({
    //     username: "denis",
    //     email: "denis@email.com",
    //     password: "123456"
    // })
    // await user.save()
    res.send("ok")
})

export default router



