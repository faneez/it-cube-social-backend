import express from "express"
import testCntrl from "../controllers/testController.js"
import auth from "../middlewares/auth.js"
const router = express.Router()
router.get("/tests", auth, testCntrl.getAll)
router.get("/tests/:id", auth, testCntrl.getOne)

export default router
