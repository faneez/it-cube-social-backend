import express from "express"
import postGroupController from "../controllers/postGroupController.js"
import auth from "../middlewares/auth.js"
const router = express.Router()
router.post("/post-group", auth, postGroupController.create)
router.delete("/post-group", auth, postGroupController.remove)

export default router
