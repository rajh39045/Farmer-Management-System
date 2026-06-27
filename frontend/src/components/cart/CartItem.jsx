import { motion } from "framer-motion";
import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaHeart,
} from "../../utils/icons";

import GlassCard from "../ui/GlassCard";

const CartItem = ({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  moveToWishlist,
}) => {
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.01 }}
    >
      <GlassCard>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <img
            src={item.product.images?.[0]?.url}
            alt={item.product.name}
            className="w-32 h-32 rounded-xl object-cover"
          />

          {/* Product Info */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold">
              {item.product.name}
            </h2>

            <p className="text-gray-500 mt-2">
              ₹{item.product.price} / {item.product.unit}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-3 mt-6">

              <button
                onClick={() =>
                  decreaseQuantity(item.product._id)
                }
                className="w-10 h-10 rounded-lg border flex items-center justify-center"
              >
                <FaMinus />
              </button>

              <span className="font-semibold text-lg">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  increaseQuantity(item.product._id)
                }
                className="w-10 h-10 rounded-lg border flex items-center justify-center"
              >
                <FaPlus />
              </button>

            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 justify-between">

            <button
              onClick={() =>
                removeItem(item.product._id)
              }
              className="flex items-center gap-2 text-red-500 hover:text-red-600"
            >
              <FaTrash />
              Remove
            </button>

            <button
              onClick={() =>
                moveToWishlist(item.product._id)
              }
              className="flex items-center gap-2 text-green-600 hover:text-green-700"
            >
              <FaHeart />
              Wishlist
            </button>

            <h3 className="text-2xl font-bold text-green-600">
              ₹
              {item.product.price *
                item.quantity}
            </h3>

          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default CartItem;