import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../AuthContext";

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();
  console.log(children);
  //   return currentUser ? <Navigate to="/" replace /> : <Outlet />;
  if (currentUser) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
};

export default PublicRoute;
