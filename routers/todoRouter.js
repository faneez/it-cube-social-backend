import express from "express"
import todoCntrl from "../controllers/todoController.js"
import auth from "../middlewares/auth.js"
const router = express.Router()
router.post("/todos", auth, todoCntrl.addOne)
router.get("/todos", auth, todoCntrl.getTodos)
router.delete("/todos/:id", auth, todoCntrl.deleteOne)
router.patch("/todos", auth, todoCntrl.updateOne)
router.patch("/todos/:id", auth, todoCntrl.changeStatus)

export default router
