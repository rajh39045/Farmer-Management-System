import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../api/authApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);

        setUser(decoded);
      } catch (error) {
        console.error(error);

        localStorage.removeItem("token");

        setToken(null);

        setUser(null);
      }
    }

    setLoading(false);
  }, [token]);

  const login = async (credentials) => {
    const data = await loginUser(credentials);

    localStorage.setItem("token", data.token);

    setToken(data.token);

    setUser(jwtDecode(data.token));

    return data;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);

    return data;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("token");

    setToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
