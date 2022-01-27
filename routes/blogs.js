const router = require('express').Router();
const { authProtection, isAdmin } = require('../middlewares/authStrategy');
const { isBlogOwner } = require('../middlewares/ownerStrategy');
const {
	getParticularBlog,
	updateLikeOfParticularBlog,
	editParticularBlog,
	deleteParticularBlog,
	getAllBlogs,
	createNewBlog,
} = require('../controllers/blogs');

// Get details of a particular blog
router.get('/:blogId', getParticularBlog);

// Like/Dislike a particular blog
router.patch('/:blogId/like', authProtection, updateLikeOfParticularBlog);

// Edit details of an existing blog
router.patch('/:blogId', [authProtection, isAdmin, isBlogOwner], editParticularBlog);

// Delete an existing blog
router.delete('/:blogId', [authProtection, isAdmin, isBlogOwner], deleteParticularBlog);

// Fetch all blogs
router.get('/', getAllBlogs);

// Create a brand new blog
router.put('/', [authProtection, isAdmin], createNewBlog);

module.exports = router;
