import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

const defaultSettings = {
  darkMode: false,
  emailNotifications: true,
  pushNotifications: true,
  language: "English",
};

class SettingsService {
  async getSettings(userId) {
    const user = await User.findById(userId).select("settings");

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    return {
      settings: {
        ...defaultSettings,
        ...user.settings,
      },
    };
  }

  async updateSettings(userId, settingsData) {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    user.settings = {
      ...defaultSettings,
      ...user.settings,
      ...settingsData,
    };

    await user.save({ validateBeforeSave: false });

    return { settings: user.settings };
  }
}

export default new SettingsService();
