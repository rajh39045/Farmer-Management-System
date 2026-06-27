import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getMe } from "../api/authApi";
import { getMyOrders } from "../api/orderApi";
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
          getMyOrders(),
          getWishlist(),
          getCart(),
        ]);

        setUser(userRes.user);

        const visibleOrders = (ordersRes.orders || []).filter(
          (order) => order.orderStatus !== "Cancelled"
        );

        setOrders(visibleOrders);

        setWishlistCount(
          wishlistRes?.wishlist?.products?.length || 0
        );

        setCartCount(
          cartRes?.cart?.items?.length || 0
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

    const handleRefresh = () => {
      fetchDashboard();
    };

    window.addEventListener(
      "customer-dashboard-refresh",
      handleRefresh
    );

    return () => {
      window.removeEventListener(
        "customer-dashboard-refresh",
        handleRefresh
      );
    };
  }, [fetchDashboard]);

  const totalSpent = orders.reduce(
    (sum, order) => {
      if (order.orderStatus === "Delivered") {
        return sum + (order.totalAmount || 0);
      }

      return sum;
    },
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
