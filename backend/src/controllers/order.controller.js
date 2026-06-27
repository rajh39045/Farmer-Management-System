import orderService from "../services/order.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

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

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getCustomerOrders(req.user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Orders fetched successfully.",
      { orders }
    )
  );
});

export const getFarmerOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getFarmerOrders(req.user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Farmer orders fetched successfully.",
      { orders }
    )
  );
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const data = await orderService.getAllOrders();

  res.status(200).json(
    new ApiResponse(
      200,
      "Orders fetched successfully.",
      data
    )
  );
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await orderService.getOrderById(
    req.params.id,
    req.user._id,
    req.user.role
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Order fetched successfully.",
      { order }
    )
  );
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const orderStatus =
    req.body.orderStatus || req.body.status;

  const order = await orderService.updateOrderStatus(
    req.params.id,
    req.user._id,
    orderStatus
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Order status updated successfully.",
      order
    )
  );
});

export const cancelOrder = asyncHandler(async (req, res) => {
  const order = await orderService.cancelOrder(
    req.params.id,
    req.user._id
  );

  res.status(200).json(
    new ApiResponse(
      200,
      "Order cancelled successfully.",
      order
    )
  );
});

export const deleteOrder = asyncHandler(async (req, res) => {
  await orderService.deleteOrder(req.params.id);

  res.status(200).json(
    new ApiResponse(
      200,
      "Order deleted successfully."
    )
  );
});
