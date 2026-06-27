import reviewService from "../services/review.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

// Add Review
export const addReview = asyncHandler(async (req, res) => {
  const review = await reviewService.addReview(
    req.user._id,
    req.body
  );

  res.status(201).json(
    new ApiResponse(
      201,
      "Review added successfully.",
      review
    )
  );
});

// Get Product Reviews
export const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await reviewService.getProductReviews(
    req.params.productId
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Reviews fetched successfully.",
      reviews
    )
  );
});