import { Router } from "express";
import { registerNewUser, loginUser } from "../controllers/authentication.js";

const router = Router();

// User registration route
router.put("/register", registerNewUser);

// User login route
router.post("/login", loginUser);

export default router;
