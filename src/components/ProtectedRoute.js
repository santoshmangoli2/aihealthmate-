import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const role = localStorage.getItem("role");

  if (!isLoggedIn) return <Navigate to="/login/patient" />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" />;

  return children;
}

export default ProtectedRoute;
