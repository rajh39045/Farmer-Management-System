import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

import {
  FaShoppingCart,
  FaHeart,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
} from "../../utils/icons";

const NavActions = () => {
  const navigate = useNavigate();

  const { user, logout, isAuthenticated } = useAuth();

  const { cart } = useCart();

  const { wishlist } = useWishlist();

  const handleNotifications = () => {
    if (isAuthenticated) {
      navigate("/notifications");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="hidden lg:flex items-center gap-3">

      {/* Wishlist */}

      <Link to="/wishlist">
        <motion.div
          whileHover={{
            scale: 1.08,
            y: -2,
          }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          <FaHeart
            className="
              text-2xl
              text-gray-700
              hover:text-red-500
              transition
            "
          />

          {wishlist?.length > 0 && (
            <span
              className="
                absolute
                -top-2
                -right-2
                w-5
                h-5
                rounded-full
                bg-red-500
                text-white
                text-xs
                flex
                items-center
                justify-center
              "
            >
              {wishlist.length}
            </span>
          )}
        </motion.div>
      </Link>

      {/* Cart */}

      <Link to="/cart">
        <motion.div
          whileHover={{
            scale: 1.08,
            y: -2,
          }}
          whileTap={{ scale: 0.9 }}
          className="relative"
        >
          <FaShoppingCart
            className="
              text-2xl
              text-gray-700
              hover:text-green-600
              transition
            "
          />

          {cart?.length > 0 && (
            <span
              className="
                absolute
                -top-2
                -right-2
                w-5
                h-5
                rounded-full
                bg-green-600
                text-white
                text-xs
                flex
                items-center
                justify-center
              "
            >
              {cart.length}
            </span>
          )}
        </motion.div>
      </Link>

      {/* Notification */}

      <motion.div
        whileHover={{
          scale: 1.08,
          rotate: 10,
        }}
        className="cursor-pointer"
        onClick={handleNotifications}
      >
        <FaBell
          className="
            text-2xl
            text-gray-700
            hover:text-yellow-500
            transition
          "
        />
      </motion.div>

      {/* User */}

      {isAuthenticated ? (
        <div className="flex items-center gap-3">

          <Link
            to="/dashboard"
            className="
              flex
              items-center
              gap-2
              hover:text-green-600
              transition
            "
          >
            <FaUserCircle className="text-3xl" />

            <span className="font-medium">
              {user?.name || "Profile"}
            </span>
          </Link>

          <button
            onClick={logout}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-lg
              bg-red-500
              text-white
              hover:bg-red-600
              transition
            "
          >
            <FaSignOutAlt />

            Logout
          </button>

        </div>
      ) : (
        <Link
          to="/login"
          className="
            px-5
            py-2
            rounded-full
            bg-green-600
            text-white
            hover:bg-green-700
            transition
            font-medium
          "
        >
          Login
        </Link>
      )}

    </div>
  );
};

export default NavActions;