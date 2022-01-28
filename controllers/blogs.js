const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

/**
 * @description API to fetch a particular blog
 * @route GET /:blogId
 * @param blogId
 * @access Public
 */
const getParticularBlog = async (req, res) => {
	const { blogId } = req.params;
	try {
		const blog = await Blog.findById(blogId).populate('comments');
		res.status(200).json({
			success: true,
			message: `The required blog with id ${blogId}`,
			blog,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

/**
 * @description API to like an existing blog
 * @route PATCH /:blogId/like
 * @param blogId
 * @access Private, only accessible by the logged in user through JWT
 */
const updateLikeOfParticularBlog = async (req, res) => {
	const { blogId } = req.params;
	try {
		const blog = await Blog.findById(blogId);
		const isLiked = await Blog.find({
			_id: blogId,
			usersWhoLiked: {
				$in: [req.user._id],
			},
		}).countDocuments();
		if (isLiked) {
			blog.usersWhoLiked = blog.usersWhoLiked.filter(
				(anUserId) => String(anUserId) !== String(req.user._id)
			);
			blog.likes -= 1;
		} else {
			blog.usersWhoLiked.push(req.user._id);
			blog.likes += 1;
		}
		await blog.save();
		return res.status(200).json({
			success: true,
			message: isLiked ? 'The like has been removed' : 'The like was added',
			blog,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

/**
 * @description API to update content an existing blog
 * @route PATCH /:blogId
 * @param blogId
 * @access Private, only accessible by the owner of the blog and the SUPER_ADMIN
 */
const editParticularBlog = async (req, res) => {
	const { blogId } = req.params;
	const { image, title, content } = req.body;
	const editedBlogData = {};
	if (image) editedBlogData.image = image;
	if (title) editedBlogData.title = title;
	if (content) editedBlogData.content = content;
	try {
		await Blog.findByIdAndUpdate(
			blogId,
			{
				...editedBlogData,
				updatedOn: Date.now(),
			},
			{ new: true }
		);
		return res.status(200).json({
			success: true,
			message: 'Blog has been updated successfully'
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

/**
 * @description API to delete an existing blog
 * @route DELETE /:blogId
 * @param blogId
 * @access Private, only accessible by the owner of the blog and the SUPER_ADMIN
 */
const deleteParticularBlog = async (req, res) => {
	const { blogId } = req.params;
	try {
		await Comment.deleteMany({ associatedBlog: blogId });
		await Blog.findByIdAndDelete(blogId);
		return res.status(200).json({
			success: true,
			message: 'The blog has been successfully deleted'
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

/**
 * @description API to fetch all the available blogs
 * @route GET /
 * @access Public
 */
const getAllBlogs = async (req, res) => {
	try {
		const blogs = await Blog.find({});
		return res.status(200).json({
			success: true,
			message: 'List of all existing blogs',
			blogs,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

/**
 * @description API to create a new blog
 * @route PUT /
 * @access Private, only accessible to the logged in user through JWT
 */
const createNewBlog = async (req, res) => {
	const { title, content, image } = req.body;
	try {
		await Blog.create({
			image,
			title,
			content,
			createdBy: req.user._id,
		});
		return res.status(200).json({
			success: true,
			message: 'New blog has been created successfully'
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = {
	getParticularBlog,
	updateLikeOfParticularBlog,
	editParticularBlog,
	deleteParticularBlog,
	getAllBlogs,
	createNewBlog,
};
