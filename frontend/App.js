// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

// Pages
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LiveProctoring from "./pages/LiveProctoring";
import OnlineExam from "./pages/OnlineExam";
import Login from "./pages/Login";

// Admin Sub-Pages
import UserManagement from "./pages/admin/UserManagement";
import Analytics from "./pages/admin/Analytics";
import Logs from "./pages/admin/Logs";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <div className="flex min-h-screen">
      {isLoggedIn && <Sidebar onLogout={handleLogout} />}

      <div className="flex-1 p-6">
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Login */}
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/student" /> : <Login onLogin={handleLogin} />}
          />

          {/* Protected Routes */}
          {isLoggedIn && (
            <>
              {/* Student routes */}
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/exam" element={<OnlineExam />} />

              {/* Admin routes with nested children */}
              <Route path="/admin" element={<AdminDashboard />}>
                <Route index element={<UserManagement />} /> {/* default */}
                <Route path="user-management" element={<UserManagement />} />
                <Route path="logs" element={<Logs />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>

              {/* Live Proctoring */}
              <Route path="/live-proctoring" element={<LiveProctoring />} />
            </>
          )}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
