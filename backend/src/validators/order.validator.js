import { body } from "express-validator";

export const placeOrderValidator = [
  body("deliveryAddress")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Delivery address is required"),

  body("shippingAddress")
    .optional()
    .isObject()
    .withMessage("Shipping address must be an object"),

  body().custom((_, { req }) => {
    if (!req.body.deliveryAddress && !req.body.shippingAddress) {
      throw new Error("Delivery address is required");
    }

    return true;
  }),

  body("deliverySlot")
    .optional()
    .trim(),

  body("paymentMethod")
    .optional()
    .isIn(["COD", "ONLINE"])
    .withMessage("Invalid payment method"),
];
