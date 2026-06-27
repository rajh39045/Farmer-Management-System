import api from "./axios";

export const registerUser = async (userData) => {
  const payload = {
    ...userData,
    fullName: userData.fullName || userData.name,
    role: userData.role || "customer",
  };

  delete payload.name;
  delete payload.confirmPassword;

  const response = await api.post(
    "/auth/register",
    payload
  );

  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post(
    "/auth/login",
    credentials
  );

  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post(
    "/auth/logout"
  );

  return response.data;
};

export const getMe = async () => {
  const response = await api.get(
    "/auth/me"
  );

  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await api.post(
    "/auth/forgot-password",
    data
  );

  return response.data;
};

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

export const updateProfile = async (profileData) => {
  const payload = {
    ...profileData,
    fullName: profileData.fullName || profileData.name,
  };

  delete payload.name;

  const response = await api.put(
    "/auth/profile",
    payload
  );

  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await api.put(
    "/auth/change-password",
    passwordData
  );

  return response.data;
};

export const uploadProfileImage = async (
  formData
) => {
  const response = await api.put(
    "/auth/profile-image",
    formData
  );

  return response.data;
};

export const deleteAccount = async () => {
  const response = await api.delete(
    "/auth/delete-account"
  );

  return response.data;
};
