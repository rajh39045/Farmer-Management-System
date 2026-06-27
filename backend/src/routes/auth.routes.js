import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import upload from "../middlewares/upload.middleware.js";

import {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  changePassword,
  updateProfileImage,
  deleteAccount,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

import {
  registerValidator,
  loginValidator,
  updateProfileValidator,
  changePasswordValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from "../validators/auth.validator.js";

const router = Router();

router.post(
  "/register",
  registerValidator,
  validate,
  register
);

router.post(
  "/login",
  loginValidator,
  validate,
  login
);

router.post("/logout", logout);

router.post(
  "/forgot-password",
  forgotPasswordValidator,
  validate,
  forgotPassword
);

router.post(
  "/reset-password/:token",
  resetPasswordValidator,
  validate,
  resetPassword
);

router.get("/me", protect, getMe);

router.put(
  "/profile",
  protect,
  updateProfileValidator,
  validate,
  updateProfile
);

router.put(
  "/change-password",
  protect,
  changePasswordValidator,
  validate,
  changePassword
);

router.put(
  "/profile-image",
  protect,
  upload.single("profileImage"),
  updateProfileImage
);

router.delete("/delete-account", protect, deleteAccount);

export default router;
