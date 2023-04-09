import PostGroupModel from "../models/postGroupModel.js"
import groupModel from "../models/groupModel.js"

const postGroupCntrl = {
	// getLastTags: async (req, res) => {
	// 	try {
	// 		const posts = await PostGroupModel.find()
	// 			.sort({ createdAt: -1 })
	// 			.limit(5)
	// 			.exec()

	// 		const tags = posts
	// 			.map((obj) => obj.tags)
	// 			.flat()
	// 			.slice(0, 5)
	// 		return res.json(tags)
	// 	} catch (err) {
	// 		res.status(500).json({
	// 			message: "Не удалось получить статьи",
	// 		})
	// 	}
	// },

	getAll: async (req, res) => {
		try {
			const groupId = req.body.groupId
			const groupPosts = await PostGroupModel.find()
				.sort({ createdAt: -1 })
				.populate("user")
				.exec()
			res.json(groupPosts)
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
			const postGroupId = req.params.id
			const groupId = req.params.groupId

			const postGroup = await PostGroupModel.findOneAndDelete(postId)

			const group = await groupModel
				.findByIdAndUpdate(
					groupId,
					{
						$pull: { posts: postGroupId },
					},
					{ returnDocument: "after" }
				)
				.populate("postGroup")

			res.json({ msg: "Пост удален" })

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
			const post = await PostGroupModel.create({
				title: req.body.title,
				text: req.body.text,
				imageUrl: req.body.imageUrl,
				tags: req.body.tags.split(","),
				user: req.user._id,
				group: req.body.titleGroup,
			})

			const createdPost = await PostGroupModel.findById(post._id)

			const group = await groupModel
				.findOneAndUpdate(
					{ title: req.body.titleGroup },
					{ $push: { posts: createdPost._id } },
					{ returnDocument: "after" }
				)

				.populate({
					path: "posts",
					populate: {
						path: "user",
					},
				})
			res.json(group)
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

export default postGroupCntrl
