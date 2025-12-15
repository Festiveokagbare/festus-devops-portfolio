// src/routes/admin.routes.js
import express from "express";
import { authenticate, isAdmin } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", authenticate, isAdmin, getAllUsers);

export default router;
