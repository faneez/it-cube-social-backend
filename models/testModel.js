import mongoose from "mongoose"

const testSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		questions: {
			type: Array,
			required: true,
		},
		user: [{ type: mongoose.Types.ObjectId, ref: "user" }],
		url: {
			type: String,
			default:
				"https://moodle.dpk.su/pluginfile.php/32955/course/overviewfiles/shutterstock_248597491_IntTest.jpg",
		},
	},
	{ timestamps: true }
)

export default mongoose.model("test", testSchema)
