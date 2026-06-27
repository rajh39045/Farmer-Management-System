import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  placeOrder,
  getMyOrders,
  getFarmerOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  deleteOrder,
} from "../controllers/order.controller.js";

import { placeOrderValidator } from "../validators/order.validator.js";

const router = Router();

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

router.get(
  "/my",
  protect,
  authorize("customer"),
  getMyOrders
);

router.get(
  "/farmer-orders",
  protect,
  authorize("farmer"),
  getFarmerOrders
);

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllOrders
);

router.get(
  "/:id",
  protect,
  getOrderById
);

router.patch(
  "/:id/status",
  protect,
  authorize("farmer"),
  updateOrderStatus
);

router.put(
  "/:id/status",
  protect,
  authorize("farmer"),
  updateOrderStatus
);

router.patch(
  "/:id/cancel",
  protect,
  authorize("customer"),
  cancelOrder
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteOrder
);

export default router;
