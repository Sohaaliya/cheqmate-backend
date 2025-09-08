// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If not logged in → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is given & role is not in it → redirect to dashboard
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={`/${role}`} replace />;
  }

  return children;
};

export default PrivateRoute;
