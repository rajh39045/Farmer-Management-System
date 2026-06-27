import { Router } from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import farmerRoutes from "./farmer.routes.js";
import categoryRoutes from "./category.routes.js";
import productRoutes from "./product.routes.js";
import cartRoutes from "./cart.routes.js";
import orderRoutes from "./order.routes.js";
import reviewRoutes from "./review.routes.js";
import adminRoutes from "./admin.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import customerDashboardRoutes from "./customerDashboard.routes.js";
import wishlistRoutes from "./wishlist.routes.js";
import notificationRoutes from "./notification.routes.js";

const router = Router();

// Authentication Routes
router.use("/auth", authRoutes);

// User Routes
router.use("/users", userRoutes);

// Farmer Routes
router.use("/farmers", farmerRoutes);

// Category Routes
router.use("/categories", categoryRoutes);

// Product Routes
router.use("/products", productRoutes);

// Cart Routes
router.use("/cart", cartRoutes);

// Order Routes
router.use("/orders", orderRoutes);

// Review Routes
router.use("/reviews", reviewRoutes);

router.use("/admin", adminRoutes);

router.use("/dashboard", dashboardRoutes);

router.use(
  "/customer-dashboard",
  customerDashboardRoutes
);

router.use("/wishlist", wishlistRoutes);

router.use("/notifications", notificationRoutes);


export default router;