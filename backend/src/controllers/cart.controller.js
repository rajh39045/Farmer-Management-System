import cartService from "../services/cart.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

// Add Product to Cart
export const addToCart = asyncHandler(async (req, res) => {
  const { product, quantity } = req.body;

  const cart = await cartService.addToCart(
    req.user._id,
    product,
    quantity
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Product added to cart successfully.",
      { cart }
    )
  );
});

// Get Logged-in User Cart
export const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart(req.user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Cart fetched successfully.",
      { cart }
    )
  );
});

// Update Cart Quantity
export const updateCart = asyncHandler(async (req, res) => {
  const { product, quantity } = req.body;

  const cart = await cartService.updateCart(
    req.user._id,
    product,
    quantity
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Cart updated successfully.",
      { cart }
    )
  );
});

// Remove Product from Cart
export const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await cartService.removeItem(
    req.user._id,
    req.params.productId
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Product removed from cart successfully.",
      { cart }
    )
  );
});

// Clear Cart
export const clearCart = asyncHandler(async (req, res) => {
  await cartService.clearCart(req.user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Cart cleared successfully."
    )
  );
});