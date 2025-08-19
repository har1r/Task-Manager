const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  getDashboardData,
  getUserDashboardData,
  getTask,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
} = require("../controllers/taskController");

const router = express.Router();

// Task Management Controllers
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTask); // Get all tasks (admin: All, user: assigned)
router.get("/:id", protect, getTaskById); // Get task by ID
router.post("/", protect, createTask); // Create a new task
router.put("/:id", protect, updateTask); // Update a task by ID
router.delete("/:id", protect, adminOnly, deleteTask); // Delete a task by ID
router.put("/:id/status", protect, updateTaskStatus); // Update task status by ID
router.put("/:id/todo", protect, updateTaskChecklist); // Update task checklist by ID

module.exports = router;
