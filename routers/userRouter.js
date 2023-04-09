import express from "express"
import auth from "../middlewares/auth.js"

import userCntrl from "../controllers/userController.js"

const router = express.Router()
router.get("/users/:id", auth, userCntrl.getOne)
router.get("/users", auth, userCntrl.getAll)
router.get("/rating", auth, userCntrl.getSortedByRtng)
router.post("/avatar", auth, userCntrl.updateAvatar)

export default router
