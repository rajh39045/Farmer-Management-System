import mongoose from "mongoose";

import Product from "../models/Product.js";
import Category from "../models/Category.js";
import ApiError from "../utils/ApiError.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

class ProductService {
  async resolveCategory(categoryValue) {
    if (!categoryValue) {
      throw new ApiError(400, "Category is required.");
    }

    const rawValue = String(categoryValue).trim();

    if (!rawValue) {
      throw new ApiError(400, "Category is required.");
    }

    if (mongoose.isValidObjectId(rawValue)) {
      const category = await Category.findOne({ _id: rawValue, isActive: true });
      if (category) {
        return category;
      }
    }

    const category = await Category.findOne({
      isActive: true,
      $or: [
        { slug: rawValue.toLowerCase() },
        { name: { $regex: `^${rawValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" } },
      ],
    });

    if (!category) {
      throw new ApiError(404, "Category not found.");
    }

    return category;
  }

  async createProduct(userId, productData, files) {
    const category = await this.resolveCategory(productData.category);

    const images = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const uploadedImage = await uploadToCloudinary(file, "products");
        images.push(uploadedImage);
      }
    }

    const payload = {
      ...productData,
      category: category._id,
      farmer: userId,
      images,
      price: Number(productData.price),
      quantity: Number(productData.quantity),
      unit: productData.unit || "kg",
      farmingMethod: productData.farmingMethod || (productData.organic ? "Organic" : "Conventional"),
      isAvailable: true,
    };

    const product = await Product.create(payload);

    return await product.populate("category", "name slug");
  }

  async getAllProducts(query = {}) {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      farmingMethod,
      minPrice,
      maxPrice,
      rating,
      inStock,
      featured,
      sort = "newest",
    } = query;

    const sortMap = {
      newest: "-createdAt",
      oldest: "createdAt",
      "price-asc": "price",
      "price-desc": "-price",
      "price_asc": "price",
      "price_desc": "-price",
      "name_asc": "name",
      "name_desc": "-name",
      rating: "-averageRating",
    };

    const sortField = sortMap[sort] || sort;

    const filter = { isAvailable: true };

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
      const resolvedCategory = await this.resolveCategory(category);
      filter.category = resolvedCategory._id;
    }

    if (farmingMethod) {
      filter.farmingMethod = farmingMethod;
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    if (rating) {
      filter.averageRating = { $gte: Number(rating) };
    }

    if (inStock === "true") {
      filter.quantity = { $gt: 0 };
    }

    if (featured === "true") {
      filter.featured = true;
    }

    if (query.exclude) {
      filter._id = { $ne: query.exclude };
    }

    const products = await Product.find(filter)
      .populate("farmer", "fullName")
      .populate("category", "name")
      .sort(sortField)
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    return {
      products,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    };
  }

  async getProductById(id) {
    const product = await Product.findById(id)
      .populate("farmer", "fullName email")
      .populate("category", "name slug");

    if (!product || !product.isAvailable) {
      throw new ApiError(404, "Product not found.");
    }

    return product;
  }

  async getFarmerProducts(userId) {
    return await Product.find({ farmer: userId })
      .populate("category", "name")
      .sort({ createdAt: -1 });
  }

  async updateProduct(id, userId, data, files) {
    const product = await Product.findById(id);

    if (!product) {
      throw new ApiError(404, "Product not found.");
    }

    if (product.farmer.toString() !== userId.toString()) {
      throw new ApiError(403, "You are not allowed to update this product.");
    }

    const updatePayload = { ...data };

    if (updatePayload.category !== undefined) {
      const category = await this.resolveCategory(updatePayload.category);
      updatePayload.category = category._id;
    }

    if (files && files.length > 0) {
      const images = [];

      for (const file of files) {
        const uploadedImage = await uploadToCloudinary(file, "products");
        images.push(uploadedImage);
      }

      product.images = images;
    }

    if (data.price !== undefined) {
      product.price = Number(data.price);
    }

    if (data.quantity !== undefined) {
      product.quantity = Number(data.quantity);
    }

    if (data.unit) {
      product.unit = data.unit;
    }

    if (data.farmingMethod) {
      product.farmingMethod = data.farmingMethod;
    }

    if (data.organic !== undefined) {
      product.farmingMethod = data.organic ? "Organic" : "Conventional";
    }

    Object.assign(product, updatePayload);

    if (updatePayload.farmingMethod === undefined && updatePayload.organic === undefined) {
      product.farmingMethod = product.farmingMethod || "Conventional";
    }

    await product.save();

    return await product.populate("category", "name slug");
  }

  async deleteProduct(id, userId) {
    const product = await Product.findById(id);

    if (!product) {
      throw new ApiError(404, "Product not found.");
    }

    if (product.farmer.toString() !== userId.toString()) {
      throw new ApiError(403, "You are not allowed to delete this product.");
    }

    product.isAvailable = false;
    await product.save();

    return product;
  }
}

export default new ProductService();