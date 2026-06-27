import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
} from "../controllers/notification.controller.js";

const router = Router();

// All Notification APIs require login
router.use(protect);

// Get Notifications
router.get("/", getNotifications);

// Unread Count
router.get("/unread-count", getUnreadCount);

// Mark All Read
router.patch("/read-all", markAllAsRead);

// Mark Single Read
router.patch("/:id/read", markAsRead);

// Delete Notification
router.delete("/:id", deleteNotification);

export default router;