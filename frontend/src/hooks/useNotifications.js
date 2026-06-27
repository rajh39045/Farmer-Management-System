import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../api/notificationApi";

const useNotifications = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getNotifications();

      setNotifications(response.notifications || []);
    } catch (error) {
      toast.error("Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const readNotification = async (id) => {
    try {
      await markAsRead(id);
      fetchNotifications();
    } catch {
      toast.error("Unable to update notification.");
    }
  };

  const readAll = async () => {
    try {
      await markAllAsRead();
      fetchNotifications();
    } catch {
      toast.error("Unable to update notifications.");
    }
  };

  const removeNotification = async (id) => {
    try {
      await deleteNotification(id);
      fetchNotifications();
    } catch {
      toast.error("Unable to delete notification.");
    }
  };

  return {
    loading,
    notifications,
    readNotification,
    readAll,
    removeNotification,
  };
};

export default useNotifications;