import dashboardService from "../services/dashboard.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

// ==========================================
// Farmer Dashboard Summary
// ==========================================
export const getFarmerDashboard = asyncHandler(async (req, res) => {
  const dashboard = await dashboardService.getFarmerDashboard(
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Farmer dashboard fetched successfully.",
      dashboard
    )
  );
});

// ==========================================
// Monthly Revenue
// ==========================================
export const getMonthlyRevenue = asyncHandler(async (req, res) => {
  const revenue = await dashboardService.getMonthlyRevenue(
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Monthly revenue fetched successfully.",
      revenue
    )
  );
});

// ==========================================
// Monthly Orders
// ==========================================
export const getMonthlyOrders = asyncHandler(async (req, res) => {
  const orders = await dashboardService.getMonthlyOrders(
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Monthly orders fetched successfully.",
      orders
    )
  );
});

// ==========================================
// Top Selling Products
// ==========================================
export const getTopSellingProducts = asyncHandler(async (req, res) => {
  const products = await dashboardService.getTopSellingProducts(
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Top selling products fetched successfully.",
      products
    )
  );
});

// ==========================================
// Order Status Statistics
// ==========================================
export const getOrderStatusStats = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getOrderStatusStats(
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Order status statistics fetched successfully.",
      stats
    )
  );
});