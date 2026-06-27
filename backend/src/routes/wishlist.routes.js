import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.controller.js";

import {
  addToWishlistValidator,
} from "../validators/wishlist.validator.js";

const router = Router();

// All Wishlist APIs require customer login
router.use(protect, authorize("customer"));

// Get Wishlist
router.get("/", getWishlist);

// Add Product
router.post(
  "/",
  addToWishlistValidator,
  validate,
  addToWishlist
);

// Remove Product
router.delete(
  "/:productId",
  removeFromWishlist
);

export default router;