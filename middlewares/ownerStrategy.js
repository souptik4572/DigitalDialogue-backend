import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import { SUPER_ADMIN } from "../constants/userTypes.js";

export const isBlogOwner = async (req, res, next) => {
	const { blogId } = req.params;
	try {
		const blog = await Blog.findById(blogId);
		if (
			req.user.userType !== SUPER_ADMIN &&
			blog.createdBy !== req.user._id
		) {
			return res.status(404).json({
				success: false,
				message: "Access denied",
			});
		}
		next();
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

export const isCommentOwner = async (req, res, next) => {
	const { commentId } = req.params;
	try {
		const comment = await Comment.findById(commentId);
		if (
			req.user.userType !== SUPER_ADMIN &&
			comment.createdBy !== req.user._id
		) {
			return res.status(404).json({
				success: false,
				message: "Access denied",
			});
		}
		next();
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};
