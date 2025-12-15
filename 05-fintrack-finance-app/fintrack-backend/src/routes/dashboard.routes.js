// src/routes/dashboard.routes.js

import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import {
  addEntry,
  getEntries,
  updateEntry,
  deleteEntry,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

/**
 * @route   GET /api/dashboard
 * @desc    Returns dashboard welcome with user info
 * @access  Protected (requires JWT)
 */
router.get("/", authenticateToken, (req, res) => {
  res.json({
    message: "Welcome to your dashboard!",
    user: req.user,
  });
});

/**
 * @route   POST /api/dashboard/entry
 * @desc    Adds a new income or expense entry
 * @access  Protected
 */
router.post("/entry", authenticateToken, addEntry);

/**
 * @route   GET /api/dashboard/entries
 * @desc    Get all entries for the logged-in user
 * @access  Protected
 */
router.get("/entries", authenticateToken, getEntries);

/**
 * @route   PUT /api/dashboard/entry/:id
 * @desc    Update a specific income/expense entry
 * @access  Protected
 */
router.put("/entry/:id", authenticateToken, updateEntry);

/**
 * @route   DELETE /api/dashboard/entry/:id
 * @desc    Delete a specific income/expense entry
 * @access  Protected
 */
router.delete("/entry/:id", authenticateToken, deleteEntry);

export default router;
