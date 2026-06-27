import { body } from "express-validator";

export const createProductValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("price")
    .isFloat({ min: 1 })
    .withMessage("Price must be greater than 0"),

  body("unit")
    .isIn([
      "kg",
      "gram",
      "liter",
      "piece",
      "dozen",
      "packet",
    ])
    .withMessage("Invalid unit"),

  body("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be at least 0"),

  body("farmingMethod")
    .optional()
    .isIn(["Organic", "Conventional"])
    .withMessage("Invalid farming method"),
];