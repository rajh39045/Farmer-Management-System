import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

import {
  FaTimes,
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaSignOutAlt,
} from "../../utils/icons";

const navItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Products",
    path: "/products",
  },
  {
    name: "Categories",
    path: "/categories",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const MobileMenu = ({ isOpen, onClose }) => {
  const menuRef = useRef(null);

  const { user, logout, isAuthenticated } = useAuth();

  const { cart } = useCart();

  const { wishlist } = useWishlist();

  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        {
          x: "-100%",
        },
        {
          x: 0,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Drawer */}

          <div
            ref={menuRef}
            className="
              fixed
              top-0
              left-0
              h-screen
              w-80
              bg-white
              shadow-2xl
              z-50
              flex
              flex-col
            "
          >
            {/* Header */}

            <div className="flex items-center justify-between p-5 border-b">

              <h2 className="text-2xl font-bold text-green-600">
                Krishi Market
              </h2>

              <button onClick={onClose}>
                <FaTimes className="text-2xl" />
              </button>

            </div>

            {/* Search */}

            <div className="p-5">

              <div className="relative">

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type="text"
                  placeholder="Search..."
                  className="
                    w-full
                    rounded-full
                    border
                    pl-11
                    pr-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-green-500
                  "
                />

              </div>

            </div>

            {/* Navigation */}

            <nav className="flex-1 px-5">

              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block py-4 border-b transition ${
                      isActive
                        ? "text-green-600 font-semibold"
                        : "text-gray-700 hover:text-green-600"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

            </nav>

            {/* Bottom */}

            <div className="border-t p-5 space-y-5">

              {/* Cart & Wishlist */}

              <div className="flex justify-around">

                <Link
                  to="/wishlist"
                  onClick={onClose}
                  className="relative"
                >
                  <FaHeart className="text-2xl text-red-500" />

                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                <Link
                  to="/cart"
                  onClick={onClose}
                  className="relative"
                >
                  <FaShoppingCart className="text-2xl text-green-600" />

                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>

              </div>

              {/* User */}

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={onClose}
                    className="flex items-center gap-3"
                  >
                    <FaUserCircle className="text-3xl text-green-600" />

                    <span className="font-medium">
                      {user?.name || "Profile"}
                    </span>
                  </Link>

                  <button
                    onClick={logout}
                    className="
                      w-full
                      py-3
                      rounded-lg
                      bg-red-500
                      text-white
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <FaSignOutAlt />

                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={onClose}
                  className="
                    block
                    w-full
                    text-center
                    py-3
                    rounded-lg
                    bg-green-600
                    text-white
                    font-semibold
                  "
                >
                  Login
                </Link>
              )}

            </div>

          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;