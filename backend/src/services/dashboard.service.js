import Product from "../models/Product.js";
import Order from "../models/Order.js";

class DashboardService {
  // ==============================
  // Farmer Dashboard
  // ==============================
  async getFarmerDashboard(farmerId) {
    // Product Statistics
    const totalProducts = await Product.countDocuments({
      farmer: farmerId,
    });

    const availableProducts = await Product.countDocuments({
      farmer: farmerId,
      isAvailable: true,
    });

    const outOfStockProducts = await Product.countDocuments({
      farmer: farmerId,
      isAvailable: false,
    });

    // Order Statistics
    const totalOrders = await Order.countDocuments({
      farmer: farmerId,
    });

    const pendingOrders = await Order.countDocuments({
      farmer: farmerId,
      orderStatus: "Pending",
    });

    const acceptedOrders = await Order.countDocuments({
      farmer: farmerId,
      orderStatus: "Accepted",
    });

    const deliveredOrders = await Order.countDocuments({
      farmer: farmerId,
      orderStatus: "Delivered",
    });

    // Revenue
    const deliveredOrderList = await Order.find({
      farmer: farmerId,
      orderStatus: "Delivered",
    });

    const totalRevenue = deliveredOrderList.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    // Recent Orders
    const recentOrders = await Order.find({
      farmer: farmerId,
    })
      .populate("customer", "fullName phone email")
      .sort({ createdAt: -1 })
      .limit(5);

    // Low Stock Products
    const lowStockProducts = await Product.find({
      farmer: farmerId,
      quantity: { $lte: 10 },
      isAvailable: true,
    })
      .select("name quantity price images")
      .sort({ quantity: 1 });

    return {
      products: {
        totalProducts,
        availableProducts,
        outOfStockProducts,
      },

      orders: {
        totalOrders,
        pendingOrders,
        acceptedOrders,
        deliveredOrders,
      },

      revenue: {
        totalRevenue,
      },

      recentOrders,

      lowStockProducts,
    };
  }

  // ==============================
  // Monthly Revenue
  // ==============================
  async getMonthlyRevenue(farmerId) {
    return await Order.aggregate([
      {
        $match: {
          farmer: farmerId,
          orderStatus: "Delivered",
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },
          revenue: {
            $sum: "$totalAmount",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
  }

  // ==============================
  // Monthly Orders
  // ==============================
  async getMonthlyOrders(farmerId) {
    return await Order.aggregate([
      {
        $match: {
          farmer: farmerId,
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },
          orders: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
  }

  // ==============================
  // Top Selling Products
  // ==============================
  async getTopSellingProducts(farmerId) {
    return await Order.aggregate([
      {
        $match: {
          farmer: farmerId,
          orderStatus: "Delivered",
        },
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.product",
          name: {
            $first: "$items.name",
          },
          totalSold: {
            $sum: "$items.quantity",
          },
          revenue: {
            $sum: "$items.subtotal",
          },
        },
      },
      {
        $sort: {
          totalSold: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);
  }

  // ==============================
  // Order Status Statistics
  // ==============================
  async getOrderStatusStats(farmerId) {
    return await Order.aggregate([
      {
        $match: {
          farmer: farmerId,
        },
      },
      {
        $group: {
          _id: "$orderStatus",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);
  }
}

export default new DashboardService();