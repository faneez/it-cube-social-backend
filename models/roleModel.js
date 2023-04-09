import mongoose from "mongoose"

const roleSchema = new mongoose.Schema({
	value: {
		type: String,
		default: "USER",
		unique: true,
	},
})

export default mongoose.model("role", roleSchema)
