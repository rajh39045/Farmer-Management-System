import api from "./axios";

/**
 * ===============================
 * Get All Products
 * GET /products
 * ===============================
 */
export const getAllProducts = async (params = {}) => {
  const response = await api.get("/products", {
    params,
  });

  return response.data;
};

/**
 * ===============================
 * Get Product By ID
 * GET /products/:id
 * ===============================
 */
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};

/**
 * ===============================
 * Get Logged-in Farmer Products
 * GET /products/my/products
 * ===============================
 */
export const getMyProducts = async () => {
  const response = await api.get(
    "/products/my/products"
  );

  return response.data;
};

/**
 * ===============================
 * Create Product
 * POST /products
 * ===============================
 */
export const createProduct = async (formData) => {
  const response = await api.post(
    "/products",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

/**
 * ===============================
 * Update Product
 * PUT /products/:id
 * ===============================
 */
export const updateProduct = async (
  id,
  formData
) => {
  const response = await api.put(
    `/products/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

/**
 * ===============================
 * Delete Product
 * DELETE /products/:id
 * ===============================
 */
export const deleteProduct = async (id) => {
  const response = await api.delete(
    `/products/${id}`
  );

  return response.data;
};

/**
 * ===============================
 * Search Products
 * GET /products?search=
 * ===============================
 */
export const searchProducts = async (search) => {
  const response = await api.get("/products", {
    params: {
      search,
    },
  });

  return response.data;
};

/**
 * ===============================
 * Get Products By Category
 * GET /products?category=
 * ===============================
 */
export const getProductsByCategory = async (
  category
) => {
  const response = await api.get("/products", {
    params: {
      category,
    },
  });

  return response.data;
};

/**
 * ===============================
 * Get Featured Products
 * GET /products?featured=true
 * ===============================
 */
export const getFeaturedProducts = async () => {
  const response = await api.get("/products", {
    params: {
      featured: true,
    },
  });

  return response.data;
};