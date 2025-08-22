export const BASE_URL = "http://localhost:8000";

//utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", // Register a new user (Admin or Member)
    LOGIN: "/api/auth/login", // Authentication user & return JWT token
    GET_PROFILE: "/api/auth/profile", // Get user profile
  },
  USERS: {
    GET_ALL: "/api/users", // Get all users
    GET_USER_BY_ID: (userId) => `/api/users/${userId}`, // Get user by ID
    CREATE_USER: "/api/users", // Create a new user (Admin only)
    UPDATE_USER: (userId) => `/api/users/${userId}`, // Update user by ID
    DELETE_USER: (userId) => `/api/users/${userId}`, // Delete user by ID
  },
  TASK: {
    GET_DASHBOARD_DATA: "/api/task/dashboard-data", // Get dashboard data
    GET_USER_DASHBOARD_DATA: "/api/task/user-dashboard-data", // Get user dashboard data
    GET_ALL_TASKS: "/api/task", // Get all tasks
    GET_TASK_BY_ID: (taskId) => `/api/task/${taskId}`, // Get task by ID
    CREATE_TASK: "/api/task", // Create a new task  (admin only)
    UPDATE_TASK: (taskId) => `/api/task/${taskId}`, // Update task by ID
    DELETE_TASK: (taskId) => `/api/task/${taskId}`, // Delete task by ID (admin only)
  },
  REPORTS: {
    EXPORT_TASKS: "/api/reports/export/tasks", // Export tasks to CSV
    EXPORT_USERS: "/api/reports/export/users", // Export users to CSV
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image", // Upload image
  },
};
