import api from "./axios";

/**
 * ===========================================
 * Get All Notifications
 * GET /notifications
 * ===========================================
 */
export const getNotifications = async (params = {}) => {
  const response = await api.get("/notifications", {
    params,
  });

  return response.data;
};

/**
 * ===========================================
 * Get Unread Notification Count
 * GET /notifications/unread-count
 * ===========================================
 */
export const getUnreadCount = async () => {
  const response = await api.get(
    "/notifications/unread-count"
  );

  return response.data;
};

/**
 * ===========================================
 * Mark All Notifications As Read
 * PATCH /notifications/read-all
 * ===========================================
 */
export const markAllAsRead = async () => {
  const response = await api.patch(
    "/notifications/read-all"
  );

  return response.data;
};

/**
 * ===========================================
 * Mark Single Notification As Read
 * PATCH /notifications/:id/read
 * ===========================================
 */
export const markAsRead = async (id) => {
  const response = await api.patch(
    `/notifications/${id}/read`
  );

  return response.data;
};

/**
 * ===========================================
 * Delete Notification
 * DELETE /notifications/:id
 * ===========================================
 */
export const deleteNotification = async (id) => {
  const response = await api.delete(
    `/notifications/${id}`
  );

  return response.data;
};