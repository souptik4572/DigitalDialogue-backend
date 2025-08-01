import { Router } from "express";
import { authProtection } from "../middlewares/authStrategy.js";
import { isCommentOwner } from "../middlewares/ownerStrategy.js";

import {
	getAllComments,
	createNewComment,
	editExistingComment,
	deleteExistingComment,
} from "../controllers/comments.js";

const router = Router({
	mergeParams: true,
});

// Fetch all comments on a particular blog
router.get("/", getAllComments);

// Create a new comment on a particular blog
router.put("/", authProtection, createNewComment);

// Update contents of an existing comment
router.patch(
	"/:commentId",
	[authProtection, isCommentOwner],
	editExistingComment
);

// Delete an existing comment
router.delete(
	"/:commentId",
	[authProtection, isCommentOwner],
	deleteExistingComment
);

export default router;
