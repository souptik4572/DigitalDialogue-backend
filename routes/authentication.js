import { Router } from "express";
import { registerNewUser, loginUser } from "../controllers/authentication.js";
import { validateRegister } from "../middlewares/validateRegister.js";

const router = Router();

// User registration route
router.put("/register", validateRegister, registerNewUser);

// User login route
router.post("/login", loginUser);

export default router;
