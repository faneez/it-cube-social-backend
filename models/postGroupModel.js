import mongoose from "mongoose"

const postGroupSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
			unique: true,
		},
		tags: {
			type: Array,
			default: [],
		},
		viewsCount: {
			type: Number,
			default: 0,
		},
		group: {
			type: String,
			required: true,
		},
		comments: [{ type: mongoose.Types.ObjectId, ref: "comments", default: [] }],
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		imageUrl: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model("postGroup", postGroupSchema)
