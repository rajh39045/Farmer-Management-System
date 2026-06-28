import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaEye,
} from "react-icons/fa";

import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";
import SafeImage from "../common/SafeImage";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
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

  const handleNavigate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/products/${product._id}`);
  };

  const rating = product.averageRating || 4.8;
  const reviewCount = product.reviewCount || 0;

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
        rounded-2xl
        overflow-hidden
        shadow-lg
        hover:shadow-2xl
        transition-all
        duration-300
        border
        border-gray-100
        hover:border-green-200
        flex
        flex-col
        h-full
      "
    >
      {/* Image */}

      <div className="relative aspect-square overflow-hidden" onClick={handleNavigate} style={{ cursor: 'pointer' }}>

        <SafeImage
          src={product.images?.[0]?.url}
          alt={product.name}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            hover:scale-105
          "
        />

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleWishlist();
          }}
          className="
            absolute
            top-3
            right-3
            w-10
            h-10
            rounded-full
            bg-white/90
            backdrop-blur-sm
            shadow-md
            flex
            items-center
            justify-center
            text-gray-600
            hover:text-red-500
            hover:bg-red-50
            transition-all
            duration-200
          "
          aria-label="Add to wishlist"
        >
          <FaHeart className="text-lg" />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isOrganic && (
            <span className="px-2.5 py-1 rounded-full bg-green-600 text-white text-xs font-medium shadow-lg">
              Organic
            </span>
          )}
          {product.discount && product.discount > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-red-500 text-white text-xs font-medium shadow-lg">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-full bg-blue-500 text-white text-xs font-medium shadow-lg">
              New
            </span>
          )}
        </div>

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleNavigate}
            className="px-6 py-3 rounded-xl bg-white text-green-700 font-semibold shadow-xl transform hover:scale-105 transition-transform"
          >
            <FaEye className="w-5 h-5 inline mr-2" />
            Quick View
          </button>
        </div>

      </div>

      {/* Body */}

      <div className="p-4 sm:p-5 flex-1 flex flex-col">

        {/* Category/Origin */}
        {product.category && (
          <span className="text-xs text-green-600 font-medium uppercase tracking-wide">
            {product.category.name || product.category}
          </span>
        )}

        <h3 className="text-base sm:text-lg font-semibold line-clamp-1 mt-1 text-gray-900">
          {product.name}
        </h3>

        <p className="text-gray-500 mt-1.5 line-clamp-2 text-sm">
          {product.description}
        </p>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mt-3">
          <FaStar className="text-yellow-400 text-lg" />
          <span className="font-semibold text-gray-900">{rating}</span>
          {reviewCount > 0 && (
            <span className="text-gray-500 text-sm">({reviewCount})</span>
          )}
          {product.farmer && (
            <span className="ml-auto text-xs text-gray-400 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {typeof product.farmer === 'object' ? (product.farmer.name || product.farmer.fullName || product.farmer.username || 'Farmer') : product.farmer}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mt-2 flex items-center gap-2">
          {product.quantity !== undefined && product.quantity !== null ? (
            product.quantity > 0 ? (
              <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                In Stock ({product.quantity} left)
              </span>
            ) : (
              <span className="flex items-center gap-1 text-sm text-red-600 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Out of Stock
              </span>
            )
          ) : (
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Stock info unavailable
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-baseline gap-2">
            {product.discount && product.discount > 0 ? (
              <>
                <p className="text-2xl font-bold text-green-600">
                  ₹{product.price}
                </p>
                <p className="text-lg text-gray-400 line-through">
                  ₹{Math.round(product.price / (1 - product.discount / 100))}
                </p>
              </>
            ) : (
              <p className="text-2xl font-bold text-green-600">
                ₹{product.price}
              </p>
            )}
            {product.unit && (
              <span className="text-sm text-gray-500">
                / {product.unit}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="
              ml-auto
              w-11
              h-11
              rounded-xl
              bg-gradient-to-r
              from-green-600
              to-emerald-600
              text-white
              flex
              items-center
              justify-center
              hover:from-green-700
              hover:to-emerald-700
              hover:shadow-lg
              transition-all
              duration-200
              shadow-md
            "
            aria-label="Add to cart"
          >
            <FaShoppingCart className="text-lg" />
          </button>
        </div>

        {/* View Button */}
        <button
          onClick={handleNavigate}
          className="
            block
            w-full
            mt-4
            text-center
            py-3
            rounded-xl
            bg-gradient-to-r
            from-green-600
            to-emerald-500
            text-white
            font-semibold
            hover:shadow-lg
            hover:from-green-700
            hover:to-emerald-600
            transition-all
            duration-200
          "
        >
          View Details
        </button>

      </div>
    </motion.div>
  );
};

export default ProductCard;
