import OrderStatus from "../orders/OrderStatus";

const FarmerOrderCard = ({
  order,
  onStatusChange,
}) => {
  const status = order.orderStatus || order.status;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-xl font-bold">
            Order #{order._id.slice(-6)}
          </h2>

          <p className="text-gray-500 mt-2">
            Customer : {order.customer?.fullName || order.customer?.name}
          </p>

        </div>

        <OrderStatus
          status={status}
        />

      </div>

      <div className="mt-6 space-y-3">

        {order.items.map((item) => (
          <div
            key={item._id || item.product?._id || item.name}
            className="flex justify-between"
          >
            <span>
              {item.name || item.product?.name}
            </span>

            <span>
              {item.quantity} × ₹
              {item.price}
            </span>

          </div>

        ))}

      </div>

      <div className="mt-8 flex flex-wrap gap-3">

        <button
          onClick={() =>
            onStatusChange(
              order._id,
              "Accepted"
            )
          }
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Accept
        </button>

        <button
          onClick={() =>
            onStatusChange(
              order._id,
              "Preparing"
            )
          }
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
        >
          Preparing
        </button>

        <button
          onClick={() =>
            onStatusChange(
              order._id,
              "Out for Delivery"
            )
          }
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
        >
          Out for Delivery
        </button>

        <button
          onClick={() =>
            onStatusChange(
              order._id,
              "Delivered"
            )
          }
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Delivered
        </button>

      </div>

    </div>
  );
};

export default FarmerOrderCard;
