import mongoose from "mongoose"

const videoSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			unique: true,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			default:
				"https://sun9-87.userapi.com/impg/He9obvVT6QH-WgC4521NC1p1xJr3QZGyfTGyeA/1QM2J_BtjI0.jpg?size=1140x760&quality=95&sign=54c2e58dbeadf6737519ded45683d834&c_uniq_tag=mZc9mbvmY_HSJNxFSYdW-D7JnPdlaY59M8-XeAoLh5M&type=album",
		},
		comments: [{ type: mongoose.Types.ObjectId, ref: "comment", default: [] }],
	},
	{ timestamps: true }
)

export default mongoose.model("video", videoSchema)
