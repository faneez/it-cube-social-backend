import express from "express"
import groupCntrl from "../controllers/groupController.js"
import auth from "../middlewares/auth.js"
const router = express.Router()
router.get("/groups", auth, groupCntrl.getAll)
router.get("/groups/:id", auth, groupCntrl.getOne)

export default router
