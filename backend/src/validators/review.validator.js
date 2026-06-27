import { body } from "express-validator";

export const reviewValidator = [
  body("product")
    .notEmpty()
    .withMessage("Product is required"),

  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("review")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Review cannot exceed 500 characters"),
];