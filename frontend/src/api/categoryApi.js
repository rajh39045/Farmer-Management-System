import api from "./axios";

const buildCategoryPayload = (categoryData) => {
  if (categoryData instanceof FormData) {
    return categoryData;
  }

  const formData = new FormData();
  formData.append("name", categoryData.name);
  formData.append("slug", categoryData.slug);

  if (categoryData.description) {
    formData.append("description", categoryData.description);
  }

  if (categoryData.image instanceof File) {
    formData.append("image", categoryData.image);
  }

  return formData;
};

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
 * ===============================
 */
export const createCategory = async (categoryData) => {
  const response = await api.post(
    "/categories",
    buildCategoryPayload(categoryData)
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
export const updateCategory = async (id, categoryData) => {
  const response = await api.put(
    `/categories/${id}`,
    buildCategoryPayload(categoryData)
  );

  return response.data;
};

/**
 * ===============================
 * Delete Category
 * DELETE /categories/:id
 * ===============================
 */
export const deleteCategory = async (id) => {
  const response = await api.delete(
    `/categories/${id}`
  );

  return response.data;
};
