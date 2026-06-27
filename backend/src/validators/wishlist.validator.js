import { body } from "express-validator";

export const addToWishlistValidator = [
  body("product")
    .notEmpty()
    .withMessage("Product is required"),
];