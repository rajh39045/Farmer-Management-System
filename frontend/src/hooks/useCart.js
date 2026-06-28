import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider"
    );
  }

  // Listen for cart-updated event to refresh cart data
  useEffect(() => {
    const handleCartUpdate = () => {
      context.fetchCart();
    };

    window.addEventListener("cart-updated", handleCartUpdate);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, [context]);

  return context;
};

export default useCart;
