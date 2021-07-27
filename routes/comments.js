const router = require('express').Router({
	mergeParams: true,
});
const { authProtection } = require('../middleware/authStrategy');
const { isCommentOwner } = require('../middleware/ownerStrategy');

const {
	getAllComments,
	createNewComment,
	editExistingComment,
	deleteExistingComment,
} = require('../controllers/comment');

router.get('/', getAllComments);

router.post('/', authProtection, createNewComment);

router.patch('/:commentId', [authProtection, isCommentOwner], editExistingComment);

router.delete('/:commentId', [authProtection, isCommentOwner], deleteExistingComment);

module.exports = router;
