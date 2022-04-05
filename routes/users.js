import express from "express"
import bcrypt from "bcryptjs"
const router = express.Router()

import User from "../models/User.js"

router.get("/", (req, res) => {
    res.send("ok")
})


// Update a user

router.put("/:id", async (req, res) => {

    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(4)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (err) {
                return res.status(500).send(err)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            res.status(200).send("Your account has been updated")
        } catch (err) {
            res.status(500).send(err)
        }

    } else {
        return res.status(403).send("Access denied. You can update only your account")
    }
})

// Delete a user

// Get a user

// Follow a user

// Unfollow a user



export default router