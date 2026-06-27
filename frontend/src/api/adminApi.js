import api from "./axios";

/**
 * ===========================================
 * Admin Dashboard
 * ===========================================
 */
export const getAdminDashboard = async () => {
  const response = await api.get(
    "/admin/dashboard"
  );

  return response.data;
};

/**
 * ===========================================
 * Get Pending Farmers
 * ===========================================
 */
export const getPendingFarmers = async () => {
  const response = await api.get(
    "/admin/farmers/pending"
  );

  return response.data;
};

/**
 * ===========================================
 * Verify Farmer
 * ===========================================
 */
export const verifyFarmer = async (farmerId) => {
  const response = await api.patch(
    `/admin/farmers/${farmerId}/verify`
  );

  return response.data;
};