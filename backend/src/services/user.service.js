import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

class UserService {
  async getAllUsers(query = {}) {
    const filter = {};

    if (query.role) {
      filter.role = query.role;
    }

    const users = await User.find(filter)
      .select("-password -refreshToken")
      .sort({ createdAt: -1 });

    return { users };
  }

  async getUserById(id) {
    const user = await User.findById(id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    return user;
  }

  async updateUser(id, data) {
    const user = await User.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    ).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    return user;
  }

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    return user;
  }
}

export default new UserService();
