import Notification from "../models/Notification.js";

class NotificationService {
  // Create Notification
  async createNotification(data) {
    return await Notification.create(data);
  }

  // Get User Notifications
  async getNotifications(userId) {
    return await Notification.find({
      recipient: userId,
    })
      .populate("sender", "fullName")
      .sort({
        createdAt: -1,
      });
  }

  // Mark One Notification Read
  async markAsRead(id, userId) {
    const notification =
      await Notification.findOne({
        _id: id,
        recipient: userId,
      });

    if (!notification) {
      throw new Error(
        "Notification not found."
      );
    }

    notification.isRead = true;

    await notification.save();

    return notification;
  }

  // Mark All Notifications Read
  async markAllAsRead(userId) {
    await Notification.updateMany(
      {
        recipient: userId,
        isRead: false,
      },
      {
        isRead: true,
      }
    );
  }

  // Delete Notification
  async deleteNotification(id, userId) {
    await Notification.findOneAndDelete({
      _id: id,
      recipient: userId,
    });
  }

  // Unread Count
  async unreadCount(userId) {
    return await Notification.countDocuments({
      recipient: userId,
      isRead: false,
    });
  }
}

export default new NotificationService();