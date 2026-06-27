import api from "./axios";

export const getAdminDashboard = async () => {
  const response = await api.get(
    "/admin/dashboard"
  );

  return response.data;
};

export const getPendingFarmers = async () => {
  const response = await api.get(
    "/admin/farmers/pending"
  );

  return response.data;
};

export const verifyFarmer = async (
  farmerId,
  status = "Approved"
) => {
  const response = await api.patch(
    `/admin/farmers/${farmerId}/verify`,
    { status }
  );

  return response.data;
};
