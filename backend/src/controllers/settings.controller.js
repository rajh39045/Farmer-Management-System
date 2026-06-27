import settingsService from "../services/settings.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getSettings = asyncHandler(async (req, res) => {
  const data = await settingsService.getSettings(req.user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Settings fetched successfully.",
      data
    )
  );
});

export const updateSettings = asyncHandler(async (req, res) => {
  const data = await settingsService.updateSettings(
    req.user._id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Settings updated successfully.",
      data
    )
  );
});
