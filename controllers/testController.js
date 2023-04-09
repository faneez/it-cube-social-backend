import Tests from "../models/testModel.js"

const testCntrl = {
	getOne: async (req, res) => {
		try {
			const id = req.params.id
			const test = await Tests.findById(id)
			if (!test) return res.status(400).json({ msg: "Не удалось найти тест" })
			return res.json(test)
		} catch (e) {
			return res.status(500).json({ msg: e })
		}
	},
	getAll: async (req, res) => {
		try {
			const tests = await Tests.find()
			if (!tests) return res.status(400).json({ msg: "Тестов нет" })
			return res.json(tests)
		} catch (e) {}
	},
}

export default testCntrl
