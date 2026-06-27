import {
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaRupeeSign,
  FaUserCheck,
} from "../../utils/icons";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import AdminStatCard from "../../components/admin/AdminStatCard";

import useAdminDashboard from "../../hooks/useAdminDashboard";

const AdminDashboard = () => {
  const {
    loading,
    stats,
    totalRevenue,
    pendingFarmers,
  } = useAdminDashboard();

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 mt-2">
            Platform overview and analytics.
          </p>
          <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-6 mt-10">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-8 bg-gray-200 rounded w-3/4 mt-4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Platform overview and analytics.
        </p>

        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-6 mt-10">

          <AdminStatCard
            title="Users"
            value={stats?.totalUsers || 0}
            icon={<FaUsers />}
            color="bg-blue-500"
          />

          <AdminStatCard
            title="Products"
            value={stats?.totalProducts || 0}
            icon={<FaBox />}
            color="bg-green-500"
          />

          <AdminStatCard
            title="Orders"
            value={stats?.totalOrders || 0}
            icon={<FaShoppingCart />}
            color="bg-purple-500"
          />

          <AdminStatCard
            title="Revenue"
            value={`₹${totalRevenue}`}
            icon={<FaRupeeSign />}
            color="bg-yellow-500"
          />

          <AdminStatCard
            title="Verify Farmers"
            value={pendingFarmers}
            icon={<FaUserCheck />}
            color="bg-red-500"
          />

        </div>

      </div>

    </section>
  );
};

export default AdminDashboard;
