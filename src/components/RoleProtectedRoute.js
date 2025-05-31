import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RoleProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // ✅ from backend login

  if (!token) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default RoleProtectedRoute;
