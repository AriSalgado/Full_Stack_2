import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol"); 

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && rol !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}