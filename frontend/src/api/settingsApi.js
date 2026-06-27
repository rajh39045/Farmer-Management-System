import api from "./axios";

/**
 * ===============================
 * Get User Settings
 * GET /settings
 * ===============================
 */
export const getSettings = async () => {
  const response = await api.get("/settings");

  return response.data;
};

/**
 * ===============================
 * Update User Settings
 * PUT /settings
 * ===============================
 */
export const updateSettings = async (data) => {
  const response = await api.put(
    "/settings",
    data
  );

  return response.data;
};