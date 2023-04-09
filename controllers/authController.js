import Users from "../models/userModel.js"
import Roles from "../models/roleModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const authCntrl = {
	register: async (req, res) => {
		try {
			const { name, surname, email, password, gender, position, group } =
				req.body

			const user = await Users.findOne({ email })
			if (user) {
				return res
					.status(400)
					.json({ msg: "Пользователь с таким email уже есть!" })
			}
			if (password.length < 5)
				return res
					.status(400)
					.json({ msg: "Пароль должен быть больше 5 символов!" })
			const passwordHash = await bcrypt.hash(password, 7)
			const newUser = await Users.create({
				name,
				surname,
				email,
				password: passwordHash,
				gender,
				position,
				group,
			})

			const access_token = createAccessToken(newUser._id, newUser.roles)
			const refresh_token = createRefreshToken(newUser._id, newUser.roles)

			res.cookie("refreshtoken", refresh_token, {
				httpOnly: true,
				secure: true,
				path: "/api/refresh_token",
				maxAge: 24 * 30 * 60 * 60 * 1000, //30d
			})
			return res.json({
				msg: "Регистрация прошла успешно!",
				access_token,
				user: {
					...newUser._doc,
					password: "",
				},
			})
		} catch (err) {
			return res.status(500).json({ msg: err.message })
		}
	},

	login: async (req, res) => {
		try {
			const { email, password } = req.body
			const user = await Users.findOne({ email }).populate(
				"friends following",
				"-password"
			)
			if (!user) {
				return res
					.status(400)
					.json({ msg: "Пользователя с таким email не существует!" })
			}
			const isMatch = await bcrypt.compare(password, user.password)
			if (!isMatch) {
				return res.status(400).json({ msg: "Неверный пароль!" })
			}

			const access_token = createAccessToken(user._id, user.roles)
			const refresh_token = createRefreshToken(user._id, user.roles)

			res.cookie("refreshtoken", refresh_token, {
				httpOnly: true,
				secure: true,
				path: "/refresh_token",
				maxAge: 24 * 30 * 60 * 60 * 1000, //30d
			})
			return res.json({
				user: {
					...user._doc,
					password: "",
				},
				token: access_token,
				msg: "Выполнен вход",
			})
		} catch (err) {
			return res.status(500).json({ msg: err.message })
		}
	},
	logout: async (req, res) => {
		try {
			res.clearCookie("refreshtoken", { path: "/refresh_token" })
			res.json({ msg: "Выполнен выход" })
		} catch (err) {
			return res.status(500).json({ msg: err.message })
		}
	},
	generateAccessToken: async (req, res) => {
		try {
			const rf_token = req.cookies.refreshtoken

			if (!rf_token) {
				return res.status(400).json({ msg: "Пожалуйста авторизуйтесь" })
			}

			jwt.verify(rf_token, process.env.refreshToken, async (err, decoded) => {
				if (err) {
					return res.status(400).json({ msg: "Пожалуйста, войдите снова" })
				}
				const user = await Users.findById(decoded.id)
					.select("-password")
					.populate("friends following")

				if (!user)
					return res.status(400).json({ msg: "Пользователь не найден" })

				const access_token = createAccessToken(user._id, user.roles)

				return res.json({
					user: {
						...user._doc,
						password: "",
					},
					msg: "",
					token: access_token,
				})
			})
		} catch (err) {
			return res.status(500).json({ msg: err.message })
		}
	},
}

const createAccessToken = (id, roles) => {
	const payload = { userId: id, roles }

	return jwt.sign(payload, process.env.accessToken, { expiresIn: "1d" })
}
const createRefreshToken = (id, roles) => {
	const payload = { id, roles }

	return jwt.sign(payload, process.env.refreshToken, { expiresIn: "30d" })
}
export default authCntrl
