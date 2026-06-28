import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getCart,
  addToCart,
  updateCart,
  removeCartItem,
  clearCart,
} from "../api/cartApi";

import useAuth from "../hooks/useAuth";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!isAuthenticated || user?.role !== "customer") {
      setCart([]);
      return;
    }

    try {
      setLoading(true);

      const data = await getCart();

      setCart(data?.cart?.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addItemToCart = async (cartData) => {
    try {
      setLoading(true);

      const data = await addToCart(cartData);

      setCart(data?.cart?.items || []);

      toast.success("Product added to cart");

      window.dispatchEvent(new Event("cart-updated"));

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

  const updateItemQuantity = async (cartData) => {
    try {
      setLoading(true);

      const data = await updateCart(cartData);

      setCart(data?.cart?.items || []);

      toast.success("Cart updated");

      window.dispatchEvent(new Event("cart-updated"));

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

  const removeItem = async (productId) => {
    try {
      setLoading(true);

      const data = await removeCartItem(productId);

      setCart(data?.cart?.items || []);

      toast.success("Item removed");

      window.dispatchEvent(new Event("cart-updated"));

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

  const emptyCart = async () => {
    try {
      setLoading(true);

      await clearCart();

      setCart([]);

      toast.success("Cart cleared");
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
  }, [isAuthenticated]);

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
