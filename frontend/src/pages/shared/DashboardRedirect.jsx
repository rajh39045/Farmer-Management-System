import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const DashboardRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="h-12 w-12 rounded-full border-4 border-green-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const dashboardPath =
    user.role === "farmer"
      ? "/farmer/dashboard"
      : user.role === "admin"
        ? "/admin/dashboard"
        : "/customer/dashboard";

  return <Navigate to={dashboardPath} replace />;
};

export default DashboardRedirect;
