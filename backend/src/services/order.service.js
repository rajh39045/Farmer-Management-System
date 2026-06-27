import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import ApiError from "../utils/ApiError.js";
import notificationService from "./notification.service.js";
import NOTIFICATION_TYPES from "../constants/notificationTypes.js";

class OrderService {
  // ==========================================
  // Place Order
  // ==========================================
  async placeOrder(userId, orderData) {
    const deliveryAddress =
      orderData.deliveryAddress ||
      (orderData.shippingAddress
        ? [
            orderData.shippingAddress.fullName,
            orderData.shippingAddress.address,
            orderData.shippingAddress.city,
            orderData.shippingAddress.state,
            orderData.shippingAddress.pincode,
          ]
            .filter(Boolean)
            .join(", ")
        : null);

    const deliverySlot =
      orderData.deliverySlot ||
      orderData.shippingAddress?.deliverySlot ||
      "Morning";

    const cart = await Cart.findOne({
      customer: userId,
    }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      throw new ApiError(400, "Cart is empty.");
    }

    const farmerId = cart.items[0].product.farmer;

    const items = [];
    let totalAmount = 0;

    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);

      if (!product || !product.isAvailable) {
        throw new ApiError(
          404,
          `${item.product.name} is unavailable.`
        );
      }

      if (item.quantity > product.quantity) {
        throw new ApiError(
          400,
          `${product.name} has insufficient stock.`
        );
      }

      product.quantity -= item.quantity;

      if (product.quantity <= 0) {
        product.quantity = 0;
        product.isAvailable = false;
      }

      await product.save();

      items.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        subtotal: product.price * item.quantity,
      });

      totalAmount += product.price * item.quantity;
    }

    const order = await Order.create({
      customer: userId,
      farmer: farmerId,
      items,
      totalAmount,
      deliveryAddress,
      deliverySlot,
      paymentMethod: orderData.paymentMethod || "COD",
    });

    // Notify Farmer
    await notificationService.createNotification({
      recipient: farmerId,
      sender: userId,
      type: NOTIFICATION_TYPES.ORDER_PLACED,
      title: "New Order Received",
      message: "You have received a new order from a customer.",
      reference: order._id,
      referenceModel: "Order",
    });

    // Clear Cart
    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();

    return await order.populate([
      {
        path: "customer",
        select: "fullName email phone",
      },
      {
        path: "farmer",
        select: "fullName phone",
      },
    ]);
  }

  // ==========================================
  // Get Customer Orders
  // ==========================================
  async getCustomerOrders(userId) {
    return await Order.find({
      customer: userId,
    })
      .populate("farmer", "fullName phone")
      .sort({
        createdAt: -1,
      });
  }

  // ==========================================
  // Get Farmer Orders
  // ==========================================
  async getFarmerOrders(userId) {
    return await Order.find({
      farmer: userId,
    })
      .populate("customer", "fullName email phone")
      .sort({
        createdAt: -1,
      });
  }

  // ==========================================
  // Get All Orders (Admin)
  // ==========================================
  async getAllOrders() {
    const orders = await Order.find()
      .populate("customer", "fullName email phone")
      .populate("farmer", "fullName phone")
      .sort({ createdAt: -1 });

    return { orders };
  }

  // ==========================================
  // Get Order By ID
  // ==========================================
  async getOrderById(orderId, userId, role) {
    const order = await Order.findById(orderId)
      .populate("customer", "fullName email phone")
      .populate("farmer", "fullName phone");

    if (!order) {
      throw new ApiError(404, "Order not found.");
    }

    const isCustomer =
      order.customer._id.toString() === userId.toString();
    const isFarmer =
      order.farmer._id.toString() === userId.toString();
    const isAdmin = role === "admin";

    if (!isCustomer && !isFarmer && !isAdmin) {
      throw new ApiError(
        403,
        "You are not authorized to view this order."
      );
    }

    return order;
  }

  // ==========================================
  // Cancel Order (Customer)
  // ==========================================
  async cancelOrder(orderId, userId) {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new ApiError(404, "Order not found.");
    }

    if (order.customer.toString() !== userId.toString()) {
      throw new ApiError(
        403,
        "You are not authorized to cancel this order."
      );
    }

    if (order.orderStatus !== "Pending") {
      throw new ApiError(
        400,
        "Only pending orders can be cancelled."
      );
    }

    order.orderStatus = "Cancelled";

    await order.save();

    await notificationService.createNotification({
      recipient: order.farmer,
      sender: userId,
      type: NOTIFICATION_TYPES.ORDER_CANCELLED,
      title: "Order Cancelled",
      message: "A customer has cancelled their order.",
      reference: order._id,
      referenceModel: "Order",
    });

    return order;
  }

  // ==========================================
  // Delete Order (Admin)
  // ==========================================
  async deleteOrder(orderId) {
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      throw new ApiError(404, "Order not found.");
    }

    return order;
  }

  // ==========================================
  // Update Order Status
  // ==========================================
  async updateOrderStatus(orderId, farmerId, orderStatus) {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new ApiError(404, "Order not found.");
    }

    if (order.farmer.toString() !== farmerId.toString()) {
      throw new ApiError(
        403,
        "You are not authorized to update this order."
      );
    }

    const allowedStatuses = [
      "Pending",
      "Accepted",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(orderStatus)) {
      throw new ApiError(400, "Invalid order status.");
    }

    order.orderStatus = orderStatus;

    await order.save();

    // Notification Type
    let notificationType =
      NOTIFICATION_TYPES.ORDER_ACCEPTED;

    switch (orderStatus) {
      case "Accepted":
        notificationType =
          NOTIFICATION_TYPES.ORDER_ACCEPTED;
        break;

      case "Preparing":
        notificationType =
          NOTIFICATION_TYPES.ORDER_PREPARING;
        break;

      case "Out for Delivery":
        notificationType =
          NOTIFICATION_TYPES.ORDER_OUT_FOR_DELIVERY;
        break;

      case "Delivered":
        notificationType =
          NOTIFICATION_TYPES.ORDER_DELIVERED;
        break;

      case "Cancelled":
        notificationType =
          NOTIFICATION_TYPES.ORDER_CANCELLED;
        break;
    }

    // Notify Customer
    await notificationService.createNotification({
      recipient: order.customer,
      sender: farmerId,
      type: notificationType,
      title: "Order Status Updated",
      message: `Your order status has been updated to "${orderStatus}".`,
      reference: order._id,
      referenceModel: "Order",
    });

    return await order.populate([
      {
        path: "customer",
        select: "fullName email phone",
      },
      {
        path: "farmer",
        select: "fullName phone",
      },
    ]);
  }
}

export default new OrderService();