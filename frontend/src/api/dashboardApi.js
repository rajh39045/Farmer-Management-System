import api from "./axios";

/**
 * Farmer Dashboard Summary
 */
export const getFarmerDashboard = async () => {
  const response = await api.get(
    "/dashboard/farmer"
  );

  return response.data;
};

/**
 * Monthly Revenue
 */
export const getMonthlyRevenue = async () => {
  const response = await api.get(
    "/dashboard/farmer/revenue"
  );

  return response.data;
};

/**
 * Monthly Orders
 */
export const getMonthlyOrders = async () => {
  const response = await api.get(
    "/dashboard/farmer/orders"
  );

  return response.data;
};

/**
 * Top Selling Products
 */
export const getTopSellingProducts = async () => {
  const response = await api.get(
    "/dashboard/farmer/top-products"
  );

  return response.data;
};

/**
 * Order Status Statistics
 */
export const getOrderStatusStats = async () => {
  const response = await api.get(
    "/dashboard/farmer/order-status"
  );

  return response.data;
};

/**
 * Customer Dashboard
 */
export const getCustomerDashboard = async () => {
  const response = await api.get(
    "/customer-dashboard"
  );

  return response.data;
};