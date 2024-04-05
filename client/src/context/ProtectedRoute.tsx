import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from ".";

export const ProtectedRoute = () => {
  const { token } = useAuth();
  return token ? <Outlet/> : <Navigate to="/login" />;
};
