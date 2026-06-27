import {
  FaShoppingCart,
  FaHeart,
  FaBox,
  FaRupeeSign,
} from "../../utils/icons";

import LoadingSpinner from "../../components/ui/LoadingSpinner";

import StatCard from "../../components/dashboard/StatCard";
import RecentOrders from "../../components/dashboard/RecentOrders";

import useCustomerDashboard from "../../hooks/useCustomerDashboard";

const CustomerDashboard = () => {
  const {
    loading,

    user,

    orders,

    cartCount,

    wishlistCount,

    totalSpent,
  } = useCustomerDashboard();

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
      />
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-10">

      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold">

          Welcome,

          {" "}

          {user?.name}

        </h1>

        <p className="text-gray-500 mt-2">

          Here's your account overview.

        </p>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

          <StatCard
            title="Orders"
            value={orders.length}
            icon={<FaBox />}
            color="bg-blue-500"
          />

          <StatCard
            title="Wishlist"
            value={wishlistCount}
            icon={<FaHeart />}
            color="bg-red-500"
          />

          <StatCard
            title="Cart"
            value={cartCount}
            icon={
              <FaShoppingCart />
            }
            color="bg-green-500"
          />

          <StatCard
            title="Spent"
            value={`₹${totalSpent}`}
            icon={
              <FaRupeeSign />
            }
            color="bg-yellow-500"
          />

        </div>

        <div className="mt-10">

          <RecentOrders
            orders={orders}
          />

        </div>

      </div>

    </section>
  );
};

export default CustomerDashboard;