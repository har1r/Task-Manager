const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  exportTasksReport,
  exportUserReport,
} = require("../controllers/reportController");

const router = express.Router();

router.get("/export/tasks", protect, adminOnly, exportTasksReport); // Export all tasks to Excel
router.get("/export/users", protect, adminOnly, exportUserReport); // Export user-task report to Excel

module.exports = router;
