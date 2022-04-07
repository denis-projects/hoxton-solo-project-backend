// import express from "express"
// import Messages from "../models/Messages.js"

// const router = express.Router()

// router.get("/sync", (req, res) => {
//     Messages.find((err, data) => {
//         if (err) {
//             res.status(500).send(err)
//         } else {
//             res.status(200).send(data)
//         }
//     })
// })

// router.post("/new", (req, res) => {
//     const me = req.body;

//     Messages.create(messagesdb, (err, data) => {
//         if (err) {
//             res.status(500).send(err)
//         } else {
//             res.status(201).send(data)
//         }
//     })
// })


// export default router