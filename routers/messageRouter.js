import express from "express"
import auth from "../middlewares/auth.js"

import messageCntrl from "../controllers/messageController.js"
const router = express.Router()
router.get("/message/:id", auth, messageCntrl.getMessages)
router.post("/message", auth, messageCntrl.createMessage)

export default router
