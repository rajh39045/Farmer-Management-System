import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getWishlist,
  removeFromWishlist,
} from "../api/wishlistApi";

import {
  addToCart,
} from "../api/cartApi";

const useWishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getWishlist();

      const products =
        response?.wishlist?.products || [];

      setWishlistItems(
        products.map((product) => ({
          product,
        }))
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load wishlist."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const removeItem = async (productId) => {
    try {
      await removeFromWishlist(productId);

      toast.success("Removed from wishlist.");

      fetchWishlist();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to remove product."
      );
    }
  };

  const moveToCart = async (productId) => {
    try {
      await addToCart({
        productId,
        quantity: 1,
      });

      await removeFromWishlist(productId);

      toast.success(
        "Product moved to cart."
      );

      fetchWishlist();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to move product."
      );
    }
  };

  const totalItems = wishlistItems.length;

  return {
    loading,

    wishlistItems,

    totalItems,

    removeItem,

    moveToCart,

    refreshWishlist: fetchWishlist,
  };
};

export default useWishlistPage;
