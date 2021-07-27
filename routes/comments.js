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

router.get('/', getAllComments);

router.post('/', authProtection, createNewComment);

router.patch('/:commentId', [authProtection, isCommentOwner], editExistingComment);

router.delete('/:commentId', [authProtection, isCommentOwner], deleteExistingComment);

module.exports = router;
