import mongoose from "mongoose"

const groupSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
	},
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	posts: [{ type: mongoose.Types.ObjectId, ref: "postGroup", default: [] }],
	avatar: {
		type: String,
		default:
			"https://w7.pngwing.com/pngs/210/468/png-transparent-computer-icons-blog-desktop-icon-public-relations-blue-text-pin.png",
	},
})

export default mongoose.model("group", groupSchema)
