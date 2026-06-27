import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaShoppingBasket,
  FaRupeeSign,
  FaClock,
  FaArrowRight,
} from "../../utils/icons";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import DashboardCard from "../../components/farmer/DashboardCard";

import useFarmerDashboard from "../../hooks/useFarmerDashboard";

const FarmerDashboard = () => {
  const navigate = useNavigate();

  const {
    loading,
    products,
    orders,
    totalRevenue,
    pendingOrders,
  } = useFarmerDashboard();

  const quickActions = [
    {
      label: "+ Add Product",
      onClick: () => navigate("/farmer/products/add"),
      style: "bg-green-600 text-white",
    },
    {
      label: "My Products",
      onClick: () => navigate("/farmer/products"),
      style: "bg-white text-gray-700 border border-gray-200",
    },
    {
      label: "Orders",
      onClick: () => navigate("/farmer/orders"),
      style: "bg-blue-600 text-white",
    },
    {
      label: "Analytics",
      onClick: () => {
        document
          .getElementById("analytics")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
      style: "bg-amber-500 text-white",
    },
  ];

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
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Farmer Dashboard</h1>
            <p className="text-gray-500 mt-2">
              Manage products, orders, and earnings from one place.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className={`flex items-center justify-between rounded-2xl px-5 py-4 shadow-sm transition hover:-translate-y-1 ${action.style}`}
            >
              <span className="font-semibold">{action.label}</span>
              <FaArrowRight />
            </button>
          ))}
        </div>

        <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-2 gap-6">
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

        <div id="analytics" className="mt-10 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Quick Overview</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Active listings</p>
              <p className="mt-2 text-2xl font-bold">{products.length}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Pending orders</p>
              <p className="mt-2 text-2xl font-bold">{pendingOrders}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Delivered revenue</p>
              <p className="mt-2 text-2xl font-bold">₹{totalRevenue}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmerDashboard;