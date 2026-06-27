import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { getAdminDashboard } from "../api/adminApi";
import { getOrders } from "../api/orderApi";

const normalizeOrders = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === "object") {
    if (Array.isArray(payload.orders)) {
      return payload.orders;
    }

    if (Array.isArray(payload.data)) {
      return payload.data;
    }
  }

  return [];
};

const useAdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingFarmers: 0,
  });
  const [orders, setOrders] = useState([]);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);

      const [statsRes, ordersRes] = await Promise.allSettled([
        getAdminDashboard(),
        getOrders({ role: "admin" }),
      ]);

      if (statsRes.status === "fulfilled") {
        setStats({
          totalUsers: statsRes.value?.totalUsers || 0,
          totalProducts: statsRes.value?.totalProducts || 0,
          totalOrders: statsRes.value?.totalOrders || 0,
          totalRevenue: statsRes.value?.totalRevenue || 0,
          pendingFarmers: statsRes.value?.pendingFarmers || 0,
        });
      }

      if (ordersRes.status === "fulfilled") {
        setOrders(normalizeOrders(ordersRes.value));
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
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
    return stats?.totalRevenue || 0;
  }, [stats]);

  const pendingFarmers = useMemo(() => {
    return stats?.pendingFarmers || 0;
  }, [stats]);

  return {
    loading,
    stats,
    users: [],
    orders,
    products: [],
    totalRevenue,
    pendingFarmers,
    refreshDashboard: fetchDashboard,
  };
};

export default useAdminDashboard;
