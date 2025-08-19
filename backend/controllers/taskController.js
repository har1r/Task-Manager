const Task = require("../models/Task");

// @Desc Get all tasks (admin: All, user: assigned)
// @Route GET /api/tasks
// @Access Private
const getTask = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};

    if (status) {
      filter.status = status;
    }

    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find(filter).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    } else {
      tasks = await Task.find({
        ...filter,
        assignedTo: req.user._id,
      }).populate("assignedTo", "name email profileImageUrl");
    }

    // Add completed todochecklist count to each task
    tasks = tasks.map((task) => {
      const completedCount = task.todoChecklist.filter(
        (item) => item.completed
      ).length;
      return {
        ...task._doc,
        completedTodoCount: completedCount,
      };
    });

    // Status summary counts
    const allTasks = await Task.countDocuments(
      req.user.role === "admin" ? {} : { assignedTo: req.user._id }
    );

    const pendingTasks = await Task.countDocuments({
      ...filter,
      status: "Pending",
      ...(req.user.role === "admin" ? {} : { assignedTo: req.user._id }),
    });

    const inProgressTasks = await Task.countDocuments({
      ...filter,
      status: "In Progress",
      ...(req.user.role === "admin" ? {} : { assignedTo: req.user._id }),
    });

    const completedTasks = await Task.countDocuments({
      ...filter,
      status: "Completed",
      ...(req.user.role === "admin" ? {} : { assignedTo: req.user._id }),
    });

    res.json({
      tasks,
      summary: {
        all: allTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @Desc Get task by ID
// @Route GET /api/tasks/:id
// @Access Private
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImageUrl"
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @Desc Create a new task
// @Route POST /api/tasks
// @Access Private
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      attachments,
      todoChecklist,
    } = req.body;

    if (!Array.isArray(assignedTo)) {
      return res
        .status(400)
        .json({ message: "assignedTo must be an array of user Ids" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user._id,
      todoChecklist,
      attachments,
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @Desc Update a task by ID
// @Route PUT /api/tasks/:id
// @Access Private
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
    task.attachments = req.body.attachments || task.attachments;

    if (req.body.assignedTo) {
      if (!Array.isArray(req.body.assignedTo)) {
        return res
          .status(400)
          .json({ message: "assignedTo must be an array of user Ids" });
      }
      task.assignedTo = req.body.assignedTo;
    }

    const updatedTask = await task.save();
    res.json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @Desc Delete a task by ID
// @Route DELETE /api/tasks/:id
// @Access Private (Admin Only)
const deleteTask = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @Desc Update task status by ID
// @Route PUT /api/tasks/:id/status
// @Access Private
const updateTaskStatus = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @Desc Update task checklist by ID
// @Route PUT /api/tasks/:id/todo
// @Access Private
const updateTaskChecklist = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @Desc Get dashboard data (Admin)
// @Route GET /api/tasks/dashboard-data
// @Access Private (Admin Only)
const getDashboardData = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @Desc Get user dashboard data (user-specific)
// @Route GET /api/tasks/user-dashboard-data
// @Access Private (User Only)
const getUserDashboardData = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getTask,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
  getDashboardData,
  getUserDashboardData,
};
