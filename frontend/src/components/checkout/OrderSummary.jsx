import {
  FaShoppingBag,
  FaTruck,
  FaTag,
} from "../../utils/icons";

const OrderSummary = ({
  cartItems = [],
  subtotal = 0,
  deliveryCharge = 0,
  discount = 0,
  total = 0,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Order Summary
      </h2>

      {/* Products */}

      <div className="space-y-4 max-h-72 overflow-y-auto">

        {cartItems.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center gap-4"
          >
            <img
              src={
                item.product.images?.[0]?.url ||
                "https://via.placeholder.com/80"
              }
              alt={item.product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />

            <div className="flex-1">

              <h3 className="font-semibold line-clamp-1">
                {item.product.name}
              </h3>

              <p className="text-sm text-gray-500">
                Qty : {item.quantity}
              </p>

            </div>

            <span className="font-bold">
              ₹
              {item.product.price *
                item.quantity}
            </span>
          </div>
        ))}

      </div>

      <hr className="my-6" />

      {/* Price Details */}

      <div className="space-y-4">

        <div className="flex justify-between">

          <div className="flex items-center gap-2">
            <FaShoppingBag />
            <span>Subtotal</span>
          </div>

          <span>₹{subtotal}</span>

        </div>

        <div className="flex justify-between">

          <div className="flex items-center gap-2">
            <FaTruck />
            <span>Delivery</span>
          </div>

          <span>
            {deliveryCharge === 0
              ? "FREE"
              : `₹${deliveryCharge}`}
          </span>

        </div>

        <div className="flex justify-between">

          <div className="flex items-center gap-2">
            <FaTag />
            <span>Discount</span>
          </div>

          <span className="text-green-600">
            - ₹{discount}
          </span>

        </div>

      </div>

      <hr className="my-6" />

      {/* Total */}

      <div className="flex justify-between items-center">

        <h3 className="text-xl font-bold">
          Grand Total
        </h3>

        <h3 className="text-2xl font-bold text-green-600">
          ₹{total}
        </h3>

      </div>

      {/* Extra Info */}

      <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-4">

        <p className="text-sm text-green-700">
          ✔ Fresh products directly from verified farmers.
        </p>

        <p className="text-sm text-green-700 mt-2">
          ✔ Secure checkout with Cash on Delivery.
        </p>

        <p className="text-sm text-green-700 mt-2">
          ✔ Free delivery on orders above ₹500.
        </p>

      </div>

    </div>
  );
};

export default OrderSummary;