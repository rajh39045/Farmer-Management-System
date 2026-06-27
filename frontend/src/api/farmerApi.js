import api from "./axios";

/**
 * ===========================================
 * Create Farmer Profile
 * POST /farmers/profile
 * ===========================================
 */
export const createFarmerProfile = async (profileData) => {
  const response = await api.post(
    "/farmers/profile",
    profileData
  );

  return response.data;
};

/**
 * ===========================================
 * Get Farmer Profile
 * GET /farmers/profile
 * ===========================================
 */
export const getFarmerProfile = async () => {
  const response = await api.get(
    "/farmers/profile"
  );

  return response.data;
};