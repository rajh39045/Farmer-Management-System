import api from "./axios";

/**
 * ===============================
 * Register User
 * POST /api/v1/auth/register
 * ===============================
 */
export const registerUser = async (userData) => {
  const response = await api.post(
    "/auth/register",
    userData
  );

  return response.data;
};

/**
 * ===============================
 * Login User
 * POST /api/v1/auth/login
 * ===============================
 */
export const loginUser = async (credentials) => {
  const response = await api.post(
    "/auth/login",
    credentials
  );

  return response.data;
};

/**
 * ===============================
 * Logout User
 * POST /api/v1/auth/logout
 * ===============================
 */
export const logoutUser = async () => {
  const response = await api.post(
    "/auth/logout"
  );

  return response.data;
};

/**
 * ===============================
 * Get Logged-in User
 * GET /api/v1/auth/me
 * ===============================
 */
export const getMe = async () => {
  const response = await api.get(
    "/auth/me"
  );

  return response.data;
};

/**
 * ===============================
 * Forgot Password
 * POST /api/v1/auth/forgot-password
 * ===============================
 */
export const forgotPassword = async (data) => {
  const response = await api.post(
    "/auth/forgot-password",
    data
  );

  return response.data;
};

/**
 * ===============================
 * Reset Password
 * POST /api/v1/auth/reset-password/:token
 * ===============================
 */
export const resetPassword = async (
  token,
  data
) => {
  const response = await api.post(
    `/auth/reset-password/${token}`,
    data
  );

  return response.data;
};

/**
 * ===============================
 * Update Profile
 * PUT /api/v1/auth/profile
 * ===============================
 */
export const updateProfile = async (profileData) => {
  const response = await api.put(
    "/auth/profile",
    profileData
  );

  return response.data;
};

/**
 * ===============================
 * Change Password
 * PUT /api/v1/auth/change-password
 * ===============================
 */
export const changePassword = async (passwordData) => {
  const response = await api.put(
    "/auth/change-password",
    passwordData
  );

  return response.data;
};

/**
 * ===============================
 * Upload Profile Image
 * PUT /api/v1/auth/profile-image
 * ===============================
 */
export const uploadProfileImage = async (
  formData
) => {
  const response = await api.put(
    "/auth/profile-image",
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
 * Delete Account
 * DELETE /api/v1/auth/delete-account
 * ===============================
 */
export const deleteAccount = async () => {
  const response = await api.delete(
    "/auth/delete-account"
  );

  return response.data;
};