import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import FarmerProfile from "../models/FarmerProfile.js";
import ApiError from "../utils/ApiError.js";

class AdminService {
  // Dashboard Statistics
  async getDashboardStats() {
    const totalUsers = await User.countDocuments();

    const totalFarmers = await User.countDocuments({
      role: "farmer",
    });

    const totalCustomers = await User.countDocuments({
      role: "customer",
    });

    const totalProducts = await Product.countDocuments({
      isAvailable: true,
    });

    const totalOrders = await Order.countDocuments();

    const pendingFarmers = await FarmerProfile.countDocuments({
      verificationStatus: "Pending",
    });

    const deliveredOrders = await Order.find({
      orderStatus: "Delivered",
    });

    const totalRevenue = deliveredOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    return {
      totalUsers,
      totalFarmers,
      totalCustomers,
      totalProducts,
      totalOrders,
      pendingFarmers,
      totalRevenue,
    };
  }

  // Pending Farmers
  async getPendingFarmers() {
    return await FarmerProfile.find({
      verificationStatus: "Pending",
    }).populate("user", "fullName email phone");
  }

  // Verify Farmer
  async verifyFarmer(id, status) {
    const farmer = await FarmerProfile.findById(id);

    if (!farmer) {
      throw new ApiError(404, "Farmer not found.");
    }

    farmer.verificationStatus = status;

    if (status === "Approved") {
      await User.findByIdAndUpdate(farmer.user, {
        isVerified: true,
      });
    }

    await farmer.save();

    return farmer;
  }
}

export default new AdminService();