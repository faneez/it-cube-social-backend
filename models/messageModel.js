import mongoose from "mongoose"

const messageSchema = new mongoose.Schema(
	{
		Chatusers: {
			type: Array,
			require: true,
		},
		message: {
			type: String,
			require: true,
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			require: true,
		},
	},
	{ timestamps: true }
)

export default mongoose.model("message", messageSchema)
