import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";
import ApiError from "../utils/ApiError.js";

class WishlistService {
  // Add to Wishlist
  async addToWishlist(userId, productId) {
    const product = await Product.findById(productId);

    if (!product || !product.isAvailable) {
      throw new ApiError(404, "Product not found.");
    }

    let wishlist = await Wishlist.findOne({
      customer: userId,
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        customer: userId,
        products: [],
      });
    }

    if (wishlist.products.includes(productId)) {
      throw new ApiError(
        400,
        "Product already exists in wishlist."
      );
    }

    wishlist.products.push(productId);

    await wishlist.save();

    return await wishlist.populate({
      path: "products",
      populate: {
        path: "category",
        select: "name",
      },
    });
  }

  // Get Wishlist
  async getWishlist(userId) {
    const wishlist = await Wishlist.findOne({
      customer: userId,
    }).populate({
      path: "products",
      populate: {
        path: "category",
        select: "name",
      },
    });

    if (!wishlist) {
      return {
        products: [],
      };
    }

    return wishlist;
  }

  // Remove from Wishlist
  async removeFromWishlist(userId, productId) {
    const wishlist = await Wishlist.findOne({
      customer: userId,
    });

    if (!wishlist) {
      throw new ApiError(
        404,
        "Wishlist not found."
      );
    }

    wishlist.products = wishlist.products.filter(
      (item) => item.toString() !== productId
    );

    await wishlist.save();

    return wishlist.populate({
      path: "products",
      populate: {
        path: "category",
        select: "name",
      },
    });
  }
}

export default new WishlistService();