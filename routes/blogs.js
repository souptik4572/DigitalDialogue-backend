const router = require('express').Router();
const { authProtection, isAdmin } = require('../middleware/authStrategy');
const { isBlogOwner } = require('../middleware/ownerStrategy');
const {
	getParticularBlog,
	editParticularBlog,
	deleteParticularBlog,
	getAllBlogs,
	createNewBlog,
} = require('../controllers/blogs');

router.get('/:blogId', getParticularBlog);

router.patch('/:blogId', [authProtection, isAdmin, isBlogOwner], editParticularBlog);

router.delete('/:blogId', [authProtection, isAdmin, isBlogOwner], deleteParticularBlog);

router.get('/', getAllBlogs);

router.post('/', [authProtection, isAdmin], createNewBlog);

module.exports = router;
