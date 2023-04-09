import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			maxlength: 25,
			require: true,
		},
		surname: {
			type: String,
			trim: true,
			maxlength: 25,
			require: true,
		},
		position: {
			type: String,
			require: true,
			default: "Ученик",
		},
		email: {
			type: String,
			trim: true,
			require: true,
		},
		password: {
			type: String,
			require: true,
		},
		address: {
			type: String,
			default: "",
		},
		gender: {
			type: String,
			default: "мужчина",
		},
		rating: {
			type: Number,
			default: 0,
		},
		website: {
			type: String,
			default: "",
		},
		phone: {
			type: String,
			default: "",
		},
		group: {
			type: String,
			default: "",
		},
		avatar: {
			type: String,
			default:
				"https://crypto.ru/wp-content/plugins/q-auth/assets/img/default-user.png",
		},
		roles: { type: [{ type: String }], default: ["USER"] },
		todo: [{ type: mongoose.Types.ObjectId, ref: "todo" }],
		story: {
			type: String,
			default: "",
			maxlength: 25,
		},
		friends: [{ type: mongoose.Types.ObjectId, ref: "user" }],
		following: [{ type: mongoose.Types.ObjectId, ref: "user" }],
	},
	{ timestamps: true }
)

export default mongoose.model("user", userSchema)
