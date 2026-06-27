import { Link } from "react-router-dom";

import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";

import OrderStatus from "./OrderStatus";

const OrderCard = ({
  order,
  onCancel,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="flex justify-between flex-wrap gap-4">

        <div>

          <h2 className="font-bold text-xl">
            Order #{order._id.slice(-6)}
          </h2>

          <p className="text-gray-500 mt-2">
            {new Date(
              order.createdAt
            ).toLocaleDateString()}
          </p>

        </div>

        <OrderStatus
          status={order.status}
        />

      </div>

      <div className="mt-6 space-y-3">

        {order.items.map((item) => (

          <div
            key={item.product._id}
            className="flex justify-between"
          >
            <span>
              {item.product.name}
            </span>

            <span>
              {item.quantity} × ₹
              {item.price}
            </span>

          </div>

        ))}

      </div>

      <div className="mt-6 flex justify-between items-center">

        <h3 className="text-2xl font-bold text-green-600">
          ₹{order.totalAmount}
        </h3>

        <div className="flex gap-3">

          <SecondaryButton
            as={Link}
            to={`/orders/${order._id}`}
          >
            View
          </SecondaryButton>

          {order.status === "Pending" && (
            <PrimaryButton
              onClick={() =>
                onCancel(order._id)
              }
            >
              Cancel
            </PrimaryButton>
          )}

        </div>

      </div>

    </div>
  );
};

export default OrderCard;