import { body } from "express-validator";

export const createFarmerValidator = [
  body("farmName")
    .notEmpty()
    .withMessage("Farm name is required"),

  body("farmLocation")
    .notEmpty()
    .withMessage("Farm location is required"),

  body("district")
    .notEmpty()
    .withMessage("District is required"),

  body("state")
    .notEmpty()
    .withMessage("State is required"),

  body("pincode")
    .notEmpty()
    .withMessage("Pincode is required"),

  body("farmingMethod")
    .isIn(["Organic", "Conventional"])
    .withMessage("Invalid farming method"),
];