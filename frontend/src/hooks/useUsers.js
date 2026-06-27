import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getUsers,
  deleteUser,
} from "../api/userApi";

const useUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getUsers();

      setUsers(response.users || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to fetch users."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const removeUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);

      toast.success("User deleted.");

      fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete user."
      );
    }
  };

  return {
    loading,
    users,
    removeUser,
    refreshUsers: fetchUsers,
  };
};

export default useUsers;