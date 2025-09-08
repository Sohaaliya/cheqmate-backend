// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ onLogout }) {
  const activeClass = "bg-blue-600 text-white rounded px-2 py-1";
  const normalClass = "text-white hover:bg-blue-500 rounded px-2 py-1";

  return (
    <div className="w-56 bg-gray-800 text-white min-h-screen p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      {/* Student links */}
      <NavLink to="/student" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
        Student Dashboard
      </NavLink>
      <NavLink to="/exam" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
        Online Exam
      </NavLink>

      {/* Admin links */}
      <div className="mt-4">
        <div className="font-semibold mb-2">Admin</div>

        <NavLink
          to="/admin"
          end
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          Admin Dashboard
        </NavLink>

        {/* Sub-items indented */}
        <div className="ml-4 flex flex-col gap-1 mt-1">
          <NavLink
            to="/admin/user-management"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            User Management
          </NavLink>
          <NavLink
            to="/admin/analytics"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            Analytics
          </NavLink>
          <NavLink
            to="/admin/logs"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            Logs
          </NavLink>
        </div>
      </div>

      {/* Live Proctoring */}
      <NavLink
        to="/live-proctoring"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Live Proctoring
      </NavLink>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="mt-auto bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}
