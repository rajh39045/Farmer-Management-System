import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../api/wishlistApi";

import useAuth from "../hooks/useAuth";

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  const [wishlist, setWishlist] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    if (!isAuthenticated || user?.role !== "customer") {
      setWishlist([]);
      return;
    }

    try {
      setLoading(true);

      const data = await getWishlist();

      setWishlist(data?.wishlist?.products || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      setLoading(true);

      const data = await addToWishlist(productData);

      setWishlist(data?.wishlist?.products || []);

      toast.success("Added to wishlist");

      return data;
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to add product"
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (productId) => {
    try {
      setLoading(true);

      const data = await removeFromWishlist(productId);

      setWishlist(data?.wishlist?.products || []);

      toast.success("Removed from wishlist");

      return data;
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to remove product"
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isAuthenticated]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        fetchWishlist,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
