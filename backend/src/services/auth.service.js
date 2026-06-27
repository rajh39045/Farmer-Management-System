import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import MESSAGES from "../constants/messages.js";
import { generateAccessToken } from "../utils/generateToken.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

class AuthService {
  async register(userData) {
    const { email, phone } = userData;

    if (userData.name && !userData.fullName) {
      userData.fullName = userData.name;
    }

    delete userData.name;

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      throw new ApiError(400, MESSAGES.AUTH.USER_EXISTS);
    }

    const user = await User.create(userData);

    // Don't return sensitive fields
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return createdUser;
  }

  async login(email, password) {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError(401, MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      throw new ApiError(401, MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const token = generateAccessToken(user);

    user.refreshToken = token;
    await user.save({ validateBeforeSave: false });

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return {
      user: loggedInUser,
      token,
    };
  }

  async getMe(userId) {
    const user = await User.findById(userId).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    return { user };
  }

  async updateProfile(userId, profileData) {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    if (profileData.name || profileData.fullName) {
      user.fullName = profileData.fullName || profileData.name;
    }

    if (profileData.phone) {
      user.phone = profileData.phone;
    }

    if (profileData.email) {
      user.email = profileData.email;
    }

    await user.save();

    const updatedUser = await User.findById(userId).select(
      "-password -refreshToken"
    );

    return { user: updatedUser };
  }

  async changePassword(userId, passwordData) {
    const user = await User.findById(userId).select("+password");

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    const isPasswordMatched = await user.comparePassword(
      passwordData.currentPassword
    );

    if (!isPasswordMatched) {
      throw new ApiError(401, "Current password is incorrect.");
    }

    user.password = passwordData.newPassword;

    await user.save();

    return { success: true };
  }

  async updateProfileImage(userId, file) {
    if (!file) {
      throw new ApiError(400, "Profile image is required.");
    }

    const uploadedImage = await uploadToCloudinary(file, "profiles");

    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage: uploadedImage.url },
      { new: true }
    ).select("-password -refreshToken");

    return { user };
  }

  async deleteAccount(userId) {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    return { success: true };
  }
}

export default new AuthService();