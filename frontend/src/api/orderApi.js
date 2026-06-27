import api from "./axios";

/**
 * ===============================
 * Get All Orders
 * GET /orders
 * ===============================
 */
export const getOrders = async (params = {}) => {
  const response = await api.get("/orders", {
    params,
  });

  return response.data;
};

/**
 * ===============================
 * Get Order By ID
 * GET /orders/:id
 * ===============================
 */
export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);

  return response.data;
};

/**
 * ===============================
 * Place New Order
 * POST /orders
 * ===============================
 */
export const placeOrder = async (orderData) => {
  const response = await api.post(
    "/orders",
    orderData
  );

  return response.data;
};

/**
 * ===============================
 * Update Order Status
 * PUT /orders/:id/status
 * (Farmer/Admin)
 * ===============================
 */
export const updateOrderStatus = async (
  id,
  statusData
) => {
  const response = await api.put(
    `/orders/${id}/status`,
    statusData
  );

  return response.data;
};

/**
 * ===============================
 * Cancel Order
 * PATCH /orders/:id/cancel
 * (Customer)
 * ===============================
 */
export const cancelOrder = async (id) => {
  const response = await api.patch(
    `/orders/${id}/cancel`
  );

  return response.data;
};

/**
 * ===============================
 * Delete Order
 * DELETE /orders/:id
 * (Admin)
 * ===============================
 */
export const deleteOrder = async (id) => {
  const response = await api.delete(
    `/orders/${id}`
  );

  return response.data;
};

/**
 * ===============================
 * Get My Orders
 * GET /orders/my
 * (Optional if backend supports)
 * ===============================
 */
export const getMyOrders = async () => {
  const response = await api.get(
    "/orders/my"
  );

  return response.data;
};