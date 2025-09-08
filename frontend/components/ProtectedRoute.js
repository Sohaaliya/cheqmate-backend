import React from "react";
import { Navigate } from "react-router-dom";

/**
 * usage:
 * <ProtectedRoute allowedRoles={['student']}>
 *   <StudentDashboard />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
