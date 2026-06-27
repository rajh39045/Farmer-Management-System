import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getUsers,
  verifyFarmer,
} from "../api/userApi";

const useVerifyFarmers = () => {
  const [loading, setLoading] =
    useState(true);

  const [farmers, setFarmers] =
    useState([]);

  const fetchFarmers =
    useCallback(async () => {
      try {
        setLoading(true);

        const response =
          await getUsers({
            role: "farmer",
          });

        setFarmers(
          response.users || []
        );
      } catch (error) {
        toast.error(
          "Unable to load farmers."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchFarmers();
  }, [fetchFarmers]);

  const verify = async (id) => {
    try {
      await verifyFarmer(id);

      toast.success(
        "Farmer verified."
      );

      fetchFarmers();
    } catch (error) {
      toast.error(
        "Verification failed."
      );
    }
  };

  return {
    loading,
    farmers,
    verify,
  };
};

export default useVerifyFarmers;