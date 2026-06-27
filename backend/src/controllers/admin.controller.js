import adminService from "../services/admin.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const data = await adminService.getDashboardStats();

  res.status(200).json(
    new ApiResponse(
      200,
      "Dashboard fetched successfully.",
      data
    )
  );
});

export const getPendingFarmers = asyncHandler(async (req, res) => {
  const farmers = await adminService.getPendingFarmers();

  res.status(200).json(
    new ApiResponse(
      200,
      "Pending farmers fetched successfully.",
      farmers
    )
  );
});

export const verifyFarmer = asyncHandler(async (req, res) => {
  const farmer = await adminService.verifyFarmer(
    req.params.id,
    req.body.status
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Farmer verification updated.",
      farmer
    )
  );
});