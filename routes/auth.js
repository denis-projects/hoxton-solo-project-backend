import express from "express"
import bcrypt from "bcryptjs"
import User from "../models/User.js"
const router = express.Router()


router.get("/register", (req, res) => {
    res.send("this is regiister")
})



// creating a new user

router.post('/register', async (req, res) => {


    try {
        //Generate new password
        const salt = await bcrypt.genSalt(4)
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        // create new user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })

        // save new user we created 
        const user = await newUser.save()
        res.status(201).send(user)
    } catch (err) {
        res.status(500).send(err)
    }

})

// Login 

router.post("/login", async (req, res) => {

    try {

        // checking if the email exists
        const user = await User.findOne({ email: req.body.email })
        if (!user) res.status(404).send("user not found")

        // checkig if the password is wrong
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass) res.status(400).send("Wrong password")

        // if the user enter the right credentiala
        res.status(200).send(user)

    } catch (err) {
        res.status(500).send(err)
    }

})




export default router