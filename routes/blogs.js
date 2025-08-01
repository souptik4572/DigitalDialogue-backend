import { Router } from "express";
import { authProtection, isAdmin } from "../middlewares/authStrategy.js";
import { isBlogOwner } from "../middlewares/ownerStrategy.js";
import {
	getParticularBlog,
	updateLikeOfParticularBlog,
	editParticularBlog,
	deleteParticularBlog,
	getAllBlogs,
	createNewBlog,
} from "../controllers/blogs.js";

const router = Router();

// Get details of a particular blog
router.get("/:blogId", getParticularBlog);

// Like/Dislike a particular blog
router.patch("/:blogId/like", authProtection, updateLikeOfParticularBlog);

// Edit details of an existing blog
router.patch(
	"/:blogId",
	[authProtection, isAdmin, isBlogOwner],
	editParticularBlog
);

// Delete an existing blog
router.delete(
	"/:blogId",
	[authProtection, isAdmin, isBlogOwner],
	deleteParticularBlog
);

// Fetch all blogs
router.get("/", getAllBlogs);

// Create a brand new blog
router.put("/", [authProtection, isAdmin], createNewBlog);

export default router;
