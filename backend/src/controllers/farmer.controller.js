import farmerService from "../services/farmer.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createFarmerProfile = asyncHandler(
  async (req, res) => {

    const farmer =
      await farmerService.createFarmer(
        req.user._id,
        req.body
      );

    res.status(201).json(
      new ApiResponse(
        201,
        "Farmer profile created successfully.",
        farmer
      )
    );
  }
);

export const getMyFarmerProfile = asyncHandler(
  async (req, res) => {

    const farmer =
      await farmerService.getMyProfile(
        req.user._id
      );

    res.status(200).json(
      new ApiResponse(
        200,
        "Farmer profile fetched successfully.",
        farmer
      )
    );
  }
);