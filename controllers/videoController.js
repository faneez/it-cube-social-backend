import Videos from "../models/videoModel.js"
import commentModel from "../models/commentsModel.js"

const videoCntrl = {
	async createComment(req, res) {
		try {
			const { text, videoId } = req.body
			const newComment = await commentModel.create({
				text,
				user: req.user._id,
			})

			if (!newComment)
				return res.status(400).json({ msg: "Не удалось создать комментарий" })

			const video = await Videos.findByIdAndUpdate(
				videoId,
				{
					$push: {
						comments: newComment._id,
					},
				},
				{ returnDocument: "after" }
			).populate({
				path: "comments",
				populate: {
					path: "user",
				},
			})

			res.json(video)
		} catch (err) {}
	},
	async deleteComment(req, res) {
		try {
			const { commentId, videoId } = req.body

			await commentModel.findByIdAndDelete(commentId)

			const video = await Videos.findByIdAndUpdate(
				videoId,
				{
					$pull: {
						comments: commentId,
					},
				},
				{ returnDocument: "after" }
			).populate({
				path: "comments",
				populate: {
					path: "user",
				},
			})

			res.json(video)
		} catch (err) {}
	},
	async getAll(req, res) {
		try {
			const category = req.query.category

			let videos
			if (category == "all") {
				videos = await Videos.find()
			} else {
				videos = await Videos.find({ category: category })
			}
			return res.json(videos)
		} catch (e) {
			return res.status(500).json({ msg: "Не удалось выполнить запрос" })
		}
	},
	async getOne(req, res) {
		try {
			const id = req.params.id
			const video = await Videos.findById(id).populate({
				path: "comments",
				populate: {
					path: "user",
				},
			})
			if (!video) {
				return res.status(400).json({ msg: "Видео не найдено!" })
			}
			return res.json(video)
		} catch (e) {
			return res.status(500).json({ msg: e })
		}
	},
}
export default videoCntrl
