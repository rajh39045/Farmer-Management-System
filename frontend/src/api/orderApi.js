import api from "./axios";

export const getOrders = async (params = {}) => {
  if (params.role === "farmer") {
    const response = await api.get("/orders/farmer-orders");
    return response.data;
  }

  if (params.role === "admin") {
    const response = await api.get("/orders");
    return response.data;
  }

  const response = await api.get("/orders/my-orders");
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);

  return response.data;
};

export const placeOrder = async (orderData) => {
  const response = await api.post(
    "/orders",
    orderData
  );

  return response.data;
};

export const updateOrderStatus = async (
  id,
  statusData
) => {
  const response = await api.patch(
    `/orders/${id}/status`,
    {
      orderStatus: statusData.orderStatus || statusData.status,
    }
  );

  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await api.patch(
    `/orders/${id}/cancel`
  );

  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await api.delete(
    `/orders/${id}`
  );

  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get(
    "/orders/my-orders"
  );

  return response.data;
};

export const getFarmerOrders = async () => {
  const response = await api.get(
    "/orders/farmer-orders"
  );

  return response.data;
};
