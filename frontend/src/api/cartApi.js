import api from "./axios";

const mapCartPayload = (cartData) => ({
  product: cartData.product || cartData.productId,
  quantity: cartData.quantity,
});

export const getCart = async () => {
  const response = await api.get("/cart");

  return response.data;
};

export const addToCart = async (cartData) => {
  const response = await api.post(
    "/cart",
    mapCartPayload(cartData)
  );

  return response.data;
};

export const updateCart = async (cartData) => {
  const response = await api.put(
    "/cart",
    mapCartPayload(cartData)
  );

  return response.data;
};

export const updateCartItem = updateCart;

export const removeCartItem = async (productId) => {
  const response = await api.delete(
    `/cart/${productId}`
  );

  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete("/cart");

  return response.data;
};
