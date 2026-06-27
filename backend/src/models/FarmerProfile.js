import mongoose from "mongoose";

const farmerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    farmName: {
      type: String,
      required: true,
      trim: true,
    },

    farmLocation: {
      type: String,
      required: true,
      trim: true,
    },

    district: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    farmingMethod: {
      type: String,
      enum: ["Organic", "Conventional"],
      required: true,
    },

    cropTypes: [
      {
        type: String,
      },
    ],

    experience: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    verificationStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalSales: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "FarmerProfile",
  farmerProfileSchema
);