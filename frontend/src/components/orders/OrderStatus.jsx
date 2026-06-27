const colors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-blue-100 text-blue-700",
  Packed: "bg-purple-100 text-purple-700",
  Shipped: "bg-indigo-100 text-indigo-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const OrderStatus = ({ status }) => {
  return (
    <span
      className={`
        px-4
        py-2
        rounded-full
        text-sm
        font-semibold
        ${
          colors[status] ||
          "bg-gray-100 text-gray-700"
        }
      `}
    >
      {status}
    </span>
  );
};

export default OrderStatus;