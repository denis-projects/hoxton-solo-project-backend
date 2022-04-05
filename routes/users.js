import express from "express"
import bcrypt from "bcryptjs"
const router = express.Router()

import User from "../models/User.js"



// Update a user

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(4);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).send(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).send("Account has been updated");
        } catch (err) {
            return res.status(500).send(err);
        }
    } else {
        return res.status(403).send("Access Denied!");
    }
});

// Delete a user

router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).send("Account has been deleted");
        } catch (err) {
            return res.status(500).send(err);
        }
    } else {
        return res.status(403).send("You can delete only your account");
    }
});

// Get a user

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).send(other);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Follow a user

// Unfollow a user



export default router