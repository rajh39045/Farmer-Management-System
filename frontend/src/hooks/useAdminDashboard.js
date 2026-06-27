import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { getUsers } from "../api/userApi";
import { getOrders } from "../api/orderApi";
import { getAllProducts } from "../api/productApi";

const useAdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);

      const [
        usersRes,
        ordersRes,
        productsRes,
      ] = await Promise.all([
        getUsers(),
        getOrders(),
        getAllProducts(),
      ]);

      setUsers(usersRes.users || []);
      setOrders(ordersRes.orders || []);
      setProducts(productsRes.products || []);
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
      .filter(order => order.status === "Delivered")
      .reduce(
        (sum, order) => sum + order.totalAmount,
        0
      );
  }, [orders]);

  const pendingFarmers = useMemo(() => {
    return users.filter(
      user =>
        user.role === "farmer" &&
        !user.isVerified
    ).length;
  }, [users]);

  return {
    loading,
    users,
    orders,
    products,
    totalRevenue,
    pendingFarmers,
    refreshDashboard: fetchDashboard,
  };
};

export default useAdminDashboard;