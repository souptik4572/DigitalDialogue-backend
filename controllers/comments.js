const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

/**
 * @description API to fetch all comments made on an existing blog
 * @route GET /:blogId/comments
 * @param blogId
 * @access Public
 */
const getAllComments = async (req, res) => {
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
};

/**
 * @description API to create a new comment on an existing blog
 * @route PUT /:blogId/comments/
 * @param blogId
 * @access Private, only accessible to the logged in user through JWT
 */
const createNewComment = async (req, res) => {
	const { blogId } = req.params;
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
};

/**
 * @description API to edit the contents of an existing comment on an existing blog
 * @route PATCH /:blogId/comments/:commentId
 * @param blogId
 * @param commentId
 * @access Private, only accessible by the comment owner
 */
const editExistingComment = async (req, res) => {
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
};

/**
 * @description API to delete an existing comment on an existing blog
 * @route DELETE /:blogId/comments/:commentId
 * @param blogId
 * @param commentId
 * @access Private, only accessible by the comment owner
 */
const deleteExistingComment = async (req, res) => {
	const { blogId, commentId } = req.params;
	try {
		const comment = await Comment.findByIdAndDelete(commentId);
		await Blog.updateOne(
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
};

module.exports = {
	getAllComments,
	createNewComment,
	editExistingComment,
	deleteExistingComment,
};
