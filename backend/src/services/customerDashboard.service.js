import Order from "../models/Order.js";

class CustomerDashboardService {
  async getCustomerDashboard(customerId) {
    // Total Orders
    const totalOrders = await Order.countDocuments({
      customer: customerId,
    });

    // Delivered Orders
    const deliveredOrders = await Order.countDocuments({
      customer: customerId,
      orderStatus: "Delivered",
    });

    // Pending Orders
    const pendingOrders = await Order.countDocuments({
      customer: customerId,
      orderStatus: "Pending",
    });

    // Cancelled Orders
    const cancelledOrders = await Order.countDocuments({
      customer: customerId,
      orderStatus: "Cancelled",
    });

    // Total Spending
    const orders = await Order.find({
      customer: customerId,
      orderStatus: "Delivered",
    });

    const totalSpending = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    // Recent Orders
    const recentOrders = await Order.find({
      customer: customerId,
    })
      .populate("farmer", "fullName phone")
      .sort({ createdAt: -1 })
      .limit(5);

    // Recently Purchased Products
    const purchasedProducts = [];

    orders.forEach((order) => {
      order.items.forEach((item) => {
        purchasedProducts.push({
          product: item.product,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        });
      });
    });

    return {
      orders: {
        totalOrders,
        deliveredOrders,
        pendingOrders,
        cancelledOrders,
      },

      spending: {
        totalSpending,
      },

      recentOrders,

      purchasedProducts,
    };
  }
}

export default new CustomerDashboardService();