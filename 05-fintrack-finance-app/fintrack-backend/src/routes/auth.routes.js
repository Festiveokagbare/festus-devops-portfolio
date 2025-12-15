// src/routes/auth.routes.js
import express from "express";
import {
  register,
  login,
  getMe, // ✅ This must match your export name in auth.controller.js
} from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route to get currently logged-in user
router.get("/me", authenticateToken, getMe);

export default router;
