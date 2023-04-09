import Users from "../models/userModel.js"
import Todos from "../models/todoModel.js"

const todoCntrl = {
	async addOne(req, res) {
		try {
			const newTodo = await Todos.create({
				title: req.body.title,
				status: false,
				user: req.user._id,
			})

			const user = await Users.findByIdAndUpdate(
				req.user._id,
				{
					$push: { todo: newTodo._id },
				},
				{ returnDocument: "after" }
			).populate("todo")

			return res.json(user.todo)
		} catch (e) {
			console.log(e)
		}
	},
	async getTodos(req, res) {
		try {
			const user = await Users.findById(req.user._id).populate("todo")

			res.json(user.todo)
		} catch (e) {
			res.status(500).json({ msg: e })
		}
	},
	async updateOne() {
		try {
		} catch (e) {}
	},
	async deleteOne(req, res) {
		try {
			const id = req.params.id
			await Todos.findByIdAndDelete(id)
			const user = await Users.findByIdAndUpdate(
				req.user._id,
				{ $pull: { todo: id } },
				{ returnDocument: "after" }
			).populate("todo")

			res.json(user.todo)
		} catch (e) {}
	},
	async changeStatus(req, res) {
		try {
			const id = req.params.id
			const status = req.body.status

			const todo = await Todos.findByIdAndUpdate(
				id,
				{ status: status },
				{ returnDocument: "after" }
			)

			const user = await Users.findById(req.user._id).populate("todo")
			return res.json(user.todo)
		} catch (e) {}
	},
}

export default todoCntrl
