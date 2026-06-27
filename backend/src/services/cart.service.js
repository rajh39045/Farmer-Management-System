import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import ApiError from "../utils/ApiError.js";

class CartService {
  // Add Product to Cart
  async addToCart(userId, productId, quantity) {
    const product = await Product.findById(productId);

    if (!product || !product.isAvailable) {
      throw new ApiError(404, "Product not found.");
    }

    if (quantity > product.quantity) {
      throw new ApiError(400, "Insufficient stock.");
    }

    let cart = await Cart.findOne({ customer: userId });

    if (!cart) {
      cart = await Cart.create({
        customer: userId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
      });
    }

    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    return await cart.populate("items.product");
  }

  // Get Cart
  async getCart(userId) {
    const cart = await Cart.findOne({
      customer: userId,
    })
      .populate("items.product");

    if (!cart) {
      return {
        items: [],
        totalAmount: 0,
      };
    }

    return cart;
  }

  // Update Cart Item
  async updateCart(userId, productId, quantity) {
    const cart = await Cart.findOne({
      customer: userId,
    });

    if (!cart) {
      throw new ApiError(404, "Cart not found.");
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      throw new ApiError(404, "Product not found in cart.");
    }

    item.quantity = quantity;

    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    return await cart.populate("items.product");
  }

  // Remove Item
  async removeItem(userId, productId) {
    const cart = await Cart.findOne({
      customer: userId,
    });

    if (!cart) {
      throw new ApiError(404, "Cart not found.");
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    return cart;
  }

  // Clear Cart
  async clearCart(userId) {
    const cart = await Cart.findOne({
      customer: userId,
    });

    if (!cart) {
      return;
    }

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();
  }
}

export default new CartService();