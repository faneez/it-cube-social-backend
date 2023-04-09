import mongoose from "mongoose"

const commentSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "user",
			required: true,
		},
	},
	{ timestamps: true }
)

export default mongoose.model("comment", commentSchema)
