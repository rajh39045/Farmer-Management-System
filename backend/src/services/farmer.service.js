import FarmerProfile from "../models/FarmerProfile.js";
import ApiError from "../utils/ApiError.js";

class FarmerService {

  async createFarmer(userId, data) {

    const exists = await FarmerProfile.findOne({
      user: userId,
    });

    if (exists) {
      throw new ApiError(
        400,
        "Farmer profile already exists."
      );
    }

    const farmer = await FarmerProfile.create({
      user: userId,
      ...data,
    });

    return farmer;
  }

  async getMyProfile(userId) {

    const farmer = await FarmerProfile.findOne({
      user: userId,
    }).populate("user", "-password");

    if (!farmer) {
      throw new ApiError(
        404,
        "Farmer profile not found."
      );
    }

    return farmer;
  }
}

export default new FarmerService();