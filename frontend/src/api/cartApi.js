import api from "./axios";

/**
 * ===============================
 * Get Customer Cart
 * GET /cart
 * ===============================
 */
export const getCart = async () => {
  const response = await api.get("/cart");

  return response.data;
};

/**
 * ===============================
 * Add Product To Cart
 * POST /cart
 * ===============================
 */
export const addToCart = async (cartData) => {
  const response = await api.post(
    "/cart",
    cartData
  );

  return response.data;
};

/**
 * ===============================
 * Update Cart Item Quantity
 * PUT /cart
 * ===============================
 */
export const updateCart = async (cartData) => {
  const response = await api.put(
    "/cart",
    cartData
  );

  return response.data;
};

/**
 * ===============================
 * Remove Product From Cart
 * DELETE /cart/:productId
 * ===============================
 */
export const removeCartItem = async (productId) => {
  const response = await api.delete(
    `/cart/${productId}`
  );

  return response.data;
};

/**
 * ===============================
 * Clear Complete Cart
 * DELETE /cart
 * ===============================
 */
export const clearCart = async () => {
  const response = await api.delete("/cart");

  return response.data;
};