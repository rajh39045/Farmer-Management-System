import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import upload from "../middlewares/upload.middleware.js";

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import {
  createCategoryValidator,
  updateCategoryValidator,
} from "../validators/category.validator.js";

const router = Router();

// Public Routes
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// Admin & Farmer Routes
router.post(
  "/",
  protect,
  authorize("admin", "farmer"),
  upload.single("image"),
  createCategoryValidator,
  validate,
  createCategory
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("image"),
  updateCategoryValidator,
  validate,
  updateCategory
);

router.delete(
  "/:id",
  protect,
  authorize("admin", "farmer"),
  deleteCategory
);

export default router;