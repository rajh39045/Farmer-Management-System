import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getCart,
  addToCart,
  updateCart,
  removeCartItem,
  clearCart,
} from "../api/cartApi";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(false);

  // ============================
  // Fetch Cart
  // ============================

  const fetchCart = async () => {
    try {
      setLoading(true);

      const data = await getCart();

      setCart(data.cart || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Add To Cart
  // ============================

  const addItemToCart = async (cartData) => {
    try {
      setLoading(true);

      const data = await addToCart(cartData);

      setCart(data.cart || []);

      toast.success("Product added to cart");

      return data;
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to add product"
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Update Quantity
  // ============================

  const updateItemQuantity = async (cartData) => {
    try {
      setLoading(true);

      const data = await updateCart(cartData);

      setCart(data.cart || []);

      toast.success("Cart updated");

      return data;
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update cart"
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Remove Item
  // ============================

  const removeItem = async (productId) => {
    try {
      setLoading(true);

      const data = await removeCartItem(productId);

      setCart(data.cart || []);

      toast.success("Item removed");

      return data;
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to remove item"
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Clear Cart
  // ============================

  const emptyCart = async () => {
    try {
      setLoading(true);

      const data = await clearCart();

      setCart([]);

      toast.success("Cart cleared");

      return data;
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to clear cart"
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addItemToCart,
        updateItemQuantity,
        removeItem,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;