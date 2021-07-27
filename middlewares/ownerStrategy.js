const Blog = require('../models/Blog');
const Comment = require('../models/Comment');
const { SUPER_ADMIN } = require('../constants/userTypes');

const isBlogOwner = async (req, res, next) => {
	const { blogId } = req.params;
	try {
		const blog = await Blog.findById(blogId);
		if (req.user.userType !== SUPER_ADMIN && blog.createdBy !== req.user._id) {
			return res.status(404).json({
				success: false,
				error: 'Access denied',
			});
		}
		next();
	} catch (error) {
		return res.status(404).json({
			success: false,
			error: error.message,
		});
	}
};

const isCommentOwner = async (req, res, next) => {
	const { commentId } = req.params;
	try {
		const comment = await Comment.findById(commentId);
		if (req.user.userType !== SUPER_ADMIN && comment.createdBy !== req.user._id) {
			return res.status(404).json({
				success: false,
				error: 'Access denied',
			});
		}
		next();
	} catch (error) {
		return res.status(404).json({
			success: false,
			error: error.message,
		});
	}
};

module.exports = {
	isBlogOwner,
	isCommentOwner,
};
