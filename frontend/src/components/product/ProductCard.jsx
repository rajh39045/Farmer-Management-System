import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaHeart,
  FaShoppingCart,
  FaStar,
} from "../../utils/icons";

import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";
import SafeImage from "../common/SafeImage";

const ProductCard = ({ product }) => {
  const { addItemToCart } = useCart();

  const { addProduct } = useWishlist();

  const handleAddToCart = async () => {
    await addItemToCart({
      productId: product._id,
      quantity: 1,
    });
  };

  const handleWishlist = async () => {
    await addProduct({
      productId: product._id,
    });
  };

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-lg
        hover:shadow-2xl
        transition-all
        duration-300
      "
    >
      {/* Image */}

      <Link to={`/products/${product._id}`}>
        <div className="relative">

          <SafeImage
            src={product.images?.[0]?.url}
            alt={product.name}
            className="
              w-full
              h-60
              object-cover
            "
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              handleWishlist();
            }}
            className="
              absolute
              top-4
              right-4
              w-11
              h-11
              rounded-full
              bg-white
              shadow-md
              flex
              items-center
              justify-center
            "
          >
            <FaHeart className="text-red-500" />
          </button>

        </div>
      </Link>

      {/* Body */}

      <div className="p-5">

        <h3 className="text-xl font-semibold line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-500 mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}

        <div className="flex items-center gap-2 mt-4">

          <FaStar className="text-yellow-400" />

          <span>
            {product.averageRating || "4.8"}
          </span>

        </div>

        {/* Price */}

        <div className="mt-5 flex justify-between items-center">

          <div>

            <p className="text-2xl font-bold text-green-600">
              ₹{product.price}
            </p>

            {product.unit && (
              <span className="text-sm text-gray-500">
                / {product.unit}
              </span>
            )}

          </div>

          <button
            onClick={handleAddToCart}
            className="
              w-12
              h-12
              rounded-full
              bg-green-600
              text-white
              flex
              items-center
              justify-center
              hover:bg-green-700
              transition
            "
          >
            <FaShoppingCart />
          </button>

        </div>

        {/* View Button */}

        <Link
          to={`/products/${product._id}`}
          className="
            block
            mt-6
            text-center
            py-3
            rounded-xl
            bg-gradient-to-r
            from-green-600
            to-emerald-500
            text-white
            font-semibold
            hover:shadow-lg
            transition-all
          "
        >
          View Details
        </Link>

      </div>
    </motion.div>
  );
};

export default ProductCard;