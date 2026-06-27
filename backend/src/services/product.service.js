import Product from "../models/Product.js";
import Category from "../models/Category.js";
import ApiError from "../utils/ApiError.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

class ProductService {
  // Create Product
  async createProduct(userId, productData, files) {
    const category = await Category.findById(productData.category);

    if (!category || !category.isActive) {
      throw new ApiError(404, "Category not found.");
    }

    const images = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const uploadedImage = await uploadToCloudinary(
          file.path,
          "products"
        );

        images.push(uploadedImage);
      }
    }

    const product = await Product.create({
      ...productData,
      farmer: userId,
      images,
    });

    return await product.populate("category", "name slug");
  }

  // Get All Products
  async getAllProducts(query) {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      farmingMethod,
      sort = "-createdAt",
    } = query;

    const filter = {
      isAvailable: true,
    };

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    if (farmingMethod) {
      filter.farmingMethod = farmingMethod;
    }

    const products = await Product.find(filter)
      .populate("farmer", "fullName")
      .populate("category", "name")
      .sort(sort)
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

  // Get Product By ID
  async getProductById(id) {
    const product = await Product.findById(id)
      .populate("farmer", "fullName email")
      .populate("category", "name slug");

    if (!product || !product.isAvailable) {
      throw new ApiError(404, "Product not found.");
    }

    return product;
  }

  // Get Logged-in Farmer Products
  async getFarmerProducts(userId) {
    return await Product.find({
      farmer: userId,
    })
      .populate("category", "name")
      .sort({
        createdAt: -1,
      });
  }

  // Update Product
  async updateProduct(id, userId, data) {
    const product = await Product.findById(id);

    if (!product) {
      throw new ApiError(404, "Product not found.");
    }

    if (product.farmer.toString() !== userId.toString()) {
      throw new ApiError(
        403,
        "You are not allowed to update this product."
      );
    }

    if (data.category) {
      const category = await Category.findById(data.category);

      if (!category || !category.isActive) {
        throw new ApiError(404, "Category not found.");
      }
    }

    Object.assign(product, data);

    await product.save();

    return await product.populate("category", "name slug");
  }

  // Soft Delete Product
  async deleteProduct(id, userId) {
    const product = await Product.findById(id);

    if (!product) {
      throw new ApiError(404, "Product not found.");
    }

    if (product.farmer.toString() !== userId.toString()) {
      throw new ApiError(
        403,
        "You are not allowed to delete this product."
      );
    }

    product.isAvailable = false;

    await product.save();

    return product;
  }
}

export default new ProductService();