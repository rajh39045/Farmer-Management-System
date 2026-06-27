import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getFarmerOrders,
  updateOrderStatus,
} from "../api/orderApi";

const useFarmerOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getFarmerOrders();

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

  const changeStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, {
        status,
      });

      toast.success("Order updated successfully.");

      fetchOrders();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update order."
      );
    }
  };

  return {
    loading,
    orders,
    changeStatus,
    refreshOrders: fetchOrders,
  };
};

export default useFarmerOrders;
