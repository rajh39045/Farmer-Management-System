import api from "./axios";

/**
 * ===========================================
 * Get Wishlist
 * GET /wishlist
 * ===========================================
 */
export const getWishlist = async () => {
  const response = await api.get("/wishlist");

  return response.data;
};

/**
 * ===========================================
 * Add Product To Wishlist
 * POST /wishlist
 * ===========================================
 */
export const addToWishlist = async (wishlistData) => {
  const response = await api.post(
    "/wishlist",
    wishlistData
  );

  return response.data;
};

/**
 * ===========================================
 * Remove Product From Wishlist
 * DELETE /wishlist/:productId
 * ===========================================
 */
export const removeFromWishlist = async (productId) => {
  const response = await api.delete(
    `/wishlist/${productId}`
  );

  return response.data;
};