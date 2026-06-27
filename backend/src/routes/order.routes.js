import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  placeOrder,
  getMyOrders,
  getFarmerOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

import { placeOrderValidator } from "../validators/order.validator.js";

const router = Router();

/* Customer */

router.post(
  "/",
  protect,
  authorize("customer"),
  placeOrderValidator,
  validate,
  placeOrder
);

router.get(
  "/my-orders",
  protect,
  authorize("customer"),
  getMyOrders
);

/* Farmer */

router.get(
  "/farmer-orders",
  protect,
  authorize("farmer"),
  getFarmerOrders
);

router.patch(
  "/:id/status",
  protect,
  authorize("farmer"),
  updateOrderStatus
);

export default router;