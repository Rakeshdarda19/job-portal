import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./pages/App.jsx";
import Jobs from "./pages/Jobs.jsx";
import JobDetail from "./pages/JobDetail.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PostJob from "./pages/PostJob.jsx";
import Applications from "./pages/Applications.jsx";
import { AuthProvider } from "./lib/auth.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
  </AuthProvider>
);
