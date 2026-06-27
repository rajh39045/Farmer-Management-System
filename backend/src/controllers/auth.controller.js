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