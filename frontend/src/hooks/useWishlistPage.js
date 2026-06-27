import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import {
  getWishlist,
  removeWishlistItem,
} from "../api/wishlistApi";

import {
  addToCart,
} from "../api/cartApi";

const useWishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetch Wishlist
   */
  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getWishlist();

      setWishlistItems(
        response.wishlist?.items || []
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

  /**
   * Remove Item
   */
  const removeItem = async (productId) => {
    try {
      await removeWishlistItem(productId);

      toast.success("Removed from wishlist.");

      fetchWishlist();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to remove product."
      );
    }
  };

  /**
   * Move To Cart
   */
  const moveToCart = async (productId) => {
    try {
      await addToCart({
        productId,
        quantity: 1,
      });

      await removeWishlistItem(productId);

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

  /**
   * Total Wishlist Items
   */
  const totalItems = useMemo(
    () => wishlistItems.length,
    [wishlistItems]
  );

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