import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import React from "react";

export const ProtectedRoute = ({ children }) => {
  const { value } = useAuth();
  if (!value.token) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default ProtectedRoute;
