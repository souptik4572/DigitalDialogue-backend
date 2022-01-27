const router = require('express').Router({
	mergeParams: true,
});
const { authProtection } = require('../middlewares/authStrategy');
const { isCommentOwner } = require('../middlewares/ownerStrategy');

const {
	getAllComments,
	createNewComment,
	editExistingComment,
	deleteExistingComment,
} = require('../controllers/comments');

// Fetch all comments on a particular blog
router.get('/', getAllComments);

// Create a new comment on a particular blog
router.put('/', authProtection, createNewComment);

// Update contents of an existing comment
router.patch('/:commentId', [authProtection, isCommentOwner], editExistingComment);

// Delete an existing comment
router.delete('/:commentId', [authProtection, isCommentOwner], deleteExistingComment);

module.exports = router;
