import express from "express"
import postCreateValidation from "../validations.js"
import postCntrl from "../controllers/postController.js"
import auth from "../middlewares/auth.js"
import handleValidationErrors from "../utils/handleValidationErrors.js"

const router = express.Router()

router.get("/tags", auth, postCntrl.getLastTags)
router.get("/posts", auth, postCntrl.getAll)
router.get("/posts/:id", auth, postCntrl.getOne)
router.post(
	"/posts",
	auth,
	postCreateValidation,
	handleValidationErrors,
	postCntrl.create
)
router.delete("/posts/:id", auth, postCntrl.remove)
router.patch(
	"/posts/:id",
	auth,
	postCreateValidation,
	handleValidationErrors,
	postCntrl.update
)
export default router
