import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getCart, clearCart } from "../api/cartApi";
import { placeOrder } from "../api/orderApi";

const initialAddress = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  landmark: "",
};

const useCheckout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState(initialAddress);

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [loading, setLoading] = useState(true);

  const [placingOrder, setPlacingOrder] =
    useState(false);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getCart();

      setCartItems(
        response?.cart?.items || []
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load checkout."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) =>
        sum +
        item.product.price *
          item.quantity,
      0
    );
  }, [cartItems]);

  const deliveryCharge =
    subtotal >= 500 || subtotal === 0
      ? 0
      : 50;

  const discount = 0;

  const total =
    subtotal +
    deliveryCharge -
    discount;

  const updateAddress = (
    field,
    value
  ) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submitOrder = async () => {
    if (!address.fullName)
      return toast.error(
        "Full name required."
      );

    if (!address.phone)
      return toast.error(
        "Phone required."
      );

    if (!address.address)
      return toast.error(
        "Address required."
      );

    try {
      setPlacingOrder(true);

      const payload = {
        shippingAddress: address,
        deliverySlot: "Morning (9 AM - 12 PM)",
        paymentMethod,
      };

      await placeOrder(payload);

      toast.success("Order placed successfully.");

      await clearCart();

      navigate("/orders");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to place order."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  return {
    loading,

    cartItems,

    address,

    updateAddress,

    paymentMethod,

    setPaymentMethod,

    subtotal,

    deliveryCharge,

    discount,

    total,

    placingOrder,

    submitOrder,
  };
};

export default useCheckout;
