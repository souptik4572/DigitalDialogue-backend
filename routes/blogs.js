const router = require('express').Router();
const { authProtection, isAdmin } = require('../middleware/authStrategy');
const { isBlogOwner } = require('../middleware/ownerStrategy');
const Blog = require('../models/Blog');

router.get('/:blogId', async (req, res) => {
	const { blogId } = req.params;
	try {
		const blog = await Blog.findById(blogId);
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
});

router.patch('/:blogId', [authProtection, isAdmin, isBlogOwner], async (req, res) => {
	const { blogId } = req.params;
	const { image, title, content } = req.body;
	try {
		const updatedBlog = await Blog.findByIdAndUpdate(
			blogId,
			{
				title,
				image,
				content,
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
});

router.delete('/:blogId', [authProtection, isAdmin, isBlogOwner], async (req, res) => {
	const { blogId } = req.params;
	try {
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
});

router.get('/', async (req, res) => {
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
});

router.post('/', [authProtection, isAdmin], async (req, res) => {
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
});

module.exports = router;
