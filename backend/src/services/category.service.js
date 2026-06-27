import Category from "../models/Category.js";
import ApiError from "../utils/ApiError.js";

class CategoryService {
  // Create Category
  async createCategory(data) {
    const existingCategory = await Category.findOne({
      $or: [
        { name: data.name },
        { slug: data.slug },
      ],
    });

    if (existingCategory) {
      throw new ApiError(400, "Category already exists.");
    }

    const category = await Category.create(data);

    return category;
  }

  // Get All Active Categories
  async getAllCategories() {
    return await Category.find({ isActive: true }).sort({
      createdAt: -1,
    });
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
  async updateCategory(id, data) {
    const category = await Category.findById(id);

    if (!category || !category.isActive) {
      throw new ApiError(404, "Category not found.");
    }

    if (data.name || data.slug) {
      const existingCategory = await Category.findOne({
        _id: { $ne: id },
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