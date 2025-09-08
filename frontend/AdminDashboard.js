// src/pages/AdminDashboard.js
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Admin navigation */}
      <nav className="flex flex-col gap-2 mb-6">
        <Link to="user-management" className="text-blue-600 hover:underline">
          User Management
        </Link>
        <Link to="logs" className="text-blue-600 hover:underline">
          Logs
        </Link>
        <Link to="analytics" className="text-blue-600 hover:underline">
          Analytics
        </Link>
      </nav>

      {/* Nested route renders here */}
      <div>
        <Outlet />
      </div>
    </div>
  );
}
