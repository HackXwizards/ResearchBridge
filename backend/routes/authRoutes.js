import express from "express";
import { signup, login, getUserProfile } from "../controllers/auth.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile",auth, getUserProfile);
// Note: Logout is handled on client side by removing the token

export default router;