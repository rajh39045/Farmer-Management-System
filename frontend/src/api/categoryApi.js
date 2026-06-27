import api from "./axios";

/**
 * ===============================
 * Get All Categories
 * GET /categories
 * ===============================
 */
export const getAllCategories = async () => {
  const response = await api.get("/categories");

  return response.data;
};

/**
 * ===============================
 * Get Category By ID
 * GET /categories/:id
 * ===============================
 */
export const getCategoryById = async (id) => {
  const response = await api.get(`/categories/${id}`);

  return response.data;
};

/**
 * ===============================
 * Create Category
 * POST /categories
 * (Admin Only)
 * ===============================
 */
export const createCategory = async (categoryData) => {
  const response = await api.post(
    "/categories",
    categoryData
  );

  return response.data;
};

/**
 * ===============================
 * Update Category
 * PUT /categories/:id
 * (Admin Only)
 * ===============================
 */
export const updateCategory = async (
  id,
  categoryData
) => {
  const response = await api.put(
    `/categories/${id}`,
    categoryData
  );

  return response.data;
};

/**
 * ===============================
 * Delete Category
 * DELETE /categories/:id
 * (Admin Only)
 * ===============================
 */
export const deleteCategory = async (id) => {
  const response = await api.delete(
    `/categories/${id}`
  );

  return response.data;
};