import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

import {
  getCustomerDashboard,
} from "../controllers/customerDashboard.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Customer Dashboard
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  protect,
  authorize("customer"),
  getCustomerDashboard
);

export default router;