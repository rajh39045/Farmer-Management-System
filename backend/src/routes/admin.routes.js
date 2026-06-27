import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";

import {
  getDashboard,
  getPendingFarmers,
  verifyFarmer,
} from "../controllers/admin.controller.js";

const router = Router();

router.use(protect, authorize("admin"));

router.get("/dashboard", getDashboard);

router.get("/farmers/pending", getPendingFarmers);

router.patch(
  "/farmers/:id/verify",
  verifyFarmer
);

export default router;