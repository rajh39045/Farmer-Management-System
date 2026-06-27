import { body } from "express-validator";

export const placeOrderValidator = [
  body("deliveryAddress")
    .trim()
    .notEmpty()
    .withMessage("Delivery address is required"),

  body("deliverySlot")
    .trim()
    .notEmpty()
    .withMessage("Delivery slot is required"),

  body("paymentMethod")
    .optional()
    .isIn(["COD", "ONLINE"])
    .withMessage("Invalid payment method"),
];