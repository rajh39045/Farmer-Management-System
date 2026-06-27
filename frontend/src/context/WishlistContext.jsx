import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../api/wishlistApi";

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const [loading, setLoading] = useState(false);

  /**
   * Fetch Wishlist
   */
  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const data = await getWishlist();

      setWishlist(data.wishlist || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add Product
   */
  const addProduct = async (productData) => {
    try {
      setLoading(true);

      const data = await addToWishlist(productData);

      setWishlist(data.wishlist || []);

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

  /**
   * Remove Product
   */
  const removeProduct = async (productId) => {
    try {
      setLoading(true);

      const data = await removeFromWishlist(productId);

      setWishlist(data.wishlist || []);

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
  }, []);

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