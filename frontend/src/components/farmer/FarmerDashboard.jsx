import {
  FaBox,
  FaShoppingBasket,
  FaRupeeSign,
  FaClock,
} from "../../utils/icons";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import DashboardCard from "../../components/farmer/DashboardCard";

import useFarmerDashboard from "../../hooks/useFarmerDashboard";

const FarmerDashboard = () => {
  const {
    loading,
    products,
    orders,
    totalRevenue,
    pendingOrders,
  } = useFarmerDashboard();

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        text="Loading Dashboard..."
      />
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold">
          Farmer Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage products, orders and earnings.
        </p>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-10">

          <DashboardCard
            title="Products"
            value={products.length}
            icon={<FaBox />}
            color="bg-green-500"
          />

          <DashboardCard
            title="Orders"
            value={orders.length}
            icon={<FaShoppingBasket />}
            color="bg-blue-500"
          />

          <DashboardCard
            title="Revenue"
            value={`₹${totalRevenue}`}
            icon={<FaRupeeSign />}
            color="bg-yellow-500"
          />

          <DashboardCard
            title="Pending"
            value={pendingOrders}
            icon={<FaClock />}
            color="bg-red-500"
          />

        </div>

      </div>

    </section>
  );
};

export default FarmerDashboard;