const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getUsers, getUserById } = require("../controllers/userController");

const router = express.Router();

// User management routes
router.get("/", protect, adminOnly, getUsers); // Get all users (Admin only
router.get("/:id", protect, getUserById); // Get a secific user by ID

module.exports = router;
