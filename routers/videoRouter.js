import express from "express"
import videoCntrl from "../controllers/videoController.js"
import auth from "../middlewares/auth.js"
const router = express.Router()

router.get("/videos", auth, videoCntrl.getAll)
router.get("/videos/:id", auth, videoCntrl.getOne)
router.post("/video-comment", auth, videoCntrl.createComment)
router.patch("/video-comment", auth, videoCntrl.deleteComment)

export default router
