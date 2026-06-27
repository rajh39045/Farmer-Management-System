import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getOrders,
  cancelOrder,
} from "../api/orderApi";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getOrders();

      setOrders(response.orders || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load orders."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId);

      toast.success("Order cancelled.");

      fetchOrders();
      window.dispatchEvent(new Event("customer-dashboard-refresh"));
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to cancel order."
      );
    }
  };

  return {
    loading,
    orders,
    handleCancelOrder,
    refreshOrders: fetchOrders,
  };
};

export default useOrders;