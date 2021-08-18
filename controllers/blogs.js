const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

const getParticularBlog = async (req, res) => {
	const { blogId } = req.params;
	try {
		const blog = await Blog.findById(blogId).populate('comments');
		res.status(200).json({
			success: true,
			blog,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			error: error.message,
		});
	}
};

const editParticularBlog = async (req, res) => {
	const { blogId } = req.params;
	const { image, title, content } = req.body;
	const editedBlogData = {};
	if (image) editedBlogData.image = image;
	if (title) editedBlogData.title = title;
	if (content) editedBlogData.content = content;
	try {
		const updatedBlog = await Blog.findByIdAndUpdate(
			blogId,
			{
				...editedBlogData,
				updatedOn: Date.now(),
			},
			{ new: true }
		);
		return res.status(200).json({
			success: true,
			blog: updatedBlog,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			error: error.message,
		});
	}
};

const deleteParticularBlog = async (req, res) => {
	const { blogId } = req.params;
	try {
		await Comment.deleteMany({ associatedBlog: blogId });
		const deletedBlog = await Blog.findByIdAndDelete(blogId);
		return res.status(200).json({
			success: true,
			blog: deletedBlog,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			error: error.message,
		});
	}
};

const getAllBlogs = async (req, res) => {
	try {
		const blogs = await Blog.find({});
		return res.status(200).json({
			success: true,
			blogs,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			error: error.message,
		});
	}
};

const createNewBlog = async (req, res) => {
	const { title, content, image } = req.body;
	try {
		const newBlog = await Blog.create({
			image,
			title,
			content,
			createdBy: req.user._id,
		});
		return res.status(200).json({
			success: true,
			blog: newBlog,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			error: error.message,
		});
	}
};

module.exports = {
	getParticularBlog,
	editParticularBlog,
	deleteParticularBlog,
	getAllBlogs,
	createNewBlog,
};
