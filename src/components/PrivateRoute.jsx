import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};

export default PrivateRoute;
