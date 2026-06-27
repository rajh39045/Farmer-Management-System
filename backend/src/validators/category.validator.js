import { body } from "express-validator";

export const createCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required"),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required"),
];

export const updateCategoryValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category name cannot be empty"),

  body("slug")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Slug cannot be empty"),
];