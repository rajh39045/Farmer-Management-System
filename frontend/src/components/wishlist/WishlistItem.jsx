import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import GlassCard from "../ui/GlassCard";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";

import {
  FaHeart,
  FaTrash,
  FaShoppingCart,
  FaEye,
} from "../../utils/icons";

const WishlistItem = ({
  item,
  removeItem,
  moveToCart,
}) => {
  const {
    product,
  } = item;

  const image =
    product?.images?.[0]?.url ||
    "https://via.placeholder.com/300";

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <GlassCard>

        <div className="flex flex-col md:flex-row gap-6">

          {/* Product Image */}

          <Link
            to={`/products/${product._id}`}
          >
            <img
              src={image}
              alt={product.name}
              className="
                w-40
                h-40
                rounded-xl
                object-cover
              "
            />
          </Link>

          {/* Product Details */}

          <div className="flex-1">

            <Link
              to={`/products/${product._id}`}
            >
              <h2 className="text-2xl font-semibold hover:text-green-600 transition">
                {product.name}
              </h2>
            </Link>

            <p className="mt-2 text-gray-500">
              {product.category?.name}
            </p>

            <h3 className="mt-4 text-3xl font-bold text-green-600">
              ₹{product.price}
            </h3>

            <div className="mt-6 flex flex-wrap gap-3">

              <PrimaryButton
                icon={<FaShoppingCart />}
                onClick={() =>
                  moveToCart(product._id)
                }
              >
                Move To Cart
              </PrimaryButton>

              <SecondaryButton
                icon={<FaEye />}
                as={Link}
                to={`/products/${product._id}`}
              >
                View
              </SecondaryButton>

            </div>

          </div>

          {/* Right Side */}

          <div className="flex flex-col justify-between items-end">

            <button
              onClick={() =>
                removeItem(product._id)
              }
              className="
                text-red-500
                hover:text-red-600
                text-xl
              "
            >
              <FaTrash />
            </button>

            <FaHeart
              className="
                text-4xl
                text-red-500
              "
            />

          </div>

        </div>

      </GlassCard>
    </motion.div>
  );
};

export default WishlistItem;