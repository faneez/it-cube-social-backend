import express from "express"

import authCntrl from "../controllers/authController.js"
const router = express.Router()
router.post("/register", authCntrl.register)
router.post("/login", authCntrl.login)
router.post("/logout", authCntrl.logout)

router.post("/refresh_token", authCntrl.generateAccessToken)

export default router
