import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirectPath = "/" }) => {
  const isAuth = localStorage.getItem("isAuthenticated") === "true";
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default ProtectedRoute;
