import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import PrimaryButton from "../../ui/PrimaryButton";
import SecondaryButton from "../../ui/SecondaryButton";

import useCart from "../../../hooks/useCart";
import useWishlist from "../../../hooks/useWishlist";
import useAuth from "../../../hooks/useAuth";

import {
  FaMinus,
  FaPlus,
  FaHeart,
  FaShoppingCart,
  FaBolt,
} from "../../../utils/icons";

const ProductActions = ({ product }) => {
  const navigate = useNavigate();

  const { addItemToCart } = useCart();
  const { addProduct } = useWishlist();
  const { isAuthenticated } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      await addItemToCart({
        productId: product._id,
        quantity,
      });

      toast.success("Added to cart.");
    } catch (error) {
      toast.error("Unable to add product.");
    } finally {
      setLoading(false);
    }
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }

    try {
      await addProduct({
        productId: product._id,
      });

      toast.success("Added to wishlist.");
    } catch (error) {
      toast.error("Unable to add product.");
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/checkout");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Quantity */}

      <div>

        <h3 className="font-semibold mb-3">
          Quantity
        </h3>

        <div
          className="
            flex
            items-center
            w-fit
            rounded-xl
            border
            overflow-hidden
          "
        >
          <button
            onClick={decreaseQuantity}
            className="
              w-12
              h-12
              flex
              items-center
              justify-center
              hover:bg-gray-100
            "
          >
            <FaMinus />
          </button>

          <div
            className="
              w-14
              text-center
              font-bold
            "
          >
            {quantity}
          </div>

          <button
            onClick={increaseQuantity}
            className="
              w-12
              h-12
              flex
              items-center
              justify-center
              hover:bg-gray-100
            "
          >
            <FaPlus />
          </button>

        </div>

      </div>

      {/* Buttons */}

      <div className="grid gap-4">

        <PrimaryButton
          loading={loading}
          icon={<FaShoppingCart />}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          fullWidth
        >
          Add To Cart
        </PrimaryButton>

        <SecondaryButton
          icon={<FaHeart />}
          onClick={handleWishlist}
          fullWidth
        >
          Add To Wishlist
        </SecondaryButton>

        <PrimaryButton
          icon={<FaBolt />}
          onClick={handleBuyNow}
          disabled={product.stock === 0}
          fullWidth
          className="bg-gradient-to-r from-orange-500 to-red-500"
        >
          Buy Now
        </PrimaryButton>

      </div>

      {/* Stock */}

      <div
        className={`
          rounded-xl
          p-4
          text-center
          font-semibold
          ${
            product.stock > 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }
        `}
      >
        {product.stock > 0
          ? `${product.stock} Items Available`
          : "Currently Out of Stock"}
      </div>

    </motion.div>
  );
};

export default ProductActions;