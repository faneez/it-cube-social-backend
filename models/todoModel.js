import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	status: {
		type: Boolean,
		default: false,
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: "user",
	},
})

export default mongoose.model("todo", todoSchema)
