import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  createFarmerValidator,
} from "../validators/farmer.validator.js";

import {
  createFarmerProfile,
  getMyFarmerProfile,
} from "../controllers/farmer.controller.js";

const router = Router();

router.post(
  "/profile",
  protect,
  authorize("farmer"),
  createFarmerValidator,
  validate,
  createFarmerProfile
);

router.get(
  "/profile",
  protect,
  authorize("farmer"),
  getMyFarmerProfile
);

export default router;