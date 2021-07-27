const router = require('express').Router({
	mergeParams: true,
});
const { authProtection, isAdmin } = require('../middleware/authStrategy');
const { isCommentOwner } = require('../middleware/ownerStrategy');
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

router.get('/', async (req, res) => {
	const { blogId } = req.params;
	try {
		const comments = await Comment.find({ associatedBlog: blogId });
		return res.status(200).json({
			success: true,
			comments,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			error: error.message,
		});
	}
});

router.post('/', authProtection, async (req, res) => {
	const { blogId } = req.params;
	console.log(req.params);
	const { text } = req.body;
	try {
		const comment = await Comment.create({
			text,
			createdBy: req.user._id,
			associatedBlog: blogId,
		});
		const blog = await Blog.findById(blogId);
		blog.comments.push(comment._id);
		await blog.save();
		return res.status(200).json({
			success: true,
			comment,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			error: error.message,
		});
	}
});

router.patch('/:commentId', [authProtection, isCommentOwner], async (req, res) => {
	const { commentId } = req.params;
	const { text } = req.body;
	try {
		const comment = await Comment.findByIdAndUpdate(
			commentId,
			{
				text,
			},
			{ new: true }
		);
		return res.status(200).json({
			success: true,
			comment,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			error: error.message,
		});
	}
});

router.delete('/:commentId', [authProtection, isCommentOwner], async (req, res) => {
	const { blogId, commentId } = req.params;
	try {
		const comment = await Comment.findByIdAndDelete(commentId);
		const blog = await Blog.updateOne(
			{ _id: blogId },
			{
				$pull: {
					comments: commentId,
				},
			}
		);
		return res.status(200).json({
			success: true,
			comment,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			error: error.message,
		});
	}
});

module.exports = router;
