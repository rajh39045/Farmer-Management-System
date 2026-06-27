import productService from "../services/product.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

// Create Product
export const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(
    req.user._id,
    req.body,
    req.files
  );

  res.status(201).json(
    new ApiResponse(
      201,
      "Product created successfully.",
      product
    )
  );
});

// Get All Products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts(req.query);

  res.status(200).json(
    new ApiResponse(
      200,
      "Products fetched successfully.",
      products
    )
  );
});

// Get Product By ID
export const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Product fetched successfully.",
      product
    )
  );
});

// Get Logged-in Farmer Products
export const getMyProducts = asyncHandler(async (req, res) => {
  const products = await productService.getFarmerProducts(req.user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Farmer products fetched successfully.",
      products
    )
  );
});

// Update Product
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(
    req.params.id,
    req.user._id,
    req.body
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Product updated successfully.",
      product
    )
  );
});

// Delete Product
export const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(
    req.params.id,
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Product deleted successfully."
    )
  );
});