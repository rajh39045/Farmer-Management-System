import notificationService from "../services/notification.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

// Get Notifications
export const getNotifications = asyncHandler(async (req, res) => {
  const notifications =
    await notificationService.getNotifications(req.user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Notifications fetched successfully.",
      notifications
    )
  );
});

// Mark Notification as Read
export const markAsRead = asyncHandler(async (req, res) => {
  const notification =
    await notificationService.markAsRead(
      req.params.id,
      req.user._id
    );

  res.status(200).json(
    new ApiResponse(
      200,
      "Notification marked as read.",
      notification
    )
  );
});

// Mark All Notifications as Read
export const markAllAsRead = asyncHandler(async (req, res) => {
  await notificationService.markAllAsRead(req.user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      "All notifications marked as read."
    )
  );
});

// Delete Notification
export const deleteNotification = asyncHandler(async (req, res) => {
  await notificationService.deleteNotification(
    req.params.id,
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Notification deleted successfully."
    )
  );
});

// Get Unread Count
export const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await notificationService.unreadCount(
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Unread notification count fetched successfully.",
      { unreadCount: count }
    )
  );
});