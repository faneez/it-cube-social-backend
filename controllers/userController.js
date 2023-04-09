import Users from "../models/userModel.js"
// $or: [{ name: search }, { surname: search }],
const userCntrl = {
	getSortedByRtng: async (req, res) => {
		try {
			const users = await Users.find({ position: "Ученик" })
				.sort({ rating: -1 })
				.limit(10)
				.exec()
			console.log(users)
			return res.json(users)
		} catch (err) {
			console.log(err)
		}
	},
	getOne: async (req, res) => {
		try {
			const id = req.params.id
			const user = await Users.findById(id)
				.select("-password")
				.populate("friends following")

			if (!user) {
				res.status(400).json({ msg: "Пользователь не найден" })
			}
			res.json(user)
		} catch (e) {
			res.status(500).json({ msg: "Что-то не так с запросом" })
		}
	},
	updateAvatar: async (req, res) => {
		try {
			const avatar = req.body.avatar
			const user = await Users.findByIdAndUpdate(
				req.user._id,
				{ avatar },
				{ returnDocument: "after" }
			)
			if (!user)
				return res.status(400).json({ msg: "Не удалось обновить аватар" })
			return res.json({ success: true })
		} catch (err) {
			return res.json({ msg: err })
		}
	},
	getAll: async (req, res) => {
		try {
			const search = req.query.search
			let query = {}
			let users = ""
			if (!search) {
				users = await Users.find({ _id: { $ne: req.user._id } })
					.select("-password")
					.populate("friends following")
			} else {
				users = await Users.find({
					_id: { $ne: req.user._id },
					$or: [
						{ name: new RegExp(search, "i") },
						{ surname: new RegExp(search, "i") },
					],
				})
			}

			if (!users) {
				res.status(400).json({ msg: "Пользователь не найден" })
			}

			res.json(users)
		} catch (e) {
			res.status(500).json({ msg: "Что-то не так с запросом" })
		}
	},
}
export default userCntrl
