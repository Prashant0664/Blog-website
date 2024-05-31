import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function NotAllowedLoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));

  return user ? <Navigate to="/" /> : <Outlet />;
}
