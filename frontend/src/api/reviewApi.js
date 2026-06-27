import api from "./axios";

/**
 * ===========================================
 * Get Reviews By Product
 * GET /reviews/product/:productId
 * ===========================================
 */
export const getProductReviews = async (productId) => {
  const response = await api.get(
    `/reviews/product/${productId}`
  );

  return response.data;
};

/**
 * ===========================================
 * Add Review
 * POST /reviews
 * ===========================================
 */
export const addReview = async (reviewData) => {
  const response = await api.post(
    "/reviews",
    reviewData
  );

  return response.data;
};