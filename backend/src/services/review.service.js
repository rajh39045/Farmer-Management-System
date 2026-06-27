import Review from "../models/Review.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import ApiError from "../utils/ApiError.js";

class ReviewService {
  // Add Review
  async addReview(userId, data) {
    const { product, rating, review } = data;

    const deliveredOrder = await Order.findOne({
      customer: userId,
      orderStatus: "Delivered",
      "items.product": product,
    });

    if (!deliveredOrder) {
      throw new ApiError(
        400,
        "You can review only delivered products."
      );
    }

    const existingReview = await Review.findOne({
      customer: userId,
      product,
    });

    if (existingReview) {
      throw new ApiError(
        400,
        "You have already reviewed this product."
      );
    }

    const productDoc = await Product.findById(product);

    const createdReview = await Review.create({
      customer: userId,
      farmer: productDoc.farmer,
      product,
      rating,
      review,
    });

    // Update Product Rating
    const reviews = await Review.find({ product });

    const averageRating =
      reviews.reduce((sum, item) => sum + item.rating, 0) /
      reviews.length;

    productDoc.averageRating = Number(
      averageRating.toFixed(1)
    );

    productDoc.totalReviews = reviews.length;

    await productDoc.save();

    return createdReview;
  }

  // Get Product Reviews
  async getProductReviews(productId) {
    return await Review.find({
      product: productId,
    })
      .populate("customer", "fullName profileImage")
      .sort({
        createdAt: -1,
      });
  }
}

export default new ReviewService();