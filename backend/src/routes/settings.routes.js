import { Router } from "express";

import protect from "../middlewares/auth.middleware.js";
import {
  getSettings,
  updateSettings,
} from "../controllers/settings.controller.js";

const router = Router();

router.use(protect);

router.get("/", getSettings);
router.put("/", updateSettings);

export default router;
