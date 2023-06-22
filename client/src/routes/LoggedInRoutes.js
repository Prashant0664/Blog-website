import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function LoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));

  return user ? <Outlet /> : <Outlet />;
}
