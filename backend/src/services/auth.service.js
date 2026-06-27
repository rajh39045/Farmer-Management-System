import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import MESSAGES from "../constants/messages.js";
import { generateAccessToken } from "../utils/generateToken.js";

class AuthService {
  async register(userData) {
    const { email, phone } = userData;

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
}

export default new AuthService();