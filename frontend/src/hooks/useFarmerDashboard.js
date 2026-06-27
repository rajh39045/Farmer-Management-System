import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { getMyProducts } from "../api/productApi";
import { getOrders } from "../api/orderApi";

const useFarmerDashboard = () => {
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);

      const [productsRes, ordersRes] = await Promise.all([
        getMyProducts(),
        getOrders({ role: "farmer" }),
      ]);

      setProducts(productsRes.products || []);
      setOrders(ordersRes.orders || []);
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

  const totalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.status === "Delivered")
      .reduce((sum, order) => sum + order.totalAmount, 0);
  }, [orders]);

  const pendingOrders = useMemo(() => {
    return orders.filter(
      (o) => o.status === "Pending"
    ).length;
  }, [orders]);

  return {
    loading,
    products,
    orders,
    totalRevenue,
    pendingOrders,
    refreshDashboard: fetchDashboard,
  };
};

export default useFarmerDashboard;