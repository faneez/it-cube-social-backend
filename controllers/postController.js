import PostModel from "../models/postModel.js"

const postCntrl = {
	getLastTags: async (req, res) => {
		try {
			const posts = await PostModel.find()
				.sort({ createdAt: -1 })
				.limit(5)
				.exec()

			const tags = posts
				.map((obj) => obj.tags)
				.flat()
				.slice(0, 5)
			return res.json(tags)
		} catch (err) {
			res.status(500).json({
				message: "Не удалось получить статьи",
			})
		}
	},

	getAll: async (req, res) => {
		try {
			const posts = await PostModel.find()
				.sort({ createdAt: -1 })
				.populate("user")
				.exec()
			res.json(posts)
		} catch (err) {
			res.status(500).json({
				message: "Не удалось получить статьи",
			})
		}
	},

	getOne: async (req, res) => {
		try {
			const postId = req.params.id

			const post = await PostModel.findByIdAndUpdate(
				postId,
				{
					$inc: { viewsCount: 1 },
				},
				{
					returnDocument: "after",
				}
			).populate("user")

			res.json(post)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: "Не удалось получить статьи",
			})
		}
	},

	remove: async (req, res) => {
		try {
			const postId = req.params.id
			console.log(postId)

			const post = await PostModel.findOneAndDelete(postId)

			if (!post) return res.json({ message: "Не удалось удалить статью!" })

			const posts = await PostModel.find().populate("user")

			return res.json(posts)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: "Не удалось получить статьи",
			})
		}
	},

	create: async (req, res) => {
		try {
			const doc = new PostModel({
				title: req.body.title,
				text: req.body.text,
				imageUrl: req.body.imageUrl,
				tags: req.body.tags.split(","),
				user: req.user._id,
			})

			const post = await doc.save()

			res.json(post)
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: "Не удалось создать статью",
			})
		}
	},
	update: async (req, res) => {
		try {
			const postId = req.params.id

			await PostModel.updateOne(
				{
					_id: postId,
				},
				{
					title: req.body.title,
					text: req.body.text,
					imageUrl: req.body.imageUrl,
					user: req.userId,
					tags: req.body.tags.split(","),
				}
			)

			res.json({
				success: true,
			})
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: "Не удалось обновить статью",
			})
		}
	},
}

export default postCntrl
