import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RoleRoute = ({ role }) => {
  const { user, loading } = useAuth();

  // Wait until authentication is resolved
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="h-12 w-12 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // Safety check
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check user role
  if (user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;