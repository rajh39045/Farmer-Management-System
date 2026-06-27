import userService from "../services/user.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getProfile = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      "Profile fetched successfully",
      req.user
    )
  );
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const data = await userService.getAllUsers(req.query);

  res.status(200).json(
    new ApiResponse(
      200,
      "Users fetched successfully.",
      data
    )
  );
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  res.status(200).json(
    new ApiResponse(
      200,
      "User fetched successfully.",
      { user }
    )
  );
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(
    req.params.id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "User updated successfully.",
      { user }
    )
  );
});

export const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);

  res.status(200).json(
    new ApiResponse(
      200,
      "User deleted successfully."
    )
  );
});
