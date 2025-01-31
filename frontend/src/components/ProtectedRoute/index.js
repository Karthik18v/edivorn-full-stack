import { Navigate, Outlet } from "react-router-dom";
import Cookie from "js-cookie";

const ProtectedRoute = () => {
  const token = Cookie.get("jwtToken");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
