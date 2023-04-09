import Users from "../models/userModel.js"
import jwt from "jsonwebtoken"

const auth = async (req, res, next) => {
	try {
		const rf_token = req.header("Authorization")
		if (!rf_token) {
			return res.status(500).json({ msg: "Пользователь не авторизован" })
		}
		const decoded = jwt.verify(rf_token, process.env.accessToken)
		if (!decoded) {
			return res.status(500).json({ msg: "Пользователь не найден!" })
		}
		const user = await Users.findById(decoded.userId)
			.select("-password")
			.populate("friends following")

		req.user = user
		next()
	} catch (e) {
		res.status(500).json({ msg: e.message })
	}
}
export default auth
