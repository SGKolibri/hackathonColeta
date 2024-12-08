import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
