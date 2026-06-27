import Category from "../models/Category.js";
import Product from "../models/Product.js";
import ApiError from "../utils/ApiError.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

class CategoryService {
  async uploadCategoryImage(file) {
    if (!file) {
      return "";
    }

    const uploadedImage = await uploadToCloudinary(file, "categories");
    return uploadedImage.url;
  }

  // Create Category
  async createCategory(data, file) {
    const existingCategory = await Category.findOne({
      isActive: true,
      $or: [
        { name: data.name },
        { slug: data.slug },
      ],
    });

    if (existingCategory) {
      throw new ApiError(400, "Category already exists.");
    }

    const image = await this.uploadCategoryImage(file);

    const category = await Category.create({
      ...data,
      image,
    });

    return category;
  }

  // Get All Active Categories
  async getAllCategories() {
    const categories = await Category.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    const productCounts = await Product.aggregate([
      { $match: { isAvailable: true } },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const countMap = Object.fromEntries(
      productCounts.map((entry) => [
        entry._id?.toString(),
        entry.count,
      ])
    );

    return categories.map((category) => ({
      ...category,
      productCount: countMap[category._id.toString()] || 0,
    }));
  }

  // Get Category By ID
  async getCategoryById(id) {
    const category = await Category.findById(id);

    if (!category || !category.isActive) {
      throw new ApiError(404, "Category not found.");
    }

    return category;
  }

  // Update Category
  async updateCategory(id, data, file) {
    const category = await Category.findById(id);

    if (!category || !category.isActive) {
      throw new ApiError(404, "Category not found.");
    }

    if (data.name || data.slug) {
      const existingCategory = await Category.findOne({
        _id: { $ne: id },
        isActive: true,
        $or: [
          { name: data.name },
          { slug: data.slug },
        ],
      });

      if (existingCategory) {
        throw new ApiError(
          400,
          "Category name or slug already exists."
        );
      }
    }

    if (file) {
      data.image = await this.uploadCategoryImage(file);
    }

    Object.assign(category, data);

    await category.save();

    return category;
  }

  // Soft Delete Category
  async deleteCategory(id) {
    const category = await Category.findById(id);

    if (!category) {
      throw new ApiError(404, "Category not found.");
    }

    category.isActive = false;

    await category.save();

    return category;
  }
}

export default new CategoryService();