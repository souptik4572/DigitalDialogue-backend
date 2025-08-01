import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

/**
 * @description API to fetch all comments made on an existing blog
 * @route GET /:blogId/comments
 * @param blogId
 * @access Public
 */
export const getAllComments = async (req, res) => {
	const { blogId } = req.params;
	try {
		const comments = await Comment.find({ associatedBlog: blogId });
		return res.status(200).json({
			success: true,
			message: `List of all comments on blog with id ${blogId}`,
			comments,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

/**
 * @description API to create a new comment on an existing blog
 * @route PUT /:blogId/comments/
 * @param blogId
 * @access Private, only accessible to the logged in user through JWT
 */
export const createNewComment = async (req, res) => {
	const { blogId } = req.params;
	const { text } = req.body;
	try {
		const comment = await Comment.create({
			text,
			createdBy: req.user._id,
			associatedBlog: blogId,
		});
		await Blog.findByIdAndUpdate(blogId, {
			$push: {
				comments: comment._id,
			},
		});
		return res.status(200).json({
			success: true,
			message: "Comment has been created successfully",
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error.message,
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
export const editExistingComment = async (req, res) => {
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
			message: "Comment has been updated successfully",
			comment,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error.message,
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
export const deleteExistingComment = async (req, res) => {
	const { blogId, commentId } = req.params;
	try {
		await Comment.findByIdAndDelete(commentId);
		await Blog.findByIdAndUpdate(blogId, {
			$pull: {
				comments: commentId,
			},
		});
		return res.status(200).json({
			success: true,
			message: "Comment has been deleted successfully",
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};
