import customerDashboardService from "../services/customerDashboard.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

// Customer Dashboard
export const getCustomerDashboard = asyncHandler(async (req, res) => {
  const dashboard =
    await customerDashboardService.getCustomerDashboard(
      req.user._id
    );

  res.status(200).json(
    new ApiResponse(
      200,
      "Customer dashboard fetched successfully.",
      dashboard
    )
  );
});