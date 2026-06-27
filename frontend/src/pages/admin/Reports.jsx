import {
  FaUsers,
  FaShoppingCart,
  FaBox,
  FaRupeeSign,
} from "../../utils/icons";

import useAdminDashboard from "../../hooks/useAdminDashboard";

import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Reports = () => {
  const {
    loading,
    users,
    products,
    orders,
    totalRevenue,
  } = useAdminDashboard();

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        text="Loading Reports..."
      />
    );
  }

  const delivered = orders.filter(
    (o) => o.status === "Delivered"
  ).length;

  const pending = orders.filter(
    (o) => o.status === "Pending"
  ).length;

  return (
    <section className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-10">
          Reports
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
              Platform Statistics
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">
                <span>
                  <FaUsers className="inline mr-2" />
                  Users
                </span>

                <strong>{users.length}</strong>
              </div>

              <div className="flex justify-between">
                <span>
                  <FaBox className="inline mr-2" />
                  Products
                </span>

                <strong>{products.length}</strong>
              </div>

              <div className="flex justify-between">
                <span>
                  <FaShoppingCart className="inline mr-2" />
                  Orders
                </span>

                <strong>{orders.length}</strong>
              </div>

              <div className="flex justify-between">
                <span>
                  Delivered
                </span>

                <strong>{delivered}</strong>
              </div>

              <div className="flex justify-between">
                <span>
                  Pending
                </span>

                <strong>{pending}</strong>
              </div>

              <div className="flex justify-between text-xl font-bold text-green-600">

                <span>
                  <FaRupeeSign className="inline mr-2" />
                  Revenue
                </span>

                <span>
                  ₹{totalRevenue}
                </span>

              </div>

            </div>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
              Quick Summary
            </h2>

            <ul className="space-y-4 text-gray-600">

              <li>
                ✔ Total Registered Users : {users.length}
              </li>

              <li>
                ✔ Active Products : {products.length}
              </li>

              <li>
                ✔ Orders Received : {orders.length}
              </li>

              <li>
                ✔ Successfully Delivered : {delivered}
              </li>

              <li>
                ✔ Pending Deliveries : {pending}
              </li>

              <li>
                ✔ Revenue Generated : ₹{totalRevenue}
              </li>

            </ul>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Reports;