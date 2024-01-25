import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { ROLE } from "../lib/roles";

export const ProtectRoutes = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to='/login' exact />;
};

export const NavigateByRole = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.auth);

  return currentUser?.user?.role?.roleName == ROLE.TEACHER ? (
    <Navigate to='/t' state={{ from: location }} replace />
  ) : currentUser?.user?.role?.roleName == ROLE.STUDENT ? (
    <Navigate to='/s' state={{ from: location }} replace />
  ) : (
    <Navigate to='/404' state={{ from: location }} replace />
  );
};

export const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.auth);

  return allowedRoles?.includes(currentUser?.user?.role?.roleName) ? (
    <Outlet />
  ) : (
    <Navigate to='/404' state={{ from: location }} replace />
  );
};

export const AuthenticatedRoutes = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  return !token ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
};

// export const UnverifiedUserRoutes = () => {
//   const location = useLocation();
//   const { unverifiedUser } = useAuth();
//   return unverifiedUser ? (
//     <Outlet />
//   ) : (
//     <Navigate to='/' state={{ from: location }} replace />
//   );
// };
