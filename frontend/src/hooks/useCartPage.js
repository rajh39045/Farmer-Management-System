import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "../api/cartApi";

import { addToWishlist } from "../api/wishlistApi";

const useCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getCart();
      const items = response?.cart?.items || response?.items || [];

      setCartItems(items);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load cart."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const increaseQuantity = async (productId) => {
    try {
      const item = cartItems.find(
        (i) => i?.product?._id === productId
      );

      if (!item) return;

      await updateCartItem({
        productId,
        quantity: Number(item?.quantity || 0) + 1,
      });

      fetchCart();
    } catch (error) {
      toast.error("Unable to update quantity.");
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      const item = cartItems.find(
        (i) => i?.product?._id === productId
      );

      if (!item) return;

      if (Number(item?.quantity || 0) === 1) {
        removeItem(productId);
        return;
      }

      await updateCartItem({
        productId,
        quantity: Number(item?.quantity || 0) - 1,
      });

      fetchCart();
    } catch (error) {
      toast.error("Unable to update quantity.");
    }
  };

  const removeItem = async (productId) => {
    try {
      await removeCartItem(productId);

      toast.success("Item removed.");

      fetchCart();
    } catch (error) {
      toast.error("Unable to remove item.");
    }
  };

  const moveToWishlist = async (productId) => {
    try {
      await addToWishlist({
        productId,
      });

      await removeCartItem(productId);

      toast.success("Moved to wishlist.");

      fetchCart();
    } catch (error) {
      toast.error("Unable to move item.");
    }
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(item?.product?.price || 0);
      const quantity = Number(item?.quantity || 0);

      return total + price * quantity;
    }, 0);
  }, [cartItems]);

  const deliveryCharge =
    subtotal > 500 || subtotal === 0
      ? 0
      : 50;

  const discount = 0;

  return {
    loading,

    cartItems,

    subtotal,
    discount,
    deliveryCharge,

    increaseQuantity,
    decreaseQuantity,
    removeItem,
    moveToWishlist,

    refreshCart: fetchCart,
  };
};

export default useCartPage;