const router = require('express').Router();
const { authProtection, isAdmin } = require('../middlewares/authStrategy');
const { isBlogOwner } = require('../middlewares/ownerStrategy');
const {
	getParticularBlog,
	editParticularBlog,
	deleteParticularBlog,
	getAllBlogs,
	createNewBlog,
} = require('../controllers/blogs');
const Blog = require('../models/Blog');

router.get('/:blogId', getParticularBlog);

router.patch('/:blogId/like', authProtection, async (req, res) => {
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
			blog,
		});
	} catch (error) {
		return res.status(404).json({
			success: false,
			error: error.message,
		});
	}
});

router.patch('/:blogId', [authProtection, isAdmin, isBlogOwner], editParticularBlog);

router.delete('/:blogId', [authProtection, isAdmin, isBlogOwner], deleteParticularBlog);

router.get('/', getAllBlogs);

router.post('/', [authProtection, isAdmin], createNewBlog);

module.exports = router;
