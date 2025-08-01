import { Router } from "express";

import {
	getAllUsers,
	changeUserDesignation,
	deleteParticularUser,
} from "../controllers/user.js";

const router = Router();

// Get all registered routes for
router.get("/", getAllUsers);

// Update user designation (userType property)
router.patch("/:userId/changedesignation", changeUserDesignation);

// Delete a particular user
router.delete("/:userId", deleteParticularUser);

export default router;
