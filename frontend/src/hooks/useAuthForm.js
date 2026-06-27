import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useAuth from "./useAuth";

const useAuthForm = () => {
  const navigate = useNavigate();

  const {
    login,
    register,
  } = useAuth();

  const [loading, setLoading] = useState(false);

  const loginUser = async (data) => {
    try {
      setLoading(true);

      await login(data);

      toast.success("Login Successful");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (data) => {
    try {
      setLoading(true);

      await register(data);

      toast.success(
        "Registration Successful"
      );

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    loginUser,
    registerUser,
  };
};

export default useAuthForm;