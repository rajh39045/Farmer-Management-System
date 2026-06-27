import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

import {
  getFarmerDashboard,
  getMonthlyRevenue,
  getMonthlyOrders,
  getTopSellingProducts,
  getOrderStatusStats,
} from "../controllers/dashboard.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Farmer Dashboard Routes
|--------------------------------------------------------------------------
*/

// Dashboard Summary
router.get(
  "/farmer",
  protect,
  authorize("farmer"),
  getFarmerDashboard
);

// Monthly Revenue Analytics
router.get(
  "/farmer/revenue",
  protect,
  authorize("farmer"),
  getMonthlyRevenue
);

// Monthly Orders Analytics
router.get(
  "/farmer/orders",
  protect,
  authorize("farmer"),
  getMonthlyOrders
);

// Top Selling Products
router.get(
  "/farmer/top-products",
  protect,
  authorize("farmer"),
  getTopSellingProducts
);

// Order Status Statistics
router.get(
  "/farmer/order-status",
  protect,
  authorize("farmer"),
  getOrderStatusStats
);

export default router;