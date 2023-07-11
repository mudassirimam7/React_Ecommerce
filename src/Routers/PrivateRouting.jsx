
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const token = sessionStorage.getItem("token");
  const auth = { token: Boolean(token) };
  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes; 