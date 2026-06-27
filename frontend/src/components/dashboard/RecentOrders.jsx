import { Link } from "react-router-dom";

const RecentOrders = ({
  orders,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Recent Orders
        </h2>

        <Link
          to="/orders"
          className="text-green-600"
        >
          View All
        </Link>

      </div>

      {orders
        .slice(0, 5)
        .map((order) => (
          <div
            key={order._id}
            className="py-4 border-b"
          >
            <div className="flex justify-between">

              <h3>
                #
                {order._id.slice(-6)}
              </h3>

              <span>
                ₹
                {order.totalAmount}
              </span>

            </div>

            <p className="text-sm text-gray-500 mt-2">
              {order.status}
            </p>

          </div>
        ))}

    </div>
  );
};

export default RecentOrders;