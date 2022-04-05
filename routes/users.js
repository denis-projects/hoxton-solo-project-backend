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
        // we do not want to send the password
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).send(other);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Follow a user


router.put("/:id/follow", async (req, res) => {

    // check if the id is the the same
    if (req.body.userId !== req.params.id) {
        try {
            // find user by id
            const user = await User.findById(req.params.id)
            // find current user by id
            const currentUser = await User.findById(req.params.id)
            if (!user.followers.includes(req.body.userId)) {
                // if it is different we add to followers array
                await user.updateOne({ $push: { followers: req.body.userId } })
                // if it is different we push to followings array
                await currentUser.updateOne({ $push: { followings: req.params.id } })

                res.status(200).send("You follow this user")
            } else {
                res.status(403).send("You allready follow this user")
            }

        } catch (error) {
            res.status(500).send(error)
        }

    } else {
        res.status(403).send("You cannot follow yourself")
    }
})

// Unfollow a user

router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("user has been unfollowed");
            } else {
                res.status(403).json("you dont follow this user anymore");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant unfollow yourself");
    }
});


export default router