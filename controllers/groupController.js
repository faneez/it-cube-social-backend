import Groups from "../models/groupModel.js"

const groupCntrl = {
	async getOne(req, res) {
		try {
			const id = req.params.id

			const group = await Groups.findById(id).populate({
				path: "posts",
				populate: {
					path: "user",
				},
			})
			if (!group)
				return res.status(400).json({ msg: "Не удалось найти группу" })

			return res.json(group)
		} catch (e) {}
	},
	async getAll(req, res) {
		try {
			const groups = await Groups.find()

			res.json(groups)
		} catch (e) {
			res.status(500).json({ msg: e.message })
		}
	},
}

export default groupCntrl
