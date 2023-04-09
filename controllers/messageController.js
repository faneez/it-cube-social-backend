import MessageModel from "../models/messageModel.js"

const messageCntrl = {
	createMessage: async (req, res) => {
		try {
			const from = req.user._id
			const { to, message } = req.body

			const newMessage = await MessageModel.create({
				Chatusers: [from.toString(), to],
				message,
				sender: from,
			})
			return res.json(newMessage)
		} catch (err) {
			return res.status(500).json({ msg: "Не удалось создать сообщение" })
		}
	},

	getMessages: async (req, res) => {
		try {
			const to = req.params.id.toString()
			const from = req.user._id.toString()

			const message = await MessageModel.find({
				Chatusers: {
					$all: [from, to],
				},
			}).sort({ updatedAt: 1 })

			const allMessages = message.map((msg) => {
				return {
					myself: msg.sender.toString() === from,
					message: msg.message,
				}
			})

			return res.json(allMessages)
		} catch (err) {
			return res.status(500).json({ msg: "Не удалось найти сообщения" })
		}
	},
}

export default messageCntrl
