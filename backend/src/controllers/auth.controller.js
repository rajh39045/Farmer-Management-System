import authService from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import MESSAGES from "../constants/messages.js";

export const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  res.status(201).json(
    new ApiResponse(
      201,
      MESSAGES.AUTH.REGISTER_SUCCESS,
      user
    )
  );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);

  res
    .cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json(
      new ApiResponse(
        200,
        MESSAGES.AUTH.LOGIN_SUCCESS,
        result
      )
    );
});

export const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json(
      new ApiResponse(
        200,
        MESSAGES.AUTH.LOGOUT_SUCCESS
      )
    );
});

export const getMe = asyncHandler(async (req, res) => {
  const data = await authService.getMe(req.user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Profile fetched successfully.",
      data
    )
  );
});

export const updateProfile = asyncHandler(async (req, res) => {
  const data = await authService.updateProfile(
    req.user._id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Profile updated successfully.",
      data
    )
  );
});

export const changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword(req.user._id, req.body);

  res.status(200).json(
    new ApiResponse(
      200,
      "Password changed successfully."
    )
  );
});

export const updateProfileImage = asyncHandler(async (req, res) => {
  const data = await authService.updateProfileImage(
    req.user._id,
    req.file
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Profile image updated successfully.",
      data
    )
  );
});

export const deleteAccount = asyncHandler(async (req, res) => {
  await authService.deleteAccount(req.user._id);

  res
    .clearCookie("token")
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Account deleted successfully."
      )
    );
});

export const forgotPassword = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(
      200,
      "If an account exists with this email, a reset link has been sent."
    )
  );
});

export const resetPassword = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(
      200,
      "Password reset successfully."
    )
  );
});
