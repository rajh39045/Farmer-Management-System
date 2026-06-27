import wishlistService from "../services/wishlist.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

// Add Product to Wishlist
export const addToWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.addToWishlist(
    req.user._id,
    req.body.product
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Product added to wishlist successfully.",
      { wishlist }
    )
  );
});

// Get Wishlist
export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.getWishlist(
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Wishlist fetched successfully.",
      { wishlist }
    )
  );
});

// Remove Product from Wishlist
export const removeFromWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.removeFromWishlist(
    req.user._id,
    req.params.productId
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Product removed from wishlist successfully.",
      { wishlist }
    )
  );
});