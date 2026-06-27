import orderService from "../services/order.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

// Place Order
export const placeOrder = asyncHandler(async (req, res) => {
  const order = await orderService.placeOrder(
    req.user._id,
    req.body
  );

  res.status(201).json(
    new ApiResponse(
      201,
      "Order placed successfully.",
      order
    )
  );
});

// Customer Order History
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getCustomerOrders(req.user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Orders fetched successfully.",
      orders
    )
  );
});

// Farmer Orders
export const getFarmerOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getFarmerOrders(req.user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Farmer orders fetched successfully.",
      orders
    )
  );
});

// Update Order Status
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await orderService.updateOrderStatus(
    req.params.id,
    req.user._id,
    req.body.orderStatus
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Order status updated successfully.",
      order
    )
  );
});