import api from "./axios";

/**
 * ============================
 * Get All Users
 * GET /users
 * ============================
 */
export const getUsers = async (params = {}) => {
  const response = await api.get("/users", {
    params,
  });

  return response.data;
};

/**
 * ============================
 * Get User By ID
 * GET /users/:id
 * ============================
 */
export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);

  return response.data;
};

/**
 * ============================
 * Update User
 * PUT /users/:id
 * ============================
 */
export const updateUser = async (id, data) => {
  const response = await api.put(
    `/users/${id}`,
    data
  );

  return response.data;
};

/**
 * ============================
 * Delete User
 * DELETE /users/:id
 * ============================
 */
export const deleteUser = async (id) => {
  const response = await api.delete(
    `/users/${id}`
  );

  return response.data;
};

/**
 * ============================
 * Verify Farmer
 * PATCH /users/:id/verify
 * ============================
 */
export const verifyFarmer = async (id) => {
  const response = await api.patch(
    `/users/${id}/verify`
  );

  return response.data;
};