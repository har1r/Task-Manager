import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";

import UserProvider, { UserContext } from "./context/userContext";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";

import PrivateRoute from "./routes/PrivateRoute";

import Dashboard from "./pages/Admin/Dashboard";
import ManageTasks from "./pages/Admin/ManageTasks";
import CreateTask from "./pages/Admin/CreateTask";
import ManageUsers from "./pages/Admin/ManageUsers";

import UserDashboard from "./pages/User/UserDashboard";
import MyTasks from "./pages/User/MyTasks";
import ViewTaskDetails from "./pages/User/ViewTaskDetails";


const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            {/* Path/rute untuk komponen Login & Signup */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Path/rute untuk komponen-kompenen khusus admin */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/tasks" element={<ManageTasks />} />
              <Route path="/admin/create-task" element={<CreateTask />} />
              <Route path="/admin/users" element={<ManageUsers />} />
            </Route>

            {/* Path/rute untuk komponen-komponen admin dan user*/}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/tasks" element={<MyTasks />} />
              <Route
                path="/user/task-details/:id"
                element={<ViewTaskDetails />}
              />
            </Route>

            {/* Path/rute dasar (masuk awal) */}
            <Route path="/" element={<Root />}/>
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const {user, loading} = useContext(UserContext);

  if (loading) return <Outlet />

  if(!user) {
    return <Navigate to="/login" />
  }

  return user.role === "admin" ? <Navigate to="/admin/dashboard"/> : <Navigate to="/user/dashboard"/>
}