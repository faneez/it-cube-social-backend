import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import { Server } from "socket.io"
import cors from "cors"
import bcrypt from "bcrypt"
import auth from "./middlewares/auth.js"
import multer from "multer"
import cookieparser from "cookie-parser"
import authRouter from "./routers/authRouter.js"
import userRouter from "./routers/userRouter.js"
import groupRouter from "./routers/groupRouter.js"
import todoRouter from "./routers/todoRouter.js"
import videoRouter from "./routers/videoRouter.js"
import testRouter from "./routers/testRouter.js"
import postRouter from "./routers/postRouter.js"
import groupPostRouter from "./routers/groupPostRouter.js"
import messageRouter from "./routers/messageRouter.js"

dotenv.config()
const production = process.env.NODE_ENV === "production"

const app = express()
const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, "uploads")
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname)
	},
})
const upload = multer({ storage })
app.use(express.json())
app.use(cors())
app.use(cookieparser())
app.use("/uploads", express.static("uploads"))

//routes
app.post("/api/upload", upload.single("image"), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	})
})
app.use("/api", authRouter)
app.use("/api", userRouter)
app.use("/api", groupRouter)
app.use("/api", todoRouter)
app.use("/api", videoRouter)
app.use("/api", testRouter)
app.use("/api", postRouter)
app.use("/api", groupPostRouter)
app.use("/api", messageRouter)

const port = process.env.PORT || 5000

const URL = production ? process.env.DB_URL_PROD : process.env.DB_URL

await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
const server = app.listen(port, () => {
	console.log("Сервер запущен!")
})

const io = new Server(server, {
	cors: {
		origin: [
			"http://localhost:3000",
			"https://heroic-hotteok-254a9e.netlify.app",
		],
		credentials: true,
	},
})
global.onlineUsers = new Map()
io.on("connection", (socket) => {
	console.log("пользователь подключился")
	global.chatsocket = socket
	socket.on("addUser", (id) => {
		onlineUsers.set(id, socket.id)
	})

	socket.on("send-msg", (data) => {
		const sendUserSocket = onlineUsers.get(data.to)
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("msg-receive", data.message)
		}
	})
})
