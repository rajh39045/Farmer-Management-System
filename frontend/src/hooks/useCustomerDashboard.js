import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getMe } from "../api/authApi";
import { getOrders } from "../api/orderApi";
import { getWishlist } from "../api/wishlistApi";
import { getCart } from "../api/cartApi";

const useCustomerDashboard = () => {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  const [orders, setOrders] = useState([]);

  const [wishlistCount, setWishlistCount] =
    useState(0);

  const [cartCount, setCartCount] =
    useState(0);

  const fetchDashboard =
    useCallback(async () => {
      try {
        setLoading(true);

        const [
          userRes,
          ordersRes,
          wishlistRes,
          cartRes,
        ] = await Promise.all([
          getMe(),
          getOrders(),
          getWishlist(),
          getCart(),
        ]);

        setUser(userRes.user);

        setOrders(ordersRes.orders || []);

        setWishlistCount(
          wishlistRes.wishlist?.items
            ?.length || 0
        );

        setCartCount(
          cartRes.cart?.items?.length || 0
        );
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Unable to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const totalSpent = orders.reduce(
    (sum, order) =>
      sum + (order.totalAmount || 0),
    0
  );

  return {
    loading,

    user,

    orders,

    cartCount,

    wishlistCount,

    totalSpent,

    refreshDashboard:
      fetchDashboard,
  };
};

export default useCustomerDashboard;