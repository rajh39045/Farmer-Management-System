import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  addToCart,
  getCart,
  updateCart,
  removeCartItem,
  clearCart,
} from "../controllers/cart.controller.js";

import {
  addToCartValidator,
  updateCartValidator,
} from "../validators/cart.validator.js";

const router = Router();

// All Cart APIs require customer login
router.use(protect, authorize("customer"));

// Get Cart
router.get("/", getCart);

// Add Product
router.post(
  "/",
  addToCartValidator,
  validate,
  addToCart
);

// Update Quantity
router.put(
  "/",
  updateCartValidator,
  validate,
  updateCart
);

// Remove Item
router.delete("/:productId", removeCartItem);

// Clear Cart
router.delete("/", clearCart);

export default router;