import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import upload from "../middlewares/upload.middleware.js";

import {
  createProduct,
  getAllProducts,
  getProductById,
  getMyProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import { createProductValidator } from "../validators/product.validator.js";

const router = Router();

/* ==========================================
   Public Routes
========================================== */

router.get("/", getAllProducts);

/* ==========================================
   Farmer Routes
========================================== */

// Get Logged-in Farmer Products
router.get(
  "/my/products",
  protect,
  authorize("farmer"),
  getMyProducts
);

// Create Product
router.post(
  "/",
  protect,
  authorize("farmer"),
  upload.array("images", 5),
  createProductValidator,
  validate,
  createProduct
);

// Update Product
router.put(
  "/:id",
  protect,
  authorize("farmer"),
  upload.array("images", 5),
  createProductValidator,
  validate,
  updateProduct
);

// Delete Product
router.delete(
  "/:id",
  protect,
  authorize("farmer"),
  deleteProduct
);

/* ==========================================
   Public Route
========================================== */

// Get Product By ID
router.get("/:id", getProductById);

export default router;