import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  addReview,
  getProductReviews,
} from "../controllers/review.controller.js";

import { reviewValidator } from "../validators/review.validator.js";

const router = Router();

/* Public */

// Get all reviews of a product
router.get("/product/:productId", getProductReviews);

/* Customer */

// Add review
router.post(
  "/",
  protect,
  authorize("customer"),
  reviewValidator,
  validate,
  addReview
);

export default router;